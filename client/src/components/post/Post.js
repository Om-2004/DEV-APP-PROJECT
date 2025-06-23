import React, { useEffect,Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../Layout/Spinner';
import { getPost } from '../../actions/post';
import { useParams, Link } from 'react-router-dom';
import PostItem from '../posts/PostItem'; // reuse the existing one
import CommentForm from '../posts/CommentForm';
import CommentItem from '../posts/CommentItem';

const Post = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <section className="container">
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
        {post.comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
    </section>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
