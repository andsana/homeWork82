import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { Album, Artist, TrackMutation } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectArtists, selectArtistsLoading } from '../../artists/artistsSlise.ts';
import { selectAlbums, selectAlbumsFetching } from '../../albums/albumsSlise.ts';
import { fetchArtists } from '../../artists/artistsThunks.ts';
import { fetchAlbums } from '../../albums/albumsThunks.ts';

interface Props {
  onSubmit: (mutation: TrackMutation) => void;
  isEdit?: boolean;
  initialTrack?: TrackMutation;
  existingImage?: string | null;
  isCreatingTrack: boolean;
}

const initialState = {
  artist: '',
  album: '',
  title: '',
  duration: '',
  number: '',
  isPublished: false,
  link: '',
};

const TrackForm: React.FC<Props> = ({
  onSubmit,
  isEdit = false,
  initialTrack = initialState,
  isCreatingTrack,
}) => {
  const [state, setState] = useState<TrackMutation>(initialTrack);
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const albums = useAppSelector(selectAlbums);
  const isLoadingArtists = useAppSelector(selectArtistsLoading);
  const isLoadingAlbums = useAppSelector(selectAlbumsFetching);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  useEffect(() => {
    if (state.artist) {
      dispatch(fetchAlbums(state.artist));
    }
  }, [dispatch, state.artist]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container spacing={2} direction="column">
        {isLoadingArtists ? (
          <CircularProgress />
        ) : (
          <Grid item>
            <TextField
              select
              label="Artist"
              value={state.artist}
              onChange={inputChangeHandler}
              name="artist"
              fullWidth
            >
              {artists.map((artist: Artist) => (
                <MenuItem key={artist._id} value={artist._id}>
                  {artist.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}

        {isLoadingAlbums ? (
          <CircularProgress />
        ) : (
          <Grid item>
            <TextField
              select
              label="Album"
              value={state.album}
              onChange={inputChangeHandler}
              name="album"
              fullWidth
              disabled={!state.artist}
            >
              {albums.map((album: Album) => (
                <MenuItem key={album._id} value={album._id}>
                  {album.title}
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
            value={state.number}
            onChange={inputChangeHandler}
            name="releaseYear"
            type="number"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="duration"
            label="Duration"
            value={state.duration}
            onChange={inputChangeHandler}
            name="duration"
            type="string"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="link"
            label="Duration"
            value={state.link}
            onChange={inputChangeHandler}
            name="link"
            type="string"
          />
        </Grid>

        <Grid item>
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

        <Grid item>
          <LoadingButton
            startIcon={<SaveIcon />}
            loading={isCreatingTrack}
            variant="contained"
            type="submit"
          >
            {isEdit ? 'Edit Track' : 'Create Track'}
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default TrackForm;
