import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { setTimeout as delay } from "node:timers/promises";
import { pages } from "../src/data/site.js";

function listen(server, port = 0) {
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, () => resolve(server.address().port));
  });
}

function close(server) {
  return new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
}

function startDev(port) {
  const npmCli = process.env.npm_execpath;
  const child = spawn(npmCli ? process.execPath : "npm", [
    ...(npmCli ? [npmCli] : []), "run", "dev", "--", String(port),
  ], { stdio: ["ignore", "pipe", "pipe"], detached: process.platform !== "win32" });
  let output = "";
  child.stdout.on("data", (chunk) => { output += chunk; });
  child.stderr.on("data", (chunk) => { output += chunk; });
  const exited = new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", (code, signal) => resolve({ code, signal }));
  });
  return { child, exited, output: () => output };
}

async function withTimeout(promise, milliseconds) {
  let timer;
  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error("Zeitlimit beim Dev-Test überschritten.")), milliseconds);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

async function waitFor(check) {
  const deadline = Date.now() + 10000;
  while (Date.now() < deadline) {
    if (await check()) return;
    await delay(100);
  }
  throw new Error("Dev-Server wurde nicht rechtzeitig bereit oder beendet.");
}

const lock = createServer();
const port = await listen(lock);
const baseUrl = `http://127.0.0.1:${port}`;
let dev;

try {
  dev = startDev(port);
  const conflict = await withTimeout(dev.exited, 5000);
  assert.equal(conflict.code, 1, dev.output());
  assert(dev.output().includes(`Port ${port} ist bereits belegt`), dev.output());
  assert(!dev.output().includes("Preview aktiv"), "Bei belegtem Port wurde eine Vorschau gestartet.");
  dev = null;
  await close(lock);

  dev = startDev(port);
  await waitFor(async () => {
    if (dev.child.exitCode !== null) throw new Error(dev.output());
    try {
      return (await fetch(`${baseUrl}/kontakt.html`, { signal: AbortSignal.timeout(500) })).ok
        && dev.output().includes("Done in");
    } catch {
      return false;
    }
  });

  for (const page of pages) {
    const legacy = await fetch(`${baseUrl}/${page.file}?anliegen=sparemitadem`, { redirect: "manual" });
    assert.equal(legacy.status, 301);
    assert.equal(legacy.headers.get("location"), `${page.path}?anliegen=sparemitadem`);
    if (page.path !== "/") {
      const short = await fetch(`${baseUrl}${page.path.slice(0, -1)}`, { redirect: "manual" });
      assert.equal(short.status, 301);
      assert.equal(short.headers.get("location"), page.path);
    }
    const response = await fetch(`${baseUrl}${page.path}`);
    assert.equal(response.status, 200, page.file);
    const html = await response.text();
    assert(!html.includes("{{"), `${page.file}: nicht ersetzte Platzhalter`);
    assert(html.includes('href="/assets/css/styles.css"'), `${page.file}: CSS fehlt`);
    assert(html.includes('src="/assets/js/main.js"'), `${page.file}: JS fehlt`);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, page.file);
    if (page.id === "contact") {
      assert.equal((html.match(/data-contact-topic=/g) ?? []).length, 3);
    }
  }

  for (const [path, mimeType, requiredContent] of [
    ["assets/css/styles.css", "text/css", ".hero-title"],
    ["assets/js/main.js", "text/javascript", "initTheme"],
    ["assets/js/modules/navigation.js", "text/javascript", "showModal"],
  ]) {
    const response = await fetch(`${baseUrl}/${path}`);
    assert.equal(response.status, 200, path);
    assert(response.headers.get("content-type").startsWith(mimeType), path);
    assert((await response.text()).includes(requiredContent), path);
  }

  // SIGINT entspricht Strg+C und wird von npm an den Dev-Prozess weitergegeben.
  if (process.platform === "win32") dev.child.kill("SIGINT");
    else process.kill(-dev.child.pid, "SIGINT");
  await withTimeout(dev.exited, 5000);
  dev = null;
  await waitFor(async () => {
    const probe = createServer();
    try {
      await listen(probe, port);
      await close(probe);
      return true;
    } catch (error) {
      if (error.code !== "EADDRINUSE") throw error;
      return false;
    }
  });

  console.log("Dev geprüft: npm-Start, Portkonflikt, 7 Seiten, CSS, JS und Watcher-Shutdown.");
} finally {
  if (lock.listening) await close(lock);
  if (dev && dev.child.exitCode === null) {
    if (process.platform === "win32") dev.child.kill("SIGINT");
    else process.kill(-dev.child.pid, "SIGINT");
    await withTimeout(dev.exited, 5000);
  }
}
