#!/usr/bin/env node
import { PHP as i } from "@php-wasm/universal";
import { loadNodeRuntime as n, createNodeFsMountHandler as c } from "@php-wasm/node";
import r from "../dist/env.js";
const o = new i(await n(r.php.version));
o.mkdir(process.cwd());
o.mount(process.cwd(), c(process.cwd()));
o.chdir(process.cwd());
let e = process.argv.slice(2);
e.includes("--disable-functions") && (e.splice(e.indexOf("--disable-functions"), 1), e = ["-d", "disable_functions=proc_open,popen", ...e]);
o.cli(["php", ...e]).catch((s) => {
  throw s;
}).finally(() => process.exit(0));
