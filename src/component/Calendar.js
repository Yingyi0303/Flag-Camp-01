import React, { useState } from "react";
import { Layout, Menu, Calendar as AntCalendar, List, Card } from "antd";
import {
  WechatWorkOutlined,
  PieChartOutlined,
  MessageOutlined,
  OrderedListOutlined,
  CalendarOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment";

const { Header, Content, Sider } = Layout;

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  // Example events, you could fetch these from an API or your back-end
  const events = [
    { date: "2024-04-05", title: "Rent Payment Due" },
    { date: "2024-04-20", title: "Meeting with John" },
    { date: "2024-04-25", title: "No water from 1 to 3pm" },
  ];

  // Filter events for the current month
  const eventsForMonth = events.filter((event) =>
    moment(event.date).isSame(currentMonth, "month")
  );

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

  const onPanelChange = (value) => {
    setCurrentMonth(value);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div style={{ color: "white", fontSize: "1.5em" }}>Calendar</div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["5"]}
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
            style={{ padding: 24, margin: 0, minHeight: 280, display: "flex" }}
          >
            <div style={{ flex: 1 }}>
              <AntCalendar onPanelChange={onPanelChange} />
            </div>
            <div style={{ width: 300, marginLeft: 24 }}>
              <Card title="Upcoming Events" bordered={false}>
                <List
                  dataSource={eventsForMonth}
                  renderItem={(item) => (
                    <List.Item>
                      <strong>{moment(item.date).format("MMM DD")}</strong>:{" "}
                      {item.title}
                    </List.Item>
                  )}
                />
              </Card>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CalendarPage;
