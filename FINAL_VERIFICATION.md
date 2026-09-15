# Final verification — 2026-09-15

## Automated results

- Type check: passed (`tsc -b`).
- Tests: 10 passed across content integrity, answer checking, mismatch diagnostics, and navigation.
- Content audit: passed; 350 unique IDs, 50 in each topic, no exact duplicate prompts, no missing help/evidence, 26 referenced molecular structures.
- Difficulty distribution: 112 introductory, 126 developing, 112 AP-style.
- Production build: passed with Vite 8.3.0; 32 modules; final JS 204.39 kB (65.63 kB gzip) and CSS 12.69 kB (3.61 kB gzip).
- GitHub Pages subpath build: passed with `GITHUB_REPOSITORY=owner/ap-chemistry`; generated assets use `/ap-chemistry/assets/...`.
- Dependency audit: 0 known vulnerabilities.
- Static privacy check: no `fetch`, `localStorage`, or `sessionStorage` usage in `src`.

## Rendered-browser checks

Checked the local app in the Codex in-app Chromium browser at the default desktop viewport and a 390×844 phone viewport.

- Dashboard identity, all nine units, Unit 2 routing, and inactive labels rendered correctly.
- Lewis practice exposed all 50 selectable records and all three unlimited help modes.
- Constructed H₂O through visible atom, bond, and lone-pair controls; the coordinate-independent checker accepted it.
- “Show 3D Model” was absent before correctness and appeared afterward; the viewer exposed rotation, zoom, reset, label/lone-pair toggles, and geometry/angle/hybridization facts.
- VSEPR lesson exposed all 13 rows and eight fields to the accessibility tree.
- At 390px there was no page-level horizontal overflow; the 940px reference table was contained in a 357px accessible scroll region.
- No browser console warnings or errors were recorded.

Physical Chromebook/tablet hardware and human screen-reader testing were not performed. Responsive browser emulation and semantic-tree inspection do not replace those optional follow-up checks.
