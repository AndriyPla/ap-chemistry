# Master Build Prompt: AP Chemistry

## Instructions to the receiving agent

Build the complete web application specified below in the provided project folder. Act as a senior educational software engineer, chemistry content developer, interaction designer, and accessibility reviewer. Use specification-driven development, with stored and verified chemistry data as the source of truth.

This document consolidates the project requirements, later clarifications, implementation instructions, and GitHub Pages publishing handoff. It is self-contained. Later instructions from the project owner take precedence.

The required outcome is a working, tested application with complete instructional content and question banks, a local preview, and everything needed to publish through GitHub Pages. Do not stop at a plan, visual mockup, scaffold, small sample bank, or partial prototype. If an external dependency or unresolved content issue prevents completion, report the precise blocker and outstanding requirements honestly; do not label incomplete work finished.

Make routine implementation decisions autonomously within these requirements. Document meaningful assumptions. Ask only about material ambiguities that cannot be resolved from this specification. Do not request approval after every implementation stage.

## 1. Product identity and purpose

- Main site title: **AP Chemistry**.
- Smaller subtitle/byline: **By Andriy Plakosh**.
- Purpose: an interactive learning and practice resource for AP Chemistry students.
- Organize the site around an AP Chemistry unit dashboard.
- Fully implement all seven Unit 2 topics in the initial release.
- Design the architecture so the remaining units and additional problems can be added later.
- Present the site as an independent educational resource. Do not imply College Board sponsorship or endorsement.

This version is entirely for learning and practice. It has no sign-in, payment system, grades, performance tracking, or teacher dashboard.

## 2. Non-negotiable requirements

1. Every active topic has substantive **Learn** and **Practice** modes.
2. The initial release contains **50 distinct, verified practice problems per Unit 2 topic**, for **350 total** across seven topics.
3. Future topics throughout the website should also start with 50 verified problems unless the owner changes that requirement. Future units are not part of this release's content-writing scope.
4. Students have unlimited access to conceptual hints, exact diagnostics, and full solutions.
5. Do not track or store hint usage, scores, accuracy, attempts, mastery, completion history, or other student performance records.
6. All authoritative chemistry answers, structures, explanations, numerical values, and 3D models come from curated, stored, verified records.
7. The runtime application must not invent chemistry rules, predict unknown structures, or generate chemistry answers using AI.
8. The Lewis builder accepts chemically equivalent drawings by matching against reviewed accepted structures, independently of screen coordinates.
9. A correct Lewis answer unlocks an optional **Show 3D Model** button. The viewer supports rotation and inspection, not construction in 3D.
10. Use the owner's charcoal-and-gold visual standard and the exact title and byline.
11. The complete application must build as a static site and work on GitHub Pages under a repository subpath.
12. Prepare future account integration through clean module boundaries, while keeping accounts and progress features absent from this release.

## 3. Specification-driven development workflow

Before implementing application features:

1. Inspect the existing repository and applicable project instructions. Preserve existing relevant work and unrelated user changes.
2. Consolidate this document into `SPEC.md`, retaining every requirement and resolving conflicts in favor of the verified-data and no-tracking requirements.
3. Assign stable requirement IDs and concrete acceptance criteria.
4. Create `TASKS.md` with implementation stages and a checklist tied to those IDs.
5. Define typed schemas for units, topics, lessons, questions, accepted answers, hints, diagnostic mappings, molecular structures, 3D models, and verification evidence.
6. Record architecture decisions covering validation, content, accessibility, static hosting, and future accounts.
7. Implement in small stages, running checks that exercise the actual behavior.
8. Keep specifications and task status synchronized with completed work so another session can resume accurately.
9. Finish with a traceability audit linking each requirement to its implementation and verification evidence.

Use this implementation sequence:

1. Specification, content schemas, design tokens, application shell, and unit dashboard.
2. A complete Lewis-diagram activity using several verified examples, with all three help options and the optional rotatable 3D viewer.
3. Complete Learn and Practice modes for all seven Unit 2 topics.
4. Expand the curated banks to 50 verified questions per topic, totaling 350.
5. Chemistry review, accessibility checks, responsive browser testing, production validation, and GitHub Pages preparation.

The small example set in stage two is an implementation milestone, not the final deliverable. Continue through the full scope.

## 4. Technical architecture and hosting constraints

Recommended implementation stack:

