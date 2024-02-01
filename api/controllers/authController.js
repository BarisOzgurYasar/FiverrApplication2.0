import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);

    const newUser = new User({
      //create user with client
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send('user has been created'); //successfully created = 201
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }); // findOne because user is unique

    if (!user) return next(createError(404, 'User not foundd!!'));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password); // , den öncesi kullanıcının yazdığı password ile user.password(DB deki password) eşleşiyor mu onu kontrol ediyor
    if (!isCorrect)
      return next(createError(400, 'Wrong password or username !!'));

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    res.cookie('accessToken', token, { httpOnly: true }).status(200).send(info);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {};
