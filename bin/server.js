#!/usr/bin/env node
import h from "http";
import s from "../dist/env.js";
import { NodePHP as c } from "@php-wasm/node";
let a, n;
const f = h.createServer(async (e, o) => {
  if (!a)
    n || (n = !0, a = await c.load(s.php.version, { requestHandler: { documentRoot: s.server.path, absoluteUrl: `${s.server.host}:${s.server.port}` } }), a.useHostFilesystem(), n = !1, o.statusCode = 302, o.setHeader("location", e.url ?? ""), o.end());
  else if (e.url) {
    let d = {};
    if (e.rawHeaders && e.rawHeaders.length)
      for (let t = 0; t < e.rawHeaders.length; t += 2)
        d[e.rawHeaders[t]] = e.rawHeaders[t + 1];
    const u = new Promise((t) => {
      const i = [];
      e.on("data", (p) => i.push(p)).on("end", () => t(Buffer.concat(i).toString()));
    }), l = { method: e.method, url: e.url, headers: d, body: await u }, r = await a.request(l);
    s.server.debug && console.log(l, r), delete r.headers["x-frame-options"], Object.keys(r.headers).forEach((t) => {
      o.setHeader(t, r.headers[t]);
    }), o.statusCode = r.httpStatusCode, o.end(r.bytes);
  }
});
f.listen(s.server.port, async () => console.log(`
PHP server is listening on ${s.server.host}:${s.server.port}
`));
