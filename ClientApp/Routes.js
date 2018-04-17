import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import LoginPage from './LoginPage/container';
import PhotoGrid from './Home/container';

const Routes = () =>{
  return (
    <Switch>
       <Route exact path="/" component={LoginPage}/>
      <Layout>
        <Switch>
          <Route path="/home" component={PhotoGrid}/>
          <Route path="/counter" component={Counter}/>
          <Route path="/fetchdata/:startDateIndex?" component={FetchData}/>
        </Switch>
      </Layout>
    </Switch>
  );
};

export default Routes;
