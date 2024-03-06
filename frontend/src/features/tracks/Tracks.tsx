import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchTracks } from './tracksThunks';
import TrackItem from './TrackItem.tsx';
import { selectTracks, selectTracksFetching } from './tracksSlice.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';

const Tracks = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const albumId = searchParams.get('album') || '';
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const isLoadingTracks = useAppSelector(selectTracksFetching);

  const albumTitle =
    tracks.length > 0 ? tracks[0].album.title : 'Unknown Album';
  const artistTitle =
    tracks.length > 0 ? tracks[0].album.artist.title : 'Unknown Artist';

  useEffect(() => {
    dispatch(fetchTracks(albumId));
  }, [dispatch, albumId]);

  if (isLoadingTracks) {
    return (
      <Grid container>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">{artistTitle}</Typography>
        <Typography variant="h5">album: {albumTitle}</Typography>
      </Grid>
      <Grid item container spacing={2}>
        {tracks.length > 0 ? (
          tracks.map((track) => (
            <TrackItem
              key={track._id}
              number={track.number}
              title={track.title}
              duration={track.duration}
            />
          ))
        ) : (
          <Typography>No tracks available</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Tracks;
