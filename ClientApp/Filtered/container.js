import React from 'react';
import { compose, lifecycle, branch, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { getFilteredPhotos, getFilteredByCountryPhotos} from "./actions";
import { Link } from 'react-router-dom';

import { Loading} from "../Loading";
// import {deleteAlert, formatDescription} from "../functions";
import { clearFilterPhotos } from "./actions";

const Filtered = props => {
  const { getFilteredPhotos, posts, isLoadedAllPosts, getFilteredByCountryPhotos } = props;

  return(
    <div>
      <div className="photo-grid">
        <figure style={{ flexBasis: 'none', height: 60, display: 'inline-block' }} className="grid-figure">
          <select onChange={getFilteredByCountryPhotos} defaultValue="" style={{ marginRight: 10 }}>
            <option value=""> Select country</option>
            <option value="ukraine"> Ukraine </option>
            <option value="usa"> USA </option>
          </select>
          <select defaultValue="" onChange={getFilteredPhotos}>
            <option value=""> Select category</option>
            <option value="sport"> Sport </option>
            <option value="lifestyle"> Lifestyle </option>
            <option value="casual"> Casual </option>
          </select>
        </figure>
      </div>
      <div className="photo-grid">
        <div className="row">
          {
            isLoadedAllPosts && posts.map((post, i)=>(
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
                    <p>{post.description}</p>
                    <div className="control-buttons">
                      <button
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
    </div>
  );
};

const mapStateToProps = state => ({
  posts: state.allFilteredPhotos.posts,
  isLoadedAllPosts: state.allFilteredPhotos.isLoadedAllPosts,
});


const mapDispatchToProps = dispatch => ({
  getFilteredPhotos: e => dispatch(getFilteredPhotos(e.target.value)),
  getFilteredByCountryPhotos: e => dispatch(getFilteredByCountryPhotos(e.target.value)),
  clearFilterPhotos: () => dispatch(clearFilterPhotos()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillUnmount(){
      this.props.clearFilterPhotos();
    }
  })
)(Filtered);