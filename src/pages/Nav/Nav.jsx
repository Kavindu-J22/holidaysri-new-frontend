import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from '../../assets/Hsllogo.png';
import { Link, useNavigate } from 'react-router-dom'; // added useNavigate

const pages = ['Home', 'Destinations', 'Post Advertisement'];
const pageRoutes = ['/', '/all-locations', '/foreign-dashboard']; // no change here

function Nav() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate(); // added useNavigate hook

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePostAdClick = () => {
    const userRole = localStorage.getItem('userRole'); // checking localStorage for userRole
    if (userRole === 'seller') {
      navigate('/foreign-dashboard'); // redirect to /foreign-dashboard if userRole is seller
    } else if (userRole === 'agent') {
      navigate('/local-dashboard'); // redirect to /local-dashboard if userRole is agent
    } else {
      navigate('/access'); // redirect to /access if userRole is neither seller nor agent
    }
  };

  return (
    <AppBar position="fixed" sx={{ height: '70px', backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ width: '40px' }}>
            <a href='/'><img src={Logo} style={{ width: '100%', height: '100%' }} alt='logo' /></a>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, marginLeft: { lg: '50px', xs: '30px' } }}>
            {pages.map((page, index) => (
              page === 'Post Advertisement' ? (
                <Button
                  key={page}
                  onClick={handlePostAdClick} // added custom onClick handler for Post Advertisement
                  sx={{ my: 2, color: 'white', display: 'block', fontSize: { lg: '16px', xs: '10px' } }}
                >
                  {page}
                </Button>
              ) : (
                <Link key={page} to={pageRoutes[index]} style={{ textDecoration: 'none' }}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block', fontSize: { lg: '16px', xs: '10px' } }}
                  >
                    {page}
                  </Button>
                </Link>
              )
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nav;
