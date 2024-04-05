import React from "react";
import {
  Layout,
  Menu,
  Form,
  Input,
  Select,
  Button,
  Table,
  Typography,
} from "antd";
import {
  WechatWorkOutlined,
  PieChartOutlined,
  MessageOutlined,
  OrderedListOutlined,
  CalendarOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header, Content, Sider } = Layout;
const { Option } = Select;
const { Title } = Typography;

const Payment = () => {
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

  const paymentHistory = [
    {
      key: "1",
      date: "2023-01-01",
      amount: "$500",
      purpose: "Rent",
    },
    {
      key: "2",
      date: "2023-02-01",
      amount: "$500",
      purpose: "Rent",
    },
    {
      key: "3",
      date: "2023-02-09",
      amount: "$95.20",
      purpose: "Parking",
    },
    {
      key: "4",
      date: "2023-03-01",
      amount: "$500",
      purpose: "Rent",
    },
    {
      key: "5",
      date: "2023-04-01",
      amount: "$500",
      purpose: "Rent",
    },
    {
      key: "6",
      date: "2023-04-15",
      amount: "$120",
      purpose: "Cleaning Fee",
    },
    {
      key: "7",
      date: "2023-05-01",
      amount: "$500",
      purpose: "Rent",
    },
  ];

  // Columns configuration for the payment history table
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
    },
  ];

  const paginationConfig = {
    pageSize: 10,
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div style={{ color: "white", fontSize: "1.5em" }}>Payments</div>
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
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{ padding: 24, margin: 0, minHeight: 280 }}
          >
            <Form layout="vertical">
              <Form.Item label="Name" name="name">
                <Input placeholder="Enter your name" />
              </Form.Item>
              <Form.Item label="Apartment Number" name="apartmentNumber">
                <Input placeholder="Enter your apartment number" />
              </Form.Item>
              <Form.Item label="Purpose of Payment" name="paymentPurpose">
                <Select placeholder="Select a purpose">
                  <Option value="rent">Rent</Option>
                  <Option value="cleaning fee">Maintenance</Option>
                  <Option value="parking">Parking</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Amount Due" name="amountDue">
                <Input prefix="$" placeholder="Amount" />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Make Payment
              </Button>
            </Form>
            <Table
              columns={columns}
              dataSource={paymentHistory}
              pagination={paginationConfig}
              style={{ marginTop: 24 }}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Payment;
