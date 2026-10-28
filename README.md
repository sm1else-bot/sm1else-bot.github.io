# Jessenth's project collection

The account-level GitHub Pages homepage for Jessenth Ebenezer. Its warm paper, cyan accents, condensed display headings, and editorial grid follow the design of the tech section at jessenth.com.

## Local preview

Run `python -m http.server 8000` and open `http://localhost:8000/`. Mozhi is hosted by its own repository, so its relative `/mozhi/` routes require the published account site or a local server that also serves that project.

## Add a project

Edit `projects.js`. Each entry has an ID, name, category, short description, and tags. Optional destinations are `demo`, `download`, `website`, `video`, `publication`, `source`, and `extra` (a labeled documentation/checksum link). Only add verified URLs. Public GitHub Pages projects use a relative `repo-name/` URL, so the directory works on github.io and on the future shared custom domain. Other demos may use an absolute URL to their existing host.

Optional `image` and `imageAlt` fields provide a real screenshot in gallery view. Entries without screenshots use compact rows with an identifying mark, rather than an invented interface. Screenshot assets live in `assets/`. Descriptions stay concise; environment notes and secondary links go in expandable details. The catalog is trusted, curated data, and rendered text is inserted using DOM text nodes.

The archive includes gallery/list views, availability filters, tag search, name sorting, and shareable query state. Browser Back restores previous filter choices. Only the view preference is saved locally. Search matches names, descriptions, categories, and tags. `/` focuses search and Escape clears it. Motion is limited to short browsing feedback and respects reduced-motion preferences.

There is no application backend. A small standard-library Python build (`python tools/build_site.py`) copies public files into `_site/` and gives CSS and JavaScript URLs a content hash. This prevents browsers from combining new markup with an older cached stylesheet or script. Preview the assembled site with `python -m http.server 8000 --directory _site`. Search, filters, and previews run in the browser. Demo previews load only after a click, and closing them unloads the embedded page to stop playback or execution. Project names, counts, and availability come from the catalog.

## Hosting

GitHub Actions publishes these static files on pushes to `main`. Project implementations stay in their own repositories. No custom domain is configured yet. Once DNS is ready, configure `projects.jessenth.com` on this repository's Pages settings; leave individual project repositories' custom domains empty to inherit the account domain.

The collection contains TRIAGE, Mozhi and WebOS Snow. TRIAGE links to the static engineering case study at `triageplus/`; its interactive workstation demo is coming soon. The private application repository is separate. WebOS Snow links to its existing deployment at webos.jessenth.com and uses a screenshot supplied by the project author.

## Browser checks

Install Playwright as a development tool (`npm install --no-save playwright`, then `npx playwright install chromium`) and run `node tests/browser.cjs` against a local server on port 8770. Set `SITE_URL` for another server, or `MOZHI_TEST_BROWSER` to use an existing Chrome executable. Checks cover the project catalog, links, browsing state, filters, a real interpreter preview, cleanup, and responsive layouts.
