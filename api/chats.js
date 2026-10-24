import { getChats, saveChat } from './lib/portfolioStore.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const chats = await getChats();
    return res.status(200).json({ ok: true, chats });
  }

  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { question, answer } = body;

    if (!question || !answer) {
      return res.status(400).json({ ok: false, message: 'Question and answer are required' });
    }

    const saved = await saveChat({ question, answer });
    return res.status(201).json({ ok: true, chat: saved });
  }

  return res.status(405).json({ ok: false, message: 'Method not allowed' });
}