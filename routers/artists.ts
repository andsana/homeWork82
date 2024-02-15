import express from 'express';
import Artist from '../models/Artist';
import mongoose, { mongo } from 'mongoose';
import { imagesUpload } from '../multer';

const artistsRouter = express.Router();

artistsRouter.get('/', async (_req, res, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (e) {
    next(e);
  }
});

artistsRouter.post(
  '/',
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const artistData = {
        title: req.body.title,
        image: req.file ? req.file.filename : null,
        information: req.body.information,
      };

      const artist = new Artist(artistData);

      await artist.save();
      return res.send(artist);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      if (e instanceof mongo.MongoServerError && e.code === 11000) {
        return res.status(422).send({ messages: 'Title should be unique' });
      }

      next(e);
    }
  },
);

export default artistsRouter;
