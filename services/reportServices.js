import httpMethod from "./httpMethod";
import apis from "../constants/apis";

class ReportServices {
  getChart() {
    return httpMethod.get(`${apis.REPORT_WEIGHT}`);
  }
  getHeight() {
    return httpMethod.get(`${apis.REPORT_HEIGHT}`);
  }
  addWeight(a) {
    return httpMethod.post(apis.DIARY_URL, a)
  }
}

export default new ReportServices();