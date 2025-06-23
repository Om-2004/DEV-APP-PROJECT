const express = require('express');
const router = express.Router();
const { check,validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route    POST api/posts
// @desc     create a post
// @access   Private
router.post('/', [auth, [
    check('text', 'Text field is required.').notEmpty()
]
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const post = await newPost.save();

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

// @route    GET api/posts
// @desc     get all posts
// @access   Private
router.get('/',auth, async(req,res) => {
    try {
        const Posts = await Post.find().sort({date:-1});
        res.json(Posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

// @route    GET api/posts/:id
// @desc     get the post by id
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'No Post found with Id.' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'No Post found with Id.' });
    }
    res.status(500).send('Server error.');
  }
});

// @route    DELETE api/posts/:id
// @desc     DELETE post by id
// @access   Private
router.delete('/:id',auth, async(req,res) => {
    try {

        console.log("Requested ID:", req.params.id); // 👈 Debug line

        const post = await Post.findById(req.params.id);
        
        console.log("Found Post:", post); // 👈 Debug line

        if (!post) {
            return res.status(404).json({ msg: 'No Post found with Id.' });
        }

        //check the user deleting the post
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authorized.'});
        }

        await post.deleteOne();

        res.json({msg: 'Post deleted Successfully.'});
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') { 
            return res.status(404).json({ msg: 'No Post found with Id.' });
        }
        res.status(500).send('Server error.');
    }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        //check if that post is been already liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg: 'Post already liked.'});
        }

        //if not already liked...
        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error.');
    }
});


// @route    PUT api/posts/unlike/:id
// @desc     UnLike a post
// @access   Private
router.put('/unlike/:id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        //check if that post is been already liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg: 'Post has not been liked yet.'});
        }

        //if not already unliked , then we have to unlike it with the help of correct post _id
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        
        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error.');
    }
});


// @route    POST api/posts/comment/:id
// @desc     Create a comment on a post 
// @access   Private
router.post('/comment/:id', [
  auth,
  [check('text', 'Text field is required.').notEmpty()]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found.' });
    }

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };

    post.comments.unshift(newComment);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route    DELETE api/posts/comment/:id/:comment_id  (:id refers to specific post on which we are commenting)
// @desc     delete a comment on a post 
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async(req,res) => {
  try {
    const post = await Post.findById(req.params.id);
  
    const comment = post.comments.find(comment => comment.id === req.params.comment_id);
    
    if(!comment){
      return res.status(404).json({msg: 'Comment not found.'});
    }

    //check whether the user who commented matches the logged in user currently
    if(comment.user.toString() !== req.user.id){
      return res.status(401).json({msg: 'User not authorized.'});
    }

    const removeIndex = post.comments.findIndex(c => c.id === req.params.comment_id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error.');
  }
});


module.exports = router;
