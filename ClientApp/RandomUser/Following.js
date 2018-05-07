import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, lifecycle, branch, renderComponent } from 'recompose';
import { Modal, Image } from 'react-bootstrap';
import actions from './actions';
import { ListGroupItem, ListGroup } from 'react-bootstrap';
import {Loading} from "../Loading";

const Following = props => {
  const {showFollowing,
    closeFollowing,
    isLoadedFollowing,
    following
  } = props;

  return (
    <div className="inmodal">
      <Modal style={{ top: `${20}%` }} className="modal-container" show={showFollowing} onHide={closeFollowing}>
        <form
          className="m-t"
          role="form"
          // onSubmit={addPhoto}
        >
          <Modal.Header closeButton>
            <h4 className="modal-title">Following</h4>
          </Modal.Header>
          <Modal.Body >
            {
              isLoadedFollowing && following.map(user => (
                <ListGroupItem key={user.id}>
                  <div className="row">
                    <div className="col-md-2">
                      <Image
                          className="img-fluid"
                        src={user.photoURL}
                        style={{ width: '100%', height: 60}}
                      />
                    </div>
                    <div className="col-md-3">
                      <h3 style={{ display: 'inline-block'}}><Link to={`/user/${user.id}`}> {user.userName}</Link></h3>
                      <h3 style={{ fontWeight: 400}}>{user.firstName} {user.lastName}</h3>
                    </div>
                      <div className="col-md-offset-10">
                          <button style={{ marginRight: 20}} className="btn btn-primary block m-b">Unfollow</button>
                      </div>
                  </div>
                </ListGroupItem>))
            }
          </Modal.Body>

          <Modal.Footer>
            <button type="button" className="btn btn-white" onClick={closeFollowing}>Close</button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoadedFollowing: state.following.isLoadedFollowing,
  following: state.following.following,

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getFollowing: id => dispatch(actions.getFollowing(id)),

});


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount(){
      this.props.getFollowing(this.props.userId);
    }
  }),
)(Following);

