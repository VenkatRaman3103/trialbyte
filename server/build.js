import { build } from 'esbuild';

build({
    entryPoints: ['src/server.js'],
    bundle: true,
    platform: 'node',
    format: 'esm', // Keep as ESM
    outfile: 'dist/server.js',
    external: [
        // Don't bundle these — they will be loaded at runtime
        'express',
        'cors',
        'dotenv',
        'pg',
        'morgan',
        'drizzle-orm',
        'drizzle-kit',
    ],
}).catch(() => process.exit(1));
