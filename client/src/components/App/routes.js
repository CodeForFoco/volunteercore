module.exports = [{
  path: '/',
  component: require('../../pages/Home/Home.js').default
}, {
  path: '/opportunities',
  component: require('../../pages/Opportunities/Opportunities').default
}, {
  path: '/dashboard/addopportunity',
  component: require('../../pages/PostOpportunity/PostOpportunity.js').default
}, {
  path: '/partners',
  component: require('../../pages/Partners/Partners.js').default
}, {
  path: '/dashboard',
  component: require('../../pages/Dashboard/Dashboard.js').default
}, {
  path: '/settings',
  component: require('../../pages/Account/Account.js').default
}, {
  component: require('../../pages/Page404/Page404.js').default
}];