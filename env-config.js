const prod = process.env.NODE_ENV === 'production';

module.exports = {
  API_URL: prod ? 'http://dodang/api/' : 'http://localhost:4000/api',
};
