import dotenv from 'dotenv';
dotenv.config({ path: ['.env.local', '.env'] });

// Dynamic import ensures process.env is ready before adminToken evaluates
const { generateAdminToken } = await import('./api/lib/adminToken.js');
const { default: handler } = await import('./api/export-excel.js');

const token = generateAdminToken('Shivanand');

const mockRes = (label) => ({
  statusCode: 200,
  headers: {},
  setHeader(key, val) { this.headers[key] = val; },
  status(code) { this.statusCode = code; return this; },
  json(data) { console.log(`[${label}] Status ${this.statusCode}:`, data); return this; },
  send(buf) {
    console.log(`[${label}] Status ${this.statusCode} | Excel Buffer Generated! Size: ${buf.length} bytes`);
    return this;
  }
});

console.log('--- RUNNING EXCEL EXPORT SECURITY TESTS ---');

// Test 1: Calling without token -> Expected: 401 Unauthorized
await handler({ method: 'GET', headers: {}, query: {} }, mockRes('No Token Test'));

// Test 2: Calling with valid JWT token -> Expected: 200 + Excel Buffer
await handler({
  method: 'GET',
  headers: { authorization: `Bearer ${token}` },
  query: {}
}, mockRes('Valid JWT Export Test'));