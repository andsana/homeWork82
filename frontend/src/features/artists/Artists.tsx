import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchArtists } from './artistsThunks';
import { selectArtists, selectArtistsFetching } from './artistsSlise.ts';
import ArtistItem from './ArtistItem.tsx';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const ArtistsFetching = useAppSelector(selectArtistsFetching);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Artists</Typography>
        </Grid>
        <Grid item>
          <Button color="primary" component={Link} to="/artists/new">
            Add artist
          </Button>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        {ArtistsFetching ? (
          <CircularProgress />
        ) : (
          artists.map((artist) => (
            <ArtistItem
              key={artist._id}
              id={artist._id}
              title={artist.title}
              image={artist.image}
            />
          ))
        )}
      </Grid>
    </Grid>
  );
};

export default Artists;
