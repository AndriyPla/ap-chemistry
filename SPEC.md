# AP Chemistry v1 Specification

This specification distills `AP_Chemistry_Master_Build_Prompt.md`. In conflicts, stored reviewed chemistry, no performance tracking, accessibility, and static hosting take precedence.

## Requirements and acceptance criteria

- **REQ-01 Product.** Show “AP Chemistry” and smaller “By Andriy Plakosh”; present an independent resource with no endorsement claim. **Accept:** visible on every route with footer disclaimer.
- **REQ-02 Course map.** Show all nine current AP Chemistry units; only Unit 2 is active and all others say “Coming later.” **Accept:** inactive cards have no empty route.
- **REQ-03 Unit 2 curriculum.** Topics 2.1–2.7 use current CED names and each has substantive objectives, vocabulary, explanations, example, misconceptions, AP reasoning, summary, and practice link. **Accept:** all seven lesson routes render these elements.
- **REQ-04 Practice volume.** Exactly 50 unique records per active topic and 350 total, with stable IDs, difficulty, representation, concepts, accepted answer, hints, diagnostic, solution, lesson link, and evidence. **Accept:** expected-count manifest and content audit pass.
- **REQ-05 Help without penalty.** Hint, concept explanation, and full solution are unlimited and do not affect a score. **Accept:** each question exposes all three repeatedly; no attempt or hint counter exists.
- **REQ-06 Privacy.** No accounts, payments, grades, scores, streaks, mastery, analytics, or persisted performance. **Accept:** no storage or network API is used by practice code.
- **REQ-07 Reviewed ground truth.** Student-facing chemistry comes from typed, bundled records. Runtime code may compare or display but must not infer new chemistry. **Accept:** every active answer includes source-check metadata; structures and coordinates are data records.
- **REQ-08 Practice engine.** Allow immediate start, retry, reset, random non-repeat, previous/next, direct problem selection, lesson access, and return navigation. **Accept:** controls work without a backend.
- **REQ-09 Answer checking.** Choice/text/numeric answers use stored accepted values/tolerances. Lewis answers compare molecular graphs, independent of coordinates, while respecting elements, connectivity, bond order, lone pairs, unpaired electrons, formal and overall charge. **Accept:** correct permutation passes; wrong connectivity/electrons/charge fail.
- **REQ-10 Lewis builder.** Provide only required atoms; click placement and pointer dragging; select, single/double/triple bond, lone pairs, single electrons, formal and overall charges, delete, undo, redo, reset, and check. **Accept:** controls are keyboard reachable and feedback is announced.
- **REQ-11 3D inspection.** Correct Lewis submission alone reveals optional “Show 3D Model”; editing invalidates it. Stored coordinates drive a rotatable, zoomable labeled model with reset, lone-pair toggle, geometry, angles, and hybridization. **Accept:** gated control and explanatory text are present.
- **REQ-12 VSEPR.** Include eight requested fields and required shapes; mark expanded-octet hybridization “not assessed.” **Accept:** complete 13-row responsive table plus chart practice.
- **REQ-13 Design.** Use charcoal `#1F1F1F`, gold `#C4A23A`, white headings, cool-gray text, system sans-serif, moderate radii, responsive focused layouts. **Accept:** reusable CSS variables and phone/tablet/desktop breakpoints.
- **REQ-14 Accessibility.** Target WCAG 2.2 AA: landmarks, heading order, labels, keyboard controls, visible focus, status announcements, reduced motion, and text alternatives to visual chemistry. **Accept:** critical controls are native elements and no essential answer exists only in canvas/color/3D.
- **REQ-15 Static resilience.** Bundle all content; use hash routes; configure a repository-derived Vite base; provide useful fallback text. **Accept:** production build has a root `index.html` and no runtime API dependency.
- **REQ-16 GitHub Pages.** Locked install, build/test workflow on main and manual dispatch using supported Pages actions. **Accept:** workflow uploads `dist` and deploy job has Pages permissions.
- **REQ-17 Documentation.** README, architecture/design, authoring guide, verification report, tasks, and traceability audit are current. **Accept:** files exist and describe what was actually checked.
- **REQ-18 Extensibility.** Curriculum, answer records, state, comparison, and UI remain separate; no speculative account implementation. **Accept:** new topic records plug into configuration and the common engine.

## Explicit non-goals

Accounts, teacher dashboards, assignments, scores, progress, payments, external analytics, runtime AI, and publication without a repository URL/authorization are excluded.

## Release manifest

`src/content/config.ts` is authoritative for expected counts: 50 each for Topics 2.1–2.7, 350 total.
