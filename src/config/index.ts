import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config = {
  port: Number(process.env.PORT) || 5000,
  env: process.env.NODE_ENV || 'development',

  // Database
  database_url: process.env.DATABASE_URL || '',

  // JWT
  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET || '',
    refresh_secret: process.env.JWT_REFRESH_SECRET || '',
    access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || '1d',
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || '365d',
  },

  // CORS
  client_url: process.env.CLIENT_URL || 'http://localhost:3000',

  // AI
  gemini_api_key: process.env.GEMINI_API_KEY || '',

  // Bcrypt
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
} as const;

export default config;
