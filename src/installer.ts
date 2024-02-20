#!/usr/bin/env node

import fs from 'fs';
import https from 'https';
import environment from './env';


https.get( `https://getcomposer.org/download/${environment.composer.version}/composer.phar`, response =>
{
    let path = process.env.INIT_CWD ? `${process.env.INIT_CWD}/${environment.composer.path}` : environment.composer.path;

    if( ! fs.existsSync( path ) ){ fs.mkdirSync( path, { recursive : true } ) };

    const file = fs.createWriteStream( `${path}/${environment.composer.name}` );

    response.pipe( file );

}).on( 'error', error => { throw error; } );
