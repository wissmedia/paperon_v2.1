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
 *  Disable useWajib on Check Box and Check Box Grid
 *  @param {*} tipe 
 *  @returns 
 */
function pendWajib(tipe) {
  if (tipe == 'checkBox' || tipe == 'checkGrid') {
    return 'pending'
  }
}

/**
 *  Set useWajib CheckBox to Checked if value is 'on'
 *  @param {*} useWajib 
 *  @returns 
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
      return '<p>*if there is no option then it will not be updated</p>'
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
      // if isPreview true, dont show hidden input and disable text input
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
      // Render all opsiy to html
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
          <button type="button" class="buttonReset">Reset</button>
        </div>
      `
    case 'radioGrid':
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
      // Render opsix to html with <td> tag
      function inputRGX(index) {
        let strRG = ""
        for (let i = 0; i < opsix.length; i++) {
          strRG += `
            <td class="text-center">
              <input type="radio" name="${[_id, opsiy[index]]}" value="${opsix[i]}" ${setPreview} >
            </td>
          `
        }
        return strRG
      }
      // Render opsiy to html with <td> tag, and add inputRGX
      outputRGY = opsiy.map((opsi, index) => {
        return `
          <tr>
            <td>${opsi}</td>
            ${inputRGX(index)}
          </tr>
          `
      }).join('')
      // Render opsix (header) to html with <th>
      outputRGX = opsix.map((opsi, i) => {
        return `
            <th>${opsi}</th>
          `
      }).join('')

      return `
        <div class="bungkus-content edit x-auto">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content edit">
          <p class="judul">Answer${isWajib ? '*' : ''} : </p>
          <table class="pilihan-gandav2">
            <tr class="text-center">
              <th></th>
              ${outputRGX}
            </tr>
            ${outputRGY}
          </table>
          ${hiddenInput}
          <button type="button" class="buttonReset">Reset</button>
        </div>
      `
    case 'checkBox':
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
      // Render opsiy to html
      outputCB = opsiy.map((opsi, i) => {
        return `
          <p>
            <input type="checkBox" name="${_id}" id="${opsi}" value="${opsi}" ${setPreview}>
            <label for="${opsi}">${opsi}</label>
          </p>
          `
      }).join('')
      return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content">
          <p class="judul">Answer : </p>
          ${outputCB}
          <input type="hidden" name="${_id}" value="" checked>
          ${hiddenInput}
          <button type="button" class="buttonReset">Reset</button>
        </div>
      `
    case 'checkGrid':
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
      function inputCGX(index) {
        let strCG = ""
        for (let i = 0; i < opsix.length; i++) {
          strCG += `
            <td class="text-center">
              <input type="checkbox" name="${[_id, opsiy[index]]}" value="${opsix[i]}" ${setPreview}/>
            </td>
            `
        }
        return strCG
      }
      outputCGY = opsiy.map((opsi, index) => {
        return `
          <tr>
            <td>${opsi}</td>
            ${inputCGX(index)}
          </tr>
          `
      }).join('')
      outputCGX = opsix.map((opsi, i) => {
        return `
            <th>${opsi}</th>
          `
      }).join('')

      return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content edit x-auto">
          <p class="judul">Answer : </p>
          <table class="pilihan-gandav2">
            <tr class="text-center">
              <th></th>
              ${outputCGX}
            </tr>
            ${outputCGY}
          </table>
          ${hiddenInput}
          <button type="button" class="buttonReset">Reset</button>
        </div>
      `
    case 'dropDown':
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
      outputDD = opsiy.map((opsi, i) => {
        return `
            <option value="${opsi}">${opsi}</option>
          `
      }).join('')
      return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content">
          <p class="judul">Answer${isWajib ? '*' : ''} : </p>
          <select name="${_id}" id="${_id}" class="dropdown" ${isWajib}>
            <option hidden selected value="">-- Select</option>
            ${outputDD}
          </select>
        </div>
        ${hiddenInput}
      `
    case 'date':
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
        <div class="bungkus-content">
          <div class="form_group">
          <p class="judul">Answer${isWajib ? '*' : ''} : </p>
            <input type="date" name="${_id}" id="${_id}" ${isWajib}>
          </div>
        </div>  
        ${hiddenInput}
      `
    case 'time':
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
        <div class="bungkus-content">
          <div class="form_group">
            <p class="judul">Answer${isWajib ? '*' : ''} : </p>
            <input type="time" name="${_id}" id="${_id}" ${isWajib}>
          </div>
        </div>
        ${hiddenInput}
      `
    case 'linearScale':
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

      let last = sl[sl.length - 1]

      function fun() {
        let str = ""
        for (let i = sl[0]; i <= last; i++) { str += `<th>${i}</th>` }
        return str
      }

      function fun2() {
        let str2 = ""
        for (let i = sl[0]; i <= last; i++) {
          str2 += `
            <td class="text-center">
              <input type="radio" name="${_id}" value="${i}" ${isWajib}/>
            </td>
          ` }
        return str2
      }

      return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content x-auto">
        <p class="judul">Answer${isWajib ? '*' : ''} : </p>
        <div class="table-responsive">
          <table class="pilihan-gandav2">
            <tr class="text-center">
              <th></th>
              ${fun()}
              <th></th>
            </tr>
            <tr>
              <td><span>${label[0]}</span></td>
              ${fun2()}
              <td><span>${label[1]}</span></td>
              </tr>
          </table>
          </div>
          ${isWajib ? '' : `<input type="radio" hidden name="${_id}" value="" checked ${isWajib}>`}
          <button type="button" class="buttonReset">Reset</button>
        </div>
        ${hiddenInput}
      `
    case 'dateTime':
      if (useWajib == 'on') {
        isWajib = 'required'
      }
      return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content">
          <div class="form_group">
            <p class="judul">Answer${isWajib ? '*' : ''} : </p>
            <input type="datetime-local" name="${_id}" id="${_id}" ${isWajib}>
          </div>
        </div>
        ${hiddenInput}
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
    case 'radio':
      outputRB = opsiy.map((opsi, i) => {
        return `
            <div class="edit-group setInput">
              <input type="radio" name="pilih" id="pilih1" disabled>
              <input type="text" name="opsiy" id="opsi" class="text" value="${opsi}" required>
              <a class="del btn-del"><i class="fas fa-times"></i></a>
            </div>
            `
      }).join('')
      return `
          <div class="bungkus-content edit">
            <label for="tipe">Question Text :</label>
            <input type="text" name="body" id="body" class="text" value="${body}" required>
          </div>
  
          <div class="bungkus-content edit">
            <label for="">Option :</label>
            ${outputRB}
            <div class="edit-group addInput">
              <input type="radio" name="pilih" id="pilih1" disabled>
              <input type="text" class="text addOpsiKolom" placeholder="Add Option" readonly>
            </div>
          </div>
          `
    case 'checkBox':
      outputCB = opsiy.map((opsi, i) => {
        return `
            <div class="edit-group setInput">
              <input type="checkbox" name="pilih" id="pilih1" disabled>
              <input type="text" name="opsiy" id="opsi" class="text" value="${opsi}" required>
              <a class="del btn-del"><i class="fas fa-times"></i></a>
            </div>
            `
      }).join('')
      return `
          <div class="bungkus-content edit">
            <label for="tipe">Question Text :</label>
            <input type="text" name="body" id="body" class="text" value="${body}" required>
          </div>
  
          <div class="bungkus-content edit">
            <label for="">Opsi :</label>
            ${outputCB}
            <div class="edit-group addInput">
              <input type="checkbox" name="pilih" id="pilih1" disabled>
              <input type="text" class="text addOpsiCheckKolom" placeholder="Add Option" readonly>
            </div>
          </div>
          `
    case 'dropDown':
      outputDD = opsiy.map((opsi, i) => {
        return `
            <div class="edit-group setInput">
              <span id="nomor" class="nomor">&#9672;</span>
              <input type="text" name="opsiy" id="opsi" class="text" value="${opsi}" required>
              <a class="del btn-del"><i class="fas fa-times"></i></a>
            </div>
            `
      }).join('')
      return `
          <div class="bungkus-content edit">
            <label for="tipe">Question Text :</label>
            <input type="text" name="body" id="body" class="text" value="${body}" required>
          </div>
  
          <div class="bungkus-content edit">
            <label for="">Options :</label>
            ${outputDD}
            <div class="edit-group addInput">
              <span id="nomor">&#9672;</span>
              <input type="text" class="text addOpsiDaftar" placeholder="Add Option" readonly>
            </div>
          </div>
          `
    case 'radioGrid':
      outputRGX = opsix.map((opsi, i) => {
        return `
            <div class="edit-group setInput">
              <input type="radio" name="pilih" id="pilih1" disabled>
              <input type="text" name="opsix" id="opsi" class="text" value="${opsi}" required>
              <a class="del btn-del"><i class="fas fa-times"></i></a>
            </div>
            `
      }).join('')
      outputRGY = opsiy.map((opsi, i) => {
        return `
            <div class="edit-group setInput">
              <input type="radio" name="pilih" id="pilih1" disabled>
              <input type="text" name="opsiy" id="opsi" class="text" value="${opsi}" required>
              <a class="del btn-del"><i class="fas fa-times"></i></a>
            </div>
            `
      }).join('')
      return `
          <div class="bungkus-content edit">
            <label for="tipe">Question Text :</label>
            <input type="text" name="body" id="body" class="text" value="${body}" required>
          </div>
  
          <div class="bungkus-content edit">
            <div class="baris">
              <label for="">Row</label>
              ${outputRGX}
              <div class="edit-group addInput">
                <input type="radio" name="pilih" id="pilih1" disabled>
                <input type="text" class="text addOpsiBaris" placeholder="Add Row" readonly>
              </div>
            </div>
  
            <div class="kolom">
              <label for="">Column</label>
              ${outputRGY}
              <div class="edit-group addInput">
                <input type="radio" name="pilih" id="pilih1" disabled>
                <input type="text" class="text addOpsiKolom" placeholder="Add Column" readonly>
              </div>
            </div>
          </div>
          `
    case 'checkGrid':
      outputRGX = opsix.map((opsi, i) => {
        return `
            <div class="edit-group setInput">
              <input type="checkbox" name="pilih" id="pilih1" disabled>
              <input type="text" name="opsix" id="opsi" class="text" value="${opsi}" required>
              <a class="del btn-del"><i class="fas fa-times"></i></a>
            </div>
            `
      }).join('')
      outputRGY = opsiy.map((opsi, i) => {
        return `
            <div class="edit-group setInput">
              <input type="checkbox" name="pilih" id="pilih1" disabled>
              <input type="text" name="opsiy" id="opsi" class="text" value="${opsi}" required>
              <a class="del btn-del"><i class="fas fa-times"></i></a>
            </div>
            `
      }).join('')
      return `
          <div class="bungkus-content edit">
            <label for="tipe">Question Text :</label>
            <input type="text" name="body" id="body" class="text" value="${body}" required>
          </div>
  
          <div class="bungkus-content edit">
            <div class="baris">
              <label for="">Row</label>
              ${outputRGX}
              <div class="edit-group addInput">
                <input type="checkbox" name="pilih" id="pilih1" disabled>
                <input type="text" class="text addOpsiCheckBaris" placeholder="Add Row" readonly>
              </div>
            </div>
  
            <div class="kolom">
              <label for="">Column</label>
              ${outputRGY}
              <div class="edit-group addInput">
                <input type="checkbox" name="pilih" id="pilih1" disabled>
                <input type="text" class="text addOpsiCheckKolom" placeholder="Add Column" readonly>
              </div>
            </div>
          </div>
          `

    case 'linearScale':
      return `
          <div class="bungkus-content edit">
            <label for="tipe">Question Text :</label>
            <input type="text" name="body" id="body" class="text" value="${body}" required>
          </div>
  
          <div class="bungkus-content edit">
            <label for="">Number of options : </label>
            <br>
            <select name="sl" class="dropdown ddA">
              <option value="0" ${sl[0] == 0 ? 'selected' : ''}>0</option>
              <option value="1" ${sl[0] == 1 ? 'selected' : ''}>1</option>
            </select>
  
            <span>to</span>
  
            <select name="sl" class="dropdown ddB">
              <option value="2" ${sl[1] == 2 ? 'selected' : ''}>2</option>
              <option value="3" ${sl[1] == 3 ? 'selected' : ''}>3</option>
              <option value="4" ${sl[1] == 4 ? 'selected' : ''}>4</option>
              <option value="5" ${sl[1] == 5 ? 'selected' : ''}>5</option>
              <option value="6" ${sl[1] == 6 ? 'selected' : ''}>6</option>
              <option value="7" ${sl[1] == 7 ? 'selected' : ''}>7</option>
              <option value="8" ${sl[1] == 8 ? 'selected' : ''}>8</option>
              <option value="9" ${sl[1] == 9 ? 'selected' : ''}>9</option>
              <option value="10" ${sl[1] == 10 ? 'selected' : ''}>10</option>
            </select>
          </div>
          
          <div class="bungkus-content edit">
            <label for="">Label (opsional) : </label>
            <div class="label-skala">
              <span id="skala-a" class="skala-a">0</span>
              <input type="text" name="label" class="" value="${label[0]}">
            </div>
            <div class="label-skala">
              <span id="skala-b" class="skala-b">10</span>
              <input type="text" name="label" class="" value="${label[1]}">
            </div>
          </div>
          `
    default:
      return `<p>Type <strong>${tipe}</strong> need template render</p>`
  }
}

export {
  typeChange,
  qbankRender,
  qbankEdit,
  warnMess,
  isWajibCB,
  pendWajib
}