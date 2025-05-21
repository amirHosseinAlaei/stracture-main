import api from "../utils/api";

function postUser(data) {
  return api.post("/v1/User/", data).then(res => res.data);
}

export default postUser
