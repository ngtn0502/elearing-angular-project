export const removeAllWhitespace = (string: string) => {
  return string.replace(/ /g, '');
};

export const getUserData = () => {
  const userLoginJson = localStorage.getItem('userLogin');
  if (typeof userLoginJson !== 'undefined' && userLoginJson !== null) {
    const userLoginObj = JSON.parse(userLoginJson);
    return userLoginObj;
  }

  return false;
};
