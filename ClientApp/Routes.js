import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import LoginPage from './LoginPage/container'


const Routes = ()=>{
  return (
    <Switch>
       <Route exact path="/" component={LoginPage}/>
      <Layout>
        <div>
          <Route path="/home" component={Home}/>
          <Route path="/counter" component={Counter}/>
          <Route path="/fetchdata/:startDateIndex?" component={FetchData}/>
        </div>
      </Layout>
    </Switch>
  );
};

export default Routes;
