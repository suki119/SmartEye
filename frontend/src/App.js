import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, Button, theme, ConfigProvider } from 'antd';
import Sidebar from './component/sidebar';
import AppHeader from './component/Hedder/Header';
import CustomRoute from './utils/CustomRoute ';
import '../src/styles/variables.css';
import addImage from './pages/AddImage/addImage';
import ViewAllImages from './pages/AddImage/ViewAllImages';
import LoginPage from './pages/LoginPage'; // Import your Login Page component here
import accountMain from './pages/account/accountMain';
import productListMain from './pages/product/productListMain';
import AddProductMain from './pages/product/AddProductMain';
import Configaration from './pages/Config/Configaration';

const { Header, Sider, Content, Footer } = Layout;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { defaultAlgorithm, darkAlgorithm } = theme;

  useEffect(() => {
    const lUser = JSON.parse(localStorage.getItem("user"));
    if (lUser) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const renderMainContent = (
    <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 200 }}>
      <AppHeader
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        onToggleDarkMode={(value) => setIsDarkMode(value)}
        setIsAuthenticated={setIsAuthenticated}
      />

      <div style={{
        margin: '5px 16px',
        overflow: 'initial',
      }}>
        <Switch>
          <CustomRoute
            exact
            path="/account"
            component={accountMain}
            isDarkMode={isDarkMode}
          />
          <CustomRoute
            exact
            path="/product"
            component={productListMain}
            isDarkMode={isDarkMode}
          />
          <CustomRoute
            exact
            path="/add-image"
            component={addImage}
            isDarkMode={isDarkMode}
          />
          <CustomRoute
            exact
            path="/view-image"
            component={ViewAllImages}
            isDarkMode={isDarkMode}
          />

          <CustomRoute
            exact
            path="/prod-config"
            component={Configaration}
            isDarkMode={isDarkMode}
          />


        </Switch>
      </div>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        #sukithadhamsara ©2023 Created by SDD
      </Footer>
    </Layout>
  );

  const renderLoginContent = (
    <Switch>
      <Route
        exact
        path="/login"
        render={() => <LoginPage setIsAuthenticated={setIsAuthenticated} />}
      />
    </Switch>
  );

  return (
    <Router>
      <ConfigProvider theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}>
        <Layout>
          {isAuthenticated ? (
            <Sidebar collapsed={collapsed} isDarkMode={isDarkMode} />
          ) : null}

          {isAuthenticated ? renderMainContent : renderLoginContent}

          {!isAuthenticated && <div>GO TO LOGIN 404</div>}
        </Layout>
      </ConfigProvider>
    </Router>
  );
}

export default App;
