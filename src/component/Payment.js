import React, { useState, useEffect } from "react";
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
import { Link, useLocation } from "react-router-dom";

const { Header, Content, Sider } = Layout;
const { Option } = Select;
const { Title } = Typography;

const Payment = () => {
  const location = useLocation(); // Use location to access the state passed through react-router
  const [form] = Form.useForm();

  // State to keep track of whether we've set initial form values
  const [initialValuesSet, setInitialValuesSet] = useState(false);

  useEffect(() => {
    // Check if there's state passed to this component (from the Maintenance page)
    if (location.state && !initialValuesSet) {
      const { purpose, amount } = location.state;
      form.setFieldsValue({
        paymentPurpose: purpose,
        amountDue: amount,
      });
      setInitialValuesSet(true);
    }
  }, [location, form, initialValuesSet]);

  const sidebarItems = [
    { key: "1", icon: <PieChartOutlined />, label: "Dashboard", path: "/" },
    {
      key: "2",
      icon: <MessageOutlined />,
      label: "Discussion Board",
      path: "/discussions",
    },
    // {
    //   key: "3",
    //   icon: <WechatWorkOutlined />,
    //   label: "Chat Thread",
    //   path: "/chat",
    // },
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
            defaultSelectedKeys={["6"]}
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
            <Form layout="vertical" form={form}>
              <Form.Item label="Name" name="name">
                <Input placeholder="Enter your name" />
              </Form.Item>
              <Form.Item label="Apartment Number" name="apartmentNumber">
                <Input placeholder="Enter your apartment number" />
              </Form.Item>
              <Form.Item label="Purpose of Payment" name="paymentPurpose">
                <Select placeholder="Select a purpose">
                  <Option value="rent">Rent</Option>
                  <Option value="maintenance">Maintenance</Option>
                  <Option value="parking">Parking</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Amount Due" name="amountDue">
                <Input prefix="$" placeholder="Amount" />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<CreditCardOutlined />}
                style={{
                  backgroundColor: "#1890ff",
                  borderColor: "#52c41a",
                  color: "#ffffff",
                  fontSize: "16px",
                }}
              >
                Make Payment
              </Button>
            </Form>
            <Title level={2} style={{ marginTop: "24px" }}>
              Payment History
            </Title>
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
