const checkSessionExpiration = (req, res, next) => {
    // Check if the 'connect.sid' cookie is present in the request
    const sidCookie = req.cookies["user-session"];
  
    if (sidCookie) {
      // 'connect.sid' cookie is present
      // Check if the session is still valid (not expired)
      if (
        req.session &&
        req.session.cookie &&
        req.session.cookie.expires &&
        Date.now() < req.session.cookie._expires
      ) {
        // Session is not expired and user is connected
        // You can now continue with the route handling or any other 
        // console.log("hello",req.session,req.session.cookie,req.session.cookie._expires)
        next();
    } else {
        // Session has expired or user is not connected
        // You can handle the situation here, for example, redirect to login or display an error
        res
        .status(401)
        .json({
            success: false,
            message: "Session expired or user not connected",
        });
        console.log("second")
    }
} else {
        console.log("third")
      // 'connect.sid' cookie is not present
      // User is not connected (not authenticated)
      // You can handle the situation here, for example, redirect to login or display an error
      res
        .status(401)
        .json({
          success: false,
          message: "User not connected (not authenticated)",
        });
    }
  };
  
  module.exports = { checkSessionExpiration };
  