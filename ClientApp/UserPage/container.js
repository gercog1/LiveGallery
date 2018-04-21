import React from 'react';
import posts from '../Home/posts';
import { Link } from 'react-router-dom';

const UserPage = props => {
  const {} = props;

  return(
    <div>
      <div className="photo-grid">
        <figure style={{ flexBasis: 'none', height: 200 }} className="grid-figure" />
      </div>
      <div className="photo-grid">

        {
          posts.map((post, i)=>(
            <figure key={i} className="grid-figure">
              <div className="grid-photo-wrap">
                <Link to={`/photo/${post.code}`}>
                  <img src={post.display_src} alt={post.caption} className="grid-photo" />
                </Link>
              </div>

              <figcaption>
                <p>{post.caption}</p>
                <div className="control-buttons">
                  <button
                  // onClick={this.props.increment.bind(null, i)}
                    className="likes"><span style={{ fontSize: 30}}>&hearts;</span> {post.likes}</button>
                  <Link className="button" to={`/photo/${post.code}`}>
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
    </div>
  );
};

export default UserPage;