import dotenv from 'dotenv';
import fs from 'fs';

export enum Env {
  Production = 'prod',
  Development = 'dev',
}
const DEFAULT_PORT = 3000;

if (fs.existsSync('.env')) {
  dotenv.config({path: '.env'});
}

const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || false,
  apiKey: process.env.CLOUDINARY_API_KEY || false,
  apiSecret: process.env.CLOUDINARY_API_SECRET || false,
};

// Check if all client values are provided
if (!Object.values(cloudinary).every((value) => value)) {
  console.error('Cloudinary is not setup fully');
  process.exit(1);
}

const config = {
  env: (process.env.NODE_ENV as Env) || Env.Development,
  port: (process.env.PORT) || DEFAULT_PORT,
  cloudinary,
};

export default config;

