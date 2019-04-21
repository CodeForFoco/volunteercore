import React, { Component } from 'react';

export default class AccountPage extends Component {
  render () {
    return (
      <>
        <h1>Settings</h1><br/>
        <form className="card">
          <div className="card-header">Edit your account</div>
            <div className="card-body">
              <Input
                label="Organization Name"
                name="partner_name"
                placeholder="Enter Orginization Name"
              />
              <Input
                label="Website"
                name="partner_website"
                placeholder="Enter Website (Eg. https://example.com) "
              />
            <label>Organization Location</label>
            <div className="row">
              <div className="col-sm-12 col-md">
                <Input
                  label="Address"
                  name="location_street"
                  placeholder="Enter Address"
                />
              </div>
              <div className="col-sm-12 col-md">
                <Input
                  label="City"
                  name="location_city"
                  placeholder="Enter Location"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md">
                <Input
                  label="State"
                  name="location_state"
                  placeholder="Enter State"
                />
              </div>
              <div className="col-sm-12 col-md">
                <Input
                  label="Zip"
                  name="location_zip"
                  placeholder="Enter Zip"
                  type="number"
                />
              </div>
            </div>
            <Input
              label="Phone Number"
              name="partner_phone_number"
              placeholder="Enter Phone"
              type="number"
            />
            <div className="form-group">
              <label className="control-label">Description</label>
              <textarea className="form-control" name="description" placeholder="Enter Description (Minimum 100 characters)"/>
            </div>
            <button className="btn btn-success btn-block">Submit</button><br/>
            <label>Delete Account</label>
            <p>WARNING: This action is irreversible.</p>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Enter Organization Name"/>
              <div className="input-group-append">
                <button className="btn btn-danger">Delete Account</button>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}

class Input extends Component {
  render () { 
    return (
      <div className="form-group">
        <label className="control-label">{this.props.label || this.props.name}</label>
        <input className="form-control" type={this.props.type || 'text'} name={this.props.name} placeholder={this.props.placeholder}/>
      </div>
    );
  }
}