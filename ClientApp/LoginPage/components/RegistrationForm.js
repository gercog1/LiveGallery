import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const RegistrationForm = props => {
  const {} = props;

  return (
    <div className="Login">
      <form 
      // onSubmit={this.handleSubmit}
      >
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email Register</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            // value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            // value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <Button
          block
          bsSize="large"
          // disabled={!this.validateForm()}
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;