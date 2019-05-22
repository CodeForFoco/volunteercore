import axios from 'axios';

export default {
  parseOpportunity(data) {
    let copy = data;
    if (copy.start_date) {

    }
    if (copy.end_date) {

    }
  },
  // Returns true if valid before parsing
  validOpportunity(data) {
    return true;
  },
  // Parses then posts
  postOpportunity(token, data) {
    console.log(data);
    data = this.parseOpportunity(data);
    console.log(data);
    return axios.post('/api/opportunities', data, {
      headers: {
        Authorization: 'Bearer ' + token
      }});
  },
  // Parses then posts
  putOpportunity(token, data) {
    return axios.post('/api/opportunities', data, {
      headers: {
        Authorization: 'Bearer ' + token
      }});
  },
  getOpportunities(search) {
    return axios.get('/api/opportunities?search=' + search);
  },
  getOpportunity(id) {
    return axios.get('/api/opportunities/' + id);
  }
}
