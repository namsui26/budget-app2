import axios from "axios";

const JSON_SERVER_HOST = "http://localhost:5000";

export const getExpenses = async () => {
  try {
    const response = await axios.get(`${JSON_SERVER_HOST}/expenses`);
    return response.data;
  } catch (error) {
    console.log(error);
    alert("데이터를 로드할 수 없음");
  }
};

//["expenses", id]
export const getExpense = async ({ queryKey }) => {
  try {
    const response = await axios.get(
      `${JSON_SERVER_HOST}/expenses/${queryKey[1]}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    alert("데이터를 로드할 수 없음");
  }
};

export const postExpense = async (newExpense) => {
  try {
    const response = await axios.post(
      `${JSON_SERVER_HOST}/expenses`,
      newExpense
    ); //뭔가를 쓰기 위한 요청이므로 어떤데이터를 쓸지 바디를 보내주어야 한다.
    return response.data;
  } catch (error) {
    console.log(error);
    alert("데이터가 안써짐");
  }
};

export const putExpense = async (updatedExpense) => {
  const { id, ...rest } = updatedExpense;
  try {
    const response = await axios.put(
      `${JSON_SERVER_HOST}/expenses/${id}`,
      rest
    ); //뭔가를 쓰기 위한 요청이므로 어떤데이터를 쓸지 바디를 보내주어야 한다.
    return response.data;
  } catch (error) {
    console.log(error);
    alert("데이터 수정이 안됨");
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await axios.delete(`${JSON_SERVER_HOST}/expenses/${id}`); //뭔가를 쓰기 위한 요청이므로 어떤데이터를 쓸지 바디를 보내주어야 한다.
    return response.data;
  } catch (error) {
    console.log(error);
    alert("데이터가 삭제가 안됨");
  }
};