- React and TypeScript for the application.
- Vite for development and static production builds.
- Three.js or React Three Fiber for molecular visualization.
- Maintained accessible interaction libraries where they improve reliability.
- Vitest and Testing Library for unit and integration tests.
- Playwright for browser interaction tests.

Equivalent tools are acceptable if they meet the same requirements. Check current official documentation when selecting versions and deployment configurations.

The application must:

- Run as a static website without a backend, database, API key, account, or paid service.
- Require no runtime AI service for answers, feedback, content, or molecular geometry.
- Bundle the content and assets needed for the learning activities.
- Work at a repository URL such as `https://USERNAME.github.io/ap-chemistry/`.
- Correctly resolve scripts, styles, images, data files, and model assets beneath that base path.
- Support direct navigation and refresh of activity URLs through a verified static-hosting routing strategy. Use hash routing or an appropriate tested alternative; do not rely on server-side rewrites unavailable on GitHub Pages.
- Include an automated GitHub Actions build-and-deploy workflow and a manual deployment trigger.
- Include a lockfile, a suitable `.gitignore`, and reproducible installation/build instructions.
- Keep dependency folders, secrets, private information, and local temporary files out of source control.

Separate these concerns:

- Curriculum and question data.
- Reviewed chemistry answer records and equivalence definitions.
- Current practice activity state.
- Structural comparison and answer checking.
- User interface and rendering.
- Optional browser preference/draft storage.
- Future authentication and cloud storage integration points.

Do not overbuild unused account infrastructure. Keep sensible interfaces and document how accounts could be added later.

## 5. No accounts or progress tracking in version one

Do not include:

- Login or registration screens, including placeholder login buttons.
- Student or teacher accounts.
- A progress section or dashboard.
- Scores, grades, percentages, streaks, points, badges, rankings, or mastery levels.
- Hint counts or limits.
- Attempt-count displays or stored attempt histories.
- Completion history or performance analytics.
- Payments, subscriptions, or gated assistance.

The application may hold the current answer and help-panel state in memory to make the activity work. It may remember harmless interface preferences or an unfinished draft in browser storage, but must not turn those into performance records. If draft restoration is implemented, make it easy to clear and do not store hint usage with it.

Do not embed third-party behavioral analytics. Future account support must be possible without rewriting the lessons or practice tools.

## 6. Visual design and owner's default standard

Visual reference: <https://valkyrie-robotics.com/>.

The owner has requested that this site's color scheme be the default for websites created for them unless they explicitly request another style. Record that preference in reusable project design documentation. Do not claim that a project file automatically changes preferences in unrelated tools or sessions.

The following palette was observed on the reference site:

| Role | Color |
| --- | --- |
| Main charcoal background | `#1F1F1F` |
| Primary gold accent | `#C4A23A` |
| Heading text | `#FFFFFF` |
| Main light text | `#F3F4F6` |
| Secondary text | `#D1D5DB` |
| Additional light UI gray | `#E5E7EB` |

Design characteristics:

- Dark charcoal backgrounds and gold primary actions/selected states.
- Bold white headings with cool gray explanatory text.
- Clean system sans-serif typography.
- Moderate rounded corners, approximately 6–8 pixels for ordinary controls.
- Subtle borders, shadows, and surface elevation.
- Spacious, focused layouts with clear navigation and little clutter.
- A professional high-school STEM appearance.

Create reusable CSS design tokens. Adapt the reference's visual language to an educational application; do not copy its robotics logo, photographs, marketing content, or page layout.

Use conventional, labeled chemistry colors for atoms where needed. These may differ from the interface palette. Maintain contrast and never make color the sole means of identification.

The title **AP Chemistry** must be prominent, with **By Andriy Plakosh** visibly smaller.

## 7. Information architecture

### Main dashboard

- Display all nine AP Chemistry units, using current official unit names.
- Unit 2 is active and fully implemented.
- Units 1 and 3–9 are clearly labeled **Coming later**.
- Do not route students to misleading empty lessons or practice screens.
- Drive navigation from unit/topic configuration so future units can be activated without redesigning the dashboard.

### Unit 2 dashboard

Implement these seven topics, verifying current official naming and alignment before authoring:

1. Types of Chemical Bonds.
2. Intramolecular Force and Potential Energy.
3. Structure of Ionic Solids.
4. Structure of Metals and Alloys.
5. Lewis Diagrams.
6. Resonance and Formal Charge.
7. VSEPR and Bond Hybridization.

