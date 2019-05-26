import axios from 'axios';
let token;

export default function () {
  return new Promise((resolve, reject) => {
    if (token) return resolve(token);
    const credentials = { username: 'admin', password: 'password' };

    axios.post('/api/auth/token', credentials)
      .then(res => {
        token = res.data;
        resolve(res.data);
      })
      .catch(reject);
  });
}