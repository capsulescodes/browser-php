#!/usr/bin/env node
import { t as e } from "../dist/env.js";
import { PHP as t, PHPRequestHandler as n, ProcessIdAllocator as r } from "@php-wasm/universal";
import { createNodeFsMountHandler as i, loadNodeRuntime as a } from "@php-wasm/node";
import o from "http";
//#region src/server.ts
var s, c, l = new r(process.pid);
o.createServer(async (r, o) => {
	if (!s) {
		if (!c) {
			c = !0, s = new n({
				phpFactory: async () => new t(await a(e.php.version, { emscriptenOptions: { processId: l.claim() } })),
				documentRoot: e.server.path,
				absoluteUrl: `${e.server.host}:${e.server.port}`
			});
			let u = await s.getPrimaryPhp();
			u.mkdir(process.cwd()), u.mount(process.cwd(), i(process.cwd())), u.chdir(process.cwd()), c = !1, o.statusCode = 302, o.setHeader("location", r.url ?? ""), o.end();
		}
	} else if (r.url) {
		let t = {};
		if (r.rawHeaders && r.rawHeaders.length) for (let e = 0; e < r.rawHeaders.length; e += 2) t[r.rawHeaders[e]] = r.rawHeaders[e + 1];
		let n = new Promise((e) => {
			let t = [];
			r.on("data", (e) => t.push(e)).on("end", () => e(Buffer.concat(t).toString()));
		}), i = {
			method: r.method,
			url: r.url,
			headers: t,
			body: await n
		}, a = await s.request(i);
		e.server.debug && console.log(i, a), delete a.headers["x-frame-options"], Object.keys(a.headers).forEach((e) => o.setHeader(e, a.headers[e])), o.statusCode = a.httpStatusCode, o.end(a.bytes);
	}
}).listen(e.server.port, async () => console.log(`\nPHP server is listening on ${e.server.host}:${e.server.port}\n`));
//#endregion
