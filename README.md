# Jessenth's project collection

The account-level GitHub Pages homepage for Jessenth Ebenezer. Its warm paper, cyan accents, condensed display headings, and editorial grid follow the design of the tech section at jessenth.com.

## Local preview

Run `python -m http.server 8000` and open `http://localhost:8000/`. Mozhi is hosted by its own repository, so its relative `/mozhi/` routes require the published account site or a local server that also serves that project.

## Add a project

Edit `projects.js`. Each entry has a name, category, description, tags, visual, and a source URL or demo URL. Only add a demo URL once the demo is live. Public GitHub Pages projects use a relative `repo-name/` URL, so the directory works on github.io and on the future shared custom domain. Other demos may use an absolute URL to their existing host.

There is no build step or application backend. Search, filters, and previews run in the browser. Demo previews load only after a click, and closing them unloads the embedded page to stop playback or execution. Project names, counts, and availability come from the catalog.

## Hosting

GitHub Actions publishes these static files on pushes to `main`. Project implementations stay in their own repositories. No custom domain is configured yet. Once DNS is ready, configure `projects.jessenth.com` on this repository's Pages settings; leave individual project repositories' custom domains empty to inherit the account domain.

The interactive audio course is hosted on jessenth.com. Source-only entries are labeled accordingly and do not claim to have browser demos.
