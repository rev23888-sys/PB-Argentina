const { put, head } = require('@vercel/blob');

// All profiles live in a single JSON file in Blob storage, shared by everyone
// who opens the site. This name never changes, so every device reads/writes
// the same file.
const PATHNAME = 'staff-register/profiles.json';

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      let blobInfo;
      try {
        blobInfo = await head(PATHNAME);
      } catch (err) {
        // Nothing saved yet (first run) — that's fine, just an empty register.
        return res.status(200).json([]);
      }

      const fileRes = await fetch(blobInfo.url, { cache: 'no-store' });
      if (!fileRes.ok) return res.status(200).json([]);

      const profiles = await fileRes.json();
      return res.status(200).json(Array.isArray(profiles) ? profiles : []);
    }

    if (req.method === 'PUT') {
      const profiles = req.body;
      if (!Array.isArray(profiles)) {
        return res.status(400).json({ error: 'Expected an array of profiles.' });
      }

      await put(PATHNAME, JSON.stringify(profiles), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
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
