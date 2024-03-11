import React, { useMemo, useState } from 'react';
import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { ArtistMutation } from '../../../types';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../users/usersSlice.ts';

interface Props {
  onSubmit: (mutation: ArtistMutation) => void;
  isEdit?: boolean;
  initialArtist?: ArtistMutation;
  existingImage?: string | null;
}

const initialState = {
  title: '',
  information: '',
  image: null,
  isPublished: false,
};

const ArtistForm: React.FC<Props> = ({
  onSubmit,
  isEdit = false,
  initialArtist = initialState,
  existingImage,
}) => {
  const [state, setState] = useState<ArtistMutation>(initialArtist);
  const user = useAppSelector(selectUser);

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
            id="information"
            label="Information"
            value={state.information}
            onChange={inputChangeHandler}
            name="information"
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
          <Button type="submit" color="primary" variant="contained">
            {isEdit ? 'Edit' : 'Create'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ArtistForm;
