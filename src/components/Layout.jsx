import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUserInfo } from "../lib/api/auth";
import { useEffect } from "react";

const Navbar = styled.nav`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: calc(100% - 2rem);
  top: 0;
  z-index: 1000;
  max-width: 1240px;
`;

const NavItem = styled(Link)`
  padding: 8px 12px;
  background-color: #ff4d4d;
  color: white;
  text-decoration: none;

  &:hover {
    background-color: #ff7878;
  }
`;

const UserAvatar = styled.img`
  padding: 8px 12px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

const UserName = styled.span`
  padding: 8px 12px;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
`;

const LogoutButton = styled.button`
  padding: 8px 12px;
  background-color: #ff4d4d;
  border: none;
  cursor: pointer;
  color: white;

  &:hover {
    background-color: #ff7878;
  }
`;

const PageContainer = styled.div`
  padding: 8px 12px;
  margin-top: 60px; /* Navbar height */
`;

export default function Layout({ user, setUser }) {
  const navigate = useNavigate();
  //로그인 됐나안됐나 확인
  useEffect(() => {
    getUserInfo().then((res) => {
      if (res) {
        setUser({
          userId: res.id,
          nickname: res.nickname,
          avatar: res.avatar,
        });
      } else {
        handleLogout();
      }
    });
  }, []);

  //토큰이 없거나 버튼이 눌렸을떄 실행되게
  const handleLogout = () => {
    setUser(null);
    navigate("/signin");
    localStorage.clear();
  };

  return (
    <>
      <Navbar>
        <NavItem to="/">HOME</NavItem>
        <NavItem to="/mypage">MYPAGE</NavItem>
        <UserProfile>
          {user && (
            <>
              <UserAvatar src={user.avatar} alt="User Avatar" />
              <UserName>{user.nickname}</UserName>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </>
          )}
        </UserProfile>
      </Navbar>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </>
  );
}
