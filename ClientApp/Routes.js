import * as React from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/Layout';

import LoginPage from './LoginPage/container';
import PhotoGrid from './Home/container';
import SinglePhoto from './SinglePhoto/container';
import Notifications from './Notifications/container';
import UserList from './UserList/container';
import RandomUser from './RandomUser/container';
import Filtered from './Filtered/container';


const Routes = () =>{

  return (
    <Switch>

      <Route exact path="/" component={LoginPage}/>
      {
        localStorage.getItem('id') &&

      <Layout>
        <Switch>
          <Route path="/home" component={PhotoGrid}/>
          <Route path="/photo/:photoId" component={SinglePhoto}/>
          <Route path="/filtered" component={Filtered}/>
          <Route path="/user/:userId" component={props => <RandomUser {...props} />}/>
          <Route path="/profile" component={props => <RandomUser {...props} /> }/>
          <Route path="/user-list" component={UserList}/>
          <Route path="*">
            <Redirect to={'/'} />
          </Route>
        </Switch>
      </Layout>
      }
      <Route path="*">
        <Redirect to={'/'} />
      </Route>
    </Switch>
  );
};
const mapDispatchToProps = dispatch => ({

});

export default Routes;



