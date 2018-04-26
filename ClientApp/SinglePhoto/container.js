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

        <figcaption>
          <p>{post.description}</p>
          <div className="control-buttons">
            <button
              onClick={() => setLike(post.id, post.userId)}
              className="likes"><span style={{ fontSize: 30}}>&hearts;</span> {post.likes.length}</button>
            <span className="comment-count">
              <span className="speech-bubble" />

            </span>
          </div>
        </figcaption>
      </figure>
      <div className="comments">
        {isLoadedPostComments && comments.length > 0 && comments.map(comment => (
          <div className="comment">
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
          <input value={comment} v onChange={setCommentText} type="text" placeholder="comment"/>
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