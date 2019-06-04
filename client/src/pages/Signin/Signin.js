import React, { Component } from 'react';
import history from '../../utils/history';
import { isAdmin, isUser } from '../../utils/validation';
import Wrap from '../../components/Wrap/Wrap';
import Form from '../../objects/Form/Form.js';
import Alert from '../../components/Alert/Alert.js';
import axios from 'axios';

export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      response: {}
    }
  }

  setValue(obj) {
    this.setState(obj);
  }

  submitForm(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const Authorization = 'Basic ' + window.btoa(username + ':' + password);
    axios.post('/api/auth/login', {}, { headers: { Authorization }})
      .then(res => {
        axios.get('/api/users/authenticated_user')
          .then(res => {
            console.log('setting user...');
            const user = res.data;
            this.props.set({ user }, () => {
              if (isAdmin(user)) {
                return history.push('/dashboard/tags/search');
              }
              return history.push('/opportunities');
            });
          })
          .catch(err => {
            this.setState({ response: { type: 'alert-danger', text: 'Bad Login. Please try again.' }});
          });
      })
      .catch(err => {
        this.setState({ response: { type: 'alert-danger', text: err.response.data.message }});
      });
  }

  componentDidMount() {
    const { user } = this.props;
    if (isUser(user)) return history.push('/opportunities');
    if (isAdmin(user)) return history.push('/dashboard/tag_categories/search');
  }

  render () {
    return (
      <Wrap {...this.props}>
        <div className="card">
          <div className="card-header">
            Hello from Volunteer Core!
          </div>
          <div className="card-body">
            <h2>Sign In</h2>
            <p>Sign In below to access your dashboard. :)</p>
            <Form
              data={this.state}
              submitForm={this.submitForm.bind(this)}
              setValue={this.setValue.bind(this)}
              submitBtnClass='btn-info'
              fields={[{
                name: 'username'
              }, {
                name: 'password',
                type: 'password'
              }]}
            />
            <br/>
            <Alert {...this.state.response}/>
          </div>
        </div>
      </Wrap>
    );
  }
}