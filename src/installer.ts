#!/usr/bin/env node

import fs from 'fs';
import https from 'https';
import environment from './env';


if( process.env.INIT_CWD === process.cwd() && ! process.env.VITEST ) process.exit();


https.get( `https://getcomposer.org/download/${environment.composer.version}/composer.phar`, response =>
{
    const path = process.env.INIT_CWD ? `${process.cwd()}/${environment.composer.path}` : environment.composer.path;

    if( ! fs.existsSync( path ) ) fs.mkdirSync( path, { recursive : true } );

    const file = fs.createWriteStream( `${path}/${environment.composer.name}` );

    response.pipe( file );

} ).on( 'error', error => { throw error; } );
