import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

// Icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'; //dashboard


// import baby from "../../assets/images/baby.png"; //children

const { Sider } = Layout;
const { SubMenu } = Menu;
const iconStyle = { fontSize: "24px", color: "#003366" };
const selectedStyle = {
  backgroundColor: "#003366",
  color: "#003366",
};
const selectedFontColor = { color: "#ffffff" };

const Sidebar = ({ collapsed, userType }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const signOut = async () => {
    localStorage.removeItem('userToken');
    console.log('User signed out');
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getMenuItems = () => {
    switch (userType) {
      case "CLIENT":
        return [
          { key: "/client/dashboard", icon: <DashboardOutlinedIcon style={iconStyle} />, label: <Link to="/client/dashboard">Dashboard</Link> },
          { key: "/client/claims", icon: <DashboardOutlinedIcon style={iconStyle} />, label: <Link to="/client/claims">Claims</Link> },
          { key: "/client/emergancy", icon: <DashboardOutlinedIcon style={iconStyle} />, label: <Link to="/client/emergancy">Emergancy</Link> },
          { key: "/client/profile", icon: <DashboardOutlinedIcon style={iconStyle} />, label: <Link to="/client/profile">Profile</Link> },
    
        ];
      case "DCADJUSTER":
        return [
          { key: "/dc-adjuster/dashboard", icon: <DashboardOutlinedIcon style={iconStyle} />, label: <Link to="/dc-adjuster/dashboard">Dashboard</Link> },
          { key: "/dc-adjuster/claims", icon: <DashboardOutlinedIcon style={iconStyle} />, label: <Link to="/dc-adjuster/claims">Claims</Link> },
          { key: "/dc-adjuster/profile", icon: <DashboardOutlinedIcon style={iconStyle} />, label: <Link to="/dc-adjuster/profile">Profile</Link> },

          
        ];
      case "ADMIN":
        return [
          { key: "/admin/dashboard", icon: <DashboardOutlinedIcon style={iconStyle} />, label: <Link to="/admin/dashboard">Dashboard</Link> },
          { key: "/admin/profile", icon: <DashboardOutlinedIcon style={iconStyle} />, label: <Link to="/admin/profile">Profile</Link> },

        ];
      case "AGENT":
        return [
          { key: "/agent/dashboard", icon: <DashboardOutlinedIcon style={iconStyle} />, label: <Link to="/agent/dashboard">Dashboard</Link> },
          { key: "/agent/claims", icon: <DashboardOutlinedIcon style={iconStyle} />, label: <Link to="/agent/claims">Claims</Link> },
          { key: "/agent/cmplt", icon: <DashboardOutlinedIcon style={iconStyle} />, label: <Link to="/agent/cmplt">Complete Claims</Link> },
        ];
      default:
        return [];
    }
  };

  const renderMenuItems = (items) => {
    return items.map(item => {
      if (item.children) {
        return (
            <SubMenu
                key={item.key}
                icon={item.icon}
                title={item.label}
            >
              {renderMenuItems(item.children)}
            </SubMenu>
        );
      }
      return (
          <Menu.Item
              key={item.key}
              icon={item.icon}
              style={location.pathname === item.key ? { ...selectedStyle, ...selectedFontColor } : null}
          >
            {item.label}
          </Menu.Item>
      );
    });
  };

  return (
      <Sider
          collapsible
          collapsed={collapsed}
          width={200}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 64,
            bottom: 0,
            backgroundColor: "#cacaca", // Ensure consistent background color
          }}
          trigger={null}
      >
        <Menu
            theme="light" // Set theme to light for default styling
            mode="inline"
            defaultSelectedKeys={['1']}
            selectedKeys={[location.pathname]}
            style={{ borderRight: 0, backgroundColor: "inherit" }}
        >
          {renderMenuItems(getMenuItems())}
          <Menu.Item
              key="logout"
              // icon={<LogoutOutlinedIcon style={iconStyle} />}
              onClick={handleLogout}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
  );
};

export default Sidebar;