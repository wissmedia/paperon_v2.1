import moment from 'moment'

/**
 *  Function to format timestamp from db 
 *  to DD MMMM YYYY format
 */
function simpleDate(date) {
  return moment(date).utcOffset(8).format('DD MMMM YYYY')
}

export {
  simpleDate
}