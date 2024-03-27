import { Router } from 'express';
import mongoose, { FilterQuery } from 'mongoose';
import Album from '../models/Album';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import { imagesUpload } from '../multer';
import { AlbumFields, AlbumMutation } from '../types';
import user from '../middleware/user';
import Track from '../models/Track';

const albumsRouter = Router();

albumsRouter.get('/', user, async (req: RequestWithUser, res, next) => {
  let query = {};
  const artistId = req.query.artist;

  if (artistId) {
    query = { artist: artistId };
  }

  try {
    const user = req.user;
    let filter = {};

    if (user && user.role === 'admin') {
      filter = {};
    } else if (user) {
      filter = {
        $or: [{ isPublished: true }, { user: user._id }],
      };
    } else {
      filter = { isPublished: true };
    }

    const albums = await Album.find(query)
      .find(filter)
      .sort({ releaseYear: -1 });

    const albumsWithTrackCount = await Promise.all(
      albums.map(async (album) => {
        const trackCount = await Track.countDocuments({ album: album._id });
        return {
          ...album.toObject(),
          totalTracks: trackCount,
        };
      }),
    );

    return res.send(albumsWithTrackCount);
  } catch (e) {
    return next(e);
  }
});

albumsRouter.get('/:id', user, async (req: RequestWithUser, res, next) => {
  try {
    const albumId = req.params.id;
    const filter: FilterQuery<AlbumFields> = { _id: albumId };

    const user = req.user;

    if (user && user.role !== 'admin') {
      filter.$or = [{ isPublished: true }, { user: user._id }];
    } else if (!user) {
      filter.isPublished = true;
    }

    const album = await Album.findOne(filter).populate('artist', 'title');

    if (!album) {
      return res.status(404).send({ error: 'Not found!' });
    }

    return res.send(album);
  } catch (e) {
    return next(e);
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
