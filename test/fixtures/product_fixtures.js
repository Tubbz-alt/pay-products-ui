'use strict'
const pactBase = require('./pact_base')

// Global setup
const pactProducts = pactBase()

module.exports = {

  validCreateChargeRequest: (opts = {}) => {
    const externalProductId = opts.external_product_id || 'product-externalId'
    const data = {
      external_product_id: externalProductId,
      amount: opts.amount || 990
    }

    return {
      getPactified: () => {
        return pactProducts.pactify(data)
      },
      getPlain: () => {
        return data
      }
    }
  },

  validCreateProductRequest: (opts = {}) => {
    const externalServiceId = opts.service_external_id || 'service-externalId'
    const payApiToken = opts.pay_api_token || 'pay-api-token'
    const name = opts.name || 'A Product Name'
    const description = opts.description || 'A Product description'
    const price = opts.price || 1000

    const data = {
      external_service_id: externalServiceId,
      pay_api_token: payApiToken,
      name: name,
      description: description,
      price: price
    }

    if (opts.return_url) {
      data.return_url = opts.return_url
    }

    return {
      getPactified: () => {
        return pactProducts.pactify(data)
      },
      getPlain: () => {
        return data
      }
    }
  },

  validCreateChargeResponse: (opts = {}) => {
    const externalProductId = opts.external_product_id || 'product-externalId'
    const externalChargeId = opts.external_charge_id || 'charge-externalId'
    const amount = opts.amount || 999
    const description = opts.description || 'The product name'
    const links = opts.links ||
      [{
        href: `http://products.url/v1/api/charges/${externalChargeId}`,
        rel: 'self',
        method: 'GET'
      }]

    const data = {
      external_product_id: externalProductId,
      external_charge_id: externalChargeId,
      amount,
      description,
      _links: links
    }

    return {
      getPactified: () => {
        return pactProducts.pactify(data)
      },
      getPlain: () => {
        return data
      }
    }
  },

  validCreateProductResponse: (opts = {}) => {
    const externalProductId = opts.external_product_id || 'product-externalId'
    const externalServiceId = opts.external_service_id || 'service-externalId'
    const externalCatalogueId = opts.catalogue_external_id || 'catalogue-externalId'
    const name = opts.name || 'A Product Name'
    const description = opts.description || 'A Product description'
    const price = opts.price || 1000
    const returnUrl = opts.return_url || 'http://some.return.url/'
    const links = opts.links ||
      [{
        href: `http://products.url/v1/api/products/${externalProductId}`,
        rel: 'self',
        method: 'GET'
      }, {
        href: `http://products-ui.url/pay/${externalProductId}`,
        rel: 'pay',
        method: 'GET'
      }]

    const data = {
      external_product_id: externalProductId,
      external_service_id: externalServiceId,
      external_catalogue_id: externalCatalogueId,
      name: name,
      description: description,
      price: price,
      return_url: returnUrl,
      _links: links
    }

    return {
      getPactified: () => {
        return pactProducts.pactify(data)
      },
      getPlain: () => {
        return data
      }
    }
  }
}
