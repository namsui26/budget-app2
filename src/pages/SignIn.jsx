import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../lib/api/auth";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const SignIn = ({ setUser }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      // API 호출하는 로직
      const { userId, nickname, avatar } = await login({
        id,
        password,
      });

      alert("로그인이 되었습니다.");

      // 유저 상태 관리 업데이트
      setUser({ userId, nickname, avatar });

      // 로그인이 되면 이동하는 코드
      navigate("/");

      console.log("로그인 API 응답값 :", { userId, nickname, avatar });
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <Form>
      <InputGroup>
        <Label htmlFor="id">아이디:</Label>
        <Input
          type="text"
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디"
          value={id}
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="password">비밀번호:</Label>
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          value={password}
        />
      </InputGroup>
      <Button type="button" onClick={handleSignIn}>
        로그인 하기
      </Button>
      <Button
        type="button"
        onClick={() => {
          navigate("/signup");
        }}
      >
        회원가입 하기
      </Button>
    </Form>
  );
};

export default SignIn;
