import React from 'react';
import { compose, lifecycle, branch, renderComponent } from 'recompose';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { getAllPosts, setLike} from "./actions";

import { Loading} from "../Loading";


const PhotoGrid = props => {
  const { posts, setLike } = props;

  return(
    <div className="photo-grid">
      {
        posts.filter(i => i.userId != localStorage.getItem('id')).map((post, i)=>(
          <figure key={i} className="grid-figure">
            <div className="grid-photo-wrap">
              <Link to={`/photo/${post.id}`}>
                <img src={post.imageURL} alt="image" className="grid-photo" />
              </Link>
            </div>
            <figcaption>
              <p>{post.description}</p>
              <div className="control-buttons">
                <button
                  onClick={() => setLike(post.id, post.userId)}
                  className="likes"><span style={{ fontSize: 30}}>&hearts;</span> {post.likes.length}</button>
                <Link className="button" to={`/photo/${post.id}`}>
                  <span className="comment-count">
                    <span className="speech-bubble" />
                  </span>
                </Link>
              </div>
            </figcaption>

          </figure>
        ))
      }
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