import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    success: false
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user.login.isAuth) {
      this.props.history.push('/user');
    }
  }

  submitForm = (e) => {
    e.preventDefault();
    this.props.dispatch(loginUser(this.state));
  }

  handleInputEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  handleInputPassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }
  render() {
    let user = this.props.user;
    return (
      <div className="rl_container">
        <form onSubmit={this.submitForm}>
          <h2>Login In Here</h2>
          <div className="form_element">
            <input type="email" placeholder="Enter Your Mail" value={this.state.email} onChange={this.handleInputEmail}/>
          </div>
          <div className="form_element">
            <input type="password" placeholder="Enter Your Password" value={this.state.password} onChange={this.handleInputPassword} />
          </div>

          <button type="submit">Log In</button>
          <div className="error">
          {
            user.login ? <div className>{user.login.message}</div> : null
          }
          </div>
        </form>
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

export default connect(mapStateToProps)(Login);