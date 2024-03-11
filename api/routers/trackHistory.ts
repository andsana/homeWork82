import { Router } from 'express';
import TrackHistory from '../models/TrackHistory';
import auth, { RequestWithUser } from '../middleware/auth';
import { ITrackHistory, TrackHistoryMutation } from '../types';
import permit from '../middleware/permit';

const trackHistoryRouter = Router();

trackHistoryRouter.post(
  '/',
  auth,
  permit('admin', 'user'),
  async (req: RequestWithUser, res, next) => {
    try {
      const trackHistory = new TrackHistory({
        user: req.user?.id,
        track: req.body.track,
      });

      await trackHistory.save();

      return res.send(trackHistory);
    } catch (e) {
      next(e);
    }
  },
);

trackHistoryRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const trackHistoriesData: ITrackHistory[] = await TrackHistory.find({
      user: req.user,
    }).populate({
      path: 'track',
      populate: { path: 'album', populate: 'artist' },
    });

    const trackHistories: TrackHistoryMutation[] = trackHistoriesData.map(
      (th) => ({
        _id: th._id,
        artistName: th.track.album.artist.title,
        albumImage: th.track.album.image,
        trackTitle: th.track.title,
        datetime: th.datetime,
      }),
    );

    return res.send(trackHistories);
  } catch (e) {
    return next(e);
  }
});

export default trackHistoryRouter;
