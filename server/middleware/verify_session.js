const verifySessions = (req, res, next) => {
    if (req.session.userinfos) {
      return next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: " " });
    }
  };
  
  module.exports = verifySessions;