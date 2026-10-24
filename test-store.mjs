import dotenv from 'dotenv';
dotenv.config({ path: ['.env.local', '.env'] });

import { kv } from '@vercel/kv';

console.log('--- DIRECT DATABASE VERIFICATION ---');

async function checkCloudDatabase() {
  try {
    // 1. Direct Ping
    const ping = await kv.ping();
    console.log('1. Connection Status:', ping); // Will print "PONG"

    // 2. Direct Cloud Read
    const cloudMessages = await kv.get('portfolio:messages');
    console.log('\n2. Messages Stored in Cloud DB:');
    console.log(cloudMessages);

    const cloudChats = await kv.get('portfolio:chats');
    console.log('\n3. Chats Stored in Cloud DB:');
    console.log(cloudChats);
  } catch (err) {
    console.error('Direct DB Check Failed:', err.message);
  }
}

checkCloudDatabase();