import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

// Icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'; //dashboard


// import baby from "../../assets/images/baby.png"; //children

const { Sider } = Layout;
const { SubMenu } = Menu;
const iconStyle = { fontSize: "24px", color: "#4e5052" };
const selectedStyle = {
  backgroundColor: "#D5C6E0",
  color: "#967aa1",
};
const selectedFontColor = { color: "#967aa1" };

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
          
        ];
      case "ADMIN":
        return [
          { key: "/admin/dashboard", icon: <DashboardOutlinedIcon style={iconStyle} />, label: <Link to="/admin/dashboard">Dashboard</Link> },
          { key: "/admin/profile", icon: <DashboardOutlinedIcon style={iconStyle} />, label: <Link to="/admin/profile">Profile</Link> },

        ];
      case "HCADJUSTER":
        return [
          { key: "/hc-adjuster/dashboard", icon: <DashboardOutlinedIcon style={iconStyle} />, label: <Link to="/hc-adjuster/dashboard">Dashboard</Link> },
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
            backgroundColor: "#f7f7f7", // Ensure consistent background color
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