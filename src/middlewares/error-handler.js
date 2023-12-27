export const errorHandler = (err, req, res, next) => {
  console.log(err.stack);

  res.status(500).json({
    error: {
      msg: err.message || "something went wrong..",
      success: false,
    },
  });
};
