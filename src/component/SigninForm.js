import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Card, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../AuthContext";
import SignupForm from "./SignupForm";
import Footer from "./Footer"; // Ensure this is correctly imported

const SigninForm = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { login } = useAuth();
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);

  const onFinish = async (values) => {
    try {
      const response = await fetch("http://localhost:8080/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Sign in failed");
      const token = await response.text();
      login(token);
      history.push("/"); // Navigate to homepage on successful login
    } catch (error) {
      notification.error({
        message: "Login Failed",
        description: "Username or password is incorrect. Please try again.",
        placement: "topRight",
      });
    }
  };

  const showSignupModal = () => {
    setIsSignupModalVisible(true);
  };

  const handleSignupModalCancel = () => {
    setIsSignupModalVisible(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <img
          src="https://iiif.micr.io/ZKSPH/full/1280,/0/default.jpg"
          alt="Community Background"
          style={{
            width: "100%",
            height: "100vh",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        />
        <Card
          title="Welcome to Our Community Hub!"
          bordered={false}
          style={{
            maxWidth: 400,
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            zIndex: 1,
          }}
        >
          <Form
            form={form}
            name="signin_form"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              <Button
                type="link"
                onClick={showSignupModal}
                style={{ float: "right" }}
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>
          {isSignupModalVisible && (
            <SignupForm
              isVisible={isSignupModalVisible}
              handleVisibility={handleSignupModalCancel}
            />
          )}
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default SigninForm;
