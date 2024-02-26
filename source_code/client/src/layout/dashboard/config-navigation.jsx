import SvgColor from '../../components/svg-color';

import 'primeicons/primeicons.css';
        
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Reservation',
    path: '/user',
    icon: <i className="pi pi-calendar-plus" style={{ fontSize: '1.3rem' }}></i>,
  },
  {
    title: 'Manage rooms',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Analytics',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'Reports',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Guest review',
    path: '/404',
    icon: icon('ic_disabled'),
  },
   {
    title: 'Notification',
    path: '/404',
    icon: icon('ic_disabled'),
  },
  {
    title: 'Compliments',
    path: '/404',
    icon: icon('ic_disabled'),
  }
];

export default navConfig;
