import { beforeEach, describe, expect, it, vitest } from 'vitest';


beforeEach( () => { vitest.resetModules(); } );


describe( 'environment', () =>
{
    it( 'should use default values', async () =>
    {
        const environment = await import( '../src/env' );

        expect( environment.default.php.version ).toEqual( '8.3' );
        expect( environment.default.php.cli ).toEqual( 'xterm' );

        expect( environment.default.composer.name ).toEqual( 'composer' );
        expect( environment.default.composer.path ).toEqual( 'vendor/bin' );
        expect( environment.default.composer.version ).toEqual( '2.8.12' );

        expect( environment.default.server.host ).toEqual( 'http://localhost' );
        expect( environment.default.server.port ).toEqual( '2222' );
        expect( environment.default.server.path ).toEqual( 'public' );
        expect( environment.default.server.debug ).toEqual( false );
    } );

    it( 'should use given environment variable values', async () =>
    {
        vitest.stubEnv( 'BROWSER_PHP_VERSION', '8.0' );
        vitest.stubEnv( 'BROWSER_PHP_CLI', 'not-xterm' );

        vitest.stubEnv( 'BROWSER_PHP_COMPOSER_NAME', 'foo' );
        vitest.stubEnv( 'BROWSER_PHP_COMPOSER_PATH', 'bar/baz' );
        vitest.stubEnv( 'BROWSER_PHP_COMPOSER_VERSION', '1.2.3' );

        vitest.stubEnv( 'BROWSER_PHP_SERVER_HOST', 'http://127.0.0.1' );
        vitest.stubEnv( 'BROWSER_PHP_SERVER_PORT', '1234' );
        vitest.stubEnv( 'BROWSER_PHP_SERVER_PATH', 'dist' );
        vitest.stubEnv( 'BROWSER_PHP_SERVER_DEBUG', 'true' );

        const environment = await import( '../src/env' );

        expect( environment.default.php.version ).toEqual( '8.0' );
        expect( environment.default.php.cli ).toEqual( 'not-xterm' );

        expect( environment.default.composer.name ).toEqual( 'foo' );
        expect( environment.default.composer.path ).toEqual( 'bar/baz' );
        expect( environment.default.composer.version ).toEqual( '1.2.3' );

        expect( environment.default.server.host ).toEqual( 'http://127.0.0.1' );
        expect( environment.default.server.port ).toEqual( '1234' );
        expect( environment.default.server.path ).toEqual( 'dist' );
        expect( environment.default.server.debug ).toEqual( true );
    } );
} );
