import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

test('MDX builds with the shared layout and GitHub Pages URLs', async () => {
  const html = await readFile(
    new URL('../dist/index.html', import.meta.url),
    'utf8',
  );

  assert.match(html, /<html lang="en"/);
  assert.match(html, /<title>Math Pearls<\/title>/);
  assert.match(html, /<main[^>]*>[\s\S]*<h1[^>]*>Math Pearls<\/h1>/);
  assert.match(html, /href="\/math-pearls\/"/);
  assert.match(html, /href="https:\/\/onemoresecond.github.io\/math-pearls\/"/);

  const stylesheets = [
    ...html.matchAll(/href="(\/math-pearls\/[^"?]+\.css)"/g),
  ];
  assert.match(
    html,
    /<style[\s>]|rel="stylesheet"/,
    'Page styles must be included',
  );

  for (const [, href] of stylesheets) {
    const relativePath = href.slice('/math-pearls/'.length);
    await access(new URL(`../dist/${relativePath}`, import.meta.url));
  }
});

test('the home page includes a reusable square-number explorer', async () => {
  const html = await readFile(
    new URL('../dist/index.html', import.meta.url),
    'utf8',
  );

  assert.match(html, /<square-numbers[\s>]/);
  assert.match(html, /type="range"[^>]*min="1"[^>]*max="10"/);
  assert.match(html, /1 \+ 3 \+ 5 \+ 7 = 4² = 16/);
  assert.match(html, /<noscript>/);

  const scripts = [
    ...html.matchAll(/<script[^>]*src="(\/math-pearls\/[^"?]+\.js)"/g),
  ];
  assert.match(
    html,
    /<script[^>]*type="module"/,
    'The explorer must include browser JavaScript, inline or external',
  );

  for (const [, src] of scripts) {
    const relativePath = src.slice('/math-pearls/'.length);
    await access(new URL(`../dist/${relativePath}`, import.meta.url));
  }
});
