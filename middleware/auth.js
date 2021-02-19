const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");
const config = require("config");
var admin = require("./admin");
var admin = require("firebase-admin");

console.log(config.get("private_key"));
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: config.get("project_id"),
    private_key: config.get("private_key").replace(/\\n/g, "\n"),
    client_email: config.get("client_email"),
  }),
});

const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = null;
  }

  next();
};

module.exports = function (req, res, next) {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (e) {
      return res
        .status(401)
        .send({ error: "You are not authorized to make this request" });
    }
  });
};
