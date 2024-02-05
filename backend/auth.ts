const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const validateLogin = async (db: any, userName: string, password: string) => {
  const user = await db.collection('users').findOne({ username: userName });
  if (!user) {
    return { message: 'Invalid Credentials' };
  }

  if (!(await checkPassword(password, user.password))) {
    return { message: 'Invalid Credentials' };
  }

  const sessionToken = generateToken(user);

  return { token: sessionToken };
}

const checkPassword = async (password: string, hash: string) => {
  const match = await bcrypt.compare(password, hash);
  if (match) {
    return true;
  } else {
    return false;
  }
}



const JWT_SECRET = process.env.JWT_SECRET; // Store this secret in your .env file

const generateToken = (user: any) => {
  // Expires in 24 hours
  return jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
};

export const verifyToken = (userToken: string) => {
  try {
    jwt.verify(userToken, process.env.JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

