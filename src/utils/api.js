import { request } from "./helpers";
const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

export const getItems = () => {
  return request(`${baseUrl}/items`, {
    headers,
  });
};

export const deleteItems = (selectedItemId) => {
  return request(`${baseUrl}/items/${selectedItemId}`, {
    method: "DELETE",
    headers,
  });
};

export const addItem = ({ name, imageUrl, weather }) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
};
