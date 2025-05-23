import api from "../utils/api";

export function apiPostUser(data) {
  return api.post("/v1/User/", data).then((res) => res.data);
}

export function apiUpdateUser(data) {
  return api.put("/v1/User/", data).then((res) => res.data);
}

function getUserById(id) {
  return api.get(`/v1/User/${id}`).then((res) => res.data);
}

export default getUserById;


