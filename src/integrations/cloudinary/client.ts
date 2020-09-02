import config from '../../config';
import * as cloudinary from 'cloudinary';
const client = cloudinary.v2;

client.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

export default client;
