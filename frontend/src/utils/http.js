export default function http(path, method, body = {}) {
  return fetch('http://localhost:8080/' + path,  {
    method,
    body: Object.keys(body).length === 0 ? null : JSON.stringify(body),
    credentials: "include",
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    mode: 'cors'
  }).then((response) => {
    let jsonPromise = response.json();

    if (response.status >= 400) {
      return jsonPromise.then(response => {
        throw response;
      })
    }

    return jsonPromise
  })
}
