/**
 * Renders /aicademy-showcase in headless Chrome and writes public/Aicademy-Showcase.pdf,
 * so the downloadable file is exactly the showcase the site displays.
 *
 *   npm run showcase:pdf
 *
 */
import { spawn } from "node:child_process";
import { once } from "node:events";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = process.env.PORT ?? "3000";
const PAGE_URL = `http://localhost:${PORT}/aicademy-showcase`;
const OUTPUT = "public/Aicademy-Showcase.pdf";

const WIDTH = 794;
const HEIGHT = 1123;

const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const isUp = async () => {
  try {
    const response = await fetch(PAGE_URL, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
};

const waitForServer = async (attempts = 60) => {
  for (let i = 0; i < attempts; i += 1) {
    if (await isUp()) return true;
    await sleep(1000);
  }
  return false;
};

let server;

if (await isUp()) {
  console.log(`Using the server already running on port ${PORT}.`);
} else {
  console.log("No server detected, starting `next dev`…");
  server = spawn("npx", ["next", "dev", "--port", PORT], {
    stdio: "ignore",
    detached: false,
  });

  if (!(await waitForServer())) {
    server.kill();
    console.error("Timed out waiting for the dev server.");
    process.exit(1);
  }
}

console.log("Warming the route…");
await fetch(PAGE_URL).catch(() => {});
await sleep(1500);

console.log("Printing to PDF…");
const chrome = spawn(CHROME, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--no-pdf-header-footer",
  `--window-size=${WIDTH},${HEIGHT}`,
  "--virtual-time-budget=20000",
  "--run-all-compositor-stages-before-draw",
  `--print-to-pdf=${OUTPUT}`,
  PAGE_URL,
]);

const [code] = await once(chrome, "exit");
server?.kill();

if (code !== 0) {
  console.error(`Chrome exited with code ${code}.`);
  process.exit(code ?? 1);
}

console.log(`Wrote ${OUTPUT}`);
