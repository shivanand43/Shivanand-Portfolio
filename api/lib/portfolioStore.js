import { kv } from '@vercel/kv';

// Keys used in Vercel KV
const KEYS = {
  MESSAGES: 'portfolio:messages',
  CHATS: 'portfolio:chats',
  RATINGS: 'portfolio:ratings',
};

// In-memory fallback for local development without KV environment keys
const localMemoryStore = {
  messages: [],
  chats: [],
  ratings: [],
};

// Helper: Check if Vercel KV is configured in .env
function isKvConfigured() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

// ── Messages ──
export async function getMessages() {
  if (isKvConfigured()) {
    try {
      const data = await kv.get(KEYS.MESSAGES);
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.warn('KV getMessages error, falling back to memory:', err.message);
    }
  }
  return localMemoryStore.messages;
}

export async function saveMessage(message) {
  const item = {
    id: message.id || Date.now().toString(),
    ...message,
    createdAt: message.createdAt || new Date().toISOString(),
  };

  if (isKvConfigured()) {
    try {
      const existing = await getMessages();
      const updated = [item, ...existing];
      await kv.set(KEYS.MESSAGES, updated);
      return item;
    } catch (err) {
      console.warn('KV saveMessage error, saving to memory:', err.message);
    }
  }

  localMemoryStore.messages.unshift(item);
  return item;
}

// ── Chats ──
export async function getChats() {
  if (isKvConfigured()) {
    try {
      const data = await kv.get(KEYS.CHATS);
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.warn('KV getChats error, falling back to memory:', err.message);
    }
  }
  return localMemoryStore.chats;
}

export async function saveChat(chat) {
  const item = {
    id: chat.id || Date.now().toString(),
    ...chat,
    timestamp: chat.timestamp || new Date().toISOString(),
  };

  if (isKvConfigured()) {
    try {
      const existing = await getChats();
      const updated = [item, ...existing];
      await kv.set(KEYS.CHATS, updated);
      return item;
    } catch (err) {
      console.warn('KV saveChat error, saving to memory:', err.message);
    }
  }

  localMemoryStore.chats.unshift(item);
  return item;
}

// ── Ratings ──
export async function getRatings() {
  if (isKvConfigured()) {
    try {
      const data = await kv.get(KEYS.RATINGS);
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.warn('KV getRatings error, falling back to memory:', err.message);
    }
  }
  return localMemoryStore.ratings;
}

export async function saveRating(rating) {
  const item = {
    id: rating.id || Date.now().toString(),
    ...rating,
    createdAt: rating.createdAt || new Date().toISOString(),
  };

  if (isKvConfigured()) {
    try {
      const existing = await getRatings();
      const updated = [item, ...existing];
      await kv.set(KEYS.RATINGS, updated);
      return item;
    } catch (err) {
      console.warn('KV saveRating error, saving to memory:', err.message);
    }
  }

  localMemoryStore.ratings.unshift(item);
  return item;
}