const getAPIData = (url) => {
  return fetch(url)
    .then((response) => {
      if(response.ok) {
        return response.json()
      } else {
        throw Promise.reject(response)
      }
    })
    // .catch((err) => console.log("error", err));
};

export default getAPIData;