#!/usr/bin/env node
import t from "fs";
import s from "https";
import e from "./env.js";
s.get(`https://getcomposer.org/download/${e.composer.version}/composer.phar`, (o) => {
  let r = process.env.INIT_CWD ? `${process.env.INIT_CWD}/${e.composer.path}` : e.composer.path;
  t.existsSync(r) || t.mkdirSync(r, { recursive: !0 });
  const p = t.createWriteStream(`${r}/${e.composer.name}`);
  o.pipe(p);
}).on("error", (o) => {
  throw o;
});
