import { Router } from 'express';
import TrackHistory from '../models/TrackHistory';
import User from '../models/User';

const trackHistoryRouter = Router();

trackHistoryRouter.post('/', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    if (!token) {
      return res.status(401).send({ error: 'No token present' });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).send({ error: 'Unauthorized!' });
    }

    const trackId = req.body.track;
    if (!trackId) {
      return res
        .status(400)
        .send({ error: 'Track ID is required in the request body' });
    }

    const trackHistoryData = {
      user: user._id,
      track: trackId,
      datetime: new Date(),
    };

    const trackHistory = new TrackHistory(trackHistoryData);
    await trackHistory.save();

    res.send(trackHistory);
  } catch (e) {
    next(e);
  }
});

export default trackHistoryRouter;
