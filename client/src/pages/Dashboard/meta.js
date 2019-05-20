import Input from '../../objects/Input/Input';

export default {
  opportunity: {
    fields: {
      partner_name,
      name,
      location_street,
      location_city,
      location_zip,
      shift_hours,
      start_date,
      end_date,
      commitment_length_months,
      frequency_unit,
      frequency_modifier,
      training_time_hours,
      volunteers_needed,
      tags,
      description
    },
    display: [
      'name',
      'partner_name',
      ['location_street', 'location_city'],
      'location_zip',
      'shift_hours',
      ['start_date', 'end_date'],
      'commitment_length_months',
      'frequency_unit',
      'frequency_modifier',
      'training_time_hours',
      'volunteers_needed',
      'tags',
      'description'
    ],
  }
}