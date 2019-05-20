import axios from 'axios';

export default {
  deleteMe(id, endpoint, token) {
    if (token) {
      return axios.delete(`/api/${endpoint}/${id}`, { headers: {
        Authorization: 'Bearer ' + token
      }});
    }
    return new Promise((resolve, reject) => {
      reject({ response: { statusText: 'Token Required'}});
    })
  }
}