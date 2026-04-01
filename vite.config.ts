import { defineConfig } from 'vite';


export default defineConfig( {
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
