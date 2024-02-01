const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  try {
    // let token = req.headers.authorization;
    // console.log(req.cookies, "cookies")
    const { token } = req.cookies;
    console.log(token, "token");
    if (token) {
      // token = token.split(" ")[1];
      let user = jwt.verify(token, process.env.SECRET_KEY);
      // console.log(user);
      req.userId = user.id;
    } else {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized user" });
  }
};

module.exports = authenticateUser;
