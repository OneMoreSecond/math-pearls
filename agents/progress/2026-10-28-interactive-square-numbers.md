Task ID: 2026-10-28-interactive-square-numbers

Add an example JavaScript component to the home page and maintain reusable components for future articles. Source: user request, 2026-10-28.

---

## Research

The home page is `src/pages/index.mdx`; the project uses static Astro pages with MDX and no UI framework. Reusable components belong in `src/components/`. Sources: `src/pages/index.mdx`, `package.json`, `astro.config.mjs`, and `AGENTS.md`.

## Constraint and Assumption

Keep the change small, use browser JavaScript, support multiple component instances, and document imports for article authors. Sources: user request and `AGENTS.md`.

## Challenges

Keep the visual square, equation, and accessible slider synchronized, including at the slider bounds. Source: this task's interaction design.

## Decisions

Use a square-number explorer to illustrate the sum of consecutive odd numbers. Package it as an Astro component with a scoped custom element and no additional dependencies. Source: implementation decision based on `AGENTS.md` and the existing stack.

## Design

Render an initial square and equation in HTML. Browser JavaScript enables a labeled range input and updates the tiles and equation. Import the component in the home page; document the same import for future articles. Source: implementation plan based on `src/pages/index.mdx` and `src/layouts/Page.astro`.

| Term           | Meaning                                                           |
| -------------- | ----------------------------------------------------------------- |
| MDX            | Article Markdown that can import components.                      |
| Square number  | The number of tiles in an n by n square, n².                      |
| Custom element | A browser element that scopes behavior to each explorer instance. |

Sources: existing MDX usage and this task's design.

## Todo

- [x] Add a regression check for the rendered example and browser script URLs.
- [x] Implement the reusable explorer and embed it in the home page.
- [x] Document reuse for authors and component location for developers.
- [x] Verify formatting, types, build, and browser interaction.

Source: task plan.

## Results

Added `src/components/SquareNumbers.astro` and imported it in `src/pages/index.mdx`. Readers can change the side length from 1 to 10, see the newest odd-numbered edge highlighted, and read the updated sum and square number. The initial 4 × 4 square remains readable without JavaScript. Source: those implementation files.

Future articles can import `SquareNumbers` and render `<SquareNumbers />`; the authoring guide includes the relative import path for an article under `src/pages/articles/`. Source: `README.md#interactive-components`.

Validation passed under Node 24.21.0: `npm run format:check`, `npm run typecheck` (no errors, warnings, or hints), and `npm test` (build and both smoke tests). The new smoke test was run before implementation and failed because the explorer was absent, then passed after implementation. Source: command outputs from this task.

A local Chromium check passed for every slider value, highlighted tile counts, dynamically generated tile styling, keyboard Home/ArrowRight/End controls, independent instances, a 320-pixel viewport without horizontal overflow, no browser errors, and the JavaScript-disabled fallback. Source: `agents/tmp/2026-10-28-interactive-square-numbers/script/browser-check.mjs` and its successful output; the mobile screenshot was also visually reviewed.

The local Playwright package expected a different cached browser revision. Selecting the available executable allowed browser validation to complete without changing dependencies. Recorded this recovery in `skills/playwright-cached-browser/SKILL.md`, as required by the user's tool-learning instructions. Sources: the browser launch error, successful retry, and user instructions.
