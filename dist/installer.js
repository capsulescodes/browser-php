#!/usr/bin/env node
import { t as e } from "./env.js";
import t from "fs";
import n from "https";
process.env.INIT_CWD === process.cwd() && !process.env.VITEST && process.exit(), n.get(`https://getcomposer.org/download/${e.composer.version}/composer.phar`, (n) => {
	let r = process.env.INIT_CWD ? `${process.cwd()}/${e.composer.path}` : e.composer.path;
	t.existsSync(r) || t.mkdirSync(r, { recursive: !0 });
	let i = t.createWriteStream(`${r}/${e.composer.name}`);
	n.pipe(i);
}).on("error", (e) => {
	throw e;
});
//#endregion
