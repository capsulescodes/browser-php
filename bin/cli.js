#!/usr/bin/env node
import { PHP as p } from "@php-wasm/universal";
import { loadNodeRuntime as n, createNodeFsMountHandler as c } from "@php-wasm/node";
import s from "../dist/env.js";
const r = new p(await n(s.php.version, { emscriptenOptions: { ENV: { TERM: s.php.cli } } }));
r.mkdir(process.cwd());
r.mount(process.cwd(), c(process.cwd()));
r.chdir(process.cwd());
let d = process.argv.slice(2);
const t = await r.cli(["php", ...d]);
t.stderr.pipeTo(new WritableStream({ write(e) {
  process.stderr.write(e);
} }));
t.stdout.pipeTo(new WritableStream({ write(e) {
  process.stdout.write(e);
} }));
t.exitCode.finally(() => setTimeout(() => process.exit(0), 100));
const a = process.stderr.write;
process.stderr.write = function(e, i, o) {
  return typeof e == "string" && (e.includes("Program terminated with exit(0)") || e.includes("ErrorEvent")) ? !0 : a.call(process.stderr, e, i, o);
};
