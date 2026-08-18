# Staff Register

An employee directory site. Profiles are now stored in a **shared cloud database**, so anyone who enters the access code — on any device, anywhere — sees the same list.

## Features
- **Access code gate** — visitors must enter `9350918578` before the site loads. This is a soft gate only: the code lives in the page's own JavaScript, so anyone who views the page source can find it. It keeps casual visitors out — it is not real security.
- **Animated intro** — after the correct code, an animated "K.B Argentina" title plays before the site appears.
- **+** button to add an employee: photo, name (required), address, father's name, mother's name — saved to the cloud, visible from any device.
- Click any profile card to view full details, **edit**, or **delete** — changes sync everywhere immediately.
- Search bar filters the directory live by name.
- **Settings (gear icon)** — upload a custom image or video as the site's background. This part stays local to each device (like a personal theme), since it's not shared data.

## Why it needs a database now
A plain HTML file has no memory of its own — every browser that opens it starts blank. To make profiles visible across devices, they have to live on a server somewhere on the internet, which is what the `api/profiles.js` file and Vercel KV database below provide.

## Deploy to Vercel (one extra step vs. before — read carefully)

1. **Push the whole folder to GitHub** — index.html, README.md, package.json, and the api folder together. All of them are needed now (not just index.html).
2. Go to vercel.com, sign in with GitHub, click Add New → Project, and import the repo.
3. Leave Build Command, Output Directory, and Install Command blank — Vercel auto-detects the api folder and installs the one dependency (@vercel/kv) automatically.
4. Click Deploy. It will deploy successfully, but profiles won't save yet — you still need to connect a database (next step).
5. Connect the database: in your Vercel project, go to the Storage tab → Create Database → choose KV → follow the prompts to create it → when asked, connect it to this project. Vercel automatically adds the required environment variables for you — you don't type anything in yourself.
6. Redeploy: go to the Deployments tab → click the ⋯ menu on the latest deployment → Redeploy. (This step is required so the app picks up the new database connection.)
7. Done. Open your site URL from any device, enter the access code, and every profile you add will now show up everywhere.

## Local testing
Because this now depends on a cloud database, opening index.html by double-clicking it (or even running a plain local file server) will not save profiles — you'll see a "Storage is not connected yet" message. Use `vercel dev` (after running `vercel link` to connect the folder to your Vercel project) if you want to test locally with the real database connected.

## What stays device-only
The background customization in Settings (image/video) intentionally stays local to each device — think of it as a personal display preference, not shared company data. If you'd like that shared too, it can be added the same way the profiles are.
