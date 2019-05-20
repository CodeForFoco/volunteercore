import React, { Component } from 'react';
import DashWrap from '../../../components/DashWrap/DashWrap';
import DashForm from '../../../components/DashForm/DashForm';
import opp from '../../../services/opportunities';
import Alert from '../../../components/Alert/Alert';

export default class PostOpportunity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        partner_name: {
          type: 'select',
          options: [],
          endpoint: '/api/partners',
          property: 'name'
        },
        name: {},
        location_street: {},
        location_city: {},
        location_zip: { type: 'number' },
        shift_hours: { type: 'number' },
        start_date: { type: 'date' },
        end_date: { type: 'date' },
        commitment_length_months: { type: 'number' },
        frequency_unit: {
          options: ['every', 'every other', '1st', '2nd', '3rd', '4th'],
          type: 'select'
        },
        frequency_modifier: {
          options: ['day', 'week', 'weekend', 'month', 'year'],
          type: 'select',
        },
        training_time_hours: { type: 'number' },
        volunteers_needed: {
          type: 'number'
        },
        tags: {
          type: 'select',
          options: [],
          endpoint: '/api/tag_categories',
          property: 'category_name'
        },
        description: {}
      },
      rows: [
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
      postResult: {}
    }
  }

  submitForm(e) {
    e.preventDefault();
    let data = {};
    Object.keys(this.state.data).forEach(key => { 
      data[key] = data.value;
    });
    opp.postOpportunity(this.props.token, data)
      .then(res => {
        this.setState({ postResult: {
          type: 'alert-success',
          text: 'Opportunity posted!'
        }})
      })
      .catch(err => {
        this.setState({ postResult: {
          type: 'alert-danger',
          text: err.response.statusText
        }});
      });
  }

  set(obj) {
    this.setState(obj);
  }

  render () {
    return (
      <DashWrap>
        <h2>Post Opportunity</h2>
        <DashForm
          data={this.state.data}
          set={this.set.bind(this)}
          rows={(() => {
            const { rows, data } = this.state;
            return rows.map(row => {
              if (Array.isArray(row)) {
                return row.map(col => {
                  let myData = data[col];
                  myData.name = col;
                  return data[col];
                });
              } else {
                let myData = data[row];
                myData.name = row;
                return [data[row]];
              }
            });
          })()}
          submitForm={this.submitForm.bind(this)}
        />
        <br/>
        <Alert {...this.state.postResult}/>
      </DashWrap>
    );
  }
}

const opportunity = {
  
}