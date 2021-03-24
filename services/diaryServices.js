import apis from "../constants/apis";
import httpMethod from "./httpMethod";

class DiaryServices {
  getDiary() {
    return httpMethod.get(`${apis.DIARY_URL}`);
  }
  getAction() {
    return httpMethod.get(`${apis.ACTION_URL}`);
  }
  getDiarySon({ id }) {
    return httpMethod.get(`${apis.DIARY_URL}?children=${id}`);
  }
  readDiary({ id }) {
    return httpMethod.get(`${apis.DIARY_URL}${id}`, { id });
  }
  addAction(action, start_time, user, actual_date) {
    return httpMethod.post(apis.DIARY_URL, {
      action,
      start_time,
      user,
      actual_date
    });
  }
  addActionSon(action, start_time, user, actual_date, children) {
    return httpMethod.post(apis.DIARY_URL, {
      action,
      start_time,
      user,
      actual_date,
      children
    });
  }
  addNightEat(action, start_time, actual_date, user, children) {
    return httpMethod.post(apis.DIARY_URL, {
      action,
      start_time,
      actual_date,
      user,
      children
    });
  }
  endAction({ id, start_time, action, end_time }) {
    return httpMethod.put(`${apis.DIARY_URL}${id}`, {
      id,
      start_time,
      action,
      end_time
    });
  }
  endActionSon({ id, start_time, end_time, user, children, action }) {
    return httpMethod.put(`${apis.DIARY_URL}${id}`, {
      id,
      end_time,
      start_time,
      user,
      children,
      action
    });
  }
  endNightEat(action, start_time, end_time, actual_date, user, children) {
    return httpMethod.put(`${apis.DIARY_URL}${id}`, {
      action,
      start_time,
      end_time,
      actual_date,
      user,
      children
    });
  }
  updateAction(
    id,
    start_time,
    end_time,
    add_field,
    add_field_right,
    note,
    user
  ) {
    return httpMethod.patch(`${apis.DIARY_URL}${id}`, {
      id,
      start_time,
      end_time,
      add_field,
      add_field_right,
      note,
      user
    });
  }
  updateActionSon(id, start_time, end_time, add_field, note, user, children) {
    return httpMethod.patch(`${apis.DIARY_URL}${id}`, {
      id,
      start_time,
      end_time,
      add_field,
      note,
      user,
      children
    });
  }
}
export default new DiaryServices();
