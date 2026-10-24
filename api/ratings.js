import { getRatings, saveRating } from './lib/portfolioStore.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const ratings = await getRatings();
    return res.status(200).json({ ok: true, ratings });
  }

  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { stars, comment, name, role } = body;

    if (!stars || stars < 1 || stars > 5) {
      return res.status(400).json({ ok: false, message: 'Valid stars rating (1-5) is required' });
    }

    const saved = await saveRating({
      name: name?.trim() || 'Anonymous',
      role: role?.trim() || 'Visitor',
      stars: Number(stars),
      comment: comment?.trim() || '',
    });

    return res.status(201).json({ ok: true, rating: saved });
  }

  return res.status(405).json({ ok: false, message: 'Method not allowed' });
}