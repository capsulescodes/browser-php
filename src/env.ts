import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { SupportedPHPVersion } from '@php-wasm/node';


const environment = expand( config() ).parsed;

const php : SupportedPHPVersion = '8.2';
const host : string = 'http://localhost';
const port : string = '2222';
const path : string = 'public';
const debug : string = 'false';


export default {
    php : environment?.BROWSER_PHP_VERSION != null ? environment?.BROWSER_PHP_VERSION as SupportedPHPVersion : php,
    host : environment?.BROWSER_PHP_HOST ?? host,
    port : environment?.BROWSER_PHP_PORT ?? port,
    path : environment?.BROWSER_PHP_PATH ?? path,
    debug : environment?.BROWSER_PHP_DEBUG != null && environment?.BROWSER_PHP_DEBUG != debug,
}
