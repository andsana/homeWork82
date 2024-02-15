import { Router } from 'express';
import mongoose, { Types } from 'mongoose';

import { AlbumMutation } from '../types';
import { imagesUpload } from '../multer';
import Album from '../models/Album';

const albumsRouter = Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    let query = {};
    const artistId = req.query.artist;

    if (artistId) {
      query = { artist: artistId };
    }

    const results = await Album.find(query);

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

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const albumData: AlbumMutation = {
      artist: req.body.artist,
      title: req.body.title,
      releaseYear: parseFloat(req.body.releaseYear),
      image: req.file ? req.file.filename : null,
    };

    const album = new Album(albumData);
    await album.save();

    res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

export default albumsRouter;
