import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://onemoresecond.github.io',
  base: '/math-pearls',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx()],
});
