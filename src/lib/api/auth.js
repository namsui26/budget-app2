//회원가입, 로그인등 인증, 인가 처리를 위한 로직만들기
import axios from "axios";

const AUTH_API_HOST = "https://moneyfulpublicpolicy.co.kr";

//회원가입
export const register = async ({ id, password, nickname }) => {
  try {
    const response = await axios.post(AUTH_API_HOST + "/register", {
      id: id,
      password: password,
      nickname: nickname,
    });
    return response.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    alert(error?.response?.data?.message);
  }
};

//로그인
export const login = async ({ id, password }) => {
  try {
    const response = await axios.post(AUTH_API_HOST + "/login?expiresIn=60m", {
      id: id,
      password: password,
    });
    //로컬스토리지 저장
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    alert(error?.response?.data?.message);
  }
};

// 유저정보 확인 후 가져오기
export const getUserInfo = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      const response = await axios.get(AUTH_API_HOST + "/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      alert("토큰이 만료되었습니다");
      localStorage.clear();
    }
  }
};

export const updateProfile = async (formData) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      const response = await axios.patch(AUTH_API_HOST + "/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      alert("토큰이 만료되었습니다");
      localStorage.clear();
    }
  }
};
