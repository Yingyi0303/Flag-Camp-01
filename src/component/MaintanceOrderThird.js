import React, { useState } from "react";
import { Layout, Menu, Card, List, Button, Row, Col, Modal } from "antd";
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

const { Header, Content, Sider } = Layout;

const MaintenanceOrder = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [acceptedOrders, setAcceptedOrders] = useState({});
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5);

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

  // Simulating order data
  const allOrders = new Array(15).fill(null).map((_, index) => ({
    id: index + 1,
    title: `Order ${index + 1}`,
    date: new Date().toLocaleDateString(),
    publisher: `Publisher ${index + 1}`,
    content: "order details",
    // Add other properties as needed
  }));

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleAcceptOrder = () => {
    setAcceptedOrders({ ...acceptedOrders, [selectedOrder.id]: true });
    handleModalClose();
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setOrdersPerPage(pageSize);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Resetting the current page
  };

  // Filtered orders based on the current filter
  const filteredOrders = allOrders.filter((order) => {
    if (filter === "Accepted") {
      return acceptedOrders[order.id];
    } else if (filter === "Not Accepted") {
      return !acceptedOrders[order.id];
    }
    return true; // 'All' filter
  });

  // Get current orders after filter is applied
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentFilteredOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div style={{ color: "white", fontSize: "1.5em" }}>
          Maintenance Order
        </div>
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
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Row style={{ marginBottom: 16 }}>
              <Col span={12}>
                <div style={{ fontSize: "2em", fontWeight: "500" }}>Posts</div>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Button
                  type={filter === "All" ? "primary" : "default"}
                  onClick={() => handleFilterChange("All")}
                >
                  All
                </Button>
                <Button
                  type={filter === "Accepted" ? "primary" : "default"}
                  onClick={() => handleFilterChange("Accepted")}
                >
                  Accepted
                </Button>
                <Button
                  type={filter === "Not Accepted" ? "primary" : "default"}
                  onClick={() => handleFilterChange("Not Accepted")}
                >
                  Not Accepted
                </Button>
              </Col>
            </Row>

            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: handlePageChange,
                pageSize: ordersPerPage,
                current: currentPage,
                total: filteredOrders.length, // Total number of filtered orders
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "15", "20"],
                onShowSizeChange: (current, size) => {
                  setOrdersPerPage(size);
                  setCurrentPage(1); // Reset to page 1 when page size changes
                },
              }}
              dataSource={currentFilteredOrders}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  onClick={() => handleOrderClick(item)}
                >
                  <Card hoverable>
                    <Card.Meta title={item.title} />
                  </Card>
                </List.Item>
              )}
            />
          </Content>
        </Layout>
      </Layout>

      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Close
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleAcceptOrder}
            disabled={acceptedOrders[selectedOrder?.id]}
          >
            Accept
          </Button>,
        ]}
      >
        {selectedOrder && (
          <div>
            <h3>{selectedOrder.title}</h3>
            <p>Publisher: {selectedOrder.publisher}</p>
            <p>Date: {selectedOrder.date}</p>
            <h4>Order Details: </h4>
            <p>{selectedOrder.content}</p>
            {/* Insert more order details here as needed */}
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default MaintenanceOrder;
