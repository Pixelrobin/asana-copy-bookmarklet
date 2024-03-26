import { readFile } from 'node:fs/promises';
import UglifyJS from 'uglify-js';

const source = (await readFile('./src.js')).toString();

const minified = UglifyJS.minify(source, {
  output: {
    quote_style: 1,
  }
});

const encoded = encodeURIComponent(minified.code);

console.log('javascript:' + encoded);
