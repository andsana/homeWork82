import { Typography } from '@mui/material';
import ArtistForm from './components/ArtistForm';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { createArtist } from './artistsThunks';
import { ArtistMutation } from '../../types';

const NewArtist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (artistMutation: ArtistMutation) => {
    try {
      await dispatch(createArtist(artistMutation)).unwrap();
      navigate('/');
    } catch {
      //
    }
  };

  return (
    <>
      <Typography variant="h4">New artist</Typography>
      <ArtistForm onSubmit={onFormSubmit} />
    </>
  );
};

export default NewArtist;
