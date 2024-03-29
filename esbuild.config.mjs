import {build} from "esbuild";
import process from "process";
import builtins from 'builtin-modules';
import {sassPlugin} from 'esbuild-sass-plugin';
import Vue from "@the_tree/esbuild-plugin-vue3";

const banner =
    `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`;

const prod = (process.argv[2] === 'production');
process.env.NODE_ENV = 'production';
await build({
    banner: {
        js: banner,
    },
    loader: {
        '.scss': 'css'
    },
    plugins: [
        Vue({ isProd: true }),
        sassPlugin()
    ],
    entryPoints: ['./src/main.ts'],
    bundle: true,
    external: [
        'obsidian',
        'electron',
        '@codemirror/autocomplete',
        '@codemirror/closebrackets',
        '@codemirror/collab',
        '@codemirror/commands',
        '@codemirror/comment',
        '@codemirror/fold',
        '@codemirror/gutter',
        '@codemirror/highlight',
        '@codemirror/history',
        '@codemirror/language',
        '@codemirror/lint',
        '@codemirror/matchbrackets',
        '@codemirror/panel',
        '@codemirror/rangeset',
        '@codemirror/rectangular-selection',
        '@codemirror/search',
        '@codemirror/state',
        '@codemirror/stream-parser',
        '@codemirror/text',
        '@codemirror/tooltip',
        '@codemirror/view',
        ...builtins],
    format: 'cjs',
    target: 'es2016',
    logLevel: "info",
    sourcemap: prod ? false : 'inline',
    minify: prod ? true : false,
    treeShaking: true,
    outfile: 'main.js',
}).catch(() => process.exit(1));

await build({
    entryPoints: ["./src/main.css"],
    outfile: "styles.css",
    bundle: true,
    allowOverwrite: true,
    minify: false,
});
