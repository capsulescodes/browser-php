import { config } from '@dotenvx/dotenvx';
import { SupportedPHPVersion } from '@php-wasm/universal';


config( { path : process.env.INIT_CWD ? `${process.env.INIT_CWD}/.env` : '.env', ignore : [ 'MISSING_ENV_FILE' ], quiet : true } );

export default {
    php : {
        version : process.env.BROWSER_PHP_VERSION != null ? process.env.BROWSER_PHP_VERSION as SupportedPHPVersion : '8.3',
        cli : process.env.BROWSER_PHP_CLI ?? 'xterm'
    },
    composer : {
        name : process.env.BROWSER_PHP_COMPOSER_NAME ?? 'composer',
        version : process.env.BROWSER_PHP_COMPOSER_VERSION ?? '2.8.9',
        path : process.env.BROWSER_PHP_COMPOSER_PATH ?? 'vendor/bin'
    },
    server : {
        host : process.env.BROWSER_PHP_SERVER_HOST ?? 'http://localhost',
        port : process.env.BROWSER_PHP_SERVER_PORT ?? '2222',
        path : process.env.BROWSER_PHP_SERVER_PATH ?? 'public',
        debug : process.env.BROWSER_PHP_SERVER_DEBUG != null && process.env.BROWSER_PHP_SERVER_DEBUG != 'false'
    }
};
