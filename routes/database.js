var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const controllers = require("../controllers/getController");

const admin = {
  username: process.env.username_admin,
  password: process.env.password_admin,
};

/* GET users listing. */
router.post("/", verifyToken, controllers.getPostlisting);

//show headline posts on Home
router.get("/headlines/", controllers.getHeadlines);

router.get("/headlines/:id", controllers.getHeadlinesId);

//remove post
router.post("/remove/:id", verifyToken, controllers.removePost);

//add post to database with image
router.post("/add", verifyToken, controllers.addPost);

//login to authenticate
router.post("/login", function (req, res) {
  if (
    req.body.username === admin.username &&
    req.body.password === admin.password
  ) {
    jwt.sign({ admin: admin }, "secretkey", (err, token) => {
      res.json({
        token: token,
        admin: admin,
      });
    });
  } else {
    res.json({
      token: null,
    });
  }
});

//verify token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  //check if bearer undefined
  if (typeof bearerHeader !== "undefined") {
    //split at the space
    const bearer = bearerHeader.split(" ");
    //get token from array;
    const bearerToken = bearer[1];
    //set the token
    req.token = bearerToken;
    //next
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;
