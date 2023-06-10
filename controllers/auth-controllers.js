const Jimp = require("jimp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
require("dotenv").config();
const { User } = require("../models/user");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const { SECRET_KEY } = process.env;

const path = require("path");

const avatarsDir = path.resolve("public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const newPath = path.join(avatarsDir, filename);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  const image = await Jimp.read(newPath);
  image.resize(250, 250).write(newPath);

  res.json({
    avatarURL
  });
};

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL
  });

  res.status(201).json({
    email: newUser.email,
    password: newUser.password
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or passwoord invalid");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or passwoord invalid");
  }

  const payload = {
    id: user._id
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "20h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token });
};

const getCurrent = async (req, res) => {
  const { email } = req.user;
  res.json({ email });
};

const logout = async (req, res) => {
  const { _id: id } = req.user;
  await User.findByIdAndUpdate(id, { token: "null" });
  res.status(204).json("Logout success");
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar)
};
