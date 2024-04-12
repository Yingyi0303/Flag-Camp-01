import React from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../AuthContext"; 

const { Option } = Select;

const SignupForm = ({ isVisible, handleVisibility }) => {
  const [form] = Form.useForm();
  const { login } = useAuth(); 

  const onFinish = async (values) => {
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Signup failed");
      console.log("Signup successful");
      
      handleVisibility(false); 
    } catch (error) {
      console.error("Failed to sign up:", error);
    }
  };

  return (
    <Modal
      title="Sign Up"
      visible={isVisible}
      onCancel={() => handleVisibility(false)}
      footer={null}
    >
      <Form
        form={form}
        name="signup_form"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please choose a username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter a password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="role"
          rules={[{ required: true, message: "Please select your role!" }]}
        >
          <Select placeholder="Select your role" allowClear>
            <Option value="resident">Resident</Option>
            <Option value="manager">Manager</Option>
            <Option value="third_party">Third Party</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignupForm;
