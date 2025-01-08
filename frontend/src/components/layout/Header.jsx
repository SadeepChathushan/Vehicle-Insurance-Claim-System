import React, { useState, useEffect } from 'react';
import { Layout, Menu, Dropdown, Space } from 'antd';
import logo from '../../assets/images/cover360.png'; // path to logo file
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'; //notifications
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'; //account
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'; //logout
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'; //home

const { Header } = Layout;

const AppHeader = ({ onMenuClick }) => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [isSidebarFolded, setIsSidebarFolded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const logout = async () => {
    try {
      await signOut();
      navigate('/signin');
    } catch (error) {
      console.log('error', error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarFolded(prevState => !prevState);
    onMenuClick();
  };

  const getMenuItems = () => {
    const userRole = user.role; // Assuming user object has a role property

    const rolePaths = {
      'ADMIN': {
        home: '/admin/dashboard',
        // calendar: '/admin/full-calendar',
        // profile: `/admin/profile/${user.id}`,
      },
      'CLIENT': {
        home: '/client/dashboard',
        // calendar: '/client/full-calendar',
        // profile: `/client/profile/${user.id}`,
      },
      'DCADJUSTER': {
        home: '/dc-adjuster/dashboard',
        // calendar: '/dc-adjuster/full-calendar',
        // profile: `/dc-adjuster/profile/${user.id}`,
      },
      'HCADJUSTER': {
        home: '/hc-adjuster/dashboard',
        // calendar: '/hc-adjuster/full-calendar',
        // profile: `/hc-adjuster/profile/${user.id}`,
      }
    };

    const paths = rolePaths[userRole] || {};

    return [
      { key: paths.home, icon: <HomeOutlinedIcon style={{ fontSize: '18px', color: "#4e5052" }} />, label: 'Home' },
      // { key: paths.calendar, icon: <CalendarMonthOutlinedIcon style={{ fontSize: '18px', color: "#4e5052" }} />, label: 'Calendar' },
      // { key: paths.profile, icon: <PersonOutlineOutlinedIcon style={{ fontSize: '18px', color: "#4e5052" }} />, label: 'Profile' },
    ];
  };

  const menu = (
    <Menu>
      {getMenuItems().map(item => (
        <Menu.Item
          key={item.key}
          icon={item.icon}
          onClick={() => navigate(item.key)}
        >
          {item.label}
        </Menu.Item>
      ))}
      <Menu.Item key="logout" icon={<LogoutOutlinedIcon style={{ fontSize: '18px', color: "#4e5052" }} />} onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const formattedDate = currentTime.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return (
    <Header
      className="header"
      style={{
        backgroundColor: '#f7f7f7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 15px',
        position: 'fixed',
        width: '100%',
        zIndex: 1000,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={logo}
          alt="Logo"
          style={{ height: '100px', cursor: 'pointer' }}
          onClick={toggleSidebar}
        />
        {!isSidebarFolded && (
          <span style={{ color: '#967AA1', fontSize: '24px', marginLeft: '5px' }}>
            Cover 360
          </span>
        )}
      </div>
      <div style={{ flex: 1, textAlign: 'center', color: '#4e5052', fontSize: '14px' }}>
        <span style={{ marginRight: '20px' }}>{formattedDate}</span>
        <span>{formattedTime}</span>
      </div>
      <Space size="middle">
        <NotificationsOutlinedIcon style={{ fontSize: '20px', color: '#4e5052' }} />
        <Dropdown overlay={menu} placement="bottomRight">
          <AccountCircleOutlinedIcon style={{ cursor: 'pointer', fontSize: '35px', color: '#4e5052' }} />
        </Dropdown>
      </Space>
    </Header>
  );
};

export default AppHeader;