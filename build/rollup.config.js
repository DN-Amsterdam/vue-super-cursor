import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from '@rollup/plugin-buble';
import { uglify } from 'rollup-plugin-uglify';

export default {
    input: 'src/wrapper.js', // Path relative to package.json
    external: ['gsap', 'lodash'],
    output: {
        name: 'superCursor',
        format: 'iife',
        exports: 'named',
        globals: {
            'gsap': 'gsap',
            'lodash': 'lodash'
        }
    },
    plugins: [
        commonjs(),
        uglify(),
        vue({
            css: true, // Dynamically inject css as a <style> tag
        }),
        buble(), // Transpile to ES5
    ],
};
