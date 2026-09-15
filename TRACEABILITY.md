# Requirement traceability audit

| Requirement | Implementation | Verification |
|---|---|---|
| REQ-01–03 | `App.tsx`, `config.ts`, `lessons.ts`, `LessonView.tsx` | navigation integration test; manual route review |
| REQ-04 | `banks/bank21.ts` … `bank27.ts`, `questions.ts` | content audit and count test: 50 × 7 = 350 |
| REQ-05–06 | `PracticeView.tsx` | UI inspection; no storage/network code; integration test checks no score/login |
| REQ-07 | `types.ts`, `structures.ts`, all bank seeds | evidence audit and structure integrity test |
| REQ-08 | `PracticeView.tsx` | direct select, previous/next, random non-repeat, reset/retry controls |
| REQ-09 | `lib/check.ts` | correct permutation and deliberate connectivity/electron/charge failures |
| REQ-10 | `LewisBuilder.tsx` | semantic controls, pointer + click placement, graph checking |
| REQ-11 | `ModelViewer.tsx`, stored coordinates | correct-only gate and stale-state invalidation in builder logic |
| REQ-12 | `vseprRows`, Topic 2.7 lesson/bank | complete 8-column/13-row table and 50 chart records |
| REQ-13–14 | `styles.css`, semantic components | responsive source review, keyboard-native controls, live status, reduced motion |
| REQ-15–16 | hash routing, `vite.config.ts`, workflow | production build; workflow matches current GitHub/Vite guidance |
| REQ-17–18 | repository documentation and module layout | file audit |
