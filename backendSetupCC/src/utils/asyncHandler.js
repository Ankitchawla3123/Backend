const aysncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    next(err);
    //  IT WILL SEND TO Global error handler WHICH SETS STATUS CODES LIKE BELOW
    //     app.use((err, req, res, next) => {
    //   console.error(err.stack);
    //   res.status(500).json({ error: err.message || 'Internal Server Error' });
    // });
    // NODE JS ERROR CLASS SETUP
  });
};

// const aysncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (err) {
//     res.status(err.code || 500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

export { aysncHandler };
