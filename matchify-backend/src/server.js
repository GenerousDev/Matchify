const app = require('./app');
const config = require('./config');

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port} in ${process.env.NODE_ENV || 'development'} mode`);
});