Use topic cards or expandable topic groups/dropdowns with obvious **Learn** and **Practice** actions. Students must be able to reach the related lesson from practice and return to the unit dashboard easily. Avoid unexpected loss of current work during ordinary navigation.

## 8. Learn mode requirements

Every topic needs a substantive, original lesson containing:

- Learning objectives.
- Essential vocabulary.
- Clear explanations in student-friendly language.
- Worked examples with reasoning.
- Diagrams or interactive illustrations where useful.
- Common misconceptions.
- AP-style reasoning guidance.
- A concise summary.
- A direct route to the matching practice activity.

Use readable sections, tabs, accordions, or guided demonstrations instead of large walls of text. Provide contextual help within practice. Teach reasoning as well as vocabulary.

### 8.1 Types of Chemical Bonds

Teach ionic, metallic, nonpolar covalent, and polar covalent bonding; electronegativity and electron distribution; particle-level representations; and connections to observable properties. Present electronegativity differences as a continuum rather than treating an arbitrary cutoff as an infallible rule.

### 8.2 Intramolecular Force and Potential Energy

Teach attraction and repulsion, potential-energy-versus-distance curves, equilibrium distance/bond length, bond energy, and how atomic properties affect these relationships. Include graph interpretation and particle-level explanations.

### 8.3 Structure of Ionic Solids

Teach ionic lattices, formula units, charge ratios, electrostatic attraction, particle-level arrangements, brittleness, melting behavior, and conductivity in solid, molten, and aqueous states. Include coordination concepts only to the extent appropriate to the current framework.

### 8.4 Structure of Metals and Alloys

Teach metallic bonding, delocalized valence electrons, conductivity, malleability, ductility, substitutional alloys, interstitial alloys, and structure-property relationships using particle diagrams.

### 8.5 Lewis Diagrams

Teach valence-electron counting, central-atom selection, skeletal connectivity, single bonds, lone pairs, terminal-atom octets, the central atom's electron arrangement, multiple bonds, formal charge, ion brackets and overall charge, and the limits of Lewis diagrams.

Cover expanded octets, incomplete octets, and odd-electron examples to the extent appropriate to AP Chemistry. Verify scope rather than introducing advanced cases solely to increase question count. Clearly identify supplementary content if included.

### 8.6 Resonance and Formal Charge

Teach formal-charge calculations, comparing candidate structures, resonance contributors, delocalization, equivalent bonds, and relative contributor importance where appropriate. Explain that resonance is not a molecule switching back and forth between drawings.

### 8.7 VSEPR and Bond Hybridization

Teach electron domains, bonding domains, central-atom lone pairs, electron-domain geometry, molecular geometry, ideal/approximate bond angles, and AP-scope hybridization. Explain that a multiple bond counts as one domain, distinguish molecular geometry from electron geometry, and connect Lewis diagrams to spatial structure.

Include a comprehensive reference chart with all requested fields:

- Electron domains.
- Bonding domains.
- Central-atom lone pairs.
- Electron-domain geometry.
- Molecular geometry.
- Ideal or approximate bond angles.
- Hybridization.
- Example molecules or ions.

Cover the required geometries, including linear, trigonal planar, bent, tetrahedral, trigonal pyramidal, trigonal bipyramidal, seesaw, T-shaped, octahedral, square pyramidal, and square planar, plus any additional geometry called for by the verified current framework.

Verify the framework's limits on hybridization, especially for expanded-octet species. Keep the requested chart column, but mark a field as not assessed/not applicable where supported by the curriculum and sources instead of inventing or requiring an unsupported assignment. Distinguish electron-domain arrangements from molecular shapes.

## 9. Question banks: 50 per topic, 350 total

Author exactly 50 original, substantive practice problems for each of the seven Unit 2 topics in the initial release.

Each bank must:

- Cover the topic's major learning objectives.
- Include introductory, developing, and AP-style difficulty.
- Use suitable representations and question formats.
- Avoid near-duplicate wording changes or shuffled options counted as new problems.
- Use original content rather than copied commercial or official exam questions.
- Avoid claiming that original questions are official AP exam questions.
- Be separately stored in typed content files, not embedded in UI components.
- Support adding more records without modifying the practice engine.

Each question must include:

- Stable unique ID, unit, topic, concept tags, representation type, and difficulty.
- Prompt, structured input definition, and referenced assets.
- Reviewed accepted answer definitions and relevant equivalence rules.
- Conceptual hints, exact-diagnostic mappings or rubric, and full worked solution.
- Links to the appropriate lesson sections.
- Content verification evidence and status.

