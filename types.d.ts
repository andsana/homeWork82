export interface AlbumMutation {
  artist: string;
  title: string,
  releaseYear: number,
  image: string | null,
}

export interface TrackMutation {
  album: string;
  title: string,
  duration: string,
}

