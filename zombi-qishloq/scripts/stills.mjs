import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'path';
const S = process.argv[2];
const frames = process.argv[3].split(',').map(Number);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const browserExecutable = '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const chromiumOptions = {gl: 'swangle'};
const composition = await selectComposition({serveUrl, id: 'ZombiQishloq', browserExecutable, chromiumOptions, inputProps: {}});
for (const f of frames) {
  const t0 = Date.now();
  await renderStill({serveUrl, composition, frame: f, output: `${S}/st_${String(f).padStart(4,'0')}.jpg`, imageFormat: 'jpeg', scale: 0.4, browserExecutable, chromiumOptions, timeoutInMilliseconds: 120000});
  console.log(f, Date.now() - t0, 'ms');
}
