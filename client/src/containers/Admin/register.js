import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getUsers, registerUser } from '../../actions';

class Register extends PureComponent {

  state = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    error: ''
  }

  componentWillMount() {
    this.props.dispatch(getUsers());
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user.register === false) {
      this.setState({
        error: 'Error try again'
      })
    } else {
      this.setState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        error: ''
      })
    }
  }

  handleInputEmail = (event) => {
    this.setState({email: event.target.value});
  }

  handleInputPassword = (event) => {
    this.setState({password: event.target.value});
  }


  handleInputName = (event) => {
    this.setState({name: event.target.value});
  }


  handleInputLastname= (event) => {
    this.setState({lastname: event.target.value});
  }

  handleSubmitForm = (event) => {
    event.preventDefault();
    console.log(this.props);
    this.setState({error: ''})
    this.props.dispatch(registerUser({
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      lastname: this.state.lastname
    }, this.props.user.users));
  }

  showUsers = (user) => (
    user.users ? 

    user.users.map(user => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{user.lastname}</td>
        <td>{user.email}</td>
      </tr>
    ))

    : null
  )

  render() {
    return (
      <div className="rl_container">
        <form onSubmit={this.handleSubmitForm}>
          <h2>Add user</h2>
          <div className="form_element">
            <input 
            type="text"
            placeholder="Enter name"
            value={this.state.name}
            onChange={this.handleInputName}
            />
          </div>
          <div className="form_element">
            <input 
            type="text"
            placeholder="Enter lastname"
            value={this.state.lastname}
            onChange={this.handleInputLastname}
            />
          </div>
          <div className="form_element">
            <input 
            type="email"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleInputEmail}
            />
          </div>
          <div className="form_element">
            <input 
            type="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleInputPassword}
            />
          </div>
          <button type="submit">Add User</button>
          <div className="error">
            {this.state.error}
          </div>
        </form>
        <div className="current_users">
          <h4>Current Users:</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Lastname</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {this.showUsers(this.props.user)}
            </tbody>
          </table>
        </div>
        
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Register);
