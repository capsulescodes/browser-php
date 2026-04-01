#!/usr/bin/env node
import { t as e } from "../dist/env.js";
import { PHP as t, sandboxedSpawnHandlerFactory as n } from "@php-wasm/universal";
import { createNodeFsMountHandler as r, loadNodeRuntime as i } from "@php-wasm/node";
//#region src/cli.ts
var a = new t(await i(e.php.version, { emscriptenOptions: { ENV: { TERM: e.php.cli } } }));
a.mkdir(process.cwd()), a.mount(process.cwd(), r(process.cwd())), a.chdir(process.cwd()), await a.setSpawnHandler(n(async () => ({
	php: a,
	reap: () => {}
})));
var o = process.argv.slice(2), s = await a.cli(["php", ...o]);
s.stderr.pipeTo(new WritableStream({ write(e) {
	process.stderr.write(e);
} })), s.stdout.pipeTo(new WritableStream({ write(e) {
	process.stdout.write(e);
} })), s.exitCode.finally(() => setTimeout(() => process.exit(0), 100));
var c = process.stderr.write;
process.stderr.write = function(e, t, n) {
	return typeof e == "string" && (e.includes("Program terminated with exit(0)") || e.includes("ErrorEvent")) ? !0 : c.call(process.stderr, e, t, n);
};
//#endregion
