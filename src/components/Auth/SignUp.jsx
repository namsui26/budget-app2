import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    let formErrors = {};
    if (username.length < 4 || username.length > 10) {
      formErrors.username = "Username must be 4-10 characters long";
    }
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
        // 회원가입 로직 구현
        alert("Registration successful");
        navigate("/login");
      } catch (err) {
        console.error(err);
        alert("Error registering user");
      }
    }
  };

  return (
    <form className="register-form" onSubmit={onSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={onChange}
          required
        />
        {errors.username && <p className="error">{errors.username}</p>}
      </div>
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
      <button type="submit">Register</button>
      <button type="button" onClick={() => navigate("/login")}>
        Go to Login
      </button>
    </form>
  );
};

export default SignUp;
