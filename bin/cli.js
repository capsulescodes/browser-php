#!/usr/bin/env node
import n from "../dist/env.js";
import { PHP as s } from "@php-wasm/universal";
import { loadNodeRuntime as c, useHostFilesystem as r } from "@php-wasm/node";
const i = new s(await c(n.php.version));
r(i);
let e = process.argv.slice(2);
e.includes("--disable-functions") && (e.splice(e.indexOf("--disable-functions"), 1), e = ["-d", "disable_functions=proc_open,popen,curl_exec,curl_multi_exec", ...e]);
i.cli(["php", ...e]).catch((o) => {
  throw o;
}).finally(() => process.exit(0));
