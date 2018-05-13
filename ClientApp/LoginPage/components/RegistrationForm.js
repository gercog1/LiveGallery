import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import * as actions from '../actions';

const RegistrationForm = props => {
  const {
    setUsername,
    setEmail,
    setFirstName,
    setLastName,
    setPassword,
    setImage,
    setConfirmPassword,
    register,
    username,
    email,
    firstName,
    lastName,
    password,
    confirmPassword,
    image,
  } = props;

  return (
    <form className="m-t"
      onSubmit={register}
    >
      <div className={'form-group'}>
        <input
          type="text"
          className="form-control"
          onChange={setUsername}
          required
          placeholder="Username"
          value={username}
        />
      </div>
      <div className={'form-group'}>
        <input
          type="email"
          className="form-control"
          onChange={setEmail}
          required
          placeholder="Email"
          value={email}
        />
      </div>
      <div className={'form-group'}>
        <input
          type="text"
          className="form-control"
          onChange={setFirstName}
          required
          placeholder="First name"
          value={firstName}
        />
      </div>
      <div className={'form-group'}>
        <input
          type="text"
          className="form-control"
          onChange={setLastName}
          required
          placeholder="Last name"
          value={lastName}
        />
      </div>
      <div className={'form-group'}>
        <input
          type="password"
          className="form-control"
          onChange={setPassword}
          required
          placeholder="Password"
          value={password}
        />
      </div>
      <div className={'form-group'}>
        <input
          type="password"
          className="form-control"
          onChange={setConfirmPassword}
          required
          placeholder="Confirm password"
          value={confirmPassword}
        />

      </div>
      <div className={'form-group'}>
        <input
          type="password"
          className="form-control"
          onChange={setConfirmPassword}
          required
          placeholder="Country"
          value={confirmPassword}
        />

      </div>
      <div className={'form-group'}>
        <input
          type="file"
          accept="image/*"
          name="image1"
          className="form-control"
          onChange={setImage}
          data-button-text="Single"
          data-class-button="btn btn-default"
          data-classinput="form-control inline"
          required
        />

      </div>
      <button
        type="submit"
        className="btn btn-primary block full-width m-b"
      >Register
      </button>
    </form>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setUsername: e => dispatch(actions.setRegUsername(e.target.value)),
  setEmail: e => dispatch(actions.setRegEmail(e.target.value)),
  setFirstName: e => dispatch(actions.setRegFirstName(e.target.value)),
  setLastName: e => dispatch(actions.setRegLastName(e.target.value)),
  setPassword: e => dispatch(actions.setRegPassword(e.target.value)),
  setConfirmPassword: e => dispatch(actions.setRegConfirmPassword(e.target.value)),
  setImage: e => dispatch(actions.setRegImage(e.target.files[0])),
  register: e => {
    e.preventDefault();
    dispatch(actions.register(ownProps.changeKey));
  }
});


const mapStateToProps = state => ({
  username:state.login.registrationInput.username,
  email: state.login.registrationInput.email,
  firstName: state.login.registrationInput.firstName,
  lastName: state.login.registrationInput.lastName,
  password: state.login.registrationInput.password,
  confirmPassword: state.login.registrationInput.confirmPassword,
  image: state.login.registrationInput.image,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);