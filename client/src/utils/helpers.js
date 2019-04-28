import axios from 'axios';

export default {
  getOpportunities: function (cb) {
    axios.get('/api/opportunities')
    .then((res) => {
      cb(res, null);
    })
    .catch((err) => {
      cb(err, null);
    });
  }
};