Use a configurable expected-count manifest: it must assert 50 per topic and 350 total for this release, and be straightforward to update when the owner intentionally expands the banks.

## 10. Verified chemistry records are the source of truth

This section overrides any implementation choice that would otherwise infer or generate authoritative chemistry answers at runtime.

### 10.1 Store complete reviewed answers

Every problem must reference a curated, stored answer record. For molecules and ions, store every applicable field:

- Formula, composition, and atom counts.
- Total valence electrons.
- Central atom or identified local centers for multicenter structures.
- Connectivity and bond orders.
- Lone pairs and unpaired electrons.
- Formal charge on each atom and overall charge.
- Reviewed accepted structures and resonance contributors.
- Electron-domain counts and bonding/lone-pair counts.
- Electron geometry and molecular geometry at relevant centers.
- Bond angles with idealized/approximate labels and source context.
- AP-appropriate hybridization or an explicitly justified unavailable/not-applicable value.
- Any octet exception and its explanation.
- Predefined, verified 3D model coordinates and associated labels.
- Worked explanations, conceptual hints, and diagnostic text.
- Why the expected representation is preferred when relevant.

For numerical questions, store verified expected values, units, worked calculation steps, rounding rules, and accepted tolerances. For graph questions, store reviewed curve datasets or points, labels, reference features, correct selections, and explanations.

Do not compute the authoritative answer at runtime using a newly invented formula, chemistry heuristic, molecule predictor, optimization model, or AI response. The authoritative answer must already exist in reviewed data.

### 10.2 Allowed software operations

Ordinary deterministic software operations are allowed, including:

- Reading and counting student-placed items.
- Comparing a submitted value with a stored value and tolerance.
- Matching a submitted molecular graph against approved graphs.
- Handling identical-atom permutations and approved equivalences.
- Rendering a stored diagram or curve.
- Moving a marker along a reviewed graph dataset.
- Rotating, scaling, and projecting stored model coordinates for display.

These operations compare or display known information. They must not invent new chemical ground truth.

### 10.3 Verification before release

For every answer record, document:

- Supporting authoritative reference URLs and the relevant section, table, or page.
- Verification method and what was checked.
- Review status and date.
- Any ambiguity, modeling convention, or known limitation.
- Whether the review was performed by the development agent or a human teacher; never imply human review when none occurred.

Authoring a record does not verify it. Passing a schema test does not establish chemical correctness. Check source support and independently check internal consistency during development. Development-time calculations may check stored data, but the student-facing answer key remains the reviewed record.

Only verified records belong in the released student question bank. Resolve missing or uncertain data before release; never fill gaps with guesses. A teacher review may be recommended, but it is not a substitute for completing the required source checks. Report unresolved records honestly and keep the corresponding acceptance criteria incomplete.

Do not describe a heuristic as a universal chemistry validator. This application validates the curated supported problem set against explicit accepted answers.

## 11. Practice experience

Students can:

- Choose a topic and start immediately.
- Receive a problem from its curated bank.
- Retry without penalty.
- Reset an interactive workspace.
- Request another problem or browse/select a specific problem for classroom use.
- Use unlimited help or reveal the answer.
- Open the related lesson and return to practice.

Random selection must avoid immediately repeating the same problem when alternatives are available. This requires only temporary session selection state, not a stored performance history.

Use encouraging, neutral wording such as **Take another look**. Do not show failure labels, scores, accuracy percentages, or completion rewards.

For free-response reasoning, use reviewed rubrics and worked examples. If reliable deterministic automatic evaluation is not possible, clearly identify the activity as self-check practice; do not pretend to understand or diagnose unrestricted prose using keyword guesses. Prefer structured inputs when automatic diagnostic feedback is needed.

## 12. Unlimited three-level help

Provide three clearly labeled assistance options that can be opened repeatedly without counters, penalties, payments, or attempt requirements:

1. **Hint: Help me think**.
2. **Explain what is wrong**.
3. **Show complete solution**.

An incorrect check should initially give supportive conceptual guidance without revealing the precise error. More specific information is available when requested. Students may select any help level directly; do not force repeated incorrect submissions to unlock it.

### Level 1: Conceptual reasoning

Guide the student toward the relevant principle without naming the specific wrong atom, bond, cell, or choice.

Examples of the intended style:

