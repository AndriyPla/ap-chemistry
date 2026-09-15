# Content authoring guide

1. Add a unit/topic entry in `src/content/config.ts`; inactive units remain non-routable.
2. Add a `Lesson` in `src/content/lessons.ts` with objectives, vocabulary, section IDs, worked example, misconceptions, AP guidance, and summary.
3. Add exactly the intended number of `Seed` records in a topic file under `src/content/banks`. Each becomes a fully typed question with a stable topic-prefixed ID. Keep prompts genuinely distinct; do not count option shuffles.
4. Store accepted values—not a rule for inventing them—in each question. Numeric records require value, unit, and tolerance. Update `expectedCounts` only for an intentional bank-size change.
5. For a molecule or ion, add a reviewed `MolecularStructure` in `structures.ts`: composition through explicit atoms, valence total, connectivity/bond orders, lone pairs, unpaired electrons, formal/overall charge, geometries, angles, AP-scope hybridization, exception, explanation, coordinates, and evidence.
6. Add explicitly reviewed resonance/equivalence records. The matcher automatically handles identical-atom permutations but does not infer unrelated tautomers or connectivity.
7. Graph questions should store reviewed points/features in a future typed data module and reference them from questions; do not calculate authoritative curves at runtime.
8. Run `npm run review:content`, `npm test`, and `npm run build`. Review every new record against its cited source; schema validity alone is not chemistry verification.

The release audit is intentionally outside student navigation and reports counts, distributions, models, duplicate prompts, missing help, and missing evidence.
