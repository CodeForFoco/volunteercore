import signin from '../post/signin';
import search from './search';

test('GET /api/partners returns an array of partners', () => {
  signin()
    .then((token) => {
      search('partners', token, { search: '' })
      .then(res => {
        expect(res.data).toBeDefined();
      })
      .catch(err => {
        throw err;
      });
    })
    .catch((err) => {
      throw err;
    });
});
