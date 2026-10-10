import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { join, resolve } from "node:path";

const rootDir = resolve(".");
const tailwindCliEntry = join(rootDir, "node_modules", "@tailwindcss", "cli", "dist", "index.mjs");

const processes = [];
const port = Number(process.argv[2] ?? 4173);
let stopping = false;

async function checkPort() {
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("Bitte einen gültigen Port zwischen 1 und 65535 angeben.");
  }

  await new Promise((resolvePort, rejectPort) => {
    const probe = createServer();
    probe.once("error", (error) => {
      if (error.code === "EADDRINUSE") {
        rejectPort(new Error(`Port ${port} ist bereits belegt. Beende die bisherige Vorschau mit Strg+C und starte npm run dev erneut. Alternativ: npm run dev -- ${port === 4173 ? 4175 : 4173}`));
      } else {
        rejectPort(error);
      }
    });
    probe.listen(port, () => probe.close(resolvePort));
  });
}

function runProcess(command, args) {
  const child = spawn(command, args, {
    cwd: rootDir,
    stdio: "inherit",
  });

  processes.push(child);

  child.on("error", (error) => {
    console.error(error.message);
    shutdown(1);
  });

  child.on("exit", (code) => {
    shutdown(code ?? 1);
  });

  return child;
}

function shutdown(exitCode = 0) {
  if (stopping) return;
  stopping = true;

  for (const processRef of processes) {
    if (!processRef.killed) {
      processRef.kill();
    }
  }

  process.exit(exitCode);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

try {
  // Node --watch bleibt bei einem fehlgeschlagenen Serverstart selbst aktiv.
  // Deshalb den Port prüfen, bevor CSS- und Preview-Watcher gestartet werden.
  await checkPort();

  runProcess(process.execPath, [
    tailwindCliEntry,
    "-i",
    "./src/assets/css/input.css",
    "-o",
    "./src/assets/css/styles.css",
    "--watch=always",
  ]);

  runProcess(process.execPath, ["--watch", "--watch-preserve-output", "./scripts/preview-server.mjs", "src", String(port)]);
} catch (error) {
  console.error(error.message);
  shutdown(1);
}
