# Shreyash Daduria — Portfolio

Plain HTML/CSS/JS, no build step, no framework. Files:

```
index.html
styles.css
script.js
Shreyash_Daduria_Resume.pdf
assets/profile.jpg
```

## Deploy — Vercel (recommended, free, custom domain support)
1. Create a free GitHub account/repo if you don't have one, and push this folder to a new repo (e.g. `portfolio`).
   - Or skip GitHub entirely: install the Vercel CLI (`npm i -g vercel`), `cd` into this folder, run `vercel`, and follow the prompts — it deploys directly from your machine.
2. Go to vercel.com → New Project → Import your GitHub repo.
3. Framework preset: **Other** (it's static, no build command needed). Root directory: this folder.
4. Deploy. You'll get a `yourname.vercel.app` URL instantly. Add a custom domain later under Project → Settings → Domains if you buy one.

## Deploy — GitHub Pages (free, ties directly to your GitHub profile)
1. Push this folder to a repo — name it `shreyashD0810.github.io` if you want it at the root of your GitHub Pages domain, or any name for a project page.
2. Repo → Settings → Pages → Source: `main` branch, `/root`.
3. Site goes live at `https://shreyashD0810.github.io` (or `.github.io/reponame`) in a minute or two.

## Deploy — Netlify (also free, drag-and-drop option)
1. Go to app.netlify.com → Add new site → Deploy manually.
2. Drag the whole project folder into the browser — done, no repo required.
3. Or connect it to GitHub the same way as Vercel for auto-redeploys on push.

## Custom domain
All three let you attach a custom domain (e.g. `shreyashdaduria.com`) for free once you own one from a registrar
like Namecheap or Google Domains — just point the DNS records they give you.

## Editing later
- Text lives directly in `index.html` — search for the section you want (`id="projects"`, `id="experience"`, etc.).
- Colors/fonts/spacing live in `styles.css` under the `:root` token block at the top.
- To swap the photo, replace `assets/profile.jpg` with a same-named file.
- To update the resume, replace `Shreyash_Daduria_Resume.pdf` with the same filename.
