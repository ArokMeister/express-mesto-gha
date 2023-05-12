// const { allowedURL, DEFAULT_ALLOWED_METHODS } = require('../constants/constants');

// const allowedCors = (req, res, next) => {
//   const { origin } = req.headers;
//   const { method } = req;
//   const requestHeaders = req.headers['access-control-request-headers'];

//   if (allowedURL.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }

//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//   }

//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     return res.end();
//   }

//   next();
// };

// module.exports = { allowedCors };
