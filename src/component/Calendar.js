import React, { useState } from "react";
import {
  Tooltip,
  Layout,
  Menu,
  Calendar as AntCalendar,
  List,
  Card,
  Modal,
  Input,
  DatePicker,
  Button,
} from "antd";
import {
  WechatWorkOutlined,
  PieChartOutlined,
  MessageOutlined,
  OrderedListOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment";

const { Header, Content, Sider } = Layout;

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);

  // Example events
  const [events, setEvents] = useState([
    { id: 1, date: "2024-04-05", title: "Rent Payment Due" },
    { id: 2, date: "2024-04-20", title: "Meeting with John" },
    { id: 3, date: "2024-04-25", title: "No water from 1 to 3pm" },
  ]);

  const [selectedDateForNewEvent, setSelectedDateForNewEvent] = useState(null);
  const [newEventTitle, setNewEventTitle] = useState("");

  // Function to open the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle Ok button in the modal
  // Function to handle Ok button in the modal
  const handleOk = () => {
    const formattedDate = selectedDateForNewEvent.format("YYYY-MM-DD");
    if (isEditing) {
      // Update the specific event
      const updatedEvents = events.map((event) => {
        if (event.id === editingEventId) {
          return { ...event, date: formattedDate, title: newEventTitle };
        }
        return event;
      });
      setEvents(updatedEvents);
    } else {
      // Add a new event with a unique ID
      const newEvent = {
        id: new Date().getTime(), // Using the current timestamp as a simple, unique ID
        date: formattedDate,
        title: newEventTitle,
      };
      setEvents([...events, newEvent]);
    }
    // Reset form and close modal
    setIsEditing(false);
    setEditingEventId(null);
    setNewEventTitle("");
    setSelectedDateForNewEvent(null);
    setIsModalVisible(false);
  };

  // Function to handle Cancel button in the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const startEditEvent = (id) => {
    const eventToEdit = events.find((event) => event.id === id);
    if (eventToEdit) {
      setSelectedDateForNewEvent(moment(eventToEdit.date, "YYYY-MM-DD"));
      setNewEventTitle(eventToEdit.title);
      setIsEditing(true);
      setEditingEventId(id);
      setIsModalVisible(true);
    }
  };

  // Function to cancel an event
  const cancelEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

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
              <Button
                type="primary"
                onClick={showModal}
                shape="round"
                icon={<PlusCircleOutlined />} // Make sure to import PlusCircleOutlined from '@ant-design/icons'
                style={{
                  backgroundColor: "#52c41a",
                  borderColor: "#52c41a",
                  color: "#ffffff",
                  marginBottom: "16px",
                }}
              >
                Add New Event
              </Button>
              <AntCalendar onPanelChange={onPanelChange} />
              <Modal
                title="Add New Event"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <DatePicker
                  onChange={(date) => setSelectedDateForNewEvent(date)}
                />
                <Input
                  placeholder="Event Title"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  style={{ marginTop: "16px" }}
                />
              </Modal>
            </div>
            <div style={{ width: 300, marginLeft: 24 }}>
              <Card
                title="Upcoming Events"
                bordered={false}
                style={{
                  width: 300,
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={eventsForMonth}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Tooltip title="Edit">
                          <Button
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => startEditEvent(item.id)}
                            style={{ border: "none", color: "green" }}
                          />
                        </Tooltip>,
                        <Tooltip title="Delete">
                          <Button
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() => cancelEvent(item.id)}
                            style={{ border: "none", color: "red" }}
                          />
                        </Tooltip>,
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <span>{moment(item.date).format("YYYY-MM-DD")}</span>
                        }
                        description={item.title}
                      />
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
