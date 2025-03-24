const express = require("express");
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "cApTaInNiAtPaC";

const { body, validationResult } = require("express-validator");

router.post(
  "/user/signup",
  [
    body("name").isLength({ min: 3 }).withMessage("Enter atleast 3 characters"),
    body("email")
      .isEmail()
      .withMessage("Enter a valid email format")
      .custom((value) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("Email already exists");
          }
        });
      }),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be atleast 5 characters"),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      const salt = await bcrypt.genSalt(10);
      let saltedPassword = await bcrypt.hash(req.body.password, salt);
      let user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: saltedPassword,
      });
      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = await jwt.sign(payload, JWT_SECRET);
      success = true;

      res.json({ success, authToken });
    } catch (error) {
      res.status(500).send(success, "Internal Server Error");
    }
  }
);

router.post(
  "/user/login",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").notEmpty().withMessage("Enter proper password"),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success, errors: "Wrong credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success, errors: "Wrong credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = await jwt.sign(data, JWT_SECRET);
      (success = true), res.json({ success, authToken });
    } catch (error) {
      res.status(500).send(success, "Internal Server Error");
    }
  }
);

router.post("/user/detail", fetchuser, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).select("-password");
    res.send({ user });
  } catch (error) {
    res.status(400).send("Internal Server Error");
  }
});

module.exports = router;
