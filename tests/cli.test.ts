import { describe, expect, it, vitest } from 'vitest';
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

    it( 'should correctly print xterm style when enabled', async () =>
    {
        vitest.stubEnv( 'BROWSER_PHP_CLI', 'not-xterm' );

        const args = [ '-r', 'echo "\\033[32mHello World\\033[0m";' ];

        const plain = spawnSync( 'node', [ 'node_modules/.bin/tsx', `${process.cwd()}/src/cli.ts`, ...args ] );

        expect( plain.stdout.toString() ).toContain( "Hello World" );

        vitest.stubEnv( 'BROWSER_PHP_CLI', undefined );

        const styled = spawnSync( 'node', [ 'node_modules/.bin/tsx', `${process.cwd()}/src/cli.ts`, ...args ] );

        expect( styled.stdout.toString() ).toContain( "\u001b[32mHello World\u001b[0m" );
    } );
} );
