import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ProfileIconButton = styled(IconButton)(({ theme }) => ({
  marginLeft: 'auto', // Push the icon to the right
}));


const NavBar = ( ) =>  {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
        // handleMobileMenuClose();
      };
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
      );
  return (
  <>
  <Box sx={{flexGrow: 1}}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{textAlign:'center'}}>
            Invoices
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <ProfileIconButton
            size="large"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            onClick={handleProfileMenuOpen}
          >
            <AccountCircle />
          </ProfileIconButton>
        </Toolbar>
      </AppBar>

  </Box>
      {renderMenu}
    </>
  );
}
export default NavBar;