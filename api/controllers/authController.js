import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);

    const newUser = new User({
      ...req.body,
      password: hash,
    }); //create user with client

    await newUser.save();
    res.status(201).send('user has been created'); //successfully created = 201
  } catch (err) {
    res.status(500).send('Something went wrong!!!');
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }); // findOne because user is unique
    if (!user) return res.status(404).send('User not found');

    const isCorrect = bcrypt.compareSync(req.body.password, user.password); // , den öncesi kullanıcının yazdığı password ile user.password(DB deki password) eşleşiyor mu onu kontrol ediyor
    if (!isCorrect)
      return res.status(400).send('Wrong password or username !!');

    const { password, ...info } = user._doc;
    res.status(200).send(info);
  } catch (err) {
    res.status(500).send('Something went wrong!!!');
  }
};

export const logout = async (req, res) => {};