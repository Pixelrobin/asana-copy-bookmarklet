import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import UglifyJS from 'uglify-js';

const source = (await readFile('./src.js')).toString();

const minified = UglifyJS.minify(source, {
  output: {
    quote_style: 1,
  }
});

const encoded = encodeURIComponent(minified.code);

const href = `javascript:${ encoded }`;

let template = (await readFile('./template.html')).toString();
template = template.replaceAll('HREF_GOES_HERE', href);

try {
  await access('_site');
} catch (error) {
  await mkdir('_site');
}

await writeFile('./_site/index.html', template);
