import httpMethod from "./httpMethod";
import apis from "../constants/apis";

class AuthServices {
  login({ username, password }) {
    return httpMethod.post(apis.LOGIN_URL, { username, password });
  }
  register({ username, first_name, last_name, password, email}) {
    return httpMethod.post(apis.USER_URL, {username, password, email, first_name, last_name})
  }
  registerSon({ name, gender, birthday,}) {
    return httpMethod.post(apis.SON_URL, {name, gender, birthday})
  }
  uploadImage({ profile_picture }) {
    return httpMethod.post(apis.UPLOAD_URL, { profile_picture})
  }
}

export default new AuthServices();