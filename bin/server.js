#!/usr/bin/env node
import { t as e } from "../dist/env.js";
import { PHP as t, PHPRequestHandler as n } from "@php-wasm/universal";
import { createNodeFsMountHandler as r, loadNodeRuntime as i } from "@php-wasm/node";
import a from "http";
//#region src/server.ts
var o, s;
a.createServer(async (a, c) => {
	if (!o) {
		if (!s) {
			s = !0, o = new n({
				phpFactory: async () => new t(await i(e.php.version)),
				documentRoot: e.server.path,
				absoluteUrl: `${e.server.host}:${e.server.port}`
			});
			let l = await o.getPrimaryPhp();
			l.mkdir(process.cwd()), l.mount(process.cwd(), r(process.cwd())), l.chdir(process.cwd()), s = !1, c.statusCode = 302, c.setHeader("location", a.url ?? ""), c.end();
		}
	} else if (a.url) {
		let t = {};
		if (a.rawHeaders && a.rawHeaders.length) for (let e = 0; e < a.rawHeaders.length; e += 2) t[a.rawHeaders[e]] = a.rawHeaders[e + 1];
		let n = new Promise((e) => {
			let t = [];
			a.on("data", (e) => t.push(e)).on("end", () => e(Buffer.concat(t).toString()));
		}), r = {
			method: a.method,
			url: a.url,
			headers: t,
			body: await n
		}, i = await o.request(r);
		e.server.debug && console.log(r, i), delete i.headers["x-frame-options"], Object.keys(i.headers).forEach((e) => c.setHeader(e, i.headers[e])), c.statusCode = i.httpStatusCode, c.end(i.bytes);
	}
}).listen(e.server.port, async () => console.log(`\nPHP server is listening on ${e.server.host}:${e.server.port}\n`));
//#endregion
