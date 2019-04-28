import React, { Component } from 'react';
import Input from '../../objects/Input/Input.js';
import './OppForm.scss';

export default class OpportunityForm extends Component {
  render () {
    return (
      <form onSubmit={this.props.submitForm.bind(this)}>
        <p><i>* Asterisk indicates a required field.</i></p>
        <Input
          label="Organization Name"
          name="partner_name"
          placeholder="Enter Organization Name"
          set={this.props.setByName.bind(this)}
          value={this.props.partner_name}
        />
        <Location {...this.props}/>
        <Input
          label="* Name (Eg. Prepare Shipments)"
          name="name"
          placeholder="Enter name"
          set={this.props.setByName.bind(this)}
          value={this.props.name}
        />
        <Input
          label="* Shift Hours (Eg. 5.5 hours)"
          name="shift_hours"
          placeholder="Enter Shift Hours"
          set={this.props.setByName.bind(this)}
          type="number"
          test={() => { return this.props.shift_hours !== '' }}
          value={this.props.shift_start}
        />
        <Recurring {...this.props}/>
        <Input
          label="Commitment Length (Eg. 5.5)"
          name="commitment_length"
          placeholder="Enter Commitment Length"
          set={this.props.setByName.bind(this)}
          value={this.props.commitment_length}
        />
        <Input
          label="Training Required (Eg. 5 hours)"
          name="training_time_required"
          placeholder="Enter Hours"
          test={() => true}
          type="number"
          set={this.props.setByName.bind(this)}
          value={this.props.training_time_required}
        />
        <Input
          label="Volunteers needed"
          name="volunteers_needed"
          placeholder="Enter Number of Volunteers"
          test={() => true}
          type="number"
          set={this.props.setByName.bind(this)}
          value={this.props.volunteers_needed}
        />
        <Input 
          label="Tags (Eg. 'children, fun, painting')"
          name="tags_string"
          placeholder="Enter tags (comma seperated list)"
          test={() => true}
          set={this.props.setByName.bind(this)}
          value={this.props.volunteers_needed}
        />
        <div>
          <span className="badge badge-primary badge-pill">Painting</span>
          <span className="badge badge-primary badge-pill">Children</span>
          <span className="badge badge-primary badge-pill">Fun</span>
        </div>
        <br/>
        <div className="form-group">
          <label className="control-label">* Description</label>
          <textarea className="form-control" name="description" placeholder="Enter Description (500 characters max)" style={{resize: 'none'}}/>
        </div>
        <input type="submit" className="btn btn-success btn-block"/>
      </form>
    );
  }
}

/*class RecurringCard extends Component {
  render () {
    return (
      <div className="card">
        <div className="card-header card-header-opp-form">
          <span
            className={`btn ${!this.props.recurring ? 'btn-info': ''}`}
            onClick={() => this.props.set({ recurring: false })}
            onKeyUp={(e) => e.keyCode === 13 ? this.props.set({ recurring: false }) : '' }
            tabIndex='0'>
            One-Time
          </span>
          <span
            className={`btn ${this.props.recurring ? 'btn-info': ''}`}
            onClick={() => this.props.set({ recurring: true })}
            onKeyUp={(e) => e.keyCode === 13 ? this.props.set({ recurring: true }) : '' }
            tabIndex='0'>
            Recurring
          </span>
        </div>
        <div className="card-body">
          {this.props.recurring ? <Recurring {...this.props}/> : <OneTime {...this.props}/>}
        </div>
      </div>
    );
  }
}

class OneTime extends Component {
  render () {
    return (
      <>
        <Input
          label="* Date"
          name="start_date"
          type="date"
          set={this.props.setByName.bind(this)}
          value={this.props.start_date}
        />
      </>
    );
  }
}*/

class Location extends Component {
  render () {
    return (
      <>
        <label>* Opportunity Location</label>
        <div className="row">
          <div className="col-sm-12 col-md">
            <Input
              label="* Address"
              name="location_street"
              placeholder="Enter Address"
              set={this.props.setByName.bind(this)}
              test={() => /[0-9].*/gm.test(this.props.location_street)}
              value={this.props.location_street}
              />
          </div>
          <div className="col-sm-12 col-md">
            <Input
              label="* City"
              name="location_city"
              placeholder="Enter Location"
              set={this.props.setByName.bind(this)}
              value={this.props.location_city}    
              />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md">
            <Input
              label="* State"
              name="location_state"
              placeholder="Enter State"
              set={this.props.setByName.bind(this)}
              test={() => /^[A-Za-z]{2}$/gm.test(this.props.location_state)}
              value={this.props.location_state}
              disabled={true}
              />
          </div>
          <div className="col-sm-12 col-md">
            <Input
              label="* Zip"
              name="location_zip"
              placeholder="Enter Zip"
              set={this.props.setByName.bind(this)}
              test={() => {
                return 9999 < this.props.location_zip && 
                  this.props.location_zip < 100000 &&
                  Number.isInteger(parseInt(this.props.location_zip));
              }}
              type="number"
              value={this.props.location_zip}
            />
          </div>
        </div>
      </>
    );
  }
}

class Recurring extends Component {
  render () {
    return (
      <>
        <div className="row">
          <div className="col">
            <Input
              label="* Start Date"
              name="start_date"
              placeholder="Enter Start Date"
              set={this.props.setByName.bind(this)}
              type="date"
              value={this.props.start_date}
            />
          </div>
          <div className="col">
            <Input
              label="* End Date"
              name="end_date"
              placeholder="Enter End Date"
              set={this.props.setByName.bind(this)}
              type="date"
              value={this.props.end_date}
            />
          </div>
        </div>
      </>
    );
  }
}