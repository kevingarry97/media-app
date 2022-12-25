import http from "./httpService";
import apiUrl from "../config.json"

const apiEndPoint = 'http://localhost:4000/api/user';

export const createUser = (payload: any) => {
    return http.post(apiEndPoint, payload);
}
  