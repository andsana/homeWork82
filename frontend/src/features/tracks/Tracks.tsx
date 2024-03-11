import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CircularProgress, Grid, Typography } from '@mui/material';
import TrackItem from './components/TrackItem.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchTracks } from './tracksThunks';
import { selectTracks, selectTracksFetching } from './tracksSlice.ts';
import { addTrackToHistory } from '../TracksHistory/TracksHistoryThunks.ts';
import { selectAddingTrackId } from '../TracksHistory/TracksHistorySlice.ts';

const Tracks = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const albumId = searchParams.get('album') || '';

  const tracks = useAppSelector(selectTracks);
  const isLoadingTracks = useAppSelector(selectTracksFetching);
  const isAddTrackToHistory = useAppSelector(selectAddingTrackId);

  const albumTitle = tracks.length > 0 ? tracks[0].album.title : 'Unknown Album';
  const artistTitle = tracks.length > 0 ? tracks[0].album.artist.title : 'Unknown Artist';

  useEffect(() => {
    if (albumId) {
      dispatch(fetchTracks(albumId));
    }
  }, [dispatch, albumId]);

  const handlePlay = (trackId: string, link: string) => {
    dispatch(addTrackToHistory({ trackId }));
    if (link) {
      dispatch(addTrackToHistory({ trackId }));
      window.open(link, '_blank');
    } else {
      dispatch(addTrackToHistory({ trackId }));
    }
  };

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
              onPlay={handlePlay}
              trackId={track._id}
              isLoading={track._id === isAddTrackToHistory}
              link={track.link}
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
