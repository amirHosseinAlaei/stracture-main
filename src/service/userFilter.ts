import api from "../utils/api";

const getUsers = async () => {
  const response = await api.get("/v1/User/GetAllByFilter");
  return response.data;
};

export default getUsers;
