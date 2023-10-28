// menuItems.js
import React from 'react';
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  UserAddOutlined, // Icon for Add Image
  PictureOutlined, // Icon for View Image
  SettingOutlined, // Icon for Configuration
} from '@ant-design/icons';

export const items = [
  {
    label: 'Add Image',
    key: '1',
    icon: <UserAddOutlined />, // Using UserAddOutlined for Add Image
    link: '/add-image'
  },
  {
    label: 'View Image',
    key: '2',
    icon: <PictureOutlined />, // Using PictureOutlined for View Image
    link: '/view-image'
  },
  {
    label: 'Configuration',
    key: '3',
    icon: <SettingOutlined />, // Using SettingOutlined for Configuration
    link: '/prod-config'
  },
];

export default items;
