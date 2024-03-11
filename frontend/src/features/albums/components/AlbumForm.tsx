import React, { useEffect, useMemo, useState } from 'react';
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import { AlbumMutation } from '../../../types';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../users/usersSlice.ts';
import { selectArtists } from '../../artists/artistsSlise.ts';
import { fetchArtists } from '../../artists/artistsThunks.ts';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

interface Props {
  onSubmit: (mutation: AlbumMutation) => void;
  isEdit?: boolean;
  initialAlbum?: AlbumMutation;
  existingImage?: string | null;
  isLoadingArtists: boolean;
  isCreatingAlbum: boolean;
}

const initialState = {
  artist: '',
  title: '',
  releaseYear: '',
  image: null,
  isPublished: false,
};

const AlbumForm: React.FC<Props> = ({
  onSubmit,
  isEdit = false,
  initialAlbum = initialState,
  existingImage,
  isCreatingAlbum,
  isLoadingArtists,
}) => {
  const [state, setState] = useState<AlbumMutation>(initialAlbum);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const artists = useAppSelector(selectArtists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setState((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setState((prevState) => {
        return { ...prevState, [name]: value };
      });
    }
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const selectedFileName = useMemo(() => {
    if (state.image instanceof File) {
      return state.image.name;
    } else if (state.image === 'delete') {
      return undefined;
    } else if (existingImage) {
      return existingImage;
    }
  }, [state.image, existingImage]);

  const onImageClear = () => {
    setState((prev) => ({
      ...prev,
      image: 'delete',
    }));
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        {isLoadingArtists ? (
          <CircularProgress />
        ) : (
          <Grid item xs>
            <TextField
              select
              id="artist"
              label="Artist"
              value={artists.length > 0 ? state.artist : ''}
              onChange={inputChangeHandler}
              name="artist"
              required
            >
              <MenuItem value="" disabled>
                Please select a artist
              </MenuItem>
              {artists.length > 0 &&
                artists.map((artist) => (
                  <MenuItem key={artist._id} value={artist._id}>
                    {artist.title}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
        )}

        <Grid item xs>
          <TextField
            id="title"
            label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="releaseYear"
            label="Release year"
            value={state.releaseYear}
            onChange={inputChangeHandler}
            name="releaseYear"
            required
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
            filename={selectedFileName}
            onClear={onImageClear}
          />
        </Grid>

        {user && user.role === 'admin' && (
          <Grid item xs>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.isPublished}
                  onChange={inputChangeHandler}
                  name="isPublished"
                />
              }
              label="Publish"
            />
          </Grid>
        )}

        <Grid item xs>
          <LoadingButton
            loading={isCreatingAlbum}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            color="primary"
            variant="outlined"
            type="submit"
          >
            {isEdit ? 'Edit' : 'Create'}
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default AlbumForm;
