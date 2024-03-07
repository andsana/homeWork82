export interface Artist {
  _id: string;
  title: string;
  image: string | null;
}

export interface Album {
  _id: string;
  title: string;
  releaseYear: number;
  image: string | null;
  trackCount: number;
  artist: Artist;
}

export interface Track {
  _id: string;
  number: number;
  title: string;
  duration: string;
  album: Album;
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

export interface TracksHistory {
  datetime: string;
  artistTitle: string;
  trackTitle: string;
}
