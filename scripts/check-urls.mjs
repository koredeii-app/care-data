import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DATA_DIR = "data";
const CONCURRENCY = 10;
const TIMEOUT_MS = 15000;
const UA = "Mozilla/5.0 (compatible; care-data-link-checker/1.0)";

function collectUrls() {
  const urlToLabels = new Map();
  const addLabel = (url, label) => {
    if (!urlToLabels.has(url)) urlToLabels.set(url, new Set());
    urlToLabels.get(url).add(label);
  };

  for (const file of readdirSync(DATA_DIR)) {
    if (!file.endsWith(".json")) continue;
    const path = join(DATA_DIR, file);
    const json = JSON.parse(readFileSync(path, "utf8"));

    if (file === "citylinks.json") {
      for (const [city, url] of Object.entries(json)) {
        addLabel(url, `[citylinks.json] ${city}`);
      }
      continue;
    }

    for (const entry of json) {
      if (!entry.url) continue;
      addLabel(entry.url, `[${file}] ${entry.city} ${entry.name}`);
    }
  }
  return urlToLabels;
}

async function checkUrl(url) {
  for (const method of ["HEAD", "GET"]) {
    try {
      const res = await fetch(url, {
        method,
        redirect: "follow",
        headers: { "User-Agent": UA },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (res.ok) return { ok: true };
      if (method === "HEAD") continue; // 一部サーバーはHEAD非対応のためGETで再試行
      return { ok: false, reason: `HTTP ${res.status}` };
    } catch (err) {
      if (method === "GET") return { ok: false, reason: err.message };
    }
  }
  return { ok: false, reason: "unknown error" };
}

async function runPool(items, worker, concurrency) {
  const results = new Array(items.length);
  let index = 0;
  async function next() {
    while (index < items.length) {
      const i = index++;
      results[i] = await worker(items[i]);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, next));
  return results;
}

const urlToLabels = collectUrls();
const urls = [...urlToLabels.keys()];
console.log(`Checking ${urls.length} unique URLs...`);

const results = await runPool(urls, async (url) => ({ url, ...(await checkUrl(url)) }), CONCURRENCY);

const failures = results.filter((r) => !r.ok);

if (failures.length === 0) {
  console.log("All URLs are reachable.");
  process.exit(0);
}

console.log(`\n${failures.length} broken URL(s) found:\n`);
for (const f of failures) {
  for (const label of urlToLabels.get(f.url)) {
    console.log(`- ${label} ${f.url} (${f.reason})`);
  }
}
process.exit(1);
