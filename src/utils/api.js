import { getAuthHeaders, request } from "./helpers";
const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

export const getItems = () => {
  return request(`${baseUrl}/items`, {
    headers,
  });
};

export const deleteItem = (selectedItemId, token) => {
  return request(`${baseUrl}/items/${selectedItemId}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
};

export const addItem = ({ name, imageUrl, weather }, token) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
};

export const addCardLike = (selectedItemId, token) => {
  return request(`${baseUrl}/items/${selectedItemId}/like`, {
    method: "PUT",
    headers: getAuthHeaders(token),
  });
};

export const removedCardLike = (selectedItemId, token) => {
  return request(`${baseUrl}/items/${selectedItemId}/like`, {
    method: "DELETE",
    header: getAuthHeaders(token),
  });
};
