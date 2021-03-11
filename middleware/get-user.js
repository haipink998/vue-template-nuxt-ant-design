import mutationTypes from "~/constants/mutationTypes";

export default ({ store }) => {
  if (store.getters['auth/isAuthenticated']) {
    const idOfUser = store.getters['auth/getIdOfUser'];
    if (!store.getters['user/getUserInfo']) {
      store.dispatch(`user/${mutationTypes.USER.GET_USER}`, { id: idOfUser })
      return;
    }
  }
}