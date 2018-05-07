import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, lifecycle, branch, renderComponent } from 'recompose';
import { Modal, Image } from 'react-bootstrap';
import actions from './actions';
import { ListGroupItem, ListGroup } from 'react-bootstrap';
import {Loading} from "../Loading";

const Followers = props => {
  const {showFollowers,
    closeFollowers,
    followers,
    isLoadedFollowers,
    subscribe,
    following,
  } = props;

  return (
    <Modal style={{ top: `${20}%` }} className="modal-container" show={showFollowers} onHide={closeFollowers}>
      <Modal.Header closeButton>
        <h4 className="modal-title">Followers</h4>
      </Modal.Header>
      <Modal.Body >
        <ListGroup >
          {
            isLoadedFollowers && followers.map(user => (
              <ListGroupItem key={user.id}>
                <div className="row">
                  <div className="col-md-2">
                    <Image
                      src={user.photoURL}
                      style={{ width: '100%', height: 60}}
                    />
                  </div>
                  <div className="col-md-3">
                    <h3 style={{ display: 'inline-block'}}><Link to={`/user/${user.id}`}> {user.userName}</Link></h3>
                    <h3 style={{ fontWeight: 400}}>{user.firstName} {user.lastName}</h3>
                  </div>
                  {
                    user.id != localStorage.getItem('id') &&
                        <div className="col-md-offset-10">
                          {
                            following.some(follower => follower == user.id) ?
                              <button style={{marginRight: 20}} onClick={() => subscribe(user.id)}
                                className="btn btn-warning block m-b">Unfollow</button>
                              :
                              <button style={{marginRight: 20}} onClick={() => subscribe(user.id)}
                                className="btn btn-primary block m-b">Follow</button>

                          }
                        </div>
                  }
                </div>
              </ListGroupItem>))
          }
        </ListGroup>
      </Modal.Body>

      <Modal.Footer>
        <button type="button" className="btn btn-white" onClick={closeFollowers}>Close</button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = state => ({
  isLoadedFollowers: state.followers.isLoadedFollowers,
  followers: state.followers.followers,
  following: state.userProfile.following,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getFollowers: id => dispatch(actions.getFollowers(id)),
  subscribe: userId => dispatch(actions.subscribe(userId)),
});


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount(){
      this.props.getFollowers(this.props.userId);
    }
  }),
)(Followers);
