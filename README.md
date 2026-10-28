# math-pearls

explain math topics with interactive web pages

This README focuses on content creation: writing and previewing articles. [AGENTS.md](AGENTS.md) covers development, environment setup, component implementation, checks, and deployment. Source: user instruction, 2026-10-24.

Humans write articles; agents maintain reusable interactive components. Source: [AGENTS.md](AGENTS.md#ownership).

## Authoring

Put human-authored MDX pages in `src/pages/`. A file such as `src/pages/articles/topic.mdx` creates `/math-pearls/articles/topic/`. Use the shared layout with a title and description:

```mdx
---
layout: ../../layouts/Page.astro
title: Your article title
description: A short description of the article.
---

# Your article title

Write the article here.
```

Sources: [the MDX home page](src/pages/index.mdx), [the shared layout](src/layouts/Page.astro), and [Astro file-based routing](https://docs.astro.build/en/guides/routing/).

### Interactive components

Import reusable components from `src/components/` into an MDX article. For example, in `src/pages/articles/topic.mdx`, add this after the frontmatter:

```mdx
import SquareNumbers from '../../components/SquareNumbers.astro';

<SquareNumbers />
```

`SquareNumbers` lets readers vary a square's side length from 1 to 10 and see how successive odd numbers add up to a square number. It needs no props or framework directive, and can appear multiple times on a page. Without JavaScript, readers see the initial square and equation. Sources: [SquareNumbers.astro](src/components/SquareNumbers.astro) and [the live home-page example](src/pages/index.mdx).

Ask an agent to create or adapt a reusable component when an article needs new interactive behavior. Source: [component ownership and development](AGENTS.md#implementation).

### Links and assets

Prefix local links and public asset URLs with `import.meta.env.BASE_URL`; this includes `/math-pearls/` with the configured trailing slash. Example in MDX:

```mdx
<a href={`${import.meta.env.BASE_URL}articles/topic/`}>Read the article</a>
```

Sources: [astro.config.mjs](astro.config.mjs), [the layout home link](src/layouts/Page.astro), and [Astro's base configuration](https://docs.astro.build/en/reference/configuration-reference/#base).

## Preview an article

Complete the [initial environment setup](AGENTS.md#development-environment), then start a local preview:

```sh
npm run dev
```

Open `http://localhost:4321/math-pearls/`, or visit an article directly, such as `http://localhost:4321/math-pearls/articles/topic/` for `src/pages/articles/topic.mdx`. Sources: [package.json](package.json), [astro.config.mjs](astro.config.mjs), and the article example above.

| Term        | Meaning for authors                                      |
| ----------- | -------------------------------------------------------- |
| MDX         | Markdown that supports imported interactive components.  |
| Frontmatter | The metadata block at the beginning of an article.       |
| Layout      | The shared page template selected by the `layout` field. |

Sources: [the MDX home page](src/pages/index.mdx) and [the shared layout](src/layouts/Page.astro).
