import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { register } from "../lib/api/auth";

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

const SignUp = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (id.length < 4 || id.length > 10) {
      alert("아이디는 4글자 이상 10글자 이내로 작성해 주세요");
      return;
    }
    if (password.length < 4 || password.length > 15) {
      alert("비밀번호는 4글자 이상 15글자 이내로 작성해 주세요");
      return;
    }
    if (nickname.length < 1 || nickname.length > 10) {
      alert("닉네임은 1글자 이상 10글자 이내로 작성해 주세요");
      return;
    }

    // API 호출하는 로직
    const response = await register({
      id,
      password,
      nickname,
    });
    if (response) {
      alert("회원가입이 완료되었습니다");
      navigate("/signin");
    }
  };

  return (
    <Form>
      <InputGroup>
        <Label htmlFor="id">아이디:</Label>
        <Input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디"
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="password">비밀번호:</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="nickname">닉네임:</Label>
        <Input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
        />
      </InputGroup>
      <Button type="button" onClick={handleSignUp}>
        회원가입
      </Button>
      <Button
        type="button"
        onClick={() => {
          navigate("/signin");
        }}
      >
        돌아가기
      </Button>
    </Form>
  );
};

export default SignUp;
