import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAlbums } from './albumsThunks';
import { selectAlbums, selectAlbumsFetching } from './albumsSlise.ts';
import AlbumItem from './AlbumItem.tsx';

const Albums = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const albumsLoading = useAppSelector(selectAlbumsFetching);
  const { artistId } = useParams();

  useEffect(() => {
    dispatch(fetchAlbums(artistId));
  }, [dispatch, artistId]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container>
        <Typography variant="h4">Albums</Typography>
      </Grid>
      <Grid item container spacing={2}>
        {albumsLoading ? (
          <CircularProgress />
        ) : (
          albums.map((album) => (
            <AlbumItem
              key={album._id}
              id={album._id}
              title={album.title}
              image={album.image}
              releaseYear={album.releaseYear}
            />
          ))
        )}
      </Grid>
    </Grid>
  );
};

export default Albums;
