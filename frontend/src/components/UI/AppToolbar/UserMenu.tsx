import React, { useState } from 'react';
import { User } from '../../../types';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../features/users/usersThunks.ts';
import { Link, useNavigate } from 'react-router-dom';
import { apiURL } from '../../../constants.ts';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const avatar = apiURL + '/' + user.image;

  return (
    <>
      <Button color="inherit" component={Link} to="/track-history/:id">
        Track History
      </Button>
      <Button color="inherit" component={Link} to="/artists/new">
        Add artist
      </Button>
      <Button color="inherit" component={Link} to="/albums/new">
        Add album
      </Button>
      <Button color="inherit" component={Link} to="/tracks/new">
        Add track
      </Button>
      <Button color="inherit" onClick={handleClick}>
        Hello, {user.displayName}!
      </Button>
      <Avatar alt="avatar" src={avatar} />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
