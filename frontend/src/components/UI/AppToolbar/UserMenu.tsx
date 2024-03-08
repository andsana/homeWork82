import React, { useState } from 'react';
import { User } from '../../../types';
import { Button, Menu, MenuItem } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../features/users/usersThunk.ts';
import { Link } from 'react-router-dom';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Button color="inherit" component={Link} to="/track-history/:id">
        Track History
      </Button>
      <Button color="inherit" component={Link} to="/artists/new">
        Add artist
      </Button>
      <Button color="inherit" onClick={handleClick}>
        Hello, {user.username}!
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
