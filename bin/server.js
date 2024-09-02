#!/usr/bin/env node
import h from "http";
import r from "../dist/env.js";
import { PHPRequestHandler as u, PHP as m } from "@php-wasm/universal";
import { loadNodeRuntime as w, createNodeFsMountHandler as f } from "@php-wasm/node";
let n, d;
const H = h.createServer(async (e, o) => {
  if (n) {
    if (e.url) {
      const s = {};
      if (e.rawHeaders && e.rawHeaders.length)
        for (let t = 0; t < e.rawHeaders.length; t += 2)
          s[e.rawHeaders[t]] = e.rawHeaders[t + 1];
      const l = new Promise((t) => {
        const i = [];
        e.on("data", (p) => i.push(p)).on("end", () => t(Buffer.concat(i).toString()));
      }), c = { method: e.method, url: e.url, headers: s, body: await l }, a = await n.request(c);
      r.server.debug && console.log(c, a), delete a.headers["x-frame-options"], Object.keys(a.headers).forEach((t) => o.setHeader(t, a.headers[t])), o.statusCode = a.httpStatusCode, o.end(a.bytes);
    }
  } else if (!d) {
    d = !0, n = new u({ phpFactory: async () => new m(await w(r.php.version)), documentRoot: r.server.path, absoluteUrl: `${r.server.host}:${r.server.port}` });
    const s = await n.getPrimaryPhp();
    s.mkdir(process.cwd()), s.mount(process.cwd(), f(process.cwd())), s.chdir(process.cwd()), d = !1, o.statusCode = 302, o.setHeader("location", e.url ?? ""), o.end();
  }
});
H.listen(r.server.port, async () => console.log(`
PHP server is listening on ${r.server.host}:${r.server.port}
`));
