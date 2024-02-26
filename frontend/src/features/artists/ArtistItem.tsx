import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardMedia, Grid, styled } from '@mui/material';

import imageNotAvailable from '../../assets/images/image_not_available.png';
import { apiURL } from '../../constants.ts';
import './ArtistItem.css';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  title: string;
  id: string;
  image: string | null;
}

const ArtistItem: React.FC<Props> = ({ title, id, image }) => {
  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  return (
    <Grid item sm md={6} lg={4}>
      <Link
        to={'/artists/' + id + '/albums'}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Card className="card-artist">
          <ImageCardMedia image={cardImage} title={title} />
          <CardActions>{title}</CardActions>
        </Card>
      </Link>
    </Grid>
  );
};

export default ArtistItem;
