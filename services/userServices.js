import httpMethod from "./httpMethod";
import apis from "../constants/apis";

class AuthServices {
  getUser({ id }) {
    return httpMethod.get(`${apis.USER_URL}${id}`)
  }
  updateUser(id,email,first_name,last_name,user_profile,user_children){
    return httpMethod.patch(`${apis.USER_URL}${id}`, {
      id,email,first_name,last_name,user_profile,user_children
    })
  }
}

export default new AuthServices();