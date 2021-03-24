const rootUrl = 'http://103.226.250.81/adiary'

export default {
  LOGIN_URL: `${rootUrl}/login/`,
  REGISTER_URL: `${rootUrl}/register`,
  USER_URL: `${rootUrl}/user/`,
  SON_URL: `${rootUrl}/children/`,
  UPLOAD_URL: `${rootUrl}/upload/`,
  DIARY_URL: `${rootUrl}/diary/`,
  NEWS_URL: `${rootUrl}/news/`,
  TEMPLATE_URL: `${rootUrl}/template/`,
  REPORT_WEIGHT: `${rootUrl}/report/?children_milk_by=day&mother_milk_by=day&type=weight `,
  REPORT_HEIGHT: `${rootUrl}/report/?children_milk_by=day&mother_milk_by=day&type=height `,
  ACTION_URL: `${rootUrl}/action/`
}