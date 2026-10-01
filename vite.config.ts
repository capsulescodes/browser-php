import { chmodSync } from 'fs';
import { defineConfig, Plugin } from 'vite';


const executablePlugin = () : Plugin => ( {
	name : 'executable',
	writeBundle : () => [ 'bin/cli.js', 'bin/server.js' ].forEach( file => chmodSync( file, 0o755 ) )
} );


export default defineConfig( {
	plugins : [ executablePlugin() ],
	build : {
		lib : {
			entry : {
				'bin/cli' : 'src/cli',
				'bin/server' : 'src/server',
				'dist/installer' : 'src/installer'
			},
			formats : [ 'es' ]
		},
		outDir : '.',
		emptyOutDir : false,
		rolldownOptions : {
			external : [ '@php-wasm/node', '@php-wasm/universal', 'child_process', '@dotenvx/dotenvx', 'fs', 'http', 'https', 'os', 'path', 'tty' ],
			output : {
				chunkFileNames : 'dist/[name].js'
			}
		},
		target : 'esnext'
	}
} );
