
export const changeLoggedInFlag = (isLoggedIn) => {
  return {
    type: 'CHANGE_LOGGED_IN_FLAG',
    isLoggedIn,
  };
};
export const setCurrentUser = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    currentUser: user,
  };
};
