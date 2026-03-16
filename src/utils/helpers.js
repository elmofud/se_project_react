export function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export const request = (url, options) => {
  return fetch(url, options).then(handleResponse);
};

export const getAuthHeaders = (token) => ({
  "Content-Type": "application/json",
  authorization: `Bearer ${token}`,
});
