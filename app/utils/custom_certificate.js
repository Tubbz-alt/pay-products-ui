'use strict'

const path = require('path')
const fs = require('fs')

const logger = require('winston')

module.exports = {
  addCertsToAgent: function (agent) {
    let certsPath = process.env.CERTS_PATH || path.join(__dirname, '/../../certs')

    try {
      if (!fs.lstatSync(certsPath).isDirectory()) {
        logger.error('Provided CERTS_PATH is not a directory', {
          certsPath: certsPath
        })
        return
      }
    } catch (e) {
      logger.error('Provided CERTS_PATH could not be read', {
        certsPath: certsPath
      })
      return
    }

    agent.options.ca = agent.options.ca || []
    fs.readdirSync(certsPath).forEach(
      (certPath) => agent.options.ca.push(
        fs.readFileSync(path.join(certsPath, certPath))
      )
    )
  }
}
