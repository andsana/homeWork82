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
}

export interface Track {
  _id: string;
  number: number;
  title: string;
  duration: string;
}
