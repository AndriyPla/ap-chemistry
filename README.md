# AP Chemistry

Interactive Unit 2 learning and practice by AP. This is an independent educational resource, not affiliated with or endorsed by the College Board.

## Open the local app

Install Node.js 22.12 or newer, then run:

```powershell
npm ci
npm run dev
```

Open the address printed in the terminal (normally `http://localhost:5173`). For a production preview, run `npm run build` followed by `npm run preview`.

## Verify the release

```powershell
npm run lint
npm test
npm run review:content
npm run build
```

The app is entirely static. It includes 50 practice records for each of Unit 2’s seven topics (350 total), bundled lessons and answer records, a coordinate-independent Lewis graph checker, and stored-coordinate 3D inspection. It does not use accounts, scores, analytics, browser storage, runtime AI, API keys, or a backend.

Documentation: `SPEC.md`, `ARCHITECTURE.md`, `CONTENT_AUTHORING.md`, `CHEMISTRY_VERIFICATION.md`, `TRACEABILITY.md`, and `TASKS.md`. No license has been granted; license selection remains with the owner.

## Publish with GitHub Pages

Publication has not been performed because no target repository was provided. To publish:

1. Create a GitHub repository such as `ap-chemistry`. A public repository supports the usual GitHub Free Pages setup; private Pages availability depends on the GitHub plan.
2. Provide the exact repository URL and authorize upload/publishing.
3. Commit and push the complete source, lockfile, documentation, tests, and `.github/workflows/deploy.yml` to `main`. Do not include `node_modules`, `dist`, secrets, or local files.
4. In GitHub, open **Settings → Pages**. Under **Build and deployment**, select **GitHub Actions**.
5. Open **Actions** and run **Build, test, and deploy to GitHub Pages** if the push did not start it automatically.
6. After success, copy the actual URL from the deployment or Pages settings. Later pushes to `main` update the same site.

The workflow derives Vite’s base from `GITHUB_REPOSITORY`, so a project site builds under `/<repository-name>/`. Hash navigation keeps lesson and practice URLs refresh-safe without server rewrites.
