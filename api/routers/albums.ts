import { Router } from 'express';
import { Types } from 'mongoose';
import Album from '../models/Album';

const albumsRouter = Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    let query = {};
    const artistId = req.query.artist;

    if (artistId) {
      query = { artist: artistId };
    }

    const results = await Album.find(query).sort({ releaseYear: -1 });

    res.send(results);
  } catch (e) {
    return next(e);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const album = await Album.findById(_id).populate(
      'artist',
      'title information',
    );

    if (!album) {
      return res.status(404).send({ error: 'Not found!' });
    }

    res.send(album);
  } catch (e) {
    next(e);
  }
});

export default albumsRouter;