- “Compare the electrons in your diagram with the total number of valence electrons available.”
- “Consider electronegativity when choosing which atom belongs at the center.”
- “Consider how changing a bond order would affect octets and formal charges.”
- “Count regions of electron density around the central atom; a multiple bond counts as one region.”

For bond-placement problems, use electronegativity, octets, and formal-charge reasoning only when appropriate to the reviewed example. Do not invent a universal rule about which atom must receive a double bond.

### Level 2: Exact diagnostic

On request, identify the actual mismatch in the current structured answer using reviewed diagnostic mappings. Examples include a missing lone pair, incorrect bond order, incorrect electron count, wrong charge, incorrect central connectivity, or incorrect geometry.

Compare against all approved accepted answers before reporting a mistake. A diagram may differ from the displayed example and still be valid.

If a mismatch cannot be diagnosed reliably, provide a general reviewed hint and offer the solution. Do not fabricate a chemical explanation. Recompute the comparison when the student edits their work so feedback does not refer to an obsolete answer.

### Level 3: Complete worked solution

Show the full reviewed answer, required calculations, explanatory steps, relevant principles, and alternative accepted forms where applicable. Students may reset and reconstruct it or move on.

Revealing a solution must not be recorded as independent success. In the Lewis builder, the practice 3D button becomes available after a correct student submission; the student can reconstruct and submit the displayed answer without penalty. Standalone 3D examples in Learn mode or VSEPR questions may be shown as instructional content without this gate.

## 13. Topic-specific practice formats

Use interactions suited to the learning objective rather than making all 350 questions multiple choice.

| Topic | Required practice coverage |
| --- | --- |
| Types of Chemical Bonds | Bond classification, electron distribution, electronegativity comparisons, particle-diagram sorting/matching, property comparisons, structured AP-style reasoning. |
| Intramolecular Force and Potential Energy | Interactive reviewed curves, equilibrium distance and bond energy, curve comparisons, attraction/repulsion, strength/length relationships, quantitative and qualitative graph interpretation. |
| Structure of Ionic Solids | Lattice and particle diagrams, formula units, charge ratios, structure-property relationships, conductivity and melting scenarios, diagram explanations. |
| Structure of Metals and Alloys | Metallic-bonding diagrams, substitutional/interstitial identification, composition and property reasoning, conductivity and malleability, particle-diagram sorting. |
| Lewis Diagrams | The interactive builder for most questions, supplemented by reviewed comparison/reasoning problems where useful. |
| Resonance and Formal Charge | Formal-charge calculations, candidate comparisons, construction of contributors, equivalent structures, delocalization and equivalent bonds. |
| VSEPR and Bond Hybridization | Missing chart entries, shape matching, Lewis-to-geometry reasoning, domains/lone pairs/angles/hybridization, electron-versus-molecular geometry, model inspection. |

Graph interactions must use stored reviewed data. Do not generate supposedly authoritative physical behavior from an ad hoc runtime model.

## 14. Interactive 2D Lewis-diagram builder

### Prompt and tool palette

Show the formula, overall charge where applicable, and a concise task. Supply only the required atom types and quantities for the problem. For example, an H2O problem provides two hydrogen atoms and one oxygen atom.

Provide:

- Atom tools with remaining inventory visible.
- Individual electron dots and lone-pair tools.
- Single, double, and triple bonds.
- Brackets and overall-charge controls when applicable.
- Formal-charge entry or annotation where required by the task.
- Select, delete, undo, redo, reset, and check-answer controls.

The atom inventory is a construction aid. Do not use electron inventory limits to silently solve electron-count reasoning for the student. Explain clearly how bond lines represent shared electrons so the interface does not double-count line bonds and electron dots.

### Construction behavior

Students can drag atoms onto the workspace, move them, connect them, change bond order, and add/move/remove electrons and lone pairs. Bonds must attach to atoms and remain connected as atoms move. Support brackets and ionic charge.

Allow students to edit before and after checking. Provide clear selection states, usable snapping, readable atom labels, and protection from accidental destructive resets or navigation.

Support mouse and touch input. Every drag action must have a click-to-place or keyboard alternative. For example, select an atom in the palette and place it, select two atoms and choose a bond, or select an atom and add a lone pair through controls.

### Answer representation and comparison

Represent the student's work as a molecular graph: atoms with attributes connected by bonds, plus electron and charge annotations. Do not compare screenshots or exact coordinates.

Compare against approved answer records for:

