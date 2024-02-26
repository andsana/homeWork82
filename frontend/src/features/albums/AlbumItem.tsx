import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardMedia, Grid, styled } from '@mui/material';

import imageNotAvailable from '../../assets/images/image_not_available.png';
import { apiURL } from '../../constants.ts';
import './AlbumItem.css';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  id: string;
  title: string;
  image: string | null;
  releaseYear: number;
}

const AlbumItem: React.FC<Props> = ({ id, title, image, releaseYear }) => {
  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  return (
    <Grid item sm md={6} lg={4}>
      <Link
        to={'/tracks/' + id}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Card className="card-album">
          <ImageCardMedia image={cardImage} title={title} />
          <CardActions className="card-actions">
            <span className="card-item card-album-title">{title}</span>
            <span className="card-item card-album-releaseYear">
              {releaseYear}
            </span>
          </CardActions>
        </Card>
      </Link>
    </Grid>
  );
};

export default AlbumItem;
