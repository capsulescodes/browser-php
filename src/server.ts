#!/usr/bin/env node

import http from 'http';
import environment from './env';
import { PHP, PHPRequestHandler } from '@php-wasm/universal';
import { HTTPMethod, loadNodeRuntime, PHPRequest, useHostFilesystem } from '@php-wasm/node';


let handler : PHPRequestHandler;
let loading : boolean;

const app = http.createServer( async ( req, res ) =>
{
    if( ! handler )
    {
        if( ! loading )
        {
            loading = true;

            handler = new PHPRequestHandler( { phpFactory : async () => new PHP( await loadNodeRuntime( environment.php.version ) ), documentRoot : environment.server.path, absoluteUrl : `${environment.server.host}:${environment.server.port}` } );

            useHostFilesystem( await handler.getPrimaryPhp() );

            loading = false;

            res.statusCode = 302;

            res.setHeader( 'location', req.url ?? '' );

            res.end();
        }
    }
    else
    {
        if( req.url )
        {
            let requestHeaders : Record<string, string> = {};

            if( req.rawHeaders && req.rawHeaders.length )
            {
                for( let i = 0; i < req.rawHeaders.length; i += 2 )
                {
                    requestHeaders[ req.rawHeaders[ i ] ] = req.rawHeaders[ i + 1 ];
                }
            }


            const body : Promise<string> = new Promise( resolve =>
            {
                const bodyParts : unknown[] = [];

                req.on( 'data', chunk => bodyParts.push( chunk ) ).on( 'end', () => resolve( Buffer.concat( bodyParts as readonly Uint8Array[] ).toString() ) );
            } );


            const request : PHPRequest = { method : req.method as HTTPMethod , url : req.url, headers : requestHeaders, body : await body };

            const response = await handler.request( request );

            if( environment.server.debug ) console.log( request, response );

            delete response.headers[ 'x-frame-options' ];


            Object.keys( response.headers ).forEach( key => { res.setHeader( key, response.headers[ key ] ) } );

            res.statusCode = response.httpStatusCode;

            res.end( response.bytes );
        }
    }

} );

app.listen( environment.server.port, async () => console.log( `\nPHP server is listening on ${environment.server.host}:${environment.server.port}\n` ) );
