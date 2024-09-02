#!/usr/bin/env node
import { PHP as e } from "@php-wasm/universal";
import { loadNodeRuntime as c, createNodeFsMountHandler as s } from "@php-wasm/node";
import p from "../dist/env.js";
const o = new e(await c(p.php.version));
o.mkdir(process.cwd());
o.mount(process.cwd(), s(process.cwd()));
o.chdir(process.cwd());
o.cli(["php", ...process.argv.slice(2)]).catch((r) => {
  throw r;
}).finally(() => process.exit(0));
