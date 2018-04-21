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

        />
      </div>
      <div className={'form-group'}>
        <input
          type="email"
          className="form-control"
          onChange={setEmail}
          required
          placeholder="Email"

        />
      </div>
      <div className={'form-group'}>
        <input
          type="text"
          className="form-control"
          onChange={setFirstName}
          required
          placeholder="First name"

        />
      </div>
      <div className={'form-group'}>
        <input
          type="text"
          className="form-control"
          onChange={setLastName}
          required
          placeholder="Last name"

        />
      </div>
      <div className={'form-group'}>
        <input
          type="password"
          className="form-control"
          onChange={setPassword}
          required
          placeholder="Password"
        />
      </div>
      <div className={'form-group'}>
        <input
          type="password"
          className="form-control"
          onChange={setConfirmPassword}
          required
          placeholder="Confirm password"
        />

      </div>
      <div className={'form-group'}>
        <input
          type="text"
          className="form-control"
          onChange={setImage}
          required
          placeholder="Image"
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
  setUsername: e => dispatch(actions.setRegUsername(e.target.value)),
  setEmail: e => dispatch(actions.setRegEmail(e.target.value)),
  setFirstName: e => dispatch(actions.setRegFirstName(e.target.value)),
  setLastName: e => dispatch(actions.setRegLastName(e.target.value)),
  setPassword: e => dispatch(actions.setRegPassword(e.target.value)),
  setConfirmPassword: e => dispatch(actions.setRegConfirmPassword(e.target.value)),
  setImage: e => dispatch(actions.setRegImage(e.target.value)),
  register: e => {
    e.preventDefault();
    dispatch(actions.register());
  }
});

export default connect(null, mapDispatchToProps)(RegistrationForm);