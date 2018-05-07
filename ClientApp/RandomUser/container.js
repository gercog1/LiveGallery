import React from 'react';
import { compose, withState, withHandlers, lifecycle, branch, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import actions from './actions';
import { Loading } from '../Loading';
import AddPhoto from './AddPhoto';
import { logout} from "../LoginPage/actions";
import { formatDescription } from "../functions";

import Following from './Following';
import Followers from './Followers';


const RandomUser = props => {
  const {
    posts, match, user, showModal, closeModal, openModal, logout, setLike,
    showFollowers,
    showFollowing,
    openFollowers,
    closeFollowers,
    openFollowing,
    closeFollowing,
    followers,
    following,

  } = props;

  return(
    <div>
      { showModal && <AddPhoto showModal={showModal} closeModal={closeModal}/> }
      { showFollowers && < Followers showFollowers={showFollowers} closeFollowers={closeFollowers}/> }
      { showFollowing && <Following showFollowing={showFollowing} closeFollowing={closeFollowing}/> }
      <div className="photo-grid">
        <figure style={{ flexBasis: 'none', height: 200, display: 'inline-block' }} className="grid-figure">
          <div className="row">
            <div className="col-md-2">
              <Image
                style={{ width: 150, height: 150, verticalAlign: 'none', position: 'absolute', display: 'block' }}
                src={user.photoURL}
                circle responsive />
            </div>
            <div className="col-md-3">
              <figcaption >
                <h2 style={{ color: '#4286f4'}} className="font-bold" >{user.userName}</h2>
                <h3 className="font-bold" ><i style={{ color: '#669091'}} className="glyphicon glyphicon-send" /> {user.firstName} {user.lastName}</h3>
                <h3 style={{ fontWeight: 400 }}><i style={{ color: '#669091'}} className="glyphicon glyphicon-phone-alt" /> {user.email}</h3>
                { user.id == localStorage.getItem('id') && <h3 style={{ fontWeight: 400, cursor: 'pointer' }}><Link to="/" onClick={logout}>Logout</Link></h3> }
              </figcaption>
            </div>
            <div className="col-md-2">
              <figcaption >
                <h2 style={{ color: '#4286f4', textAlign: 'center' }} className="font-bold" >{posts.length}</h2>
                <h3 style={{textAlign: 'center' }} className="font-bold" >POSTS</h3>
              </figcaption>
            </div>
            <div className="col-md-2">
              <figcaption onClick={openFollowers} style={{ cursor: 'pointer' }} >
                <h2 style={{ color: '#4286f4', textAlign: 'center' }} className="font-bold" >{followers.length}</h2>
                <h3 style={{textAlign: 'center' }} className="font-bold" >FOLOWERS</h3>
              </figcaption>
            </div>
            <div className="col-md-2">
              <figcaption onClick={openFollowing} style={{ cursor: 'pointer' }} >
                <h2 style={{ color: '#4286f4', textAlign: 'center' }} className="font-bold" >{following.length}</h2>
                <h3 style={{textAlign: 'center' }} className="font-bold" >FOLOWING</h3>
              </figcaption>
            </div>
            {
              user.id == localStorage.getItem('id') &&

                  <div className="col-md-1">
                    <figcaption>
                      <button onClick={openModal}
                        style={{color: '#4286f4', textAlign: 'center', width: 50, height: 50, marginTop: 10}}
                        className="font-bold"><i style={{fontSize: 20}} className="glyphicon glyphicon-plus"/>
                      </button>
                      <h4 style={{fontSize: 10}}>ADD PHOTO</h4>
                    </figcaption>
                  </div>
            }
          </div>
        </figure>
      </div>
      <div className="photo-grid">

        <div className="row">
          {
            posts.map((post, i)=>(
              <div key={post.id} className="col-md-4">
                <figure key={i} className="grid-figure" >
                  <div className="grid-photo-wrap" style={{ height: 500, overflow: 'hidden'}}>
                    {
                      localStorage.getItem('status') == 1 &&
                    <span style={{ cursor: 'pointer', position: 'absolute', fontSize: 30, color: 'white', right: 0, marginTop: -5, marginRight: 5}}>
                        &times;
                    </span> }
                    {
                      user.id == localStorage.getItem('id') &&
                          <span style={{ cursor: 'pointer', position: 'absolute', fontSize: 30, color: 'white', right: 0, marginTop: -5, marginRight: 5}}>
                        &times;
                          </span>
                    }
                    <Link to={`/photo/${post.id}`} >
                      <img src={post.imageURL} alt="image" className="grid-photo" />
                    </Link>
                  </div>
                  <figcaption>
                    <p>{formatDescription(post.description)}</p>
                    <div className="control-buttons">
                      <button
                        onClick={() => setLike(post.id, localStorage.getItem('id'), user.id)}
                        className="likes">
                        {
                          post.likes.some( like => like.userId === localStorage.getItem('id')) ?
                            <span style={{ fontSize: 30, color: '#d65933'}}>&hearts;</span>
                            :
                            <span style={{ fontSize: 30 }}>&hearts;</span>
                        }<span style={{ display: 'inline-block', position: 'absolute', marginTop: 8, fontSize: '15px'}}>
                          {' ' +post.likes.length}
                        </span>
                      </button>
                      <Link className="button" to={`/photo/${post.id}`}>
                        <span className="comment-count">
                          <span  className="speech-bubble" />
                        </span>
                        {' ' + post.comments.length}
                      </Link>
                    </div>
                  </figcaption>

                </figure>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  posts: state.randomPosts.posts,
  isLoggedRandomPosts: state.randomPosts.isLoggedRandomPosts,
  user: state.randomUser.user.user,
  followers: state.randomUser.user.followers,
  following: state.randomUser.user.followings,
  isLoggedRandomUser: state.randomUser.isLoggedRandomUser,

});

const mapDispatchToProps = dispatch => ({
  getProfilePosts: (id) => dispatch(actions.getRandomPosts(id)),
  getRandomUser: id => dispatch(actions.getRandomUser(id)),
  setLike: (postId, id, userId) => dispatch(actions.setLike(postId, id, userId)),
  clearInf: () => dispatch(actions.clearUserInf()),
  logout: () => dispatch(logout()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('showModal', 'turnModal', false),
  withState('showFollowers', 'turnFollowers', false),
  withState('showFollowing', 'turnFollowing', false),
  withHandlers({
    openModal: ({turnModal}) => () => turnModal(true),
    closeModal: ({turnModal}) => () => turnModal(false),
    openFollowers: ({turnFollowers}) => () => turnFollowers(true),
    closeFollowers: ({turnFollowers}) => () => turnFollowers(false),
    openFollowing: ({turnFollowing}) => () => turnFollowing(true),
    closeFollowing: ({turnFollowing}) => () => turnFollowing(false),
  }),
  lifecycle({
    componentWillMount(){
      const { getProfilePosts, match, getRandomUser} = this.props;
      if(match.path.split('/')[1] == 'profile'){
        getProfilePosts(localStorage.getItem('id'));
        getRandomUser(localStorage.getItem('id'));
      }
      else {
        getProfilePosts(match.params.userId);
        getRandomUser(match.params.userId);
      }
    },
    componentWillUnmount(){
      this.props.clearInf();
    }
  }),
  branch(
    ({ isLoggedRandomPosts, isLoggedRandomUser }) => isLoggedRandomPosts && isLoggedRandomUser,
    renderComponent(RandomUser),
    renderComponent(Loading)
  )
)(RandomUser);