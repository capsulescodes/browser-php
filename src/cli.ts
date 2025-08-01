#!/usr/bin/env node

import { PHP } from '@php-wasm/universal';
import { createNodeFsMountHandler, loadNodeRuntime } from '@php-wasm/node';
import environment from './env';


const php : PHP = new PHP( await loadNodeRuntime( environment.php.version, { emscriptenOptions : { ENV : { TERM : environment.php.cli } } } ) );


php.mkdir( process.cwd() );
php.mount( process.cwd(), createNodeFsMountHandler( process.cwd() ) );
php.chdir( process.cwd() );


let args = process.argv.slice( 2 );


const response = await php.cli( [ 'php', ...args ] );


response.stderr.pipeTo( new WritableStream( { write( chunk ){ process.stderr.write( chunk ) } } ) );
response.stdout.pipeTo( new WritableStream( { write( chunk ){ process.stdout.write( chunk ) } } ) );
response.exitCode.finally( () => setTimeout( () => process.exit( 0 ), 100 ) );



// Teporary filter out noisy stderr messages from php-wasm (e.g. exit(0), ErrorEvent)
const originalStderrWrite = process.stderr.write;
process.stderr.write = function( chunk : string, encoding ? : BufferEncoding | ( () => void ), callback ? : () => void ) : boolean
{
	if( typeof chunk === 'string' && ( chunk.includes( 'Program terminated with exit(0)' ) || chunk.includes( 'ErrorEvent' ) ) ) return true;
	return originalStderrWrite.call( process.stderr, chunk, encoding as BufferEncoding, callback );
};
