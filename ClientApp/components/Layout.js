import * as React from 'react';
import { Image } from 'react-bootstrap';
import {branch, compose, lifecycle, renderComponent} from 'recompose';
import { connect } from 'react-redux';
import actions from '../UserPage/actions';

import {Link} from  'react-router-dom';
import {Loading} from "../Loading";

const Layout = React.createClass({
  render(){
    return(<div>
      <h1>
        <Link to="/home">LiveGallery</Link>
      </h1>
      <div className="photo-grid">
        <figure style={{ flexBasis: 'none', height: 100 }} className="grid-figure">
          <div className="control-buttons">
            <Link to="/home" style={{ marginRight: 5 }} className="button"><span/> Home </Link>
            <Link to="/user-list" style={{ marginRight: 5 }} className="button"> User List </Link>
            {/*<Link to="/notifications" style={{ marginRight: 5 }} className="button"> Notifications </Link>*/}
              {localStorage.getItem('role') != 1 && <Link to="/profile" style={{ marginRight: 5 }} className="button"> Profile </Link> }
          </div>
        </figure>
      </div>
      {React.cloneElement({...this.props}.children, {...this.props})}
    </div>
    );}
});

const mapDispatchToProps = dispatch => ({
  getUserProfile: id => dispatch(actions.getUserProfile(id)),
});

const mapStateToProps = state => ({
  isLoadedUser: state.userProfile.isLoadedUser,
});
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount(){
      this.props.getUserProfile(localStorage.getItem('id'));
    }
  }),
  branch(
    ({isLoadedUser}) => isLoadedUser,
    renderComponent(Layout),
    renderComponent(Loading)
  )
)(Layout);
