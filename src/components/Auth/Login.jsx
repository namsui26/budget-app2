import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    let formErrors = {};
    if (password.length < 4 || password.length > 15) {
      formErrors.password = "Password must be 4-15 characters long";
    }
    return formErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        // 로그인 로직 구현
        alert("Login successful");
        navigate("/");
      } catch (err) {
        console.error(err);
        alert("Error logging in user");
      }
    }
  };

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <button type="submit">Login</button>
      <button type="button" onClick={() => navigate("/signup")}>
        Go to Register
      </button>
    </form>
  );
};

export default Login;
