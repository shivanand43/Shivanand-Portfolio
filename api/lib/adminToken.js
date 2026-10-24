import jwt from 'jsonwebtoken';

function getJwtSecret() {
  return process.env.JWT_SECRET || '58af3cec8551208603c0fe1eeb78ca150208f00af4fbf252ce89c9595ad04ac9';
}

export function generateAdminToken(username = 'Shivanand') {
  const secret = getJwtSecret();
  const payload = {
    username,
    role: 'admin',
  };
  return jwt.sign(payload, secret, { expiresIn: '2h' });
}

export function verifyAdminToken(token) {
  if (!token) return null;
  try {
    const secret = getJwtSecret();
    const cleanToken = token.trim();
    const decoded = jwt.verify(cleanToken, secret);
    if (decoded && decoded.role === 'admin') {
      return decoded;
    }
    return null;
  } catch (err) {
    return null;
  }
}