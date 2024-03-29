import { Model } from 'mongoose';

export interface AlbumMutation {
  user: string;
  artist: string;
  title: string;
  releaseYear: number;
  image: string | null;
  isPublished: string;
}

export interface AlbumFields {
  user: string;
  artist: string;
  title: string;
  releaseYear: number;
  image: string | null;
  isPublished: string;
}

export interface TrackMutation {
  user: string;
  album: string;
  title: string;
  duration: string;
}

export interface TrackFields {
  user: string;
  album: string;
  title: string;
  duration: string;
  number: number;
  link: string;
  isPublished: string;
}

export interface UserFields {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: String;
  image: string | null;
  googleID?: String;
}

export interface UserMutation {
  email: string;
  password: string;
  displayName: String;
  image: string | null;
}

export interface ArtistMutation {
  user: string;
  title: string;
  information: string;
  image: string | null;
  isPublished: boolean;
}

export interface ArtistFields {
  title: string;
  information: string;
  image: string | null;
  isPublished: boolean;
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
