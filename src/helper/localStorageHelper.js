export const loggedInUserData = () => {
    const token = localStorage.getItem('token');
    const myTokenData = JSON.parse(token);
    const userData = myTokenData?.user;
  return userData;
}

