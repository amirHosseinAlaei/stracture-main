import api from "../utils/api";

const getUsers = async ({ PageIndex = 0, PageSize = 21, Search = "" } = {}) => {
  const params = {
    PageIndex,
    PageSize,
    Search,
  };

  const response = await api.get("/v1/User/GetAllByFilter", { params });
  return response.data;
};

export default getUsers;
