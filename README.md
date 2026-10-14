# Heartland Cardiology Copy Tool

Files: `index.html` (page + styles), `app.js` (logic), `templates.js` (all template text), `test.js` (optional check).

## Publish on GitHub Pages
1. On github.com click **New repository**. Name it e.g. `HL-TEMPLATES`, set it to **Public**, and create it.
2. Click **Add file > Upload files**, drag in `index.html`, `app.js`, `templates.js` (and optionally `test.js`, `README.md`), then **Commit changes**.
3. Go to **Settings > Pages**. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main** and folder **/ (root)**, then **Save**.
4. Wait 1-2 minutes. Your link will be `https://<your-github-username>.github.io/HL-TEMPLATES/` (shown at the top of the Pages screen). Share that link.

## Add, edit, or remove a template
Open `templates.js` on GitHub, click the pencil icon, edit, and commit. The site updates in about a minute.
- Copy an existing `{ title: "...", text: "..." }` block to add one.
- Put anything that changes per patient in [square brackets]; it becomes a fill-in field automatically.
- To add a category, copy a whole `{ category: "...", templates: [ ... ] }` block.
