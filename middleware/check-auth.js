import mutationTypes from "~/constants/mutationTypes";
import httpMethod from "~/services/httpMethod"

export default ({ store }) => {
  const userFromLocalStorage = httpMethod.getUserLocalStorage();

  if (store.getters['auth/isAuthenticated']) {
    return;
  }
  
  if (userFromLocalStorage) {
    const { token } = userFromLocalStorage;
    httpMethod.attachTokenToHeader(token);
    store.commit(`auth/${mutationTypes.AUTH.SET_USER}`, {
      ...userFromLocalStorage
    })
  }
}