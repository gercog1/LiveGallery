import React from 'react';
import { compose, lifecycle, branch, renderComponent} from 'recompose';
import { connect } from 'react-redux';
import actions from './actions';
import posts from './posts';
import { Link, withRouter } from 'react-router-dom';
import { Loading } from '../Loading';

const SinglePhoto = props => {
  const {match, post, setLike, comments,
    isLoadedPostComments, addComment, setCommentText, comment
  } = props;

  return(
    <div className="single-photo">
      <figure className="grid-figure">
        <div className="grid-photo-wrap">
          <img src={post.imageURL} alt={post.imageURL} className="grid-photo" />
        </div>

        <figcaption style={{ wordWrap: 'break-word'}}>
          {/*<div className="row">*/}
            {/*<div className="col-lg-12">*/}
              <p>{post.description}</p>
            {/*</div>*/}
          {/*</div>*/}
          <div className="control-buttons">
            <button
              onClick={() => setLike(post.id, post.userId)}
              className="likes">
              {
                post.likes.some( like => like.userId === localStorage.getItem('id')) ?
                  <span style={{ fontSize: 30, color: '#d65933'}}>&hearts;</span>
                  :
                  <span style={{ fontSize: 30}}>&hearts;</span>
              }

              {post.likes.length}</button>
            <Link className="button" to={`/photo/${post.id}`}>
              <span className="comment-count">
                <span className="speech-bubble" />
              </span>
            </Link>
          </div>
        </figcaption>
      </figure>
      <div className="comments" >
        {isLoadedPostComments && comments.length > 0 && comments.map(comment => (
          <div key={comment.id} className="comment">
            <p>
              <strong>{comment.user.userName}</strong>
              {comment.text}
              <button className="remove-comment"
                // onClick={this.props.removeComment.bind(null, this.props.params.postId, i)}
              >&times;</button>
            </p>
          </div>))
        }
        <form className="comment-form"
          onSubmit={(e) => addComment(e, post.id, post.userId)}
        >
          <input value={comment} onChange={setCommentText} type="text" placeholder="comment"/>
          <input type="submit" hidden />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoadedOnePost: state.onePhoto.isLoadedOnePost,
  post: state.onePhoto.post,
  comments: state.postComments.comments,
  isLoadedPostComments: state.postComments.isLoadedPostComments,
  comment: state.postComments.comment,
});

const mapDispatchToProps = dispatch => ({
  getOnePost: postId => dispatch(actions.getOnePost(postId)),
  setLike: (postId, userId) => dispatch(actions.setLike(postId, userId)),
  getComments: postId => dispatch(actions.getComments(postId)),
  addComment:  (e, postId, userId) => {
    e.preventDefault();
    dispatch(actions.addComment(postId, userId));
  },
  setCommentText: e => dispatch(actions.setCommentText(e.target.value)),
});



export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount(){
      const { getOnePost ,match, getComments} = this.props;
      getOnePost(match.params.photoId);
      getComments(match.params.photoId);
    }
  }),
  branch(
    ({ isLoadedOnePost }) => isLoadedOnePost,
    renderComponent(SinglePhoto),
    renderComponent(Loading)
  )
)(SinglePhoto);