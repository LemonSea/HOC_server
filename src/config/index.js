const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// read .dev file
const envFound = dotenv.config();

if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * Local development
   * MongoDB connect URL
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * API configs
   */
  api: {
    prefix: '/api/v1',
  },

  /**
 * Your secret sauce
 */
  jwtSecret: process.env.JWT_SECRET,
}