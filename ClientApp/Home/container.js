import React from 'react';
import { compose, lifecycle, branch, renderComponent } from 'recompose';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { getAllPosts, setLike} from "./actions";

import { Loading} from "../Loading";
import {deleteAlert, formatDescription} from "../functions";
import {deletePost} from "./actions";

const PhotoGrid = props => {
  const { posts, setLike, deletePost } = props;

  return(
    <div className="photo-grid">
      <div className="row">
        {
          posts.filter(i => i.userId != localStorage.getItem('id')).map((post, i)=>(
            <div key={post.id} className="col-md-4">
              <figure key={i} className="grid-figure" >
                <div className="grid-photo-wrap" style={{ height: 500, overflow: 'hidden'}}>
                    {
                        localStorage.getItem('role') == 1 &&
                        <span onClick={() => deleteAlert(deletePost, post.id)} style={{ cursor: 'pointer', position: 'absolute', fontSize: 30, color: 'white', right: 0, marginTop: -5, marginRight: 5}}>
                        &times;
                    </span> }
                  <Link to={`/photo/${post.id}`} >
                    <img src={post.imageURL} alt="image" className="grid-photo" />
                  </Link>
                </div>
                <figcaption>
                  <p>{formatDescription(post.description)}</p>
                  <div className="control-buttons">
                    <button
                      onClick={() => setLike(post.id, localStorage.getItem('id'))}
                      className="likes">
                      {
                        post.likes.some( like => like.userId === localStorage.getItem('id')) ?
                          <span style={{ fontSize: 30, color: '#d65933'}}>&hearts;</span>
                          :
                          <span style={{ fontSize: 30}}>&hearts;</span>
                      }<span style={{ display: 'inline-block', position: 'absolute', marginTop: 8, fontSize: '15px'}}>
                        {' ' +post.likes.length}
                      </span>
                    </button>
                    <Link className="button" to={`/photo/${post.id}`}>
                      <span className="comment-count">
                        <span className="speech-bubble" />
                      </span>
                      { ' ' + post.comments.length}
                    </Link>
                  </div>
                </figcaption>

              </figure>
            </div>
          ))
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  posts: state.allPosts.posts,
  isLoadedAllPosts: state.allPosts.isLoadedAllPosts,
});


const mapDispatchToProps = dispatch => ({
  getAllPosts: () => dispatch(getAllPosts()),
  setLike: (postId, userId) => dispatch(setLike(postId, userId)),
    deletePost: postId => dispatch(deletePost(postId))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount(){
      this.props.getAllPosts();
    }
  }),
  branch(
    ({isLoadedAllPosts}) => isLoadedAllPosts,
    renderComponent(PhotoGrid),
    renderComponent(Loading)
  )

)(PhotoGrid);