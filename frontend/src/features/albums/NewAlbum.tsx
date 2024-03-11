import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { AlbumMutation } from '../../types';
import { createAlbum } from './albumsThunks.ts';
import AlbumForm from './components/AlbumForm.tsx';
import { selectArtistsLoading } from '../artists/artistsSlise.ts';
import { selectAlbumCreating } from './albumsSlise.ts';

const NewArtist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoadingArtists = useAppSelector(selectArtistsLoading);
  const isCreatingAlbum = useAppSelector(selectAlbumCreating);

  const onFormSubmit = async (albumMutation: AlbumMutation) => {
    try {
      await dispatch(createAlbum(albumMutation)).unwrap();
      navigate('/albums/:artistId');
    } catch {
      //
    }
  };

  return (
    <>
      <Typography variant="h4">New album</Typography>
      <AlbumForm
        onSubmit={onFormSubmit}
        isLoadingArtists={isLoadingArtists}
        isCreatingAlbum={isCreatingAlbum}
      />
    </>
  );
};

export default NewArtist;
