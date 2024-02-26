import React from 'react';
import { Card, CardActions, Grid } from '@mui/material';
import './TrackItem.css';

interface Props {
  number: number;
  title: string;
  duration: string;
}

const TrackItem: React.FC<Props> = ({ number, title, duration }) => {
  return (
    <Grid item sm md={6} lg={4}>
      <Card className="card-track">
        <CardActions className="card-actions">
          <span className="card-item card-track-number">
            Track number: {number}
          </span>
          <span className="card-item card-track-title">{title}</span>
          <span className="card-item card-track-releaseYear">{duration}</span>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default TrackItem;