- Element identities and atom counts.
- Connectivity and bond orders.
- Lone pairs and unpaired electrons.
- Total electrons.
- Formal and overall charges where required.
- Reviewed octet/duet expectations and exceptions.
- Accepted resonance contributors and equivalent arrangements.

Accept rotations, reflections, spacing differences, and permutations of equivalent identical atoms where they represent the same approved graph. Do not accidentally accept a different connectivity pattern merely because the atom and bond counts match.

Any equivalence beyond graph identity must be explicitly reviewed and stored. Do not require every resonance contributor unless the individual problem specifically asks for that.

## 15. Optional rotatable 3D molecular viewer

After the student submits a correct Lewis diagram, reveal **Show 3D Model**. Do not automatically open an interrupting modal or change pages.

The viewer opens within the site and supports:

- Mouse-drag and touch-swipe rotation.
- Zoom in/out and reset camera.
- Labeled atoms and a consistent color legend.
- Clear representation of bonds and bond orders.
- Molecular-geometry and electron-geometry information.
- Ideal or approximate angle information.
- AP-appropriate hybridization information where applicable.
- Label toggles.
- Lone-pair visualization toggles where useful.
- Accessible rotation/zoom controls and a way to close the viewer.

Students inspect a reviewed model; they do not build or receive a grade for positioning atoms in 3D.

Load the predefined, verified coordinates and metadata for the accepted answer. Do not infer physical geometry, angles, or hybridization from the student's 2D placement. Explain idealizations in reviewed model descriptions. For resonance, use a reviewed depiction and explanation that does not falsely imply literal switching between contributors.

For multicenter molecules, identify the relevant center and its local geometry rather than assigning one misleading geometry to the whole molecule.

Fit the model within the available view, prevent clipping, respect reduced-motion preferences, and avoid unnecessary auto-rotation. Dispose of rendering resources when models or pages change.

If WebGL is unavailable, provide a reviewed labeled static diagram and the same explanatory chemistry information. The lesson and practice controls must remain usable.

## 16. VSEPR reference chart and practice

Include all eight requested chart fields in Learn and Practice:

1. Electron domains.
2. Bonding domains.
3. Central-atom lone pairs.
4. Electron-domain geometry.
5. Molecular geometry.
6. Bond angles.
7. Hybridization.
8. Example molecules or ions.

Support a mix of:

- Completing one or multiple missing chart cells.
- Matching names and diagrams.
- Matching examples to geometries.
- Deriving geometry from bonding domains and lone pairs.
- Identifying AP-scope hybridization.
- Inspecting a rotatable example and completing its information.
- Comparing electron geometry with molecular geometry.

Cover cases sharing an electron geometry but having different molecular geometries. Store accepted spelling/synonym variants and formatting tolerances explicitly. Use reviewed values for angles; distinguish idealized arrangements, approximate molecular values, and qualitative comparisons where appropriate.

Use the same unlimited help system. Chart completion is practice, not a scored assessment.

## 17. Chemistry coverage and source review

Align to the current official AP Chemistry Unit 2 framework. Consult the official Course and Exam Description and suitable authoritative chemistry references before finalizing scope and records.

Starting references:

- AP Chemistry course overview: <https://apstudents.collegeboard.org/courses/ap-chemistry>.
- Official Course and Exam Description: <https://apcentral.collegeboard.org/media/pdf/ap-chemistry-course-and-exam-description.pdf>.

Verify current versions and exact relevant sections. Do not assume every topic detail in an old textbook remains an AP exam requirement. Record source evidence in repository documentation and answer records.

Cover neutral molecules, polyatomic ions, multiple bonds, formal charge, resonance, expanded octets, incomplete octets, and appropriate odd-electron cases. Do not inflate the question bank with inappropriate advanced species.

Add meaningful review and test cases for equivalent terminal atoms, resonance alternatives, polyatomic ions, charge placement, octet exceptions, multiple bonds, bent geometries with different domain counts, and trigonal-bipyramidal and octahedral derivatives.

Store verified data consistently across lessons, answer keys, diagnostics, charts, and 3D models. A correct answer in one area must not contradict another area.

## 18. Accessibility and responsive design

Target WCAG 2.2 AA where applicable and verify the relevant current guidance.

Include semantic headings/landmarks, full keyboard navigation, visible focus, useful labels, appropriate contrast, status announcements for answer checks, text alternatives, and reduced-motion support.

No essential chemistry information may be available only through color, drag-and-drop, a canvas, or a 3D view. Provide accessible structured representations and alternatives.

