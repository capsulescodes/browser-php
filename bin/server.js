#!/usr/bin/env node
import h from "http";
import r from "../dist/env.js";
import { PHPRequestHandler as c, PHP as m } from "@php-wasm/universal";
import { loadNodeRuntime as f, useHostFilesystem as H } from "@php-wasm/node";
let a, n;
const v = h.createServer(async (e, o) => {
  if (!a)
    n || (n = !0, a = new c({ phpFactory: async () => new m(await f(r.php.version)), documentRoot: r.server.path, absoluteUrl: `${r.server.host}:${r.server.port}` }), H(await a.getPrimaryPhp()), n = !1, o.statusCode = 302, o.setHeader("location", e.url ?? ""), o.end());
  else if (e.url) {
    let d = {};
    if (e.rawHeaders && e.rawHeaders.length)
      for (let t = 0; t < e.rawHeaders.length; t += 2)
        d[e.rawHeaders[t]] = e.rawHeaders[t + 1];
    const p = new Promise((t) => {
      const l = [];
      e.on("data", (u) => l.push(u)).on("end", () => t(Buffer.concat(l).toString()));
    }), i = { method: e.method, url: e.url, headers: d, body: await p }, s = await a.request(i);
    r.server.debug && console.log(i, s), delete s.headers["x-frame-options"], Object.keys(s.headers).forEach((t) => {
      o.setHeader(t, s.headers[t]);
    }), o.statusCode = s.httpStatusCode, o.end(s.bytes);
  }
});
v.listen(r.server.port, async () => console.log(`
PHP server is listening on ${r.server.host}:${r.server.port}
`));
