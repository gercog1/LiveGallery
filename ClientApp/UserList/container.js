import React from 'react';
import { Link } from 'react-router-dom';
import { compose, lifecycle, branch, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import {ListGroup, ListGroupItem, Image} from 'react-bootstrap';
import actions from './actions';
import { Loading } from '../Loading';
import {deleteAlert} from "../functions";

const UserList = props => {
  const { users, subscribe, following, deleteUser } = props;
  return(
    <div className="photo-grid">
      <figure style={{ flexBasis: 'none', height: 600 }} className="grid-figure">
        <ListGroup>
          {
            users.filter(user => user.id != localStorage.getItem('id') && user.userName != 'admin').map(user=>(
              <ListGroupItem key={user.id}>
                <div className="row">
                  <div className="col-md-1">
                    <Image
                      src={user.photoURL}
                      style={{ width: 60, height: 60}}
                    />
                  </div>
                  <div className="col-md-2">
                    <h3 style={{ display: 'inline-block'}}><Link to={`/user/${user.id}`}> {user.userName}</Link></h3>
                    <h3 style={{ fontWeight: 400}}>{user.firstName} {user.lastName}</h3>
                  </div>
                  <div className="col-md-offset-11">
                    { localStorage.getItem('role') == 1 && <button onClick={() => deleteAlert(deleteUser, user.id)} style={{ marginRight: 20}} className="btn btn-danger block m-b">Delete</button> }
                    {
                      following.some(follower => follower == user.id)   ?
                          localStorage.getItem('role') != 1 && <button style={{marginRight: 20}} onClick={() => subscribe(user.id)}
                                  className="btn btn-warning block m-b">Unfollow</button>
                          :
                          localStorage.getItem('role') != 1 && <button style={{marginRight: 20}} onClick={() => subscribe(user.id)}
                          className="btn btn-primary block m-b">Follow</button>

                    }
                  </div>
                </div>
              </ListGroupItem>))
          }
        </ListGroup>;
      </figure>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(actions.getUsers()),
  subscribe: userId => dispatch(actions.subscribe(userId)),
    deleteUser: userId => dispatch(actions.deleteUser(userId)),
});

const mapStateToProps = state => ({
  isLoadedList: state.userList.isLoadedList,
  users: state.userList.users,
  following: state.userProfile.following,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount(){
      this.props.getUsers();
    }
  }),
  branch(
    ({isLoadedList}) => isLoadedList,
    renderComponent(UserList),
    renderComponent(Loading)
  )
)(UserList);