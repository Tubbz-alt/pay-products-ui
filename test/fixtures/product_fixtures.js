'use strict'
const pactBase = require('./pact_base')

// Global setup
const pactProducts = pactBase()

// Create random values if none provided
const randomExternalId = () => Math.random().toString(36).substring(7)
const randomGatewayAccountId = () => Math.round(Math.random() * 1000) + 1
const randomPrice = () => Math.round(Math.random() * 10000) + 1

module.exports = {
  pactifyRandomData: (opts = {}) => {
    pactProducts.pactify(opts)
  },

  validCreateChargeRequest: (opts = {}) => {
    const externalProductId = opts.external_product_id || 'product-externalId'
    const data = {
      external_product_id: externalProductId
    }
    if (opts.price_override) {
      data.amount = opts.price_override
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
    const data = {
      gateway_account_id: opts.gatewayAccountId || randomGatewayAccountId(),
      pay_api_token: opts.payApiToken || 'pay-api-token',
      name: opts.name || 'A Product Name',
      price: opts.price || randomPrice()
    }
    if (opts.description) data.description = opts.description
    if (opts.returnUrl) data.return_url = opts.returnUrl
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
    const data = {
      external_product_id: opts.external_product_id || randomExternalId(),
      external_charge_id: opts.external_charge_id || randomExternalId(),
      amount: opts.amount || randomPrice(),
      description: opts.description || 'The product name',
      _links: opts.links
    }
    if (!data._links) {
      data._links = [{
        href: `http://products.url/v1/api/charges/${(data.external_charge_id)}`,
        rel: 'self',
        method: 'GET'
      }, {
        href: `http://frontend.url/charges/${(data.external_charge_id)}`,
        rel: 'next',
        method: 'GET'
      }]
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
    const data = {
      external_id: opts.external_id || randomExternalId(),
      gateway_account_id: opts.gateway_account_id || randomGatewayAccountId(),
      name: opts.name || 'A Product Name',
      price: opts.price || randomPrice(),
      _links: opts.links
    }
    if (opts.description) data.description = opts.description
    if (opts.return_url) data.return_url = opts.return_url
    if (!data._links) {
      data._links = [{
        href: `http://products.url/v1/api/products/${data.external_id}`,
        rel: 'self',
        method: 'GET'
      }, {
        href: `http://products-ui.url/pay/${data.external_id}`,
        rel: 'pay',
        method: 'GET'
      }]
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
