import { generateAdminToken } from './lib/adminToken.js';

export default async function handler(req, res) {
  // 1. Check HTTP Method
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  // 2. Extract and validate input
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  const username = body.username?.trim();
  const password = body.password?.trim();

  if (!username || !password) {
    return res
      .status(400)
      .json({ ok: false, message: 'Username and password are required' });
  }

  // 3. Read environment variables safely
  const adminUsername = process.env.ADMIN_USERNAME?.trim();
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();

  // Safety check: Tell the developer if .env didn't load!
  if (!adminUsername || !adminPassword) {
    return res.status(500).json({
      ok: false,
      message:
        'Server Error: ADMIN_USERNAME or ADMIN_PASSWORD is not loaded from .env!',
    });
  }

  // 4. Compare credentials
  if (username !== adminUsername || password !== adminPassword) {
    return res
      .status(401)
      .json({ ok: false, message: 'Invalid username or password' });
  }

  // 5. Issue JWT Token (No second if-check needed!)
  const token = generateAdminToken(username);
  return res.status(200).json({ ok: true, token });
}