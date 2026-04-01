import { config as e } from "@dotenvx/dotenvx";
//#region src/env.ts
e({
	path: process.env.INIT_CWD ? `${process.env.INIT_CWD}/.env` : ".env",
	ignore: ["MISSING_ENV_FILE"],
	quiet: !0
});
var t = {
	php: {
		version: process.env.BROWSER_PHP_VERSION == null ? "8.5" : process.env.BROWSER_PHP_VERSION,
		cli: process.env.BROWSER_PHP_CLI ?? "xterm"
	},
	composer: {
		name: process.env.BROWSER_PHP_COMPOSER_NAME ?? "composer",
		version: process.env.BROWSER_PHP_COMPOSER_VERSION ?? "2.9.5",
		path: process.env.BROWSER_PHP_COMPOSER_PATH ?? "vendor/bin"
	},
	server: {
		host: process.env.BROWSER_PHP_SERVER_HOST ?? "http://localhost",
		port: process.env.BROWSER_PHP_SERVER_PORT ?? "2222",
		path: process.env.BROWSER_PHP_SERVER_PATH ?? "public",
		debug: process.env.BROWSER_PHP_SERVER_DEBUG != null && process.env.BROWSER_PHP_SERVER_DEBUG != "false"
	}
};
//#endregion
export { t };
