import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAlbums } from './albumsThunks';
import { selectAlbums, selectAlbumsFetching } from './albumsSlise.ts';
import AlbumItem from './AlbumItem.tsx';
import { selectArtistById } from '../artists/artistsSlise.ts';
import { fetchArtists } from '../artists/artistsThunks.ts';

const Albums = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const isLoadingAlbums = useAppSelector(selectAlbumsFetching);
  const { artistId } = useParams();
  const artist = useAppSelector((state) =>
    artistId ? selectArtistById(state, artistId) : undefined,
  );

  useEffect(() => {
    dispatch(fetchArtists());
    if (artistId) {
      dispatch(fetchAlbums(artistId));
    }
  }, [dispatch, artistId]);

  if (isLoadingAlbums) {
    return (
      <Grid container>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container>
        <Typography variant="h4">
          {artist?.title || 'No artist title'}
        </Typography>
      </Grid>
      <Grid item container spacing={2}>
        {albums.length > 0 ? (
          albums.map((album) => (
            <AlbumItem
              key={album._id}
              id={album._id}
              title={album.title}
              image={album.image}
              releaseYear={album.releaseYear}
              trackCount={album.trackCount}
            />
          ))
        ) : (
          <Typography>No artists available</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Albums;
