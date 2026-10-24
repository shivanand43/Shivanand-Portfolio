import dotenv from 'dotenv';
dotenv.config();
import handler from './api/admin-login.js';

// Fake response helper to print status and JSON in terminal
const createMockRes = () => ({
  statusCode: 200,
  status(code) { this.statusCode = code; return this; },
  json(data) { console.log(`Status: ${this.statusCode} | Response:`, data); return this; }
});

// Test 1: Wrong Password (Should print Status 401)
await handler({ method: 'POST', body: { username: 'Shivanand', password: 'shiva' } }, createMockRes());

// Test 2: Correct Password from your .env (Should print Status 200 + JWT Token!)
await handler({
  method: 'POST',
  body: { username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD }
}, createMockRes());