/**
 *  Function to change type from db to readable text
 */
function typeChange(tipe) {
  switch (tipe) {
    case 'shortText':
      return 'Short Answer'
    case 'longText':
      return 'Long Answer'
    case 'radio':
      return 'Multiple Choice'
    case 'radioGrid':
      return 'Multiple Choice Grid'
    case 'checkBox':
      return 'Check Box'
    case 'checkGrid':
      return 'Check Box Tick'
    case 'dropDown':
      return 'Choise List'
    case 'date':
      return 'Date'
    case 'time':
      return 'Time'
    case 'linearScale':
      return 'Linear Scale'
    case 'dateTime':
      return 'Date and Time'
    default:
      return `
        <div class="bungkus-content edit">
          <p>Tipe > ${tipe} < perlu tambahan switch render case di helper</p>
        </div>
        `
  }
}

module.exports = {
  typeChange
}