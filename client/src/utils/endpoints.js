module.exports = {
  opportunities: {
    url: '/api/opportunities',
    text: ({ name, partner_name }) => {
      return `${name} - ${partner_name}`;
    },
    rows: [[{
      label: 'Partner',
      name: 'partner_name',
    }], [{
      label: 'Address',
      name: 'location_street'
    }, {
      label: 'City',
      name: 'location_city'
    }], [{
      label: 'State',
      name: 'location_state',
      value: 'CO',
      disabled: true
    }, {
      label: 'Zip',
      name: 'location_zip',
      type: 'number'
    }], [{
      label: 'Opportunity Name',
      name: 'name'
    }], [{
      label: 'Shift Hours',
      name: 'shift_hours',
      type: 'number'
    }], [{
      label: 'Start Date',
      name: 'start_date',
      type: 'date',
      optional: true
    }, {
      label: 'End Date',
      name: 'end_date',
      type: 'date',
      optional: true
    }], [{
      label: 'Commitment Months',
      name: 'commitment_length_months',
      type: 'number',
      optional: true
    }], [{
      label: 'Frequency Unit',
      ex: 'Eg. Every, 1st',
      name: 'frequency_unit',
      optional: true,
      options: ['every', 'every other', '1st', '2nd', '3rd', '4th'],
      type: 'select'
    }, {
      label: 'Frequency Modifier',
      ex: 'Eg. Day, Week',
      name: 'frequency_modifier',
      optional: true,
      options: ['day', 'week', 'weekend', 'month', 'year'],
      type: 'select'
    }], [{
      label: 'Training Hours Required',
      ex: 'hours',
      name: 'training_time_hours',
      type: 'number',
      optional: true
    }], [{
      label: 'Volunteers Needed',
      name: 'volunteers_needed',
      type: 'number',
      optional: true
    }], [{
      label: 'Tags',
      ex: 'Eg. "children, art"',
      name: 'tags_string',
      placeholder: 'Enter Tags (Eg. children, art, games)',
      optional: true
    }], [{
      label: 'Description',
      name: 'description',
      type: 'textarea'
    }]]
  },
  partners: {
    url: '/api/partners',
    text: ({name, opportunity_count}) => {
      return `${name} - ${opportunity_count} Opps`;
    },
    rows: [[{
      label: 'Partner Name',
      name: 'name'
    }]]
  },
  tag_categories: {
    url: '/api/tag_categories',
    text: ({ category_name, tags }) => {
      return `${category_name}`;
    },
    rows: [[{
      label: 'Tag Category',
      name: 'category_name'
    }], [{
      label: 'Tags',
      name: 'tags'
    }]]
  },
  users: {
    url: '/api/users?include_email=true',
    text: ({ username }) => {
      return username;
    },
    rows: [[{
      label: 'Username',
      name: 'username'
    }], [{
      label: 'Email',
      name: 'email'
    }], [{
      label: 'Password',
      name: 'password'
    }]]
  }
};
