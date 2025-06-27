import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useNavigate, Link } from "react-router-dom";
import "../stylesheets/Login.css"

const Login = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
    } else {
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 login-bg">
      <Card
        className="p-4 shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-3">Login to Thinkr</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              onChange={onChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              onChange={onChange}
              required
              minLength={5}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
        <div className="mt-3 text-center">
          <small>
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </small>
        </div>
      </Card>
    </div>
  );
};

export default Login;
