import { spawn } from "node:child_process";
import { join, resolve } from "node:path";

const rootDir = resolve(".");
const tailwindCliEntry = join(rootDir, "node_modules", "@tailwindcss", "cli", "dist", "index.mjs");

const processes = [];

function runProcess(command, args) {
  const child = spawn(command, args, {
    cwd: rootDir,
    stdio: "inherit",
  });

  processes.push(child);

  child.on("exit", (code) => {
    if (code !== 0) {
      shutdown(code ?? 1);
    }
  });

  return child;
}

function shutdown(exitCode = 0) {
  for (const processRef of processes) {
    if (!processRef.killed) {
      processRef.kill();
    }
  }

  process.exit(exitCode);
}

runProcess(process.execPath, [
  tailwindCliEntry,
  "-i",
  "./src/assets/css/input.css",
  "-o",
  "./src/assets/css/styles.css",
  "--watch",
]);

runProcess(process.execPath, ["./scripts/preview-server.mjs", "src", "4173"]);

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
