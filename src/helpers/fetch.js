const baseUrl = process.env.REACT_APP_API_URL;

export const fetchWithoutToken = (endpoint, method = "GET", data) => {
  const url = `${baseUrl}/${endpoint}`;

  switch (method) {
    case "GET":
      return fetch(url);
    case "POST":
      return fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    default:
      return fetch(url);
  }
};

export const fetchWithToken = (endpoint, method = "GET", data) => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem("token") || "";

  switch (method) {
    case "GET":
      return fetch(url, {
        headers: {
          "x-token": token,
          "Content-Type": "application/json",
        },
      });
    case "POST":
      return fetch(url, {
        method,
        headers: {
          "x-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    default:
      return fetch(url);
  }
};
