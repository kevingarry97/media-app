import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndPoint = 'http://localhost:4000/api/';
const tokenKey = "token";

http.setJwt(getJwt());

export const updateUser = (payload: any) => {
  return http.put(apiEndPoint + 'me', payload)
}

export const getUser = () => {
  return http.get(apiEndPoint + 'me')
}

export async function login(email: string, password: string) {
  const { data: jwt } = await http.post(apiEndPoint + 'auth', { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt: string) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = <string>localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export const verifyUser = (token: string) => {
  return http.get(apiEndPoint + 'auth/verify/' + token);
}

export const requestReset = (email: string) => {
  return http.post(apiEndPoint + 'auth/requestReset', { email });
}

export const resetPassword = (payload: any) => {
  return http.post(apiEndPoint + 'auth/resetPassword', payload);
}

export function getJwt() {
  return localStorage.getItem("token");
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
