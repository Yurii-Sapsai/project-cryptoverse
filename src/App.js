import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import logo from './images/cryptocurrency.png'

import Home from './components/Home/Home';
import Cryptocurrencies from './components/Cryptocurrencies/Cryptocurrencies'
import Exchanges from './components/Exchanges/Exchanges';
import News from './components/News/News';
import CryptoDetails from './components/CryptoDetails/CryptoDetails';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { NavLink } from 'react-router-dom';


const drawerWidth = 240;

export default function App(props) {

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        {['Home', 'Cryptocurrencies', 'Exchanges', 'News'].map((text, index) => (
          <NavLink to={text} style={{textDecoration:"none", color: "white"}}>
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 ? <HomeIcon style={{ color: 'white' }} /> : null}
                  {index === 1 ? <BarChartIcon style={{ color: 'white' }} /> : null}
                  {index === 2 ? <CurrencyExchangeIcon style={{ color: 'white' }} /> : null}
                  {index === 3 ? <NewspaperIcon style={{ color: 'white' }} /> : null}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Router>

      <Box sx={{ display: 'flex', padding: '0px', paddingTop: { xs: '55px', sm: '0px' } }} >

        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },

          }}
        >
          <Toolbar style={{ backgroundColor: '#001226' }} sx={{ display: { sm: 'none' } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <img src={logo} alt="logo" style={{ height: '40px', marginRight: '10px' }} />
            <Typography variant="h6" noWrap component="div">
              Сryptoverse
            </Typography>
          </Toolbar>
        </AppBar>


        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
          <Drawer 
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#001226' },
            }}
          >
            {drawer}
          </Drawer>

          <Drawer 
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#001226' },
            }}
            open
          >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '18px 0px' }}>
              <img src={logo} alt="logo" style={{ width: '40px', marginRight: '10px' }} />
              <Typography variant="h6" noWrap component="div" style={{ color: 'white' }}>
                Сryptoverse
              </Typography>
            </div>
            {drawer}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', marginTop: '50px', gap: '10px' }}>
              <FacebookIcon />
              <InstagramIcon />
              <TwitterIcon />
              <PinterestIcon />
            </div>
          </Drawer>

        </Box>


        <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` }, height:"100%", backgroundColor:"#f1f2f5" }} >
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/news" element={<News />} />
              <Route path="/home" element={<Home />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
            </Routes>
          </main>
        </Box>

      </Box>
    </Router>
  );
}