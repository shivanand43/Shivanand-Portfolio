import { getMessages, saveMessage } from './lib/portfolioStore.js';

export default async function handler(req, res) {
  const { method } = req;

  // 1. Handle GET request
  if (method === 'GET') {
    try {
      const messages = await getMessages();
      return res.status(200).json({ ok: true, messages });
    } catch (err) {
      return res.status(500).json({ ok: false, error: 'Failed to fetch messages' });
    }
  }

  // 2. Handle POST request
  if (method === 'POST') {
    let body;
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    } catch (error) {
      return res.status(400).json({ ok: false, error: 'Invalid JSON format' });
    }

    const { name, email, company, message } = body;

    // Validation: make sure required fields exist
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        ok: false,
        error: 'Name, email, and message are required fields',
      });
    }

    try {
      const savedItem = await saveMessage({
        name: name.trim(),
        email: email.trim(),
        company: company ? company.trim() : '',
        message: message.trim(),
      });

      return res.status(201).json({ ok: true, message: savedItem });
    } catch (err) {
      return res.status(500).json({ ok: false, error: 'Failed to save message' });
    }
  }

  // 3. Any other HTTP method is rejected
  return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
}