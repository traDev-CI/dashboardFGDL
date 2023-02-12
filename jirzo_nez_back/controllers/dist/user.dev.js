"use strict";

var bcrypt = require("bcrypt");

var user = require("../models/user");

var fs = require("fs");

var path = require("path");

var User = require("../models/user");

var jwt = require("../services/jwt");

var signUp = function signUp(req, res) {
  var user = new User();
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password,
      repeatPassword = _req$body.repeatPassword,
      name = _req$body.name,
      lastname = _req$body.lastname;
  user.email = email.toLowerCase();
  user.role = "admin";
  user.active = false;
  user.name = name;
  user.lastname = lastname;

  if (!password || !repeatPassword) {
    res.status(404).send({
      message: "The passowrd is required"
    });
  } else {
    if (password !== repeatPassword) {
      res.status(404).send({
        message: "Password must be the same"
      });
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            res.status(500).send({
              message: "Filed to encrypt password"
            });
          } else {
            user.password = hash;
            user.save(function (err, userStore) {
              if (err) {
                res.status(500).send({
                  message: "This user already exists"
                });
              } else {
                if (!userStore) {
                  res.status(500).send({
                    message: "Error creating user"
                  });
                } else {
                  res.status(200).send({
                    user: userStore
                  });
                }
              }
            });
          }
        });
      });
    }
  }
};

var signIn = function signIn(req, res) {
  var params = req.body;
  var email = params.email.toLowerCase();
  var password = params.password;
  User.findOne({
    email: email
  }, function (err, userStored) {
    if (err) {
      res.status(500).send({
        message: "Server error"
      });
    } else {
      if (!userStored) {
        res.status(404).send({
          message: "User not found"
        });
      } else {
        bcrypt.compare(password, userStored.password, function (err, check) {
          if (err) {
            res.status(500).send({
              message: "Server error"
            });
          } else if (!check) {
            res.status(404).send({
              message: "Password is wrong"
            });
          } else {
            if (!userStored.active) {
              res.status(200).send({
                code: 200,
                message: "User not active"
              });
            } else {
              res.status(200).send({
                accessToken: jwt.createAccessToken(userStored),
                refreshToken: jwt.createRefreshAccessToken(userStored)
              });
            }
          }
        });
      }
    }
  });
};

var getUsers = function getUsers(req, res) {
  user.find().then(function (users) {
    if (!users) {
      res.status(404).send({
        message: "There is no user"
      });
    } else {
      res.status(200).send({
        users: users
      });
    }
  });
};

var getUsersActive = function getUsersActive(req, res) {
  var query = req.query;
  user.find({
    active: query.active
  }).then(function (users) {
    if (!users) {
      res.status(404).send({
        message: "There is no user"
      });
    } else {
      res.status(200).send({
        users: users
      });
    }
  });
};

var uploadAvatar = function uploadAvatar(req, res) {
  var params = req.params;
  User.findById({
    _id: params.id
  }, function (err, userData) {
    if (err) {
      res.status(500).send({
        message: "Server error"
      });
    } else {
      if (!userData) {
        res.status.send({
          message: "User not found"
        });
      } else {
        var _user = userData;

        if (req.files) {
          var filePath = req.files.avatar.path;
          var fileSplit = filePath.split("\\");
          var fileName = fileSplit[2];
          var extSplit = fileName.split(".");
          var fileExt = extSplit[1];

          if (fileExt !== "jpg" && fileExt !== "png" && fileExt !== "jpeg") {
            res.status(400).send({
              message: "The image extention is not valid (Allowed extensions: png, jpg and jpeg)"
            });
          } else {
            _user.avatar = fileName;
            User.findByIdAndUpdate({
              _id: params.id
            }, _user, function (err, userResult) {
              if (err) {
                res.status(500).send({
                  message: "Server Error"
                });
              } else {
                if (!userResult) {
                  res.status(404).send({
                    message: "User not found"
                  });
                } else {
                  res.status(200).send({
                    user: userResult
                  });
                }
              }
            });
          }
        }
      }
    }
  });
};

