import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { selectTracksFetching } from '../tracks/tracksSlice.ts';
import { fetchTracksHistory } from './TracksHistoryThunks.ts';
import { selectTracksHistory } from './TracksHistorySlice.ts';
import { CircularProgress, Grid, Typography } from '@mui/material';
import TrackHistoryItem from './TrackHistoryItem.tsx';
import { selectUser } from '../users/usersSlice.ts';
import { useNavigate } from 'react-router-dom';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const tracksHistory = useAppSelector(selectTracksHistory);
  const user = useAppSelector(selectUser);
  const isLoadingTrackHistory = useAppSelector(selectTracksFetching);
  const navigate = useNavigate();

  useEffect(() => {
    if (!tracksHistory.length) {
      dispatch(fetchTracksHistory());
    }
  }, [dispatch, tracksHistory.length]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (isLoadingTrackHistory) {
    return (
      <Grid container>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        {tracksHistory.length > 0 && (
          <Typography variant="h4" gutterBottom>
            Track history
          </Typography>
        )}
        <Grid item container spacing={2}>
          {tracksHistory.length > 0 ? (
            tracksHistory.map((trackHistory) => (
              <TrackHistoryItem
                key={trackHistory._id}
                artistName={trackHistory.artistName}
                trackTitle={trackHistory.trackTitle}
                albumImage={trackHistory.albumImage}
                datetime={trackHistory.datetime}
              />
            ))
          ) : (
            <Typography variant="h4">No tracks available</Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TrackHistory;
