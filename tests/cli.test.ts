import { describe, expect, it } from 'vitest';
import { spawnSync } from 'child_process';


describe( 'cli', () =>
{
    it( 'should correctly run by giving the current PHP version', async () =>
    {
        const environment = await import( '../src/env' );

        const args = [ '--version' ];

        const task = spawnSync( 'node', [ 'node_modules/.bin/tsx', `${process.cwd()}/src/cli.ts`, ...args ] );

        expect( task.stdout.toString() ).toContain( `PHP ${environment.default.php.version}` );
    } );
} );
