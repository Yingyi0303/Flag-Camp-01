import React, { useState } from "react";
import { Layout, Modal, Menu, Card, List, Button, Row, Col } from "antd";
import {
  PieChartOutlined,
  MessageOutlined,
  OrderedListOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  WechatWorkOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { NewPost } from "./NewPost";
import { DiscussionThread } from "./DiscussionThread";
import { Link } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const DiscussionBoard = () => {
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

  const allPosts = new Array(15).fill(null).map((_, index) => ({
    title: `Untitled key item ${index + 1}`,
    color: ["#f56a00", "#1890ff", "#74d680", "#ffec3d", "#ff7875"][index % 5], // Cycle through the 5 different colors
  }));

  // States for pagination and navigation
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPostVisible, setNewPostVisible] = useState(false);
  const [discussionVisible, setDiscussionVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Change page
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPostsPerPage(pageSize);
  };

  // Handle the post click to navigate to discussion thread page
  const handlePostClick = (post) => {
    setSelectedPost(post);
    setDiscussionVisible(true);
  };

  const showNewPostModal = () => {
    setNewPostVisible(true);
  };

  const handleNewPostOk = () => {
    setLoading(true);
    setNewPostVisible(false);
  };

  const handleNewPostCancel = () => {
    setNewPostVisible(false);
  };

  const handleDiscussionCancel = () => {
    setDiscussionVisible(false);
    setSelectedPost(null);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div style={{ color: "white", fontSize: "1.5em" }}>
          Discussion Board
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["2"]}
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
                <div style={{ fontSize: "1.2em", fontWeight: "500" }}>
                  Posts
                </div>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={showNewPostModal}
                >
                  New Post
                </Button>
                <Modal
                  title="Create New Post"
                  open={newPostVisible}
                  width={1000}
                  onOk={handleNewPostOk}
                  okText="Create"
                  confirmLoading={loading}
                  onCancel={handleNewPostCancel}
                >
                  <NewPost />
                </Modal>
              </Col>
            </Row>

            <Modal
              title="Discussion Thread"
              open={discussionVisible}
              width={800}
              onCancel={handleDiscussionCancel}
              footer={null}
            >
              {selectedPost && (
                <DiscussionThread
                  post={selectedPost}
                  onCancel={handleDiscussionCancel}
                />
              )}
            </Modal>

            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: handlePageChange,
                pageSize: postsPerPage,
                current: currentPage,
                total: allPosts.length,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "15", "20"],
                onShowSizeChange: handlePageChange,
              }}
              dataSource={allPosts}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  onClick={() => handlePostClick(item)}
                >
                  <Card hoverable>
                    <Card.Meta
                      avatar={
                        <div
                          style={{
                            backgroundColor: item.color,
                            border: `2px solid ${item.color}`,
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      }
                      title={item.title}
                    />
                  </Card>
                </List.Item>
              )}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DiscussionBoard;
