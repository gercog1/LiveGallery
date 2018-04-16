import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';

const LoginForm = props => {
    const { login } = props;

  return (
    <form className="m-t" 
      onSubmit={login}
    >
      <div className={'form-group'}>
        <input
          type="text"
          className="form-control"
          // value={this.props.email}
          // onChange={this.props.handleEmailChange}
          required
          placeholder="Username"
          name="user"
        />
      </div>
      <div className={'form-group'}>
        <input
          type="text"
          className="form-control"
          // value={this.props.password}
          // onChange={this.props.handlePasswordChange}
          required
          placeholder="Password"
          name="pass"
        />

      </div>
      <button
        type="submit"
        className="btn btn-primary block full-width m-b"
      >Login
      </button>
    </form>

  );
};

const mapDispatchToProps = dispatch => ({
  login: (e) =>
  {
    e.preventDefault();
    dispatch(login('email', 'password'));
  }
});

export default connect(null, mapDispatchToProps)(LoginForm)