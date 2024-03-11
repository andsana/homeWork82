import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { AlbumMutation } from '../../types';
import { selectArtistsLoading } from '../artists/artistsSlise.ts';
import { selectAlbumsFetching } from '../albums/albumsSlise.ts';
import AlbumForm from '../albums/components/AlbumForm.tsx';
import { createAlbum } from '../albums/albumsThunks.ts';

const NewArtist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoadingArtists = useAppSelector(selectArtistsLoading);
  const isLoadingAlbums = useAppSelector(selectAlbumsFetching);

  const onFormSubmit = async (albumMutation: AlbumMutation) => {
    try {
      await dispatch(createAlbum(albumMutation)).unwrap();
      navigate('/tracks');
    } catch {
      //
    }
  };

  return (
    <>
      <Typography variant="h4">New Track</Typography>
      <AlbumForm
        onSubmit={onFormSubmit}
        isLoadingArtists={isLoadingArtists}
        isCreatingAlbum={isLoadingAlbums}
      />
    </>
  );
};

export default NewArtist;