var getAvatar = function getAvatar(req, res) {
  var avatarName = req.params.avatarName;
  var filePath = "./upload/avatar/" + avatarName;
  fs.exists(filePath, function (exists) {
    if (!exists) {
      res.status(404).send({
        message: "Avatar does not exists"
      });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
};

var updateUser = function updateUser(req, res) {
  var userData, params;
  return regeneratorRuntime.async(function updateUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userData = req.body;
          userData.email = req.body.email.toLowerCase();
          params = req.params;

          if (!userData.password) {
            _context.next = 9;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(bcrypt.hash(userData.password, 10, function (err, hash) {
            if (err) {
              res.status(500).send({
                message: "Filed to encrypt password"
              });
            } else {
              userData.password = hash;
              User.findByIdAndUpdate({
                _id: params.id
              }, userData, function (err, userUpdate) {
                if (err) {
                  res.status(500).send({
                    message: "Server Error"
                  });
                } else {
                  if (!userUpdate) {
                    res.status(404).send({
                      message: "User not found"
                    });
                  } else {
                    res.status(200).send({
                      message: "User has been updated"
                    });
                  }
                }
              });
            }
          }));

        case 7:
          _context.next = 10;
          break;

        case 9:
          User.findByIdAndUpdate({
            _id: params.id
          }, userData, function (err, userUpdate) {
            if (err) {
              res.status(500).send({
                message: "Server Error"
              });
            } else {
              if (!userUpdate) {
                res.status(404).send({
                  message: "User not found"
                });
              } else {
                res.status(200).send({
                  message: "User has been updated"
                });
              }
            }
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

var activateUser = function activateUser(req, res) {
  var id = req.params.id;
  var active = req.body.active;
  User.findByIdAndUpdate(id, {
    active: active
  }, function (err, userStore) {
    if (err) {
      res.status(500).send({
        message: "Server error"
      });
    } else {
      if (!userStore) {
        res.status(404).send({
          message: "User not found"
        });
      } else {
        if (active === true) {
          res.status(200).send({
            message: "User actived"
          });
        } else {
          res.status(200).send({
            message: "User desactived"
          });
        }
      }
    }
  });
};

var deletUser = function deletUser(req, res) {
  var id = req.params.id;
  User.findByIdAndRemove(id, function (err, userDeteled) {
    if (err) {
      res.status(500).send({
        message: "Server error"
      });
    } else {
      if (!userDeteled) {
        res.status(404).send({
          message: "User not found"
        });
      } else {
        res.status(202).send({
          message: "User deleted"
        });
      }
    }
  });
};

var signUpAdmin = function signUpAdmin(req, res) {
  var user = new User();
  var _req$body2 = req.body,
      name = _req$body2.name,
      lastname = _req$body2.lastname,
      email = _req$body2.email,
      role = _req$body2.role,
      password = _req$body2.password;
  user.name = name;
  user.lastname = lastname;
  user.email = email;
  user.role = role;
  user.active = true;

  if (!password) {
    res.status(404).send({
      message: "The passowrd is required"
    });
  } else {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        res.status(500).send({
          message: "Filed to encrypt password"
        });
      } else {
        user.password = hash;
        user.save(function (err, userStored) {
          if (err) {
            res.status(500).send({
              message: "This user already exists"
            });
          } else {
            if (!userStored) {
              res.status(500).send({
                message: "Error creating user"
              });
            } else {
              res.status(200).send({
                message: "User has been created"
              });
            }
          }
        });
      }
    });
  }
};

module.exports = {
  signUp: signUp,
  signIn: signIn,
  getUsers: getUsers,
  getUsersActive: getUsersActive,
  uploadAvatar: uploadAvatar,
  getAvatar: getAvatar,
  updateUser: updateUser,
  activateUser: activateUser,
  deletUser: deletUser,
  signUpAdmin: signUpAdmin
};