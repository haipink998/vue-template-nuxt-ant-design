
import httpMethod from "./httpMethod";
import apis from "../constants/apis";

class newsServices {
  getNews() {
    return httpMethod.get(`${apis.NEWS_URL}`)
  }
}
export default new newsServices();