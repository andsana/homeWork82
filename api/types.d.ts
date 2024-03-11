import { Model } from 'mongoose';

export interface AlbumMutation {
  artist: string;
  title: string;
  releaseYear: number;
  image: string | null;
  user: string;
  isPublished: string;
}

export interface TrackMutation {
  number: number;
  album: string;
  title: string;
  duration: string;
  user: string;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
}

export interface ArtistMutation {
  title: string;
  information: string;
  image: string | null;
  isPublished: boolean;
  user: string;
}

export interface TrackHistoryMutation {
  _id: string;
  artistName: string;
  trackTitle: string;
  datetime: date;
  albumImage: string | null;
}

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserFields, unknown, UserMethods>;

export interface ITrackHistory {
  _id: string;
  track: ITrack;
  datetime: Date;
}

export interface ITrack {
  album: IAlbum;
  title: string;
}

export interface IAlbum {
  artist: IArtist;
  title: string;
  image: string | null;
}

export interface IArtist {
  title: string;
}
