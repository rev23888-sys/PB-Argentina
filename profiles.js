import { kv } from '@vercel/kv';

const KEY = 'staff_register_profiles';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const profiles = (await kv.get(KEY)) || [];
      return res.status(200).json(profiles);
    }

    if (req.method === 'PUT') {
      const profiles = req.body;
      if (!Array.isArray(profiles)) {
        return res.status(400).json({ error: 'Expected an array of profiles.' });
      }
      await kv.set(KEY, profiles);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', ['GET', 'PUT']);
    return res.status(405).json({ error: 'Method not allowed.' });
  } catch (err) {
    console.error('profiles API error:', err);
    return res.status(500).json({
      error: 'Storage is not connected yet. In your Vercel project, go to Storage → Create Database → KV, connect it to this project, then redeploy.'
    });
  }
}
