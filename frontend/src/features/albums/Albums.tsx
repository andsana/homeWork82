import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAlbums } from './albumsThunks';
import {
  selectAlbums,
  selectAlbumsFetching,
  selectDeleteAlbumLoading,
  selectToggleAlbumPublishStatusLoading,
} from './albumsSlise.ts';
import AlbumItem from './components/AlbumItem.tsx';
// import { selectArtistById } from '../artists/artistsSlise.ts';
import { deleteArtist, toggleArtistPublishStatus } from '../artists/artistsThunks.ts';
import { Album } from '../../types';

const Albums = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const artistId = queryParams.get('artist');

  const albums = useAppSelector(selectAlbums);
  const isLoadingAlbums = useAppSelector(selectAlbumsFetching);
  const isLoadingPublish = useAppSelector(selectToggleAlbumPublishStatusLoading);
  const isLoadingDelete = useAppSelector(selectDeleteAlbumLoading);

  useEffect(() => {
    if (artistId) {
      dispatch(fetchAlbums(artistId));
    }
  }, [dispatch, artistId]);

  const handleDelete = (albumId: string) => {
    if (albumId && confirm('Are you sure you want to delete this album?')) {
      dispatch(deleteArtist(albumId));
    }
  };

  const handleTogglePublish = (albumId: string) => {
    if (
      albumId &&
      confirm('Are you sure you want to change the publication status of this album?')
    ) {
      dispatch(toggleArtistPublishStatus(albumId));
    }
  };

  if (isLoadingAlbums) {
    return (
      <Grid container>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container>
        {/*<Typography variant="h4">{artist?.title || 'No artist title'}</Typography>*/}
      </Grid>
      <Grid item container spacing={2}>
        {albums.length > 0 ? (
          albums.map((album: Album) => (
            <AlbumItem
              key={album._id}
              albumId={album._id}
              artistId={album.artist._id}
              title={album.title}
              image={album.image}
              releaseYear={album.releaseYear}
              trackCount={album.trackCount}
              isPublished={album.isPublished}
              onDelete={() => handleDelete(album._id)}
              ontogglePublish={() => handleTogglePublish(album._id)}
              isLoading={album._id === isLoadingDelete}
              isPublish={album._id === isLoadingPublish}
              userId={album.user._id}
            />
          ))
        ) : (
          <Typography>No albums available</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Albums;
