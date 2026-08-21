const { put, get } = require('@vercel/blob');

// A single JSON file inside your Vercel Blob store holds the whole list.
const PATHNAME = 'staff-register/profiles.json';

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // useCache: false forces a fresh read from origin storage instead of
      // a possibly-stale CDN copy — important since this file changes often.
      const result = await get(PATHNAME, { access: 'private', useCache: false });

      if (!result || !result.stream) {
        // Nothing saved yet (first run) — that's fine, just start empty.
        return res.status(200).json([]);
      }

      const text = await new Response(result.stream).text();
      const profiles = text ? JSON.parse(text) : [];
      return res.status(200).json(profiles);
    }

    if (req.method === 'PUT') {
      const profiles = req.body;
      if (!Array.isArray(profiles)) {
        return res.status(400).json({ error: 'Expected an array of profiles.' });
      }

      await put(PATHNAME, JSON.stringify(profiles), {
        access: 'private',
        contentType: 'application/json',
        addRandomSuffix: false,   // keep a stable, predictable filename
        allowOverwrite: true      // required to overwrite the same file each save
      });

      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', ['GET', 'PUT']);
    return res.status(405).json({ error: 'Method not allowed.' });
  } catch (err) {
    console.error('profiles API error:', err);
    return res.status(500).json({
      error: 'Storage is not connected yet. In your Vercel project, go to Storage → Create Database → Blob, connect it to this project, then redeploy.'
    });
  }
};
