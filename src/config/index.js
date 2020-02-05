const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// config() 将读取您的 .env 文件，解析其中的内容并将其分配给 process.env
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
     * Your secret sauce
     */
  jwtSecret: process.env.JWT_SECRET,
  
  /**
     * Used by winston logger
     */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
}