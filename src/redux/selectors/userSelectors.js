// selectors

export const userSelector = (store) => store.user.user;
export const showRegisterAlertSelector = (store) =>
  store.user.showRegisterAlert;
export const registerAlertSelector = (store) => store.user.registerAlert;
export const showLoginAlertSelector = (store) => store.user.showLoginAlert;
export const loginAlertSelector = (store) => store.user.loginAlert;
