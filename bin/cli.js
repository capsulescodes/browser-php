#!/usr/bin/env node
import n from "../dist/env.js";
import { NodePHP as o } from "@php-wasm/node";
o.load(n.php.version).then((i) => {
  i.useHostFilesystem();
  let e = process.argv.slice(2);
  e.includes("--disable-functions") && (e.splice(e.indexOf("--disable-functions"), 1), e = ["-d", "disable_functions=proc_open,popen,curl_exec,curl_multi_exec", ...e]), i.cli(["php", ...e]).catch((s) => {
    throw s;
  }).finally(() => process.exit(0));
});
