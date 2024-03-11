import { Router } from 'express';
import mongoose, { Types } from 'mongoose';
import Album from '../models/Album';
import Track from '../models/Track';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import { imagesUpload } from '../multer';
import { AlbumMutation } from '../types';
import user from '../middleware/user';

const albumsRouter = Router();

albumsRouter.get('/', user, async (req: RequestWithUser, res, next) => {
  try {
    let query = {};
    const artistId = req.query.artist;

    if (artistId) {
      query = { artist: artistId };
    }

    let albums = await Album.find(query).sort({ releaseYear: -1 });

    if (req.user && req.user.role !== 'admin') {
      albums = albums.filter(
        (album) =>
          album.isPublished ||
          album.user.toString() === req.user?._id.toString(),
      );
    }

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

albumsRouter.get('/:id', user, async (req: RequestWithUser, res, next) => {
  try {
    let _id;
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

    if (
      !album.isPublished &&
      (!req.user ||
        (album.user.toString() !== req.user._id.toString() &&
          req.user.role !== 'admin'))
    ) {
      return res.status(403).send({ error: 'Access denied!' });
    }

    res.send(album);
  } catch (e) {
    next(e);
  }
});

albumsRouter.post(
  '/',
  auth,
  permit('admin', 'user'),
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).send({ error: 'Unauthorized' });
      }

      const albumData: AlbumMutation = {
        user: req.user._id.toString(),
        artist: req.body.artist,
        title: req.body.title,
        releaseYear: parseFloat(req.body.releaseYear),
        image: req.file ? req.file.filename : null,
        isPublished: req.body.isPublished,
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
  },
);

export default albumsRouter;
