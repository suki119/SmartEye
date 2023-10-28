// menuItems.js
import React from 'react';
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons';

export const items = [
  {
    label: 'Add Image',
    key: '1',
    icon: <PieChartOutlined />,
    link: '/add-image'
  },
  {
    label: 'View Image',
    key: '2',
    icon: <PieChartOutlined />,
    link: '/view-image'
  },
  {
    label: 'Configaration',
    key: '3',
    icon: <PieChartOutlined />,
    link: '/prod-config'
  },

  
];


// // menuItems.js
// import React from 'react';
// import {
//   PieChartOutlined,
//   DesktopOutlined,
//   UserOutlined,
//   TeamOutlined,
//   FileOutlined,
// } from '@ant-design/icons';

// export const items = [
//   {
//     label: 'Add Image',
//     key: '1',
//     icon: <PieChartOutlined />,
//     link: '/add-image'
//   },

//   {
//     label: 'Product',
//     key: '2',
//     icon: <DesktopOutlined />,
//     link: '/product'
//   },

//   {
//     label: 'Product',
//     key: 'sub1',
//     icon: <UserOutlined />,
//     children: [
//       { label: 'All Products', key: '3', link: '/product', icon: <UserOutlined />, },
//       { label: 'Add Product', key: '4', link: '/add-product', icon: <UserOutlined />, },

//     ],
//   },

//   {
//     label: 'Team',
//     key: 'sub2',
//     icon: <TeamOutlined />,
//     children: [
//       { label: 'Team 1', key: '6', link: '/home' },
//       { label: 'Team 2', key: '8', link: '/home' },
//     ],
//   },

//   {
//     label: 'Files',
//     key: '9',
//     icon: <FileOutlined />,
//     link: '/home'
//   },
// ];
