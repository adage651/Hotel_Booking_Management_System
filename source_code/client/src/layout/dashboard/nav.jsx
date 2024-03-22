import {useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from '../../routes/hooks';
import { RouterLink } from '../../routes/components';

import { useResponsive } from '../../hooks/use-responsive';

import { account } from '../../_mock/account';

import Logo from '../../components/logo';
import Scrollbar from '../../components/scrollbar';

import { NAV } from './config-layout';
//import navConfig from './config-navigation';

import SvgColor from '../../components/svg-color';
import {ReactComponent as ReservationIcon} from '../../icons/reservation1.svg'
import 'primeicons/primeicons.css';
import UserContext from '../../context/userContext';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();
  const ctx=useContext(UserContext);
  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);


  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={ctx.profilePicture} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{ctx.firstName}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {ctx.user_type}
        </Typography>
      </Box>
    </Box>
  );



// const navConfig = [
//   {
//     title: 'dashboard',
//     path: '/',
//     icon: icon('ic_analytics'),
//   },
//   {
//     title: 'Reservation',
//     path: '/user',
//     icon:icon('reservation1')//<ReservationIcon style={{ width: '20px', height: '20px' }}/>,
//   },
//   {
//     title: 'Manage rooms',
//     path: '/products',
//     icon: icon('ic_cart'),
//   },
//   {
//     title: 'Analytics',
//     path: '/blog',
//     icon: icon('ic_blog'),
//   },
//   {
//     title: 'Reports',
//     path: '/login',
//     icon: icon('ic_lock'),
//   },
//   {
//     title: 'Guest review',
//     path: '/404',
//     icon: icon('ic_disabled'),
//   },
//    {
//     title: 'Notification',
//     path: '/404',
//     icon: icon('ic_disabled'),
//   },
//   {
//     title: 'Compliments',
//     path: '/404',
//     icon: icon('ic_disabled'),
//   }
// ];

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);


const navConfig=ctx.navConfig.map((item)=>{ return {...item,icon:icon(item.icon)} })



  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );


  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />

    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      to={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
