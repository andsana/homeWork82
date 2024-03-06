import express from 'express';
import Artist from '../models/Artist';
import { Types } from 'mongoose';

const artistsRouter = express.Router();

artistsRouter.get('/', async (_req, res, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (e) {
    next(e);
  }
});

artistsRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const artist = await Artist.findById(_id);

    if (!artist) {
      return res.status(404).send({ error: 'Not found!' });
    }

    res.send(artist);
  } catch (e) {
    next(e);
  }
});
export default artistsRouter;
