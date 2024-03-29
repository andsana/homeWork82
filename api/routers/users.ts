import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import config from '../config';
import { imagesUpload } from '../multer';
import { UserMutation } from '../types';

const userRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

userRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const userData: UserMutation = {
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
      image: req.file ? req.file.filename : null,
    };

    const user = new User(userData);
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
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(422).send({ error: 'email not found' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(422).send({ error: 'Password is wrong!' });
    }

    user.generateToken();
    await user.save();

    return res.send({ Message: 'email and password are correct!', user });
  } catch (e) {
    next(e);
  }
});

userRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({ error: 'Google login error' });
    }

    const email = payload['email'];
    const id = payload['sub']; //subject
    const displayName = payload['name'];

    if (!email) {
      return res.status(400).send({ error: 'Email is not present' });
    }

    let user = await User.findOne({ googleID: id });

    if (!user) {
      user = new User({
        email,
        password: crypto.randomUUID(),
        googleID: id,
        displayName,
      });
    }

    user.generateToken();

    await user.save();

    return res.send({ message: 'Login with Google successful!!', user });
  } catch (e) {
    return next(e);
  }
});

userRouter.delete(
  '/sessions',
  auth,
  async (req: RequestWithUser, res, next) => {
    try {
      if (req.user) {
        req.user.generateToken();
        await req.user.save();

        return res.send({ message: 'Successfully logged out' });
      }

      return res
        .status(401)
        .send({ error: 'User not found or already logged out' });
    } catch (e) {
      next(e);
    }
  },
);

export default userRouter;
