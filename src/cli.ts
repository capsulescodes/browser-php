#!/usr/bin/env node

import environment from './env';
import { NodePHP } from '@php-wasm/node';


NodePHP.load( environment.php.version ).then( php =>
{
    php.useHostFilesystem();

    let args = process.argv.slice( 2 );

    if( args.includes( '--disable-functions' ) )
    {
        args.splice( args.indexOf( '--disable-functions' ), 1 );

        args = [ '-d', 'disable_functions=proc_open,popen,curl_exec,curl_multi_exec', ...args ];
    }

    php.cli( [ 'php', ...args ] ).catch( ( result : string ) => { throw result; } ).finally( () => process.exit( 0 ) );
} );
