module.exports = [{
  path: '/',
  component: require('../../pages/Opportunities/Opportunities').default
}, {
  path: '/opportunities',
  component: require('../../pages/Opportunities/Opportunities').default
}, {
  path: '/addopportunity',
  component: require('../../pages/AddOpportunity/AddOpportunity.js').default
}, {
  component: require('../../pages/Page404/Page404.js').default
}];