import { Router } from 'express';
import mongoose, { Types } from 'mongoose';
import Track from '../models/Track';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import user from '../middleware/user';
import { TrackMutation } from '../types';

const tracksRouter = Router();

tracksRouter.get('/', user, async (req: RequestWithUser, res, next) => {
  try {
    let query = {};
    const albumId = req.query.album;

    if (albumId) {
      query = { album: albumId };
    }

    const user = req.user; // будет либо user либо undefined
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

    const tracks = await Track.find(query).find(filter);
    return res.send(tracks);
  } catch (e) {
    return next(e);
  }
});

// tracksRouter.get('/:id', user, async (req: RequestWithUser, res, next) => {
//   try {
//     const user = req.user; // будет либо user либо undefined
//     let filter = {};
//
//     if (user && user.role === 'admin') {
//       // Администраторы видят все треки
//       filter = {};
//     } else if (user) {
//       // Обычные пользователи видят опубликованные треки или свои треки
//       filter = {
//         $or: [
//           { isPublished: true },
//           { user: user._id }, // Фильтруем треки по ID пользователя
//         ],
//       };
//     } else {
//       // Неаутентифицированные пользователи видят только опубликованные треки
//       filter = { isPublished: true };
//     }
//
//     const tracks = await Track.find(filter).populate('user', 'email');
//     return res.send(tracks);
//   } catch (e) {
//     return next(e);
//   }
// });

// tracksRouter.get('/', user, async (req: RequestWithUser, res, next) => {
//   try {
//     const user = req.user; //будет либо user либо undefined
//     let filter: FilterQuery<TrackFields> = {};
//
//     if (!(user && user.role === 'admin')) {
//       filter = { isPublished: true };
//     }
//
//     const tracks = await Track.find(filter);
//     return res.send(tracks);
//   } catch (e) {
//     return next(e);
//   }
// });

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
