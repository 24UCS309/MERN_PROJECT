const result = require("./result")
const config = require("./config")
const jwt = require("jsonwebtoken")

function authUser(req, res, next) {
  if (
    req.url.startsWith("/courses")||
            req.url==="/auth/signin"||
            req.url==="/course/all-active-courses"
  ) {
    return next();
  }

  const token = req.headers.token;

  if (!token) {
    return res.send({ status: "error", error: "Token is Missing" });
  }

  try {
    const payload = jwt.verify(token, config.SECRET);
    req.headers.email = payload.email;
    req.headers.role = payload.role;
    next();
  } catch {
    return res.send({ status: "error", error: "Invalid Token" });
  }
}


function checkAuthorization(req, res, next) {
  const role = req.headers.role

  if (role === "admin") {
    return next()
  }

  return res.send({
    status: "error",
    error: "Unauthorized access (Admin only)"
  })
}

module.exports = {authUser ,checkAuthorization}