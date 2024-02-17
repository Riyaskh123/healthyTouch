// assets
import {IconAd2,IconNote,IconDiscount2 } from '@tabler/icons';

// constant
const icons = {
  IconNote,
  IconAd2,
  IconDiscount2
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'advertisement',
      title: 'Advertisements',
      type: 'item',
      url: '/advertisement',
      icon: icons.IconAd2,
    },
    {
      id: 'log',
      title: 'Log',
      type: 'item',
      url: '/logs',
      icon: icons.IconNote,
    },
    {
      id: 'offer',
      title: 'Offers',
      type: 'item',
      url: '/offers',
      icon: icons.IconDiscount2,
    }
  ]
};

export default pages;
