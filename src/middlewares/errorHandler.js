module.exports = (err, req, res, _) => {
  const statusCode = res.statusCode || res.code || res.status || 500;
  res.status(statusCode).json({ code: statusCode, message: err.message });
};
