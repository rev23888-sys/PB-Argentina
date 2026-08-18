# Staff Register

An employee directory site. Profiles are stored in a **shared cloud file** (Vercel Blob), so anyone who enters the access code — on any device, anywhere — sees the same list.

## Features
- **Access code gate** — visitors must enter `9350918578` before the site loads. This is a soft gate only: the code lives in the page's own JavaScript, so anyone who views the page source can find it. It keeps casual visitors out — it is not real security.
- **Animated intro** — after the correct code, an animated "K.B Argentina" title plays before the site appears.
- **+** button to add an employee: photo, name (required), address, father's name, mother's name — saved to the cloud, visible from any device.
- Click any profile card to view full details, **edit**, or **delete** — changes sync everywhere immediately.
- Search bar filters the directory live by name.
- **Settings (gear icon)** — upload a custom image or video as the site's background. This part stays local to each device (like a personal theme), since it's not shared data.

## Why it needs cloud storage
A plain HTML file has no memory of its own — every browser that opens it starts blank. To make profiles visible across devices, they have to live on a server somewhere on the internet, which is what `api/profiles.js` and Vercel Blob (below) provide.

> **Note on the previous version:** this project used to run on Vercel KV. Vercel discontinued that product in December 2024, which is why saving profiles started failing with errors. It's been switched to **Vercel Blob**, Vercel's current first-party storage product, which is still fully supported and just as easy to set up.

## Deploy to Vercel

1. **Push the whole folder to GitHub** — index.html, README.md, package.json, and the `api` folder together. All of them are needed (not just index.html).
2. Go to vercel.com, sign in with GitHub, click Add New → Project, and import the repo.
3. Leave Build Command, Output Directory, and Install Command blank — Vercel auto-detects the `api` folder and installs the one dependency (`@vercel/blob`) automatically.
4. Click Deploy. It will deploy successfully, but profiles won't save yet — you still need to connect storage (next step).
5. Connect storage: in your Vercel project, go to the **Storage** tab → **Create Database** → choose **Blob** → follow the prompts to create it → when asked, connect it to this project. Vercel automatically adds the required environment variable (`BLOB_READ_WRITE_TOKEN`) for you — you don't type anything in yourself.
6. Redeploy: go to the Deployments tab → click the ⋯ menu on the latest deployment → Redeploy. (This step is required so the app picks up the new storage connection.)
7. Done. Open your site URL from any device, enter the access code, and every profile you add will now show up everywhere.

## Local testing
Because this depends on cloud storage, opening index.html by double-clicking it (or running a plain local file server) will not save profiles — you'll see a "Storage is not connected yet" message. Use `vercel dev` (after running `vercel link` to connect the folder to your Vercel project) if you want to test locally with the real storage connected.

## A note on photos and size
Photos are compressed automatically before saving (resized and converted to JPEG) to keep things fast. If your directory grows very large (many dozens of employees, all with photos), saves could eventually get slow, since the whole list is re-saved as one file on every add/edit. For a typical staff register this isn't something you'll run into, but it's worth knowing about if the team grows a lot.

## What stays device-only
The background customization in Settings (image/video) intentionally stays local to each device — think of it as a personal display preference, not shared company data.
