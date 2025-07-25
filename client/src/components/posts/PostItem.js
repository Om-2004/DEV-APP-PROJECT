// src/components/posts/PostItem.js

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions = true
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img
            className="round-img"
            src={avatar}
            alt={`${name}'s avatar`}
          />
          <h4>{name}</h4>
        </Link>
      </div>

      <div>
        <p className="my-1">{text}</p>

        <p className="post-date">
          Posted on <Moment format="MM/DD/YYYY">{date}</Moment>
        </p>  

        {showActions && (
        <>
            <button
            type="button"
            className="btn btn-light"
            onClick={() => addLike(_id)}
            >
            <i className="fas fa-thumbs-up"></i>{' '}
            {likes.length > 0 && <span>{likes.length}</span>}
            </button>

            <button
            type="button"
            className="btn btn-light"
            onClick={() => removeLike(_id)}
            >
            <i className="fas fa-thumbs-down"></i>
            </button>

            <Link to={`/posts/${_id}`} className="btn btn-primary">
            Discussion{' '}
            {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
            )}
            </Link>

            {!auth.loading && user === auth.user._id && (
            <button
                type="button"
                className="btn btn-danger"
                onClick={() => deletePost(_id)}
            >
                <i className="fas fa-times"></i>
            </button>
            )}
        </>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost
})(PostItem);
