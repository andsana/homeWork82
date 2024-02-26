import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useAppDispatch, useAppSelector } from '../../../../../Projects/music-app/frontend/src/app/hooks';
import { fetchTracks } from './tracksThunks';
import { selectTracks, selectTracksFetching } from './tracksSlice.ts';
import TrackItem from './TrackItem.tsx';

const Tracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const tracksLoading = useAppSelector(selectTracksFetching);
  const { albumId } = useParams();

  useEffect(() => {
    dispatch(fetchTracks(albumId));
  }, [dispatch, albumId]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container>
        <Typography variant="h4"></Typography>
      </Grid>
      <Grid item container spacing={2}>
        {tracksLoading ? (
          <CircularProgress />
        ) : (
          tracks.map((track) => (
            <TrackItem
              key={track._id}
              number={track.number}
              title={track.title}
              duration={track.duration}
            />
          ))
        )}
      </Grid>
    </Grid>
  );
};

export default Tracks;
