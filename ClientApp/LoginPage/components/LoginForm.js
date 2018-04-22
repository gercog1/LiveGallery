import React from 'react';
import { connect } from 'react-redux';
import { login, setEmail, setPassword } from '../actions';

const LoginForm = props => {
    const { login, setPassword, setEmail } = props;

    return (
        <form className="m-t"
              onSubmit={login}
        >
            <div className={'form-group'}>
                <input
                    type="text"
                    className="form-control"
                    onChange={setEmail}
                    required
                    placeholder="Usernameaaaaa"
                    name="user"
                />
            </div>
            <div className={'form-group'}>
                <input
                    type="password"
                    className="form-control"
                    onChange={setPassword}
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
        dispatch(login());
    },
    setEmail: (e)=> dispatch(setEmail(e.target.value)),
    setPassword: (e)=> dispatch(setPassword(e.target.value)),
});

export default connect(null, mapDispatchToProps)(LoginForm)