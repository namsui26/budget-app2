import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/MyPage.css";

const MyPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 로직 구현 (예: 토큰 제거, 상태 초기화 등)
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="mypage-container">
      <h1>My Page</h1>
      <p>Welcome to your personal page!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default MyPage;
