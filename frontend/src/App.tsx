import { Route, Routes } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';

import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Artists from './features/artists/Artists.tsx';
import Albums from './features/albums/Albums.tsx';
import Tracks from './features/tracks/Tracks.tsx';
import Register from './features/users/Register.tsx';
import Login from './features/users/Login.tsx';
import TrackHistory from './features/TracksHistory/TrackHistory.tsx';
import NewArtist from './features/artists/NewArtist.tsx';
import NewAlbum from './features/albums/NewAlbum.tsx';
import NewTrack from './features/tracks/NewTrack.tsx';

const App = () => {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Artists />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artists/new" element={<NewArtist />} />
            <Route path="/albums/new" element={<NewAlbum />} />
            <Route path="/tracks/new" element={<NewTrack />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/track-history/:trackId" element={<TrackHistory />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