Test classroom laptops, Chromebooks, tablets, and phones. Desktop and tablet are the primary targets, but core lessons and practice must remain accessible on phones.

On narrow screens:

- Convert the builder sidebar into a usable tray, drawer, or compact palette.
- Keep controls and touch targets comfortably usable.
- Preserve access to Check, Hint, Explain, Show Solution, Undo, and Reset.
- Keep the workspace usable without microscopic labels.
- Avoid horizontal page overflow.
- Fit the 3D view to available width while retaining accessible controls.
- Present wide charts through an accessible responsive layout or clearly contained scrolling.

Verify at representative phone, tablet, small-laptop, and desktop widths, including keyboard-only critical workflows.

## 19. Performance and resilience

- Lazy-load 3D rendering code and substantial topic assets.
- Keep the dashboard lightweight and question data modular.
- Keep ordinary interactions responsive on typical school-issued devices.
- Show useful loading, empty, and error states.
- Preserve usable lesson content when rendering fails.
- Once the relevant activity's content/assets have loaded, ordinary checks and help must not depend on network access.
- Do not require runtime API calls for answers, hints, or models.
- Avoid unnecessary animation and resource leaks.

## 20. Development-only content review tools

Provide a script or development-only page to inspect:

- Question counts and unique IDs.
- Topic, concept, and difficulty distributions.
- Missing fields, invalid references, and duplicate prompts.
- Near-duplicate prompts flagged for manual review.
- Molecule metadata and accepted graph definitions.
- Numerical answers, units, and tolerances.
- All hint levels and worked solutions.
- Verification evidence and review status.

Keep this out of ordinary student navigation. It must help review content, not fabricate approval statuses.

Document how to add a lesson, question, accepted resonance form, graph dataset, molecular model, and future unit. Adding records should not require changing the practice engine.

## 21. Testing and evidence

Run meaningful automated checks, and use manual/browser inspection for behavior that requires it. Do not rely on tests that merely repeat the same possibly incorrect answer-generation logic.

### Content integrity

- Exactly 50 questions for every active Unit 2 topic and 350 total initially.
- Unique IDs and valid schemas.
- Required fields and valid lesson/asset/model references.
- No empty or malformed active banks.
- Verified status backed by actual evidence, not just a boolean.
- All accepted answers, hints, and models consistent with the approved source record.

### Answer checking

- Known correct and deliberately incorrect examples.
- Coordinate-independent graph acceptance.
- Equivalent identical-atom arrangements.
- Reviewed resonance alternatives.
- Rejection of wrong connectivity despite matching counts.
- Electron and charge mismatches.
- Reviewed octet exceptions.
- Numerical unit and tolerance handling.
- VSEPR accepted terms and angle conventions.
- Updated diagnostics after edits.

### User workflows

- Unit/topic navigation and Learn/Practice switching.
- Random selection without immediate repeats.
- Browsing/selecting a specific problem.
- All three help options accessible repeatedly without limits.
- No scores, performance records, or hint-count storage.
- Atom placement, bonds, electrons, charges, delete, undo, redo, and reset.
- Mouse, touch, and keyboard alternatives.
- Lewis practice 3D button hidden until a correct current submission; editing that answer invalidates stale correctness.
- Viewer opening, rotation, zoom, reset, labels, and fallback.
- Responsive layouts, focus behavior, and accessible feedback.
- Production assets, direct navigation, and refresh under the GitHub Pages subpath.

Run type checks, linting, unit/integration tests, essential end-to-end tests, and a production build. Fix failures. Report what actually ran and what it established; do not claim a live deployment or device test that was not performed.

## 22. Repository deliverables

Deliver:

- Complete application source and assets.
- `SPEC.md` with acceptance criteria.
- `TASKS.md` with accurate implementation status.
- `README.md` with setup, local development, preview, testing, and publishing instructions.
- Architecture and design-token documentation, including the owner's palette preference.
- Typed content schemas and all 350 verified questions.
- Reviewed molecule, graph, answer, hint, and 3D definitions.
- Content-authoring guide and development review tools.
- Chemistry-verification checklist and source documentation.
- Automated tests and final traceability audit.
- Reproducible dependency manifest and lockfile.
- GitHub Actions Pages workflow with automatic and manual triggers.
- A suitable `.gitignore`.
- Dependency/content attribution where needed.
- A license choice clearly left to the owner unless a license has already been specified; do not grant rights on the owner's behalf without authorization.

