import React from 'react';


const LoginForm = props => {
    const {} = props;

    return (
            <form className="m-t" 
            // onSubmit={this.props.submitLogin} 
            >
              <div className={'form-group'}>
                <input
                  type="email"
                  className="form-control"
                  // value={this.props.email}
                  // onChange={this.props.handleEmailChange}
                  required=""
                  placeholder="Username"
                  name="user"
                />
              </div>
              <div className={'form-group'}>
                <input
                  type="password"
                  className="form-control"
                  // value={this.props.password}
                  // onChange={this.props.handlePasswordChange}
                  required=""
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
           
    )
};

export default LoginForm;