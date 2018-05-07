import React from 'react';
import { compose, lifecycle, branch, renderComponent} from 'recompose';
import { connect } from 'react-redux';
import actions from './actions';
import posts from './posts';
import { Link, withRouter } from 'react-router-dom';
import { Loading } from '../Loading';
import { Image } from 'react-bootstrap';

const SinglePhoto = props => {
  const {match, post, setLike, comments,
    isLoadedPostComments, addComment, setCommentText, comment, deleteComment
  } = props;

  return(
    <div className="single-photo">
      <figure className="grid-figure">
        <div style={{ marginBottom: 10}} className="grid-photo-wrap">
          {/*<div className="row">*/}
            {/*<div className="col-md-2">*/}
              <Image width="30" height="30" circle style={{ display: 'inline-block'}}/>
            <Link className="font-bold" to='/' style={{ color: '#669091'}}> Username</Link>
            {/*</div>*/}
          </div>
        <div className="grid-photo-wrap">
          <img src={post.imageURL} alt={post.imageURL} className="grid-photo" />
        </div>

        <figcaption style={{ wordWrap: 'break-word'}}>
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
              }
              <span style={{ display: 'inline-block', position: 'absolute', marginTop: 8, fontSize: '15px'}}>
                {'  ' +post.likes.length}
              </span>
            </button>
            <button className="button" >
              <span className="comment-count">
                <span className="speech-bubble" />
              </span>
              { ' ' + comments.length}
            </button>
          </div>
        </figcaption>
      </figure>
      <div className="comments" >
        {isLoadedPostComments && comments.length > 0 && comments.map(comment => (
          <div key={comment.id} className="comment">
            <p>
                <strong style={{ color: '#669091', cursor: 'pointer'}}><Link to={comment.user.id == localStorage.getItem('id') ? '/profile' : `/user/${comment.user.id}`}>{comment.user.userName}</Link></strong>
              {comment.text}
              {
                comment.user.id == localStorage.getItem('id') &&
                    <button className="remove-comment"
                      onClick={() => deleteComment(comment.id, post.id)}
                    >&times;</button>

              }

            </p>
          </div>))
        }
        <form className="comment-form"
          onSubmit={(e) => addComment(e, post.id)}
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
  addComment:  (e, postId) => {
    e.preventDefault();
    dispatch(actions.addComment(postId));
  },
  deleteComment: (commentId, postId) => dispatch(actions.deleteComment(commentId, postId)),
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