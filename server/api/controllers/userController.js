const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

// Load input validation
const validateRegisterInput = require("../validation/registerValidation");
const validateLoginInput = require("../validation/loginValidation");

// Load User model
const User = require('../models/userModel');

module.exports = {
    registerUser: async(req, res, next) => {
        const { errors, isValid } = validateRegisterInput(req.body);

        // Check validation
        if (!isValid) {
          return res.status(400).json(errors);
        }

        User.findOne({$or: [
            {email: req.body.email},
            {username: req.body.username}
          ]}).then(user => {
            if (user) {
              return res.status(400).json({ message: "User already exists with that email AND/OR username" });
            } else {

              const id = mongoose.Types.ObjectId();

              const newUser = new User({
                _id: id,
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
              });
        
              // Hash password before saving in database
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;

                  // Create JWT Payload
                  const payload = {
                    id,
                    name: newUser.name
                  };

                  // Sign token
                  const token = jwt.sign(payload, process.env.JWT_KEY,{ expiresIn: 3600 });

                  newUser.password = hash;
                  newUser
                    .save()
                    .then(user => res.json({
                      success: true,
                      token,
                      user: {
                        id,
                        name: newUser.name,
                        username: newUser.username,
                        email: newUser.email
                      }
                    }))
                    .catch(err => console.log(err));
                });
              });
            }
          });
    },
    loginUser: async(req, res, next) => {
        const { errors, isValid } = validateLoginInput(req.body);

        // Check validation
        if (!isValid) {
            return res.status(400).json({
              error: errors
            });
        }

        const email = req.body.email;
        const password = req.body.password;

        // Find user by email
        User.findOne({ email }).then(user => {
            // Check if user exists
            if (!user) {
              return res.status(404).json({
                error: {
                  message: "The email you entered did not match our records."
                } 
              });
            }

            // Check password
            bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                  id: user.id,
                  name: user.name,
                  username: user.username
                };

                // Sign token
                jwt.sign(
                  payload,
                  process.env.JWT_KEY,
                {
                    expiresIn: 3600
                },
                (err, token) => {
                    res.json({
                      success: true,
                      token,
                      user: {
                        id: user.id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                      }
                    });
                }
                );
            } else {
                return res
                .status(400)
                .json({ 
                  error: {
                    message: "Incorrect email or password."
                  } 
                });
            }
            });
        });
    },
    getUser: async(req, res, next) => {
      User.findById(req.user.id)
        .populate('projects', ('_id', 'title', 'description'))
        .select('-password -bio -url -__v')
        .then(user => {
          if(user){
            res.json(user)
          } else {
            res.status(404).json({
              message: 'No valid entry found for provided username'
            });
          }
        })
    },
    getUserProfile: async(req, res, next) => {
      User.findOne({username: req.params.username})
        .populate('projects', ('_id title last_updated_at'))
        .select('-_id -settings -password -__v')
        .then(user => {
          if(user){
            res.json(user)
          } else {
            res.status(404).json({
              message: 'No valid entry found for the provided username'
            });
          }
        })
    }
};