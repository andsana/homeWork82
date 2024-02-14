import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'; //импорты из внешних библиотек должны быть в начале\

import config from './config';
import artistsRouter from './routers/artists';
import albumsRouter from './routers/albums'; //наши импорты - от глобального к частному


const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  })
};

void run();