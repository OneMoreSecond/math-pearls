---
name: playwright-cached-browser
description: Recover a local Playwright browser check when the installed package expects a different browser revision from the cached executable.
---

Before retrying an executable-not-found launch, compare Playwright's requested browser revision with the available cached revisions. Retrying the unchanged launch does not resolve a cache mismatch. Source: the browser validation run that produced this skill.

For a temporary local check, an available executable can be passed through `chromium.launch({ executablePath })`. Verify that the browser actually launches and completes the interaction checks; a different revision may be incompatible. Keep machine-specific paths in temporary scripts rather than maintained project configuration. Source: the successful recovery in the same validation run.

Prefer a matching package and browser revision for repeatable automated checks. Do not add project dependencies merely to repair an unrelated local cache. Source: development decision based on that observed mismatch and the task's minimal-change constraint.
