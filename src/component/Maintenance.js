import React, { useState } from "react";
import { Layout, Menu, Checkbox, Button, List, Typography } from "antd";
import {
  PieChartOutlined,
  MessageOutlined,
  OrderedListOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  WechatWorkOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MaintenanceOrder = () => {
  const sidebarItems = [
    { key: "1", icon: <PieChartOutlined />, label: "Dashboard", path: "/" },
    {
      key: "2",
      icon: <MessageOutlined />,
      label: "Discussion Board",
      path: "/discussions",
    },
    {
      key: "3",
      icon: <WechatWorkOutlined />,
      label: "Chat Thread",
      path: "/chat",
    },
    {
      key: "4",
      icon: <OrderedListOutlined />,
      label: "Maintenance Order",
      path: "/maintenance",
    },
    {
      key: "5",
      icon: <CalendarOutlined />,
      label: "Calendar Schedule",
      path: "/calendar",
    },
    {
      key: "6",
      icon: <CreditCardOutlined />,
      label: "Payment Tool",
      path: "/payment",
    },
  ];

  const objects = [
    { id: 1, name: "Object 1", price: 100 },
    { id: 2, name: "Object 2", price: 150 },
    { id: 3, name: "Object 3", price: 200 },
    { id: 4, name: "Object 4", price: 250 },
    { id: 5, name: "Object 5", price: 300 },
    { id: 6, name: "Object 6", price: 350 },
    { id: 7, name: "Object 7", price: 400 },
  ];

  // State for selected items
  const [selectedItems, setSelectedItems] = useState([]);

  // Function to handle item selection
  const onItemSelect = (id) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(id)) {
        return prevSelectedItems.filter((item) => item !== id);
      } else {
        return [...prevSelectedItems, id];
      }
    });
  };

  // Calculate total amount
  const totalAmount = selectedItems.reduce((sum, itemId) => {
    const item = objects.find((obj) => obj.id === itemId);
    return sum + item.price;
  }, 0);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div style={{ color: "white", fontSize: "1.5em" }}>Maintance Order</div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["chat"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {sidebarItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Content
          style={{ margin: "24px 16px", padding: 24, background: "#fff" }}
        >
          <List
            header={<div>Select Objects</div>}
            bordered
            dataSource={objects}
            renderItem={(item) => (
              <List.Item>
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onChange={() => onItemSelect(item.id)}
                >
                  {`${item.name} - $${item.price}`}
                </Checkbox>
              </List.Item>
            )}
          />
          <div
            style={{
              marginTop: 16,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography.Text>Total amount: ${totalAmount}</Typography.Text>
            <Button type="primary">Place Order</Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MaintenanceOrder;
