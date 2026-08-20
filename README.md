# Staff Register — K.B Argentina

An employee directory site. Profiles are stored in a **shared cloud file** (Vercel Blob), so anyone who enters the access code — on any device, anywhere — sees the same list.

## What's in this build
- Access code gate, with a show/hide eye toggle while typing
- Animated "K.B Argentina" intro
- Add/edit/delete employees: photo, name, phone (with reveal toggle), address, father's/mother's name
- **Paid / Not-paid** status per employee, with a filter dropdown
- Sort by name, newest/oldest added
- Search bar
- Light/Dark theme toggle
- Accent color picker (presets + custom)
- Background image/video upload in Settings, with a visibility/opacity slider
- Download/restore a full backup as a `.json` file
- Respects the "reduce motion" accessibility setting

## What was fixed in this build
1. **Storage moved from `localStorage` to the cloud (Vercel Blob).** Previously, profiles (including full-size photos) were saved only in each browser's local storage, which has a hard cap of roughly 5–10MB. With uncompressed photos, that ceiling was being hit at around 5 profiles, throwing the "storage may be full or disabled" error — and even below that limit, profiles never synced between devices. Both problems are fixed by this change.
2. **Photos are now compressed before saving.** Each photo is resized (max 480px) and re-encoded as JPEG before it's stored, shrinking a typical 1–3MB photo down to roughly 20–60KB. This keeps saves fast and keeps you well clear of any size limit even with a large staff directory.
3. **The missing logo image was replaced with a built-in SVG emblem.** The uploaded file referenced `kb-argentina-logo.png`, which wasn't included, so the header and intro screen would have shown a broken-image icon. Both spots now use a lightweight inline emblem that needs no external file — if you'd like your own logo image instead, send it over and I'll swap it in.

## Deploy to Vercel

1. **Push the whole folder to GitHub** — `index.html`, `README.md`, `package.json`, and the `api` folder together. All of them are needed (not just index.html).
2. Go to vercel.com, sign in with GitHub, click Add New → Project, and import the repo.
3. Leave Build Command, Output Directory, and Install Command blank — Vercel auto-detects the `api` folder and installs the one dependency (`@vercel/blob`) automatically.
4. Click Deploy. It will deploy successfully, but profiles won't save yet — you still need to connect storage (next step).
5. Connect storage: in your Vercel project, go to the **Storage** tab → **Create Database** → choose **Blob** → follow the prompts → when asked, connect it to this project. Vercel adds the required environment variable (`BLOB_READ_WRITE_TOKEN`) automatically.
6. Redeploy: Deployments tab → ⋯ menu on the latest deployment → Redeploy. (Required so the app picks up the new storage connection.)
7. Done. Open your site URL from any device, enter the access code, and every profile you add will show up everywhere.

## Local testing
Because this depends on cloud storage, opening `index.html` directly (or a plain local file server) won't save profiles — you'll see a "couldn't be saved" message. Use `vercel dev` (after `vercel link`) to test locally with real storage connected.

## What stays device-only
Theme, accent color, and background image/video customization in Settings intentionally stay local to each device — they're personal display preferences, not shared company data.
