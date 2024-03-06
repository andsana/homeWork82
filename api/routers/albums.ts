import { Router } from 'express';
import { Types } from 'mongoose';
import Album from '../models/Album';
import Track from '../models/Track';

const albumsRouter = Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    let query = {};
    const artistId = req.query.artist;

    if (artistId) {
      query = { artist: artistId };
    }

    const albums = await Album.find(query).sort({ releaseYear: -1 });

    const albumsData = await Promise.all(
      albums.map(async (album) => {
        const trackCount = await Track.countDocuments({ album: album._id });
        return {
          ...album.toObject(),
          trackCount,
        };
      }),
    );

    res.send(albumsData);
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
