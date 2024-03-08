import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';
import { apiURL } from '../../constants.ts';
import dayjs from 'dayjs';

interface Props {
  artistName: string;
  trackTitle: string;
  datetime: Date;
  albumImage: string;
}

const TrackHistoryItem: React.FC<Props> = ({ artistName, trackTitle, datetime, albumImage }) => {
  const cardImage = apiURL + '/' + albumImage;
  const formattedDate = dayjs(datetime).format('MM/DD/YYYY h:mm A');

  return (
    <Grid item xs={12} sm={12} md={6} lg={6}>
      <Card sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {trackTitle}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {artistName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {formattedDate}
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
          <CardMedia component="img" sx={{ width: 151 }} image={cardImage} alt="album image" />
        </Box>
      </Card>
    </Grid>
  );
};

export default TrackHistoryItem;
