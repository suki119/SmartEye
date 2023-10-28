
import React, { useState } from 'react';


import { Layout, Menu, Button, theme } from 'antd';


import SidebarMenu from './SidebarMenu ';


const { Header, Sider, Content } = Layout;

function Sidebar({collapsed, onCollapse ,isDarkMode}) {

   
    const {
      token: { colorBgContainer },
    } = theme.useToken();

    

    return (
        <Sider trigger={null} collapsible collapsed={collapsed} 
        style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            transition: 'width 0.3s ease',
            scrollbarwidth: "thin",
            scrollbarcolor: "#ccc #fff",
            background: isDarkMode ? 'var(--content-container-bg-dark)' : '#5b2f84',
          }}>
  
          <div className="demo-logo-vertical">
  
            {/* Add your image here */}
            <img
              style={{ width: '-webkit-fill-available' }}
              src="https://res.cloudinary.com/colouration/image/upload/v1697583125/ideogram_3_q970bm.jpg" alt="Logo" className="logo" />
          </div>
          <SidebarMenu isDarkMode={isDarkMode}/>
        </Sider>
    );
}

export default Sidebar;