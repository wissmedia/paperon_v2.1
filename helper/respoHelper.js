function respoQRender(qbankID, qbankArray, isPreview){
    const { tipe, body, opsiy, opsix, sl, label, useWajib } = qbankArray
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
          <input type="hidden" name="idQ" value="${qbankID}">
          `
        }
        return `
          <div class="bungkus-content edit">
            <h2>${body}</h2>
          </div>
          <div class="bungkus-content edit">
            <p class="judul">Answer${isWajib ? '*' : ''} : </p>
            <input type="text" class="text tanya" name="${qbankID}" id="shortText" placeholder="Answer here" ${isWajib} ${setPreview}>
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
          <input type="hidden" name="idQ" value="${qbankID}">
          `
        }
        return `
          <div class="bungkus-content edit">
            <h2>${body}</h2>
          </div>
          <div class="bungkus-content edit">
            <p class="judul">Answer${isWajib ? '*' : ''} : </p>
            <textarea name="${qbankID}" id="longText" cols="30" rows="10" placeholder="Answer here" ${isWajib} ${setPreview}></textarea>
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
          <input type="hidden" name="idQ" value="${qbankID}">
          `
        }
        // Render all opsiy to html
        outputR = opsiy.map((opsi, i) => {
          return `
            <p>
              <input type="radio" name="${qbankID}" id="${opsi}" value="${opsi}" ${isWajib} ${setPreview}>
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
            ${isWajib ? '' : `<input type="radio" hidden name="${qbankID}" value="" checked ${isWajib}>`}
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
          <input type="hidden" name="idQ" value="${qbankID}">
          `
        }
        // Render opsix to html with <td> tag
        function inputRGX(index) {
          let strRG = ""
          for (let i = 0; i < opsix.length; i++) {
            strRG += `
              <td class="text-center">
                <input type="radio" name="${[id, opsiy[index]]}" value="${opsix[i]}" ${setPreview} >
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
          <input type="hidden" name="idQ" value="${qbankID}">
          `
        }
        // Render opsiy to html
        outputCB = opsiy.map((opsi, i) => {
          return `
            <p>
              <input type="checkBox" name="${qbankID}" id="${opsi}" value="${opsi}" ${setPreview}>
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
            <input type="hidden" name="${qbankID}" value="" checked>
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
          <input type="hidden" name="idQ" value="${qbankID}">
          `
        }
        function inputCGX(index) {
          let strCG = ""
          for (let i = 0; i < opsix.length; i++) {
            strCG += `
              <td class="text-center">
                <input type="checkbox" name="${[id, opsiy[index]]}" value="${opsix[i]}" ${setPreview}/>
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
          <input type="hidden" name="idQ" value="${qbankID}">
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
            <select name="${qbankID}" id="${qbankID}" class="dropdown" ${isWajib}>
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
          <input type="hidden" name="idQ" value="${qbankID}">
          `
        }
        return `
          <div class="bungkus-content edit">
            <h2>${body}</h2>
          </div>
          <div class="bungkus-content">
            <div class="form_group">
            <p class="judul">Answer${isWajib ? '*' : ''} : </p>
              <input type="date" name="${qbankID}" id="${qbankID}" ${isWajib}>
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
          <input type="hidden" name="idQ" value="${qbankID}">
          `
        }
        return `
          <div class="bungkus-content edit">
            <h2>${body}</h2>
          </div>
          <div class="bungkus-content">
            <div class="form_group">
              <p class="judul">Answer${isWajib ? '*' : ''} : </p>
              <input type="time" name="${qbankID}" id="${qbankID}" ${isWajib}>
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
          <input type="hidden" name="idQ" value="${qbankID}">
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
                <input type="radio" name="${qbankID}" value="${i}" ${isWajib}/>
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
            ${isWajib ? '' : `<input type="radio" hidden name="${qbankID}" value="" checked ${isWajib}>`}
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
              <input type="datetime-local" name="${qbankID}" id="${qbankID}" ${isWajib}>
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


module.exports = {
  respoQRender
}