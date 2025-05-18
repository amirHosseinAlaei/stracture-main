import api from "../utils/api";

const getUsers = async (params: object) => {
  const response = await api.get("/v1/User/GetAllByFilter", { params });
  return response.data;
};

export default getUsers;
