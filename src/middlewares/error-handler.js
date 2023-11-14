export const errorHandler = (err, req, res, next) => {
  console.log("error handler...");
  console.log(err);

  res.status(501).json({
    error: {
      msg: err.message || "something went wrong..",
      success: false,
    },
  });
};
