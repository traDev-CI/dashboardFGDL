const bcrypt = require("bcrypt");
const user = require("../models/user");
const fs = require("fs");
const path = require("path");
const User = require("../models/user");
const imageFile = require("../utils/processImage");
const jwt = require("../services/jwt");

const signUp = (req, res) => {
  const user = new User();
  const { email, password, repeatPassword, name, lastname } = req.body;
  user.email = email.toLowerCase();
  user.role = "user";
  user.active = false;
  user.name = name;
  user.lastname = lastname;

  if (!password || !repeatPassword) {
    res.status(404).send({ message: "The passowrd is required" });
  } else {
    if (password !== repeatPassword) {
      res.status(404).send({ message: "Password must be the same" });
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            res.status(500).send({ message: "Filed to encrypt password" });
          } else {
            user.password = hash;
            user.save((err, userStore) => {
              if (err) {
                res.status(500).send({ message: `This user already exists` });
              } else {
                if (!userStore) {
                  res.status(500).send({ message: "Error creating user" });
                } else {
                  res.status(200).send({ user: userStore });
                }
              }
            });
          }
        });
      });
    }
  }
};

const signIn =  (req, res) => {
  const params = req.body;
  const email = params.email.toLowerCase();
  const password = params.password;

   User.findOne({ email }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Server error" });
    } else {
      if (!userStored) {
        res.status(404).send({ message: "User not found" });
      } else {
        bcrypt.compare(password, userStored.password, (err, check) => {
          if (err) {
            res.status(500).send({ message: "Server error" });
          } else if (!check) {
            res.status(404).send({ message: "Password is wrong" });
          } else {
            if (!userStored.active) {
              res.status(401).send({ code: 401, message: "User not active" });
            } else {
              res.status(200).send({
                accessToken: jwt.createAccessToken(userStored),
                refreshToken: jwt.createRefreshAccessToken(userStored),
                userStored: userStored
              });
            }
          }
        });
      }
    }
  });
};

const getUsers =  (req, res) => {
   user.find().then((users) => {
    if (!users) {
      res.status(404).send({ message: "There is no user" });
    } else {
      res.status(200).send({ users });
    }
  });
};

const getUsersActive = (req, res) => {
  const query = req.query;
  user.find({ active: query.active }).then((users) => {
    if (!users) {
      res.status(404).send({ message: "There is no user" });
    } else {
      res.status(200).send({ users });
    }
  });
};

const uploadAvatar =  (req, res) => {
  const params = req.params;
   User.findById({ _id: params.id }, (err, userData) => {
    if (err) {
      res.status(500).send({ message: "Server error" });
    } else {
      if (!userData) {
        res.status.send({ message: "User not found" });
      } else {
        let user = userData;
        if (req.files) {
          let filePath = req.files.avatar.path;
          let fileSplit = filePath.split(`\\`);
          let fileName = fileSplit[2];
          let extSplit = fileName.split(".");
          let fileExt = extSplit[1];

          if (fileExt !== "jpg" && fileExt !== "png" && fileExt !== "jpeg") {
            res.status(400).send({
              message:
                "The image extention is not valid (Allowed extensions: png, jpg and jpeg)"
            });
          } else {
            user.avatar = fileName;
            User.findByIdAndUpdate(
              { _id: params.id },
              user,
              (err, userResult) => {
                if (err) {
                  res.status(500).send({ message: "Server Error" });
                } else {
                  if (!userResult) {
                    res.status(404).send({ message: "User not found" });
                  } else {
                    res.status(200).send({ user: userResult });
                  }
                }
              }
            );
          }
        }
      }
    }
  });
};

const getAvatar = (req, res) => {
  const avatarName = req.params.avatarName;
  const filePath = "./upload/avatar/" + avatarName;

  fs.exists(filePath, (exists) => {
    if (!exists) {
      res.status(404).send({ message: "Avatar does not exists" });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
};

const updateUser = async (req, res) => {
  var userData = req.body;
  userData.email = req.body.email.toLowerCase();
  const params = req.params;

  if (userData.password) {
    await bcrypt.hash(userData.password, 10, (err, hash) => {
      if (err) {
        res.status(500).send({ message: "Filed to encrypt password" });
      } else {
        userData.password = hash;
        User.findByIdAndUpdate(
          { _id: params.id },
          userData,
          (err, userUpdate) => {
            if (err) {
              res.status(500).send({ message: "Server Error" });
            } else {
              if (!userUpdate) {
                res.status(404).send({ message: "User not found" });
              } else {
                res.status(200).send({ message: "User has been updated" });
              }
            }
          }
        );
      }
    });
  } else {
    User.findByIdAndUpdate({ _id: params.id }, userData, (err, userUpdate) => {
      if (err) {
        res.status(500).send({ message: "Server Error" });
      } else {
        if (!userUpdate) {
          res.status(404).send({ message: "User not found" });
        } else {
          res.status(200).send({ message: "User has been updated" });
        }
      }
    });
  }
};

const activateUser =  (req, res) => {
  const { id } = req.params;
  const { active } = req.body;
   User.findByIdAndUpdate(id, { active }, (err, userStore) => {
    if (err) {
      res.status(500).send({ message: "Server error" });
    } else {
      if (!userStore) {
        res.status(404).send({ message: "User not found" });
      } else {
        if (active === true) {
          res.status(200).send({ message: "User actived" });
        } else {
          res.status(200).send({ message: "User desactived" });
        }
      }
    }
  });
};

const deletUser =  (req, res) => {
  const { id } = req.params;
   User.findByIdAndRemove(id, (err, userDeteled) => {
    if (err) {
      res.status(500).send({ message: "Server error" });
    } else {
      if (!userDeteled) {
        res.status(404).send({ message: "User not found" });
      } else {
        res.status(202).send({ message: "User deleted" });
      }
    }
  });
};

const createUser = (req, res) =>{
  const user = new User();
  const { email, password, repeatPassword, name, lastname } = req.body;
  const { avatar } = req.file;
  user.email = email.toLowerCase();
  user.role = "user";
  user.active = false;
  user.name = name;
  user.lastname = lastname;

  if (!password) {
    res.status(404).send({ message: "The passowrd is required" });
  } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            res.status(500).send({ message: "Filed to encrypt password" });
          } else {
            user.password = hash;
            if (avatar) {
              const imageName = imageFile.getFileName(avatar);
              user.avatar = imageName;
              user.save((err, userStore) => {
                if (err) {
                  res.status(500).send({ message: `This user already exists` });
                } else {
                  if (!userStore) {
                    res.status(400).send({ message: "Error creating user" });
                  } else {
                    res.status(200).send({ user: userStore });
                  }
                }
              });
            }
          }
        });
      });
  }

}

const signUpAdmin = (req, res) => {
  const user = new User();
  const { name, lastname, email, role, password } = req.body;
  user.name = name;
  user.lastname = lastname;
  user.email = email;
  user.role = role;
  user.active = true;

  if (!password) {
    res.status(404).send({ message: "The passowrd is required" });
  } else {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        res.status(500).send({ message: "Filed to encrypt password" });
      } else {
        user.password = hash;

        user.save((err, userStored) => {
          if (err) {
            res.status(500).send({ message: `This user already exists` });
          } else {
            if (!userStored) {
              res.status(500).send({ message: "Error creating user" });
            } else {
              res.status(200).send({ message: "User has been created" });
            }
          }
        });
      }
    });
  }
};

module.exports = {
  signUp,
  signIn,
  getUsers,
  getUsersActive,
  uploadAvatar,
  getAvatar,
  updateUser,
  activateUser,
  deletUser,
  signUpAdmin,
  createUser
};
