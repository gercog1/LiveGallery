import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const RegistrationForm = props => {
    const {} = props;

    return (
        <form className="m-t"
            // onSubmit={this.props.submitLogin}
        >
            <div className={'form-group'}>
                <input
                    type="text"
                    className="form-control"
                    // value={this.props.email}
                    // onChange={this.props.handleEmailChange}
                    required
                    placeholder="Username"

                />
            </div>
            <div className={'form-group'}>
                <input
                    type="text"
                    className="form-control"
                    // value={this.props.email}
                    // onChange={this.props.handleEmailChange}
                    required
                    placeholder="Email"

                />
            </div>
            <div className={'form-group'}>
                <input
                    type="text"
                    className="form-control"
                    // value={this.props.email}
                    // onChange={this.props.handleEmailChange}
                    required
                    placeholder="First name"

                />
            </div>
            <div className={'form-group'}>
                <input
                    type="text"
                    className="form-control"
                    // value={this.props.email}
                    // onChange={this.props.handleEmailChange}
                    required
                    placeholder="Last name"

                />
            </div>
            <div className={'form-group'}>
                <input
                    type="password"
                    className="form-control"
                    // value={this.props.password}
                    // onChange={this.props.handlePasswordChange}
                    required
                    placeholder="Password"
                />
            </div>
            <div className={'form-group'}>
                <input
                    type="password"
                    className="form-control"
                    // value={this.props.password}
                    // onChange={this.props.handlePasswordChange}
                    required
                    placeholder="Confirm password"
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

export default RegistrationForm;