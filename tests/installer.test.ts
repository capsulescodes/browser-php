import {  describe, expect, it } from 'vitest';
import { spawnSync } from 'child_process';
import fs from 'fs';


describe( 'installer', () =>
{
    it( 'should download the composer binary in the given directory', () =>
    {
        const task = spawnSync( 'node', [ 'node_modules/.bin/tsx', `${process.cwd()}/src/installer.ts` ] );

        expect( task.status ).toEqual( 0 );
        expect( fs.existsSync( `${process.cwd()}/vendor/bin/composer` ) ).toEqual( true );

        if( fs.existsSync( `${process.cwd()}/vendor` ) ) fs.rmSync( `${process.cwd()}/vendor`, { recursive: true } );
    } );
} );
