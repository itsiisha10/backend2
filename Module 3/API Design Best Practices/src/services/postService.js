const store = require('../data/postStore');

const DEFAULT_LIMIT = 2;
const MAX_LIMIT = 5;

function listPosts(query = {}) {
  const allPosts = store.getAllPosts();

  let limit = Number.parseInt(query.limit, 10);

  if (Number.isNaN(limit) || limit <= 0) {
    limit = DEFAULT_LIMIT;
  }

  limit = Math.min(limit, MAX_LIMIT);

  let page = Number.parseInt(query.page, 10);

  if (Number.isNaN(page) || page <= 0) {
    page = 1;
  }

  const total = allPosts.length;
  const totalPages = Math.ceil(total / limit);

  const start = (page - 1) * limit;
  const data = allPosts.slice(start, start + limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages
    }
  };
}

function getPost(id) {
  return store.getPostById(id);
}

function createPost(body = {}) {
  return store.createPost({
    title: body.title,
    author: body.author
  });
}

function likePost(id) {
  const post = store.incrementLikes(id);

  if (!post) {
    const err = new Error('post not found');
    err.statusCode = 404;
    throw err;
  }

  return post;
}

function explode() {
  const err = new Error('SQLITE_CONSTRAINT in posts table');
  err.statusCode = 500;
  throw err;
}

module.exports = {
  listPosts,
  getPost,
  createPost,
  likePost,
  explode
};