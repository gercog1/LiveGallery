import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from './components/Layout';

import LoginPage from './LoginPage/container';
import PhotoGrid from './Home/container';
import SinglePhoto from './SinglePhoto/container';
import Notifications from './Notifications/container';
import UserPage from './UserPage/container';

const Routes = () =>{
  return (
    <Switch>
      <Route exact path="/" component={LoginPage}/>
      <Layout>
        <Switch>
          <Route path="/home" component={PhotoGrid}/>
          <Route path="/photo/:photoId" component={SinglePhoto}/>
          <Route path="/notifications" component={Notifications}/>
          <Route path="/user/:userId" component={UserPage}/>
            <Route path="/profile" component={UserPage}/>

          <Route path="*">
            <Redirect to={'/'} />
          </Route>
        </Switch>
      </Layout>
    </Switch>
  );
};

export default Routes;


