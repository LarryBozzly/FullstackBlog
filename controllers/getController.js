const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

const db = mysql.createConnection({
  host: process.env.host_db,
  port: process.env.port_db,
  user: process.env.user_db,
  password: process.env.password_db,
  database: process.env.database_db,
});

db.connect((err, res) => {
  if (err) {
    const db = mysql.createConnection({
      host: process.env.host_db2,
      port: process.env.port_db2,
      user: process.env.user_db2,
      password: process.env.password_db2,
      database: process.env.database_db2,
    });
    db.connect();
    //connected to alternative
  }
  else {
    //connected
    
  }
});

module.exports = {
  getHeadlines: function (req, res) {
    sql = "SELECT * FROM posts ";
    db.query(sql, (err, results) => {
      if (err) {
        return err;
      } else {
        res.send(results);
      }
    });
  },
  getHeadlinesId: function (req, res) {
    var id = req.params.id;
    sql = "SELECT * FROM posts where id= ?";
    db.query(sql, id, (err, results) => {
      if (err) {
        return err;
      } else {
        res.send(results);
      }
    });
  },
  removePost: function (req, res) {
    jwt.verify(req.token, "secretkey", (err, authdata) => {
      if (err) {
        res.sendStatus(403);
      } else {
        var id = req.params.id;
        sql = "DELETE FROM posts where id= ?";
        db.query(sql, id, (err, results) => {
          if (err) {
            return err;
          } else {
            res.send(results);
          }
        });
      }
    });
  },
  addPost: function (req, res) {
    jwt.verify(req.token, "secretkey", (err, authdata) => {
      if (err) {
        res.sendStatus(403);
      } else {
        if (req.body.imgUrl !== null) {
          var header = req.body.header;
          var post = req.body.post;
          var imgUrl = req.body.imgUrl;
          sql =
            "INSERT INTO `posts` (`id`, `header`, `post`,`imgUrl`) VALUES (NULL, ?, ?,?);";
          db.query(sql, [header, post, imgUrl], (err, results) => {
            if (err) {
              return err;
            } else {
              res.send(results);
            }
          });
        } else {
          var header = req.body.header;
          var post = req.body.post;
          sql =
            "INSERT INTO `posts` (`id`, `header`, `post`) VALUES (NULL, ?, ?);";
          db.query(sql, [header, post], (err, results) => {
            if (err) {
              return err;
            } else {
              res.send(results);
            }
          });
        }
      }
    });
  },
  getPostlisting: function (req, res) {
    jwt.verify(req.token, "secretkey", (err, authdata) => {
      if (err) {
        res.sendStatus(403);
      } else {
        sql = "SELECT * FROM posts ";
        db.query(sql, (err, results) => {
          if (err) {
            return err;
          } else {
            res.send(results);
          }
        });
      }
    });
  },
};
