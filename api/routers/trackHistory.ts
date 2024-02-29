import { Router } from 'express';
import TrackHistory from '../models/TrackHistory';
import auth, { RequestWithUser } from '../middleware/auth';

const trackHistoryRouter = Router();

trackHistoryRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
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
});

trackHistoryRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const trackHistories = await TrackHistory.find({
      user: req.user,
    }).populate({
      path: 'track',
      populate: { path: 'album', populate: 'artist' },
    });
    return res.send(trackHistories);
  } catch (e) {
    return next(e);
  }
});

export default trackHistoryRouter;
