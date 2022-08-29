const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }

  // authHeader comes as 'Bearer(space)token'
  const jwtToken = authHeader.split(' ')[1];

  try {
    // get _id from token
    const { _id } = jwt.verify(jwtToken, process.env.JWT_SECRET);

    // add userId property to req object
    req.userId = await User.findOne({ _id }).select('_id');

    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized request' });
  }
};

module.exports = { verifyToken };
