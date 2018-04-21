import React from 'react';
import posts from './posts';
import { Link, withRouter } from 'react-router-dom';


const SinglePhoto = props => {
  const {} = props;

  return(
    <div className="single-photo">
      <figure className="grid-figure">
        <div className="grid-photo-wrap">
          <Link to={`/`}>
            <img src={posts[0].display_src} alt={posts[0].caption} className="grid-photo" />
          </Link>
        </div>

        <figcaption>
          <p>{posts[0].caption}</p>
          <div className="control-buttons">
            <button
              // onClick={this.props.increment.bind(null, i)}
              className="likes"><span style={{ fontSize: 30}}>&hearts;</span> {posts[0].likes}</button>
            <Link className="button" to={`/photo/${posts[0].code}`}>
              <span className="comment-count">
                <span className="speech-bubble" />

              </span>
            </Link>
          </div>
        </figcaption>

      </figure>
    </div>
  );
};

export default withRouter(SinglePhoto);