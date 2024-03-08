import React from 'react';
import { Box, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import './TrackItem.css';
import { LoadingButton } from '@mui/lab';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../users/usersSlice.ts';

interface Props {
  number: number;
  title: string;
  duration: string;
  trackId: string;
  onPlay: (trackId: string, link: string) => void;
  isLoading: boolean;
  link: string;
}

const TrackItem: React.FC<Props> = ({
  number,
  title,
  duration,
  trackId,
  onPlay,
  isLoading,
  link,
}) => {
  const user = useAppSelector(selectUser);

  return (
    <Grid item xs={12} sm={12} md={6} lg={6}>
      <Card sx={{ display: 'flex' }}>
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <LoadingButton
              size="small"
              aria-label="play/pause"
              onClick={() => onPlay(trackId, link)}
              loading={isLoading}
              loadingPosition="center"
              variant="contained"
            >
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </LoadingButton>
          </Box>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Track number: {number}
            </Typography>
          </CardContent>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
            pr: 1,
            pb: 1,
          }}
        >
          <CardActions>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {duration}
            </Typography>
          </CardActions>
        </Box>
      </Card>
    </Grid>
  );
};
export default TrackItem;
