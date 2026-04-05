import { request, getAuthHeaders } from "./helpers";

const baseUrl =
  import.meta.env.MODE === "production"
    ? "https://api.elmofudfashion.crabdance.com"
    : "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

export const signup = ({ name, avatar, email, password }) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      avatar,
      email,
      password,
    }),
  });
};

export const login = ({ email, password }) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const checkToken = (token) => {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });
};

export const updateUser = ({ name, avatar }, token) => {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: getAuthHeaders(token),
    body: JSON.stringify({ name, avatar }),
  });
};
