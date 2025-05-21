import api from "../utils/api";

function getUserById(id) {
  return api.get(`/v1/User/${id}`).then(res => res.data);
}

export default getUserById
