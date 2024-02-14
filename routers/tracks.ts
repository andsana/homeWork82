import {Router} from 'express';
import mongoose from 'mongoose';

import {TrackMutation} from '../types';
import Track from '../models/Track';
import Album from '../models/Album';

const tracksRouter = Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    let query = {};
    const albumId = req.query.album;
    const artistId = req.query.artist;

    if (albumId) {
      query = {album: albumId};
    }

    if (artistId) {
      const albums = await Album.find({artist: artistId})
      const albumIds = albums.map(album => album._id);

      const tracks = await Track.find({ album: { $in: albumIds } });
      return res.send(tracks);
    }

    const results = await Track.find(query);

    res.send(results);
  } catch (e) {
    return next(e);
  }
});
tracksRouter.post('/', async (req, res, next) => {
  try {
    const trackData: TrackMutation = {
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
});

export default tracksRouter;