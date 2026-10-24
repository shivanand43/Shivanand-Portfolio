import * as XLSX from 'xlsx';
import { verifyAdminToken } from './lib/adminToken.js';
import { getMessages, getChats, getRatings } from './lib/portfolioStore.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  // 1. Extract token (checking both lowercase and uppercase headers, plus query params)
  const authHeader = req.headers?.authorization || req.headers?.Authorization || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : req.query?.token;

  // 2. Validate token
  const decoded = verifyAdminToken(token);
  if (!decoded) {
    return res.status(401).json({ ok: false, message: 'Unauthorized: Invalid or missing token' });
  }

  try {
    const [messages, chats, ratings] = await Promise.all([
      getMessages(),
      getChats(),
      getRatings(),
    ]);

    const messagesData = (messages || []).map((m) => ({
      ID: m.id || '',
      Date: m.createdAt ? new Date(m.createdAt).toLocaleString('en-IN') : '',
      Name: m.name || '',
      Email: m.email || '',
      Company: m.company || 'N/A',
      Message: m.message || '',
    }));

    const chatsData = (chats || []).map((c) => ({
      ID: c.id || '',
      Date: c.timestamp ? new Date(c.timestamp).toLocaleString('en-IN') : '',
      Question: c.question || '',
      Answer: c.answer || '',
    }));

    const ratingsData = (ratings || []).map((r) => ({
      ID: r.id || '',
      Date: r.createdAt ? new Date(r.createdAt).toLocaleString('en-IN') : '',
      Name: r.name || 'Anonymous',
      Role: r.role || 'Visitor',
      Stars: r.stars || 5,
      Comment: r.comment || '',
    }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(messagesData), 'Contact Messages');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(chatsData), 'Chatbot Logs');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(ratingsData), 'Visitor Ratings');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    const filename = `Shivanand_Portfolio_Leads_${new Date().toISOString().slice(0, 10)}.xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.status(200).send(excelBuffer);
  } catch (err) {
    console.error('Excel Export Error:', err);
    return res.status(500).json({ ok: false, message: 'Failed to generate Excel export' });
  }
}