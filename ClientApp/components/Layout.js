import * as React from 'react';
import { NavMenu } from './NavMenu';

import {Link} from  'react-router-dom';

export const Layout = React.createClass({
  render(){
    return(<div>
      <h1>
        <Link to="/">Reactgram</Link>
      </h1>
      {React.cloneElement({...this.props}.children, {...this.props})}
    </div>
    );}
});
