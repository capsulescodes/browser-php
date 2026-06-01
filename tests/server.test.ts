import { describe, expect, it } from 'vitest';
import { spawn } from 'child_process';
import { once } from 'events';


describe( 'server', () =>
{
	it( 'should correctly run by giving the current host and port', async () =>
	{
			const environment = await import( '../src/env' );

			const task = spawn( 'node', [ 'node_modules/.bin/tsx', `${process.cwd()}/src/server.ts` ] );

			const [ chunk ] = await once( task.stdout, 'data' );

			task.kill();

			expect( chunk.toString() ).toContain( `PHP server is listening on ${environment.default.server.host}:${environment.default.server.port}` );
	} );
} );
