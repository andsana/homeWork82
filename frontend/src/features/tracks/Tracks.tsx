import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchTracks } from './tracksThunks';

import TrackItem from './TrackItem.tsx';
import { selectTracks, selectTracksFetching } from './tracksSlice.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';

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
