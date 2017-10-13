'use strict'

// NPM dependencies
const logger = require('winston')

// Custom dependencies
const {renderErrorView} = require('../utils/response')
const {getProduct} = require('../services/clients/products_client')

module.exports = function (req, res, next) {
  const productExternalId = req.params.productExternalId
  getProduct(productExternalId)
    .then(product => {
      req.product = product
      next()
    })
    .catch(err => {
      logger.warn(`Attempted to create a payment for non-existent product with external id: '${productExternalId}', err = ${err}`)
      renderErrorView(req, res, 'Sorry, we are unable to process your request', 404)
    })
}
