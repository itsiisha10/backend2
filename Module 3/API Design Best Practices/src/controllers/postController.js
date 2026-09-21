const service = require('../services/postService');
const http = require('../utils/http');

function listPosts(req, res) {
  try {
    const result = service.listPosts(req.query);
    return http.sendList(res, result);
  } catch (err) {
    return http.sendError(res, err.statusCode || 500, {
      message: err.message
    });
  }
}

function getPost(req, res) {
  try {
    const post = service.getPost(req.params.id);

    if (!post) {
      return http.sendError(res, 404, {
        message: 'post missing'
      });
    }

    return http.sendOk(res, post);
  } catch (err) {
    return http.sendError(res, err.statusCode || 500, {
      message: err.message
    });
  }
}

function createPost(req, res) {
  try {
    const post = service.createPost(req.body);
    return http.sendCreated(res, post);
  } catch (err) {
    return http.sendError(res, err.statusCode || 500, {
      message: err.message
    });
  }
}

function likePost(req, res) {
  try {
    const post = service.likePost(req.params.id);

    return http.sendOk(res, {
      likes: post.likes
    });
  } catch (err) {
    return http.sendError(res, err.statusCode || 500, {
      message: err.message
    });
  }
}

function explode(req, res) {
  try {
    service.explode();
  } catch (err) {
    return http.sendError(res, 500, {
      message: 'Internal server error'
    });
  }
}

module.exports = {
  listPosts,
  getPost,
  createPost,
  likePost,
  explode
};