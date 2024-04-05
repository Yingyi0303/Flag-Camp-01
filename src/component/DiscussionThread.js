import React, { useState } from "react";
import { Typography, Input, Button, List, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const DiscussionThread = () => {
  const [comments, setComments] = useState([
    { id: 1, author: "John", content: "This is the first comment." },
    { id: 2, author: "Alice", content: "I agree with John." },
    { id: 3, author: "Bob", content: "Nice discussion!" },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      const newCommentObj = {
        id: comments.length + 1,
        author: "You",
        content: newComment,
      };
      setComments([newCommentObj, ...comments]);
      setNewComment("");
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      {/* Dummy discussion post */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Discussion Post</Title>
        <img
          src="https://www.snexplores.org/wp-content/uploads/2020/04/1030_LL_trees-1028x579.png"
          alt="Discussion Post Image"
          style={{ maxWidth: "100%", marginBottom: 16 }}
        />
        <p>
          This is a dummy discussion post. I think we need to have more trees in
          our community!
        </p>
      </div>

      {/* Input box for comments */}
      <div style={{ marginBottom: 24 }}>
        <Title level={3}>Add a Comment</Title>
        <Input.TextArea
          value={newComment}
          onChange={handleInputChange}
          placeholder="Write your comment here..."
          rows={4}
        />
        <Button
          type="primary"
          style={{ marginTop: 16 }}
          onClick={handleCommentSubmit}
        >
          Submit Comment
        </Button>
      </div>

      {/* Previous comments */}
      <div>
        <Title level={3}>Previous Comments</Title>
        <List
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={<strong>{item.author}</strong>}
                description={item.content}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default DiscussionThread;
