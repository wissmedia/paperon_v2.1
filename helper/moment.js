const moment = require('moment')
var func = {
  simpleDate : function(date){
    return moment(date).utcOffset(8).format('DD MMMM YYYY')
  }
}

module.exports = func