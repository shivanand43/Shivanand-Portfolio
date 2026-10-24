import dotenv from 'dotenv';
dotenv.config(); // Loads variables from your .env file

import { generateAdminToken, verifyAdminToken } from './api/lib/adminToken.js';

console.log("--- TESTING JWT AUTHENTICATION ---");

// 1. Generate a token
const token = generateAdminToken('Ravi', 'admin');
console.log("\nGenerated Token:\n", token);

// 2. Verify the valid token
const decodedValid = verifyAdminToken(token);
console.log("\nVerification Result (Valid Token):", decodedValid);

// 3. Test a fake/tampered token
const fakeToken = token + "corrupt_chars";
const decodedInvalid = verifyAdminToken(fakeToken);
console.log("\nVerification Result (Fake Token):", decodedInvalid);
