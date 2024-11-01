#!/usr/bin/env node
import s from "fs";
import t from "https";
import e from "./env.js";
process.env.INIT_CWD === process.cwd() && !process.env.VITEST && process.exit();
t.get(`https://getcomposer.org/download/${e.composer.version}/composer.phar`, (o) => {
  const r = process.env.INIT_CWD ? `${process.cwd()}/${e.composer.path}` : e.composer.path;
  s.existsSync(r) || s.mkdirSync(r, { recursive: !0 });
  const p = s.createWriteStream(`${r}/${e.composer.name}`);
  o.pipe(p);
}).on("error", (o) => {
  throw o;
});
