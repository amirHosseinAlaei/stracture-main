import api from "../utils/api";

export function apiPostUser(data) {
  return new Promise((resolve, reject) => {
    api.post("/v1/User/", data)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}

export function apiUpdateUser(data) {
  return new Promise((resolve, reject) => {
    api.put("/v1/User/", data)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}

function getUserById(id) {
  return new Promise((resolve, reject) => {
    api.get(`/v1/User/${id}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}

export function apiDeleteUser(userId) {
  return new Promise((resolve, reject) => {
    api.delete("/v1/User", { data: { userId } })
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}

export default getUserById;