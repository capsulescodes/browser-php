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

	it( 'should correctly serve a request outside of the test environment', async () =>
	{
		const variables = { ...process.env, BROWSER_PHP_SERVER_PATH : 'tests/fixtures' };

		delete variables.VITEST;

		const task = spawn( 'node', [ 'node_modules/.bin/tsx', `${process.cwd()}/src/server.ts` ], { env : variables } );

		await once( task.stdout, 'data' );

		const response = await fetch( 'http://localhost:2222/foo.php' );

		const body = await response.text();

		task.kill();

		expect( body ).toEqual( 'bar' );
	} );
} );
