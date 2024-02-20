import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { SupportedPHPVersion } from '@php-wasm/node';


const environment = expand( config() ).parsed;


export default {
    php : { version : environment?.BROWSER_PHP_VERSION != null ? environment?.BROWSER_PHP_VERSION as SupportedPHPVersion : '8.2' },
    composer : {
        version : environment?.BROWSER_PHP_COMPOSER_VERSION ?? '2.7.1',
        path : environment?.BROWSER_PHP_COMPOSER_PATH ?? 'vendor/bin',
        name : environment?.BROWSER_PHP_COMPOSER_NAME ?? 'composer',
    },
    server : {
        host : environment?.BROWSER_PHP_HOST ?? 'http://localhost',
        port : environment?.BROWSER_PHP_PORT ?? '2222',
        path : environment?.BROWSER_PHP_PATH ?? 'public',
        debug : environment?.BROWSER_PHP_DEBUG != null && environment?.BROWSER_PHP_DEBUG != 'false',
    }
}
