import { Router } from 'express';
import mongoose, { Types } from 'mongoose';

import { TrackMutation } from '../types';
import Track from '../models/Track';
import Album from '../models/Album';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';

const tracksRouter = Router();
tracksRouter.get('/', async (req, res, next) => {
  try {
    let query = {};
    const albumId = req.query.album;
    const artistId = req.query.artist;

    if (albumId) {
      query = { album: albumId };
    }

    if (artistId) {
      const albums = await Album.find({ artist: artistId });
      const albumIds = albums.map((album) => album._id);

      const tracks = await Track.find({ album: { $in: albumIds } }).sort(
        'number',
      );
      return res.send(tracks);
    }

    const results = await Track.find(query)
      .populate({
        path: 'album',
        select: 'title artist',
        populate: {
          path: 'artist',
          select: 'title',
        },
      })
      .sort('number');

    res.send(results);
  } catch (e) {
    return next(e);
  }
});

tracksRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const track = await Track.findById(_id).populate({
      path: 'album',
      select: 'title artist',
      populate: {
        path: 'artist',
        select: 'title',
      },
    });

    if (!track) {
      return res.status(404).send({ error: 'Not found!' });
    }

    res.send(track);
  } catch (e) {
    next(e);
  }
});

tracksRouter.post(
  '/',
  auth,
  permit('admin', 'user'),
  async (req: RequestWithUser, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).send({ error: 'Unauthorized' });
      }

      const trackData: TrackMutation = {
        user: req.user._id.toString(),
        number: req.body.number,
        album: req.body.album,
        title: req.body.title,
        duration: req.body.duration,
      };

      const track = new Track(trackData);
      await track.save();

      res.send(track);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(e);
    }
  },
);

export default tracksRouter;
