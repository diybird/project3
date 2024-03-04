const jwt = require('jsonwebtoken');

const secretKey = 'secret-key';

// Generating JWT token
const token = jwt.sign({ user_id: user._id }, secretKey, { expiresIn: '1h' });

// Verifying JWT token
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    // Token is not valid
  } else {
    // Token is valid, proceed with authenticated user
  }
});
