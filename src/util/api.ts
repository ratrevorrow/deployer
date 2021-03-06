import axios from 'axios';

function handleResponse(response: Response) {
  return response.text().then((text: any) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      let error;
      if (response.status === 500) {
        error = 'Internal Server';
      } else {
        error = data || response.statusText;
      }
      return Promise.reject(error);
    }
    return data;
  });
}

export const getProtocol = (uri: string, headers = {}) =>
  axios
    .get(uri, headers)
    .then((res) => res.data)
    .catch((err) => err);

export const postProtocol = (uri: string, data: any) =>
  fetch(uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data }),
  })
    .then(handleResponse)
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
