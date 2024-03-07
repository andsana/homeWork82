import React from 'react';
import { Card, CardActions, Grid } from '@mui/material';
import './TrackItem.css';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../users/usersSlice.ts';
import { LoadingButton } from '@mui/lab';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

interface Props {
  number: number;
  title: string;
  duration: string;
  trackId: string;
  onPlay: (trackId: string) => void;
  isLoading: boolean;
}

const TrackItem: React.FC<Props> = ({
  number,
  title,
  duration,
  trackId,
  onPlay,
  isLoading,
}) => {
  const user = useAppSelector(selectUser);

  return (
    <Grid item sm md={6} lg={4}>
      <Card className="card-track">
        <CardActions
          className="card-actions"
          style={{ justifyContent: 'center' }}
        >
          <span className="card-item card-track-title">{title}</span>
          <span className="card-item card-track-number">
            Track number: {number}
          </span>
          <span className="card-item card-track-releaseYear">{duration}</span>
        </CardActions>
        {user && (
          <CardActions
            className="card-actions"
            style={{ justifyContent: 'center' }}
          >
            <LoadingButton
              onClick={() => onPlay(trackId)}
              loading={isLoading}
              loadingPosition="start"
              startIcon={<PlayCircleFilledIcon />}
              color="primary"
              variant="outlined"
              type="submit"
            >
              Play
            </LoadingButton>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
};

export default TrackItem;
