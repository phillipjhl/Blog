import * as baseService from "./base";

let loggedIn = false;

function isLoggedIn() {
  return loggedIn;
}

function getUser() {
  return me();
}

function checkLogin() {
  if (loggedIn) {
    return Promise.resolve(true);
  } else {
    baseService.populateAuthToken();
    return me()
      .then(() => {
        loggedIn = true;
        return Promise.resolve(true);
      })
      .catch(() => {
        return Promise.resolve(false)
      });
  }
}

function login(email, password) {
  return baseService
    .makeFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json().then(jsonResponse => {
          baseService.setAuthToken(jsonResponse.token);
          loggedIn = true;
        });
      } else if (response.status === 401) {
        return response.json().then(jsonResponse => {
          throw jsonResponse;
        });
      }
    });
}

function logout() {
  baseService.clearAuthToken();
  loggedIn = false;
}

function me() {
  return baseService.get("/api/users/me");
}

export { isLoggedIn, checkLogin, login, logout, getUser };
