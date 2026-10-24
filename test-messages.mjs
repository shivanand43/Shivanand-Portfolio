import dotenv from 'dotenv';
dotenv.config();
import handler from './api/messages.js';

// Fake response helper to print status and JSON in terminal
const createMockRes = () => ({
  statusCode: 200,
  status(code) { this.statusCode = code; return this; },
  json(data) { console.log(`Status: ${this.statusCode} | Response:`, data); return this; }
});
console.log("\n--- Now testing POST requests ---\n");
// Test 1: Missing required fields (Should print Status 400)
await handler({ method: 'POST', body: { name: 'RAM', email: 'rama123@gmail.com', company: 'Google', message: 'i want to work with you are you ready ' } }, createMockRes());
console.log("\n---Now testing GET requests---\n");
await handler({ method: 'GET' }, createMockRes());
