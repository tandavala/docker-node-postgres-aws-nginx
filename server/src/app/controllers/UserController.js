/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
const User = require('../models/User');

class UserController {
  async index(req, res) {
    const users = await User.findAll();
    return res.status(200).json(users);
  }

  async store(req, res) {
    const { email } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ msg: 'Email already in use.' });
    }

    const { name } = await User.create(req.body);

    return res.json({ name, email });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ msg: 'Email already in use.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'password does not match' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

module.exports = new UserController();
