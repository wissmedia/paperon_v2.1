const moment = require('moment')

/**
 *  Function to format timestamp from db 
 *  to DD MMMM YYYY format
 */
function simpleDate(date){
  return moment(date).utcOffset(8).format('DD MMMM YYYY')
}

module.exports = {
  simpleDate
}