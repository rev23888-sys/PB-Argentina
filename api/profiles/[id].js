const { put, del } = require('@vercel/blob');

function pathFor(id) {
  return 'staff-register/profiles/' + id + '.json';
}

module.exports = async function handler(req, res) {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ error: 'Missing profile id.' });
    }

    if (req.method === 'PUT') {
      const profile = req.body;
      if (!profile || typeof profile !== 'object' || Array.isArray(profile)) {
        return res.status(400).json({ error: 'Expected a single profile object.' });
      }

      await put(pathFor(id), JSON.stringify(profile), {
        access: 'private',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true
      });

      return res.status(200).json({ ok: true });
    }

    if (req.method === 'DELETE') {
      await del(pathFor(id)).catch(function () {
        // Already gone (or never existed) — treat as success either way.
      });
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', ['PUT', 'DELETE']);
    return res.status(405).json({ error: 'Method not allowed.' });
  } catch (err) {
    console.error('profile save/delete error:', err);
    return res.status(500).json({
      error: 'Could not save this profile. Make sure Blob storage is connected, then try again.'
    });
  }
};
