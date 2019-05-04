module.exports = [{
    name: 'opportunities',
    addLinkName: 'Opportunity',
    addLink: '/dashboard/addopportunity',
    editLink: '/dashboard/editopportunity',
    text: ['name', 'partner_name']
  }, {
    name: 'partners',
    addLinkName: 'Partner',
    addLink: '/dashboard/addpartner',
    editLink: '/dashboard/editpartner',
    text: ['name', 'opportunity_count'],
    view: false
  }, {
    name: 'users',
    addLinkName: 'User',
    addLink: '/dashboard/adduser',
    editLink: '/dashboard/edituser',
    text: ['username'],
    view: false
  }, {
    name: 'tags',
    addLinkName: 'Tag',
    addLink: '/dashboard/addtag',
    editLink: '/dashboard/edittag',
    view: false
  }, {
    type: ''
  }
]