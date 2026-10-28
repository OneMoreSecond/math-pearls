# math-pearls

## Documentation responsibilities

- `README.md` focuses on content creation: writing articles, using existing interactive components, and previewing content.
- `AGENTS.md` focuses on development: environment setup, architecture, component implementation, validation, and deployment.
- Keep guidance in the file for its intended audience and link to the other file when needed.

Source: user instruction, 2026-10-24, to separate content creation from implementation details.

## Tech stack

Produce static web pages with Astro + MDX.
Serve on GitHub Pages.

## Ownership

Typical workflow is:

- Humans write articles
- Agents maintain and reuse interactive component code

## Development environment

Use Node 24 and npm 11. The repository pins its runtime family in [.nvmrc](.nvmrc), package requirements and commands in [package.json](package.json), and dependencies in [package-lock.json](package-lock.json).

Set the Node engine range from dependency requirements and the supported Node major, rather than the patch installed on a developer's machine. Keep the root lockfile metadata consistent and verify installation with the CI runtime. Sources: [package.json](package.json), [package-lock.json](package-lock.json), and the user-provided CI error on 2026-10-28: Node 24.21.0 was incorrectly rejected by the former `>=24.22.1` minimum.

```sh
nvm install
nvm use
npm ci
npm run dev
```

Open `http://localhost:4321/math-pearls/`. Sources: [package.json](package.json) and the base in [astro.config.mjs](astro.config.mjs).

## Implementation

Use static Astro output with the MDX integration and strict Astro TypeScript configuration. The shared page layout consumes `title` and `description` from MDX frontmatter. Sources: [astro.config.mjs](astro.config.mjs), [tsconfig.json](tsconfig.json), and [src/layouts/Page.astro](src/layouts/Page.astro).

Add reusable interactive components under `src/components/` when needed, then expose them for authors to import from MDX. Astro components can use browser scripts without adding a UI framework. Sources: the ownership instructions above, [MDX components](https://docs.astro.build/en/guides/integrations-guide/mdx/#using-components-in-mdx), and [Astro scripts](https://docs.astro.build/en/guides/client-side-scripts/).

Use `import.meta.env.BASE_URL` for internal links and public asset URLs. The configured base is `/math-pearls`, with a trailing slash in `BASE_URL`. Sources: [astro.config.mjs](astro.config.mjs) and [the layout home link](src/layouts/Page.astro).

## Validation

| Command                | Purpose                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `npm run dev`          | Start the development server.                                  |
| `npm run typecheck`    | Check Astro and TypeScript with `astro check`.                 |
| `npm run format:check` | Check formatting, including Astro and MDX.                     |
| `npm run format`       | Format maintained files.                                       |
| `npm run build`        | Generate the static site in `dist/`.                           |
| `npm test`             | Build, then smoke-test MDX, the shared layout, and Pages URLs. |
| `npm run preview`      | Serve the production build locally.                            |
| `npm run audit`        | Check dependency advisories.                                   |

Sources: [package.json](package.json) and [the build smoke test](test/site.test.mjs). Static analysis uses Astro's framework-aware checker; add a dedicated linter when application code needs lint rules. Source: setup decision in [the task document](agents/progress/2026-10-24-green-field-setup.md).

## GitHub Pages

[The workflow](.github/workflows/pages.yml) checks formatting, types, the production build, the smoke test, and dependencies on pull requests and pushes to `main`. Successful builds on `main` deploy to `https://onemoresecond.github.io/math-pearls/`; manual runs on `main` also deploy. Sources: workflow configuration, [astro.config.mjs](astro.config.mjs), and the repository's `origin` remote.

Before the first deployment, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions** in the GitHub repository. Source: [Astro's GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/).

## Optional commit checks

For a small baseline, run `npm run format:check` before committing. If adopting pre-commit later, start with whitespace, final newline, JSON/YAML validity, and large-file checks. Keep type checking, builds, tests, and audits in CI. Hooks are proposed, not installed. Sources: the `node-green-field` skill used for setup and [the workflow](.github/workflows/pages.yml).

| Term  | Meaning here                                                   |
| ----- | -------------------------------------------------------------- |
| Astro | The framework that builds HTML and assets into `dist/`.        |
| MDX   | Markdown that supports imported components.                    |
| Base  | The `/math-pearls` prefix required by the GitHub project site. |
| CI    | Automated validation in GitHub Actions.                        |

Sources: [Astro configuration](astro.config.mjs), [MDX home page](src/pages/index.mdx), and [workflow](.github/workflows/pages.yml).
