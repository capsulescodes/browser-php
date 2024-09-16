#!/usr/bin/env node

import { PHP } from '@php-wasm/universal';
import { createNodeFsMountHandler, loadNodeRuntime } from '@php-wasm/node';
import environment from './env';


const php : PHP = new PHP( await loadNodeRuntime( environment.php.version ) );


php.mkdir( process.cwd() );

php.mount( process.cwd(), createNodeFsMountHandler( process.cwd() ) );

php.chdir( process.cwd() );


let args = process.argv.slice( 2 );

if( args.includes( '--disable-functions' ) )
{
    args.splice( args.indexOf( '--disable-functions' ), 1 );

    args = [ '-d', 'disable_functions=proc_open,popen', ...args ];
}

php.cli( [ 'php', ...args ] ).catch( ( result : string ) => { throw result; } ).finally( () => process.exit( 0 ) );
