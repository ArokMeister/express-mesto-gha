const http2 = require('http2');

const {
  HTTP_STATUS_CREATED: CREATED_201,
  HTTP_STATUS_BAD_REQUEST: BAD_REQUEST_400,
  HTTP_STATUS_INTERNAL_SERVER_ERROR: SERVER_ERROR_500,
  HTTP_STATUS_NOT_FOUND: NOT_FOUND_404,
} = http2.constants;

module.exports = {
  CREATED_201,
  BAD_REQUEST_400,
  NOT_FOUND_404,
  SERVER_ERROR_500,
};
