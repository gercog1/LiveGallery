import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose, withState, withHandlers, lifecycle } from 'recompose';
import RegisterForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm';
import { logout } from "./actions";
import { Tabs, Tab } from 'react-bootstrap';

const LoginPage = props => {
    const {tabKey, changeKey, isLoggedIn} = props;

    return (
        <div className="row text-center" style={{ marginTop: 100 }}>
            { isLoggedIn && <Redirect to="/home"/>  }
            <div className="login-page-container" style={{ width: 446, margin: '0 auto' }}>
         <span className="login-page">
            <div className="tabs-container tab">
              <Tabs id="controlled-tab-example" onSelect={changeKey} activeKey={tabKey} style={{ borderBottom: 'none' }}>
                  <Tab eventKey={1} title='Login' />
                  <Tab eventKey={2} title='Register' />
              </Tabs>
            </div>
          </span>
                <div className="ibox-content ibox-contet-login" style={{ borderStyle: 'none' , width: 443}}>
                    <h2 className="font-bold" >Welcome to LiveGallery</h2>
                    <p className="text-navy" style={{ marginBottom: 20 }}>
                        Sign in into your Account
                    </p>
                    { tabKey === 1 ? <LoginForm/> : <RegisterForm changeKey={changeKey}/>}
                </div>

            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    isLoggedIn: state.login.authentication.isLoggedIn,
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withState('tabKey', 'changeKey', 1),
    withHandlers({
        changeKey: ({ changeKey }) => tabKey => changeKey(tabKey),
    }),
    lifecycle({
        componentWillMount(){
            this.props.logout();
        }
    })
)(LoginPage)