#!/usr/bin/env node

import { PHP } from '@php-wasm/universal';
import { createNodeFsMountHandler, loadNodeRuntime } from '@php-wasm/node';
import environment from './env';


const php : PHP = new PHP( await loadNodeRuntime( environment.php.version ) );


php.mkdir( process.cwd() );

php.mount( process.cwd(), createNodeFsMountHandler( process.cwd() ) );

php.chdir( process.cwd() );


php.cli( [ 'php', ...process.argv.slice( 2 ) ] ).catch( ( result : string ) => { throw result; } ).finally( () => process.exit( 0 ) );
