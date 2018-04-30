import React from 'react';
import { compose, withState, withHandlers, lifecycle, branch, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import actions from './actions';
import { Loading } from '../Loading';



const RandomUser = props => {
  const {
    posts, match, user } = props;

  return(
    <div>

      <div className="photo-grid">
        <figure style={{ flexBasis: 'none', height: 200, display: 'inline-block' }} className="grid-figure">
          <div className="row">
            <div className="col-md-2">
              <Image
                style={{ width: 150, height: 150, verticalAlign: 'none', position: 'absolute', display: 'block' }}
                src="data:image/jpeg;base64,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"
                circle />
            </div>
            <div className="col-md-3">
              <figcaption >
                <h2 style={{ color: '#4286f4'}} className="font-bold" >{user.userName}</h2>
                <h3 className="font-bold" ><i style={{ color: '#669091'}} className="glyphicon glyphicon-send" /> {user.firstName} {user.lastName}</h3>
                <h3 style={{ fontWeight: 400 }}><i style={{ color: '#669091'}} className="glyphicon glyphicon-phone-alt" /> {user.email}</h3>
              </figcaption>
            </div>
            <div className="col-md-2">
              <figcaption >
                <h2 style={{ color: '#4286f4', textAlign: 'center' }} className="font-bold" >{posts.length}</h2>
                <h3 style={{textAlign: 'center' }} className="font-bold" >POSTS</h3>
              </figcaption>
            </div>
            <div className="col-md-2">
              <figcaption >
                <h2 style={{ color: '#4286f4', textAlign: 'center' }} className="font-bold" >34</h2>
                <h3 style={{textAlign: 'center' }} className="font-bold" >FOLOWERS</h3>
              </figcaption>
            </div>
            <div className="col-md-2">
              <figcaption >
                <h2 style={{ color: '#4286f4', textAlign: 'center' }} className="font-bold" >213</h2>
                <h3 style={{textAlign: 'center' }} className="font-bold" >FOLOWING</h3>
              </figcaption>
            </div>
          </div>
        </figure>
      </div>
      <div className="photo-grid">
        <div className="row">
          {
            posts.map((post, i)=>(
              <div className="col-md-4">
                <figure key={i} className="grid-figure" >
                  <div className="grid-photo-wrap" style={{ height: 500, overflow: 'hidden'}}>
                    <Link to={`/photo/${post.id}`} >
                      <img src={post.imageURL} alt="image" className="grid-photo" />
                    </Link>
                  </div>
                  <figcaption>
                    <p>{post.description}</p>
                    <div className="control-buttons">
                      <button
                        onClick={() => setLike(post.id, localStorage.getItem('id'))}
                        className="likes">
                        {
                          post.likes.some( like => like.userId === localStorage.getItem('id')) ?
                            <span style={{ fontSize: 30, color: '#d65933'}}>&hearts;</span>
                            :
                            <span style={{ fontSize: 30}}>&hearts;</span>
                        }{post.likes.length}</button>
                      <Link className="button" to={`/photo/${post.id}`}>
                        <span className="comment-count">
                          <span className="speech-bubble" />
                        </span>
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
  user: state.randomUser.user,
  isLoggedRandomUser: state.randomUser.isLoggedRandomUser,

});

const mapDispatchToProps = dispatch => ({
  getProfilePosts: (id) => dispatch(actions.getRandomPosts(id)),
  getRandomUser: id => dispatch(actions.getRandomUser(id)),
  setLike: (postId, id) => dispatch(actions.setLike(postId, id)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount(){
      const { getProfilePosts, match, getRandomUser} = this.props;
      getProfilePosts(match.params.userId);
      getRandomUser(match.params.userId);
    }
  }),
  branch(
    ({ isLoggedRandomPosts }) => isLoggedRandomPosts,
    renderComponent(RandomUser),
    renderComponent(Loading)
  )
)(RandomUser);