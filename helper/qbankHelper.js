/**
 *  @desc   Function to change type from db to readable text
 *  @param  {string} tipe - type of qbank from db
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

/**
 * 
 * @param {*} tipe 
 * @returns 
 */
function pendWajib(tipe) {
  if (tipe == 'checkBox' || tipe == 'checkGrid') {
    return 'pending'
  }
}

/**
 * 
 * @param {*} useWajib 
 * @returns 
 */
function isWajibCB(useWajib) {
  if (useWajib == 'on') {
    return 'checked'
  }
}

/**
 *  @desc   Function to render Warning message based on type
 *  @param  {string} tipe - type of qbank
 */
function warnMess(tipe) {
  switch (tipe) {
    case 'shortText':
    case 'longText':
    case 'date':
    case 'time':
    case 'dateTime':
      return ''
    case 'radio':
    case 'checkBox':
    case 'dropDown':
    case 'radioGrid':
    case 'checkGrid':
      return '<p>* Kosongkan opsi dan simpan untuk menghapus opsi</p>'
    case 'linearScale':
      return `
      <p>* Ubah jumlah opsi dan simpan untuk mengganti jumlah opsi, jumlah opsi tidak dapat dihapus</p>
      <p>* Label bersifat opsional, kosongkan label dan simpan untuk menghapus label</p>
      `
    default:
      return `
        <div class="bungkus-content edit">
          <p>Tipe > ${tipe} < perlu tambahan switch render case di helper</p>
        </div>
        `
  }
}

/**
 *  @desc  Function to Render Question 
 *  @param {Object} qbank - Json Qbank from db
 *  @param {boolean} isPreview - show hidden input 
 */
function qbankRender(qbank, isPreview) {
  const { _id, tipe, body, opsiy, opsix, sl, label, useWajib } = qbank
  let isWajib = ''
  let setPreview = ''
  let hiddenInput = ''
  switch (tipe) {
    case 'shortText':
      if (useWajib == 'on') {
        isWajib = 'required'
      }
      if (isPreview == true) {
        setPreview = 'disabled'
      } else {
        hiddenInput = `
        <input type="hidden" name="body" value="${body}">
        <input type="hidden" name="tipe" value="${tipe}">
        <input type="hidden" name="idQ" value="${_id}">
        `
      }
      return `
      <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content edit">
          <p class="judul">Answer${isWajib ? '*' : ''} : </p>
          <input type="text" class="text tanya" name="${_id}" id="shortText" placeholder="Answer here" ${isWajib} ${setPreview}>
        </div>
        ${hiddenInput}
        `
    case 'longText':
      if (useWajib == 'on') {
        isWajib = 'required'
      }
      if (isPreview == true) {
        setPreview = 'disabled'
      } else {
        hiddenInput = `
        <input type="hidden" name="body" value="${body}">
        <input type="hidden" name="tipe" value="${tipe}">
        <input type="hidden" name="idQ" value="${_id}">
        `
      }
      return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content edit">
          <p class="judul">Answer${isWajib ? '*' : ''} : </p>
          <textarea name="${_id}" id="longText" cols="30" rows="10" placeholder="Answer here" ${isWajib} ${setPreview}></textarea>
        </div>
        ${hiddenInput}
        `
    case 'radio':
      if (useWajib == 'on') {
        isWajib = 'required'
      }
      if (isPreview == true) {
        setPreview = 'disabled'
      } else {
        hiddenInput = `
        <input type="hidden" name="body" value="${body}">
        <input type="hidden" name="tipe" value="${tipe}">
        <input type="hidden" name="idQ" value="${_id}">
        `
      }
      outputR = opsiy.map((opsi, i) => {
        return `
          <p>
            <input type="radio" name="${_id}" id="${opsi}" value="${opsi}" ${isWajib} ${setPreview}>
            <label for="${opsi}">${opsi}</label>
          </p>
          `
      }).join('')

      return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content edit">
          <p class="judul">Jawaban${isWajib ? '*' : ''} : </p>
          ${isWajib ? '' : `<input type="radio" hidden name="${_id}" value="" checked ${isWajib}>`}
          ${outputR}

          ${hiddenInput}

          <button type="button" class="buttonReset">Batalkan Pilihan</button>
        </div>
        `
    default:
      return `
        <div class="bungkus-content edit">
          <p>Type <strong>${tipe}</strong> need template render</p>
        </div>
        `
  }
}

function qbankEdit(qbank) {
  const { _id, tipe, body, opsiy, opsix, sl, label, useWajib } = qbank
  let isWajib = ''
  switch (tipe) {
    case 'shortText':
    case 'longText':
    case 'date':
    case 'time':
    case 'dateTime':
      return `
        <div class="bungkus-content edit">
          <label for="tipe">Question Text :</label>
          <input type="text" name="body" id="body" class="text" value="${body}" required>
        </div>
        `

    default:
      return `<p>Type <strong>${tipe}</strong> need template render</p>`
  }
}

module.exports = {
  typeChange,
  qbankRender,
  qbankEdit,
  warnMess,
  isWajibCB,
  pendWajib
}