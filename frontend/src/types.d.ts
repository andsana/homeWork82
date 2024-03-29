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
  totalTracks: number;
  artist: Artist;
  isPublished: boolean;
  user: Album;
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
  title: string;
  duration: string;
  album: Album;
  link: string;
}

export interface TrackMutation {
  title: string;
  duration: string;
  link: string;
  album: string;
  artist: string;
  isPublished: boolean;
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  image: File | string | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  image?: string;
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
  displayName: string;
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
