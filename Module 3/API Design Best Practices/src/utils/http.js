function sendOk(res, data) {
  return res.status(200).json({
    data
  });
}

function sendCreated(res, data) {
  return res.status(201).json({
    data
  });
}

function sendList(res, result) {
  return res.status(200).json({
    data: result.data,
    pagination: result.pagination
  });
}

function sendError(res, statusCode, details = {}) {
  return res.status(statusCode).json({
    error: {
      message: details.message || 'Internal server error'
    }
  });
}

module.exports = {
  sendOk,
  sendCreated,
  sendList,
  sendError
};