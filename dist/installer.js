#!/usr/bin/env node
import t from "fs";
import p from "https";
import o from "./env.js";
p.get(`https://getcomposer.org/download/${o.composer.version}/composer.phar`, (r) => {
  const e = process.env.INIT_CWD ? `${process.env.INIT_CWD}/${o.composer.path}` : o.composer.path;
  t.existsSync(e) || t.mkdirSync(e, { recursive: !0 });
  const s = t.createWriteStream(`${e}/${o.composer.name}`);
  r.pipe(s);
}).on("error", (r) => {
  throw r;
});