## 23. GitHub Pages preparation and publishing

GitHub is the required repository and GitHub Pages is the requested hosting destination. Do not substitute a different host.

Prepare publishing as part of development. The owner will provide the repository URL and the instruction to upload/publish when ready. Do not create a repository, push code, or publish externally without that direction. If it is already provided with this task, proceed within that authorization without asking again.

### Deployment preparation

1. Configure the actual repository base path, or a documented configurable value until the repository name is known.
2. Verify all asset paths and navigation beneath that path.
3. Create a workflow that installs locked dependencies, performs the required checks, builds the static app, uploads the build artifact, and deploys it to GitHub Pages using current supported actions and required permissions.
4. Support pushes to the configured publishing branch and a manual `workflow_dispatch` trigger.
5. Keep the production entry file at the root of the deployed artifact.
6. Document how to enable GitHub Actions as the Pages publishing source.
7. Do not put secrets into client code, workflow text, or the repository.

Consult current official instructions rather than relying on stale action versions:

- GitHub Pages creation: <https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site>.
- Publishing source: <https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>.
- Custom workflows: <https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages>.
- Vite static deployment: <https://vite.dev/guide/static-deploy>.

### Owner-facing publishing instructions to include in README

1. Create a GitHub repository, for example `ap-chemistry`. Explain that a public repository supports the usual GitHub Free Pages setup, and verify current plan requirements if a private repository is requested.
2. Provide its URL to the coding agent and authorize uploading/publishing.
3. Upload the complete source repository, including content, tests, documentation, lockfile, and workflow, while excluding dependency folders and secrets.
4. In GitHub, open **Settings > Pages**.
5. Under **Build and deployment**, choose **GitHub Actions** as the source.
6. Open **Actions** and run the deployment if it has not already started.
7. After a successful run, obtain the published URL from the deployment or Pages settings.
8. Explain that subsequent pushes to the configured branch update the same site URL through the workflow.

The usual project-site address is `https://USERNAME.github.io/REPOSITORY-NAME/`. Do not present placeholder text as a working link.

### When the owner authorizes publishing

- Confirm the exact target repository and branch from the provided context.
- Configure the correct base path.
- Commit and push the completed source and deployment configuration.
- Enable Pages through authorized tools if available, or give the owner the exact remaining UI steps.
- Run the deployment, inspect failures, and fix in-scope issues.
- Verify the live dashboard, topic routes, a Lewis-builder workflow, and the 3D viewer.
- Return the actual working public URL and deployment result.

If repository access or a user-controlled setting blocks publishing, clearly distinguish a locally completed app from an externally published site and name the remaining action.

## 24. Definition of done

The local implementation is complete only when:

- All seven Unit 2 topics have complete Learn and Practice modes.
- Each has exactly 50 verified problems, totaling 350.
- Future units appear accurately as coming later.
- Verified stored records supply every authoritative chemistry answer and model.
- The Lewis builder provides the complete construction/editing/checking workflow and accessible alternatives.
- Correctness is independent of drawing coordinates and accepts approved equivalent structures.
- All three help options are unlimited, available on demand, and untracked.
- A correct submitted Lewis diagram unlocks the optional rotatable 3D viewer.
- The VSEPR chart contains all specified fields with accurate AP-scope treatment.
- The title, byline, and charcoal/gold design are implemented.
- No accounts, payments, scoring, progress dashboard, or performance tracking appear.
- Browser and accessibility checks cover critical workflows.
- Production builds and required automated tests pass.
- GitHub Pages subpath behavior is verified and the workflow is ready.
- Documentation, verification evidence, and the requirements audit are complete.

External publication is complete only after an authorized deployment succeeds and the live site has been checked. Local readiness must not be reported as live publication.

## 25. Final handoff response

At completion, provide a concise, plain-language summary containing:

1. What was built and how to open the working local preview.
2. Key architecture decisions, especially stored answer records and structural comparison.
3. Confirmation of the question count by topic.
4. Actual test/build results and visual/browser checks performed.
5. Chemistry verification evidence, review limitations, and any remaining teacher review items, clearly distinguishing optional review from unresolved required verification.
6. Links or paths to the specification, content guide, verification report, and README.
7. Exact GitHub publishing steps if publication is awaiting authorization or access.
8. The actual public link and deployment verification if publication was authorized and completed.

Continue through all authorized implementation work. Keep the final report accurate, concise, and useful to an educator who does not need to know the implementation internals.
