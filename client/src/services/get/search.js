import axios from 'axios';

export default function (endpoint, token, data) {
  return new Promise((resolve, reject) => {
    const { search, page, per_page } = data;
    axios.get(`/api/${endpoint}?search=${search}&page=${page}&per_page=${per_page}`, {
      headers: { Authorization: 'Bearer ' + token }
    }).then(resolve)
      .catch(reject);
  });
}