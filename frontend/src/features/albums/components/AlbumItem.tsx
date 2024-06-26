import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import imageNotAvailable from '../../../assets/images/image_not_available.png';
import { apiURL } from '../../../constants.ts';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../users/usersSlice.ts';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  title: string;
  releaseYear: number;
  image: string | null;
  isPublished: boolean;
  artistId: string;
  albumId: string;
  userId: string;
  onDelete: (albumId: string) => void;
  ontogglePublish: (albumId: string) => void;
  isLoading: boolean;
  isPublish: boolean;
  totalTracks: number;
}

const AlbumItem: React.FC<Props> = ({
  title,
  releaseYear,
  image,
  isPublished,
  isPublish,
  onDelete,
  ontogglePublish,
  albumId,
  userId,
  isLoading,
  totalTracks,
}) => {
  const user = useAppSelector(selectUser);
  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  return (
    <Grid item xs={12} sm={6} md={3} lg={3}>
      <Card
        sx={{
          maxWidth: 345,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Link to={`/tracks?album=${albumId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={cardImage}
              alt={title}
              sx={{
                size: 'cover',
                width: '100%',
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {releaseYear}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                total tracks: {totalTracks}
              </Typography>
              {user && (user._id === userId || user.role === 'admin') && (
                <Typography variant="body2" color="text.secondary">
                  {isPublished ? '' : 'not published'}
                </Typography>
              )}
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions sx={{ mt: 'auto' }}>
          {user && user.role === 'admin' && (
            <LoadingButton
              size="small"
              color="primary"
              onClick={() => ontogglePublish(albumId)}
              loading={isPublish}
              loadingPosition="start"
              startIcon={isPublished ? <SaveIcon /> : <DeleteIcon />}
              variant="contained"
            >
              <span>{isPublished ? 'Unpublish' : 'Publish'}</span>
            </LoadingButton>
          )}
          {user && !isPublished && (
            <LoadingButton
              size="small"
              color="primary"
              onClick={() => onDelete(albumId)}
              loading={isLoading}
              loadingPosition="start"
              startIcon={<DeleteIcon />}
              variant="contained"
            >
              <span>Delete</span>
            </LoadingButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AlbumItem;
