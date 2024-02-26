import { Model } from 'mongoose';

export interface AlbumMutation {
  artist: string;
  title: string;
  releaseYear: number;
  image: string | null;
}

export interface TrackMutation {
  number: number;
  album: string;
  title: string;
  duration: string;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserFields, unknown, UserMethods>;