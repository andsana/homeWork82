import path from 'path';
import { configDotenv } from 'dotenv';

configDotenv();

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  mongoose: {
    db: 'mongodb://localhost/music',
  },
  google: {
    clientId: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  },
};

console.log(config.google.clientId);

export default config;
