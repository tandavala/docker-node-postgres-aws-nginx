const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authConfig = require('../../config/auth');

class SesseionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ msg: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.email },
      authConfig.secret,
      { expiresIn: authConfig.expiresIn },
    );

    return res.status(200).json({ id: user.id, name: user.name, token });
  }
}

module.exports = new SesseionController();
