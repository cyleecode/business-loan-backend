module.exports = function errorHandling(err, req, res, next) {
  console.error(err);
  switch (err.code) {
    default:
      res.status(500).send("Internal Server Error");
  }
};
