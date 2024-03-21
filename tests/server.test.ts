import { describe, expect, it } from 'vitest';
import { spawnSync } from 'child_process';


describe( 'server', () =>
{
    it( 'should correctly run by giving the current host and port', async () =>
    {
        const environment = await import( '../src/env' );

        const task = spawnSync( 'node', [ 'node_modules/.bin/tsx', `${process.cwd()}/src/server.ts` ], { timeout : 2000 } );

        expect( task.stdout.toString() ).toContain( `PHP server is listening on ${environment.default.server.host}:${environment.default.server.port}` );
    } );
} );
