import fs from 'fs';
import {  afterEach, describe, expect, it, vitest } from 'vitest';
import { spawnSync } from 'child_process';


afterEach( () =>
{
    if( fs.existsSync( `${process.cwd()}/vendor` ) ) fs.rmSync( `${process.cwd()}/vendor`, { recursive: true } );
} );


describe( 'installer', () =>
{
    it( 'should download the composer binary in the given directory', async () =>
    {
        const task = spawnSync( 'node', [ 'node_modules/.bin/tsx', `${process.cwd()}/src/installer.ts` ] );

        expect( task.status ).toEqual( 0 );
        expect( fs.existsSync( `${process.cwd()}/vendor/bin/composer` ) ).toEqual( true );
    } );

    it( 'should download the default composer binary version', async () =>
    {
        const task = spawnSync( 'node', [ 'node_modules/.bin/tsx', `${process.cwd()}/src/installer.ts` ] );

        const environment = await import( '../src/env' );

        expect( task.status ).toEqual( 0 );
        expect( fs.existsSync( `${process.cwd()}/vendor/bin/composer` ) ).toEqual( true );
        expect( fs.readFileSync( `${process.cwd()}/vendor/bin/composer` ).toString() ).toContain( `const VERSION = '${environment.default.composer.version}';` );
    } );

    it( 'should download the given composer binary version', async () =>
    {
        vitest.stubEnv( 'BROWSER_PHP_COMPOSER_VERSION', '1.2.3' );

        const task = spawnSync( 'node', [ 'node_modules/.bin/tsx', `${process.cwd()}/src/installer.ts` ] );

        expect( task.status ).toEqual( 0 );
        expect( fs.existsSync( `${process.cwd()}/vendor/bin/composer` ) ).toEqual( true );
        expect( fs.readFileSync( `${process.cwd()}/vendor/bin/composer` ).toString() ).toContain( `const VERSION = '1.2.3';` );
    } );
} );
