import httpMethod from "./httpMethod";
import apis from "../constants/apis";

class TemplateServices {
  getTemplate() {
    return httpMethod.get(`${apis.TEMPLATE_URL}`);
  }
  readTemplate({ id }) {
    return httpMethod.get(`${apis.TEMPLATE_URL}${id}`, {id});
  }
}
export default new TemplateServices();