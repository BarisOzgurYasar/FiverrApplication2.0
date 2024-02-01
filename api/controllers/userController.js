import User from '../models/userModel.js';

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id); //userı bulma işi

  if (req.userId !== user._id.toString()) {
    // userı doğru bulduysa silme işi
    return res.status(403).send('You can delete only your account');
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send('deleteddd!!');
};
