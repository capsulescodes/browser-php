#!/usr/bin/env node

import environment from './env';
import { NodePHP } from '@php-wasm/node';


NodePHP.load( environment.php ).then( php =>
{
    php.useHostFilesystem();

    const args : string[] = process.argv.slice( 2 ).length ? process.argv.slice( 2 ) : [ '--help' ];

    php.cli( [ 'php', ...args ] ).catch( ( result : string ) => { throw result; } ).finally( () => process.exit( 0 ) );
} );
