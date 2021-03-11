import httpMethod from "./httpMethod";
import apis from "../constants/apis";

class ReportServices {
  getChart() {
    return httpMethod.get(`${apis.REPORT_URL}`);
  }
}
export default new ReportServices();