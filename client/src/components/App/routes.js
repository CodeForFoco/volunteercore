module.exports = [{
  path: '/',
  component: require('../../pages/Home/Home.js').default
}, {
  path: '/opportunities',
  component: require('../../pages/Opportunities/Opportunities').default
}, {
  path: '/partners',
  component: require('../../pages/Partners/Partners.js').default
}, {
  path: '/dashboard/:endpoint/search',
  component: require('../../pages/SearchPage/SearchPage.js').default
}, {
  path: '/dashboard/:endpoint/add',
  component: require('../../pages/PostPage/PostPage.js').default
}, {
  component: require('../../pages/Page404/Page404.js').default
}];