import { NextFunction, Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { UserFields } from '../types';
import User from '../models/User';

export interface RequestWithUser extends Request {
  user?: HydratedDocument<UserFields>;
}

const user = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const headerValue = req.get('Authorization');

  if (!headerValue) {
    return next();
  }

  const [_bearer, token] = headerValue.split(' '); // "Bearer token"

  if (!token) {
    return;
  }

  const user = await User.findOne({ token });

  if (!user) {
    return res.status(401).send({ error: 'Wrong token!' });
  }

  req.user = user;

  next();
};

export default user;
