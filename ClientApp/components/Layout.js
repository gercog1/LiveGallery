import * as React from 'react';
import { Image } from 'react-bootstrap';

import {Link} from  'react-router-dom';

export const Layout = React.createClass({
  render(){
    return(<div>
      <h1>
        <Link to="/home">LiveGallery</Link>
      </h1>
      <div className="photo-grid">
        <figure style={{ flexBasis: 'none', height: 100 }} className="grid-figure">
          <div className="control-buttons">
            <Link to="/home" style={{ marginRight: 5 }} className="button"><span/> Home </Link>
            <Link to="/notifications" style={{ marginRight: 5 }} className="button"> Notifications </Link>
            <Link to="/profile" style={{ marginRight: 5 }} className="button"> Profile </Link>
          </div>
        </figure>
      </div>
      {React.cloneElement({...this.props}.children, {...this.props})}
      {console.log(this.props)}
    </div>
    );}
});
