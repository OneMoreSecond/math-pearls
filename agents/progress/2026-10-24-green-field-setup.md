Task ID: 2026-10-24-green-field-setup

## Original request

> /init do green field setup following existing instruction files

Source: user request, 2026-10-24. Preserve this original request above the separator.

---

## Research

- The repository starts with `AGENTS.md`, `README.md`, and `LICENSE`; the working tree was clean. Source: initial file listing and `git status --short`.
- Use Astro + MDX, produce static pages, and serve on GitHub Pages. Humans own articles; agents maintain reusable interactive components. Source: [AGENTS.md](../../AGENTS.md).
- The remote is `git@github.com:OneMoreSecond/math-pearls.git`, and the branch is `main`. Source: `git remote -v` and `git branch --show-current`.
- Astro 7.4.2 and MDX 8.1.1 require Node >=22.23.4; the initially installed Node was 22.22.3. Node 24 is LTS, and this task installed Node 24.22.1 for verification. Sources: `npm view astro version engines --json`, `npm view @astrojs/mdx version engines --json`, `node --version`, nvm installation output, [Astro installation](https://docs.astro.build/en/install-and-setup/), and [Node releases](https://nodejs.org/en/about/previous-releases).
- GitHub project Pages needs `site`, the `/math-pearls` base, and links that include that base. Source: [Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/).
- Documentation serves two audiences: README focuses on content creation; AGENTS focuses on development and implementation details. Source: user follow-up instruction, 2026-10-24.

## Constraint and Assumption

- Keep the setup small and respect article ownership; avoid speculative frameworks and content features. Sources: user instructions and [AGENTS.md](../../AGENTS.md).
- Do not run Git mutations in the original checkout; do not publish as part of setup. Sources: user Git instructions and the scope of the setup request.
- Create and maintain this task document and its append-only history. Source: user project management instructions.
- Keep article authoring and preview guidance in README; put environment setup, component development, validation, and deployment in AGENTS. Source: user follow-up instruction, 2026-10-24.
- Use npm, the recommended default stated after the package manager question remained unanswered; this is an implementation assumption, not a user-selected preference. Source: question and subsequent commentary in this session.

## Challenges

- Use a supported Node runtime without changing the existing global default. Source: installed Node version and the minimal-scope requirement.
- Confirm MDX rendering and Pages URLs through the production build. Source: the required stack and GitHub Pages base-path behavior.

## Decisions

- Target Node 24, ESM, strict Astro TypeScript, and static output. Use Astro's build rather than a standalone Node compiler output layout. Sources: [Node releases](https://nodejs.org/en/about/previous-releases), [Astro TypeScript guide](https://docs.astro.build/en/guides/typescript/), and [AGENTS.md](../../AGENTS.md).
- Use file-based MDX pages and a shared layout; defer article systems and interactive demos until there is human-authored content. Source: ownership and simplicity requirements in user instructions.
- Use Astro checking, Prettier with its Astro plugin, a build smoke test, and dependency auditing. Propose optional fast hooks in AGENTS without installing Git hooks. Sources: `node-green-field` skill, adapted to the framework and current scope, and user follow-up instruction on documentation responsibilities.
- Pin TypeScript 6.0.3 because `@astrojs/check` 0.9.12 supports TypeScript 5 and 6, whereas the current latest TypeScript is 7.0.2. Source: `npm view @astrojs/check version peerDependencies --json`, `npm view typescript version --json`, and `npm view typescript@6 version --json`.
- Validate pull requests with read-only repository access; only deploy successful builds from `main`, with deployment permissions confined to the deploy job. Source: [.github/workflows/pages.yml](../../.github/workflows/pages.yml).
- State the documentation split in both files; retain only article-related commands and examples in README, with links to developer guidance. Source: user follow-up instruction, 2026-10-24.

## Design

Create the package/runtime configuration, strict TypeScript configuration, static Astro + MDX integration, a minimal MDX home page and shared layout, formatting configuration, GitHub Actions validation/deployment, and contributor setup instructions. Check the built HTML and local assets under the Pages base. Sources: decisions above and [Astro MDX guide](https://docs.astro.build/en/guides/integrations-guide/mdx/).

Organize contributor documentation by audience: README explains article creation and preview; AGENTS explains development, setup, component implementation, validation, and deployment. Source: user follow-up instruction, 2026-10-24.

## Todo

- [x] Read instructions and inspect repository/runtime state.
- [x] Resolve package manager choice and prepare Node 24.
- [x] Add the smallest working Astro + MDX scaffold and documentation.
- [x] Add CI and GitHub Pages deployment configuration.
- [x] Run installation, static checks, formatting, build smoke test, and audit.
- [x] Review changes and update results/history.
- [x] Move implementation guidance to AGENTS and focus README on content creation.
- [x] Check formatting and review documentation links after the reorganization.

Source: implementation plan derived from the user request and the research above.

## Results

Implemented a static Astro 7.4.2 + MDX 8.1.1 project with a shared layout, minimal MDX home page, strict TypeScript configuration, pinned npm dependencies and lockfile, formatting commands, and validation/deployment workflow. Sources: [package.json](../../package.json), [Astro configuration](../../astro.config.mjs), [home page](../../src/pages/index.mdx), [layout](../../src/layouts/Page.astro), and [workflow](../../.github/workflows/pages.yml).

Node 24.22.1 was installed using the existing nvm manager; the default alias remains `22`. Sources: installation output and `/home/xhtang/.nvm/alias/default` read during final review.

Initial scaffold verification passed:

- `npm ci`: clean lockfile installation, 271 packages added.
- `npm run typecheck`: four files checked, zero errors, warnings, or hints.
- `npm run format:check`: all maintained files pass.
- `npm test`: production build generated one static page and the build smoke test passed.
- `npm run audit`: zero vulnerabilities reported.
- `git diff --check`: passed.

Sources: command outputs from this session. The smoke test first failed with missing `dist/index.html` before the scaffold existed, then passed after implementation. Source: [test/site.test.mjs](../../test/site.test.mjs) and red/green test output.

Use `nvm use`, `npm ci`, and `npm run dev`, then open `http://localhost:4321/math-pearls/`. Article authoring and preview examples are in [README.md](../../README.md); developer setup, package commands, component implementation, and deployment guidance are in [AGENTS.md](../../AGENTS.md). Sources: [package.json](../../package.json), [.nvmrc](../../.nvmrc), [Astro configuration](../../astro.config.mjs), and user follow-up instruction, 2026-10-24.

Documentation reorganization validation passed: formatting and `git diff --check`; manually reviewed local file links and the new ownership, implementation, and development-environment anchors. No application code changed. Sources: command outputs and document review in the follow-up session.

The workflow is prepared locally; it has not run on GitHub and the site has not been published. Before deployment, select GitHub Actions as the repository's Pages source. Sources: task scope, [workflow](../../.github/workflows/pages.yml), and [Astro Pages guide](https://docs.astro.build/en/guides/deploy/github/).

Reviewed all maintained Markdown read during setup and the follow-up for stale task state; finalized this document, README, and AGENTS. History remains append-only. No Git branch, index, commit, or remote mutations were performed. Source: final file review and command history in this session.

| Term  | Meaning                                                     |
| ----- | ----------------------------------------------------------- |
| Astro | Framework that builds the static site.                      |
| MDX   | Markdown supporting imported components.                    |
| Base  | URL prefix `/math-pearls` used by this GitHub project site. |
| CI    | Automated validation on GitHub Actions.                     |

Sources: [Astro documentation](https://docs.astro.build/) and [GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/).
