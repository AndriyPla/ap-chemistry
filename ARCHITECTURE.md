# Architecture and design decisions

## Stored chemistry is authoritative

`src/content` owns curriculum, questions, accepted values, molecular graphs, evidence, and model coordinates. UI code never predicts a molecule or creates an answer key. `src/lib/check.ts` performs only deterministic comparisons against those records. Numeric checks use stored tolerances; Lewis checks use graph isomorphism, so screen position, rotation, reflection, and equivalent identical-atom permutations do not matter.

Practice state is React memory only and disappears on refresh. There is no local storage, cookie, account client, analytics, or network request. A future account adapter could observe explicitly chosen user actions at the application boundary without changing lesson/question schemas, but no such adapter ships in v1.

Hash routes (`#/learn/2.5`) support direct refresh on GitHub Pages. Vite derives the subpath from `GITHUB_REPOSITORY` during Actions builds. All instructional content is bundled and usable offline after load.

## Design system

The reusable tokens live at the top of `src/styles.css`: charcoal `#1F1F1F`, gold `#C4A23A`, white, cool grays, 8px controls, restrained elevation, and system sans-serif. This records the owner’s requested default for this project; it does not claim to change preferences in other tools or sessions. Chemistry atom colors follow common conventions and every atom also has a text label.

Responsive breakpoints reorganize the course grid, lesson cards, practice header, builder palette, model facts, and controls at 800px and 520px. Native buttons, inputs, fieldsets, tables, headings, landmarks, focus rings, status regions, and reduced-motion CSS provide the accessibility baseline.

## Module boundaries

- `content/`: typed course data and verified source records
- `lib/check.ts`: pure deterministic answer/graph comparison
- `components/`: lessons, practice, builder, and viewer
- `App.tsx`: configuration-driven hash routing and dashboards
- `scripts/review-content.ts`: development-only release audit
- `test/`: integrity, checker, and critical navigation checks
