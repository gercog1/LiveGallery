import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import RegisterForm from './components/RegistrationForm'; 
import LoginForm from './components/LoginForm';
import { loginService } from './services';
import { Tabs, Tab } from 'react-bootstrap';

const LoginPage = props => {
  const {tabKey, changeKey} = props;

  return (
    <div className="row text-center" style={{ marginTop: 100 }}>
      <div className="login-page-container" style={{ width: 446, margin: '0 auto' }}>
        <span className="login-page">
          <div className="tabs-container tab">
            <Tabs id="controlled-tab-example" onSelect={changeKey} activeKey={tabKey} style={{ borderBottom: 'none' }}>
              <Tab eventKey={1} title="Login" />
              <Tab eventKey={2} title="Register" />
            </Tabs>
          </div>
        </span>
        <div className="ibox-content ibox-contet-login" style={{ borderStyle: 'none' , width: 443}}>
          <h2 className="font-bold" >Welcome to LiveGallery</h2>
          <p className="text-navy" style={{ marginBottom: 20 }}>
                    Sign in into your Account
          </p>
          { tabKey === 1 ? <LoginForm/> : <RegisterForm/>}
        </div>

      </div>
    </div>
  );
};

export default compose(
  withState('tabKey', 'changeKey', 1),
  withHandlers({
    changeKey: ({ changeKey }) => tabKey =>{
        loginService.login('email', 'password');
        changeKey(tabKey);
    },
  })
)(LoginPage);