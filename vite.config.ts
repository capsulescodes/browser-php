import { defineConfig } from 'vite';


export default defineConfig( {
    build : {
        lib : {
            entry : {
                'bin/cli' : 'src/cli',
                'bin/server' : 'src/server',
                'dist/env' : 'src/env',
                'dist/installer' : 'src/installer'
            },
            formats : [ 'es' ]
        },
        outDir : '',
        rollupOptions : {
            external : [ '@php-wasm/node', '@php-wasm/universal', 'child_process', 'dotenv', 'fs', 'http', 'https' ]
        },
        target : 'esnext'
    }
} );
