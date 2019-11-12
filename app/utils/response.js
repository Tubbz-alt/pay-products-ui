'use strict'

const logger = require('../utils/logger')(__filename)

const ERROR_MESSAGE = 'error.default' // This is the object notation to string in en.json
const ERROR_VIEW = 'error'

function response (req, res, template, data) {
  return res.render(template, data)
}

function errorResponse (req, res, msg = ERROR_MESSAGE, status = 500) {
  logger.error(`[${req.correlationId}] ${status} An error has occurred. Rendering error view`, { errorMessage: msg })
  res.setHeader('Content-Type', 'text/html')
  res.status(status)
  res.render(ERROR_VIEW, { message: msg })
}

module.exports = {
  response: response,
  renderErrorView: errorResponse
}
