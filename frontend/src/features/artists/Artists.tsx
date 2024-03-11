import { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteArtist, fetchArtists, toggleArtistPublishStatus } from './artistsThunks';
import {
  selectArtists,
  selectArtistsLoading,
  selectDeleteLoading,
  selectToggleArtistPublishStatusLoading,
} from './artistsSlise.ts';
import ArtistItem from './components/ArtistItem.tsx';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const isLoadingArtists = useAppSelector(selectArtistsLoading);
  const isLoadingDelete = useAppSelector(selectDeleteLoading);
  const isLoadingPublish = useAppSelector(selectToggleArtistPublishStatusLoading);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const handleDelete = (artistId: string) => {
    if (artistId && confirm('Are you sure you want to delete this artist?')) {
      dispatch(deleteArtist(artistId));
    }
  };

  const handleTogglePublish = (artistId: string) => {
    if (
      artistId &&
      confirm('Are you sure you want to change the publication status of this artist?')
    ) {
      dispatch(toggleArtistPublishStatus(artistId));
    }
  };

  if (isLoadingArtists) {
    return <CircularProgress />;
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">Artists</Typography>
      </Grid>
      <Grid item container spacing={2}>
        {artists.length > 0 ? (
          artists.map((artist) => (
            <ArtistItem
              key={artist._id}
              artistId={artist._id}
              title={artist.title}
              information={artist.information}
              image={artist.image}
              isPublished={artist.isPublished}
              onDelete={() => handleDelete(artist._id)}
              ontogglePublish={() => handleTogglePublish(artist._id)}
              isLoading={artist._id === isLoadingDelete}
              isPublish={artist._id === isLoadingPublish}
              userId={artist.user._id}
            />
          ))
        ) : (
          <Typography>No artists available</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Artists;
