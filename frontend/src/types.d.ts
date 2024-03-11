export interface Artist {
  _id: string;
  user: User;
  title: string;
  image: string | null;
  information: string;
  isPublished: boolean;
}

export interface ArtistMutation {
  title: string;
  information: string;
  image: File | string | null;
  isPublished: boolean;
}

export interface UpdateArtistArg {
  artistId: string;
  artistMutation: ArtistMutation;
}

export interface Album {
  _id: string;
  title: string;
  releaseYear: number;
  image: string;
  trackCount: number;
  artist: Artist;
}

export interface AlbumMutation {
  title: string;
  artist: string;
  releaseYear: string;
  image: File | string | null;
  isPublished: boolean;
}

export interface Track {
  _id: string;
  number: number;
  title: string;
  duration: string;
  album: Album;
  link: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface GlobalError {
  error: string;
}

export interface TrackHistory {
  _id: string;
  datetime: Date;
  artistName: string;
  trackTitle: string;
  albumImage: string;
}
