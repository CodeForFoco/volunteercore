import axios from 'axios';

export default {
  get(search, endpoint, token) {
    if (token) {
      return axios.get(`/api/${endpoint}?search=${search}`, { headers: {
        Authorization: 'Bearer ' + token
      }});
    }
    return axios.get(`/api/${endpoint}?search=${search}`);
  }
}