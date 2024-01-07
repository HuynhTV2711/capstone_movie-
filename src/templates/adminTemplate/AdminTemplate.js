import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, theme, message } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

const AdminTemplate = () => {
  const [messageApi, contextHolder] = message.useMessage();
  // đá về trang đăng nhập
  const navigate = useNavigate()
  // Lấy dữ liệu trên redux về
  const {user} = useSelector((state)=>state.userSlice);
  // location lấy url
  const location = useLocation();
  // console.log(location.pathname);
  // phân quyền
  useEffect(()=>{
    // kiểm tra người dùng nếu không phai admin nếu k phải là người dùng thì k cho phép vào trang admin và chuyển hướng đến trang khác
    // console.log(location);
    // console.log(user);
    if (user) {
      if (user.maLoaiNguoiDung !="QuanTri") {
        messageApi.open({
          type: "error",
          content: "Vui lòng đăng nhập tài khoản quản trị viên",
        });
        setTimeout(() => {
          // đưa về đường dẫn web bạn muốn
          window.location.href= "/login";
        }, 2000);
      }
    }
    // chưa đăng nhập
    else{
      navigate('/login');
    }

  },[location.pathname])
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Header, Sider, Content } = Layout;
  return (
    <>
      {contextHolder}
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={location.pathname}
          items={[
            {
              icon: <VideoCameraOutlined />,
              key: "/admin",
              label: <Link to={'/admin'}>Quản lí phim</Link>,
            },
            {
              icon: <VideoCameraOutlined />,
              key: "/admin/add-movie",
              label: <Link to={'/admin/add-movie'}>Thêm phim</Link>,
            },
            {
              key: "/admin/manager-user",
              icon: <UserOutlined />,
              label: <Link to={'/admin/manager-user'}>Quản lí người dùng</Link>,
            },
            {
              key: "/admin/manager-order",
              icon: <UploadOutlined />,
              label: <Link to={'/admin/manager-order'}>Quản lí lịch đặt vé</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
    </>
  );
};

export default AdminTemplate;


