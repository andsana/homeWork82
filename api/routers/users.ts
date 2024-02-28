import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    user.generateToken();
    await user.save();
    return res.send({ message: 'ok!', user });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }

    next(error);
  }
});

userRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(422).send({ error: 'Username not found' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(422).send({ error: 'Password is wrong!' });
    }

    user.generateToken();
    await user.save();

    return res.send({ Message: 'Username and password are correct!', user });
  } catch (e) {
    next(e);
  }
});
userRouter.get('/secret', auth, async (req: RequestWithUser, res, next) => {
  try {
    return res.send({
      message: 'This a secret message!',
      username: req.user?.username,
    });
  } catch (e) {
    next(e);
  }
});

export default userRouter;
