// config.js
const config = {
    development: {
      port: 3001,
      jwtSecret: 'dev-secret-key',
      uploadPath: 'uploads/',
      corsOrigin: 'http://localhost:3001'
    },
    test: {
      port: 3001,
      jwtSecret: 'test-secret-key',
      uploadPath: 'test-uploads/',
      corsOrigin: 'http://localhost:3001'
    },
    production: {
      port: process.env.PORT || 3002,
      jwtSecret: process.env.JWT_SECRET || 'prod-secret-key',
      uploadPath: process.env.UPLOAD_PATH || 'uploads/',
      corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3002'
    }
  };
  
  const env = process.env.NODE_ENV || 'development';
  module.exports = config[env];