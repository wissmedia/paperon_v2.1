// Pop Up Modal Add di halaman Setup.
$(document).ready(function () {
	$("#add").click(function () {
		$("#modalAddQuestion").show();
		$("#modalAddQuestion .modal-content").slideDown();
	});
});

// Hide Modal saat klik close
$(document).ready(function () {
	$(".close").click(function () {
		$("#modalAddQuestion").fadeOut();
		$("#modalAddQuestion .modal-content").slideUp();
	});
});

// Hide Modal saat klik diluar
window.onclick = function (event) {
	modalAdd = document.getElementById("modalAddQuestion");

	modalMenu = document.getElementById("modalMenuAkun");

	modalPertanyaan = document.getElementById("modalPilihPertanyaan");

	if (event.target == modalAdd) {
		modalAdd.style.display = "none";
		$("#modalAddQuestion .modal-content").slideUp();
	} else if (event.target == modalMenu) {
		modalMenu.style.display = "none";
		$("#modalMenuAkun .modal-content").slideUp();
	} else if (event.target == modalPertanyaan) {
		modalPertanyaan.style.display = "none";
		$("#modalPilihPertanyaan .modal-content").slideUp();
	}
}

// Hide Pop Up menu saat klik outside content
$(document).mouseup(function (e) {
	var container = $(".add-list");

	// if the target of the click isn't the container nor a descendant of the container
	if (!container.is(e.target) && container.has(e.target).length === 0) {
		container.hide();
	}
});

// Tambah Pertanyaan
$(document).ready(function () {
	// Jawab Singkat
	$("#jawabSingkat").click(function () {
		let cek = $(".content");
		if (cek.length > 0) {
			alert("Complete the current question before creating a new question");
		} else {
			$(".setup").append(`
			<div class="addjawabSingkat">
				<div class="content" id="addjawabSingkat">
					<div class="line"></div>
					<div class="bungkus-content edit">
						<input type="hidden" name="tipe" value="shortText">
						<p>Questions with short answers</p>
						<input type="text" name="body" id="tanya" class="text tanya" placeholder="Question text"
							required>

						<div class="control-edit">
							<span class="wajib"><input type="checkbox" name="useWajib" class="wajibisi"><label class="wajiblabel">Required</label></span>
							<span class="divider">|</span>
							<button class="remove" type="button"><i class="fas fa-trash"></i></button>
						</div>
					</div>
				</div>
				<center><button class="execute tombol-md tmb-utama bunder fadeInBawah">Submit</button></center>
			</div>
			`).hide().fadeIn();

			// Hide Pop Up Menu Add setelah pilih
			$("#modalAddQuestion").fadeOut();
			$("#modalAddQuestion .modal-content").slideUp();

			// Hide Info Content setelah add question
			$(".info-content").hide().fadeOut();
		}
	});

	// Jawab Panjang
	$("#jawabPanjang").click(function () {
		let cek = $(".content");
		if (cek.length > 0) {
			alert("Complete the current question before creating a new question");
		} else {
			$(".setup").append(`
			<div class="addjawabPanjang">
				<div class="content" id="addjawabPanjang">
					<div class="line"></div>
					<div class="bungkus-content edit">
						<input type="hidden" name="tipe" value="longText">
						<p>Questions with long answers</p>
						<input type="text" name="body" id="tanyapanjang" class="text" placeholder="Question text"
							required>
			
						<div class="control-edit">
							<span class="wajib"><input type="checkbox" name="useWajib" class="wajibisi"><label class="wajiblabel">Required</label></span>
							<span class="divider">|</span>
							<button class="remove" type="button"><i class="fas fa-trash"></i></button>
						</div>
					</div>
				</div>
				<center><button class="tombol-md tmb-utama bunder fadeInBawah">Submit</button></center>
			</div>
			`).hide().fadeIn();

			// Hide Pop Up Menu Add setelah pilih
			$("#modalAddQuestion").fadeOut();
			$("#modalAddQuestion .modal-content").slideUp();

			// Hide Info Content setelah add question
			$(".info-content").hide().fadeOut();
		}
	});

	// Pilihan Ganda
	$("#pilihanGanda").click(function () {
		let cek = $(".content");
		if (cek.length > 0) {
			alert("Complete the current question before creating a new question");
		} else {
			$(".setup").append(`
			<div class="addpilihanGanda">
				<div class="content" id="addPilihanGanda">
					<div class="line"></div>
					<div class="bungkus-content edit">
						<input type="hidden" name="tipe" value="radio">
						<p>Questions with multiple choice answers</p>
						<input type="text" name="body" id="pilihanganda" class="text" placeholder="Question text"
							required>

						<div class="edit-group setInput">
							<input type="radio" name="pilih" id="pilih1" disabled>
							<input type="text" name="opsiy" id="opsi" class="text" placeholder="Option text" required>
						</div>

						<div class="edit-group addInput">
							<input type="radio" name="pilih" id="pilih1" disabled>
							<input type="text" class="text addOpsiKolom" placeholder="Add option" readonly>
						</div>

						<div class="control-edit">
							<!-- <span class="wajib"><input type="checkbox" name="useEtc" class="wajibisi"><label class="lainnyalabel">Add More</label></span>  -->
							<span class="wajib"><input type="checkbox" name="useWajib" class="wajibisi"><label class="wajiblabel">Required</label></span>
							<span class="divider">|</span>
							<button class="remove" type="button"><i class="fas fa-trash"></i></button>
						</div>
					</div>
				</div>
				<center><button class="tombol-md tmb-utama bunder fadeInBawah">Submit</button></center>
			</div>
			`).hide().fadeIn();

			// Hide Pop Up Menu Add setelah pilih
			$("#modalAddQuestion").fadeOut();
			$("#modalAddQuestion .modal-content").slideUp();

			// Hide Info Content setelah add question
			$(".info-content").hide().fadeOut();
		}
	});

	// Kisi Pilihan Ganda
	$("#kisiPilihanGanda").click(function () {
		let cek = $(".content");
		if (cek.length > 0) {
			alert("Complete the current question before creating a new question");
		} else {
			$(".setup").append(`
      <div class="addkisipilihanGanda">
				<div class="content" id="addkisipilihanGanda">
					<div class="line"></div>
					<div class="bungkus-content edit">
						<input type="hidden" name="tipe" value="radioGrid">
						<p>Multiple choice questions in rows and columns</p>
						<input type="text" name="body" id="pilihanganda" class="text" placeholder="Question text" required>
						<div class="baris">
							<label for="">Row</label>
							<div class="edit-group setInput">
								<input type="radio" name="pilih" id="pilih1" disabled>
								<input type="text" name="opsix" id="opsi" class="text" placeholder="Option text" required >
							</div>

							<div class="edit-group addInput">
								<input type="radio" name="pilih" id="pilih1" disabled>
								<input type="text" class="text addOpsiBaris" placeholder="Add Row" readonly>
							</div>
						</div>
						<div class="kolom">
							<label for="">Column</label>
							<div class="edit-group setInput">
								<input type="radio" name="pilih" id="pilih1" disabled>
								<input type="text" name="opsiy" id="opsi" class="text" placeholder="Option text" required >
							</div>

							<div class="edit-group addInput">
								<input type="radio" name="pilih" id="pilih1" disabled>
								<input type="text" class="text addOpsiKolom" placeholder="Add Coloumn" readonly>
							</div>
						</div>

						<div class="container-control-edit">
							<div class="control-edit">
								<span class="wajib"><input type="checkbox" name="useWajib" class="wajibisi"><label class="wajiblabel">Required</label></span>
								<span class="divider">|</span>
								<button class="remove" type="button"><i class="fas fa-trash"></i></button>
							</div>
						</div>
					</div>
				</div>
				<center><button class="tombol-md tmb-utama bunder fadeInBawah">Submit</button></center>
			</div>      
			`).hide().fadeIn();

			// Hide Pop Up Menu Add setelah pilih
			$("#modalAddQuestion").fadeOut();
			$("#modalAddQuestion .modal-content").slideUp();

			// Hide Info Content setelah add question
			$(".info-content").hide().fadeOut();
		}
	});

	// Kotak Centang
	$("#kotakCentang").click(function () {
		let cek = $(".content");
		if (cek.length > 0) {
			alert("Complete the current question before creating a new question");
		} else {
			$(".setup").append(`
			<div class="addkotakCentang">
				<div class="content" id="addkotakCentang">
					<div class="line"></div>
					<div class="bungkus-content edit">
						<input type="hidden" name="tipe" value="checkBox">
						<p>Questions with checkbox answers</p>
						<input type="text" name="body" id="pilihanganda" class="text"
							placeholder="Question text" required>

						<div class="edit-group setInput">
							<input type="checkbox" name="pilih" id="pilih1" disabled>
							<input type="text" name="opsiy" id="opsi" class="text" placeholder="Option text" required>
						</div>

						<div class="edit-group addInput">
							<input type="checkbox" name="pilih" id="pilih1" disabled>
							<input type="text" class="text addOpsiCheckKolom" placeholder="Add option" readonly>
						</div>

						<div class="control-edit">
							<!-- <span class="wajib"><input type="checkbox" name="useEtc" class="wajibisi"><label class="lainnyalabel">Add More</label></span>  -->
							<span class="wajib"><input type="checkbox" disabled name="useWajib" class="wajibisi"><label class="wajiblabel"><s>Required</s></label></span>
							<span class="divider">|</span>
							<button class="remove" type="button"><i class="fas fa-trash"></i></button>
						</div>

					</div>
				</div>
				<center><button class="tombol-md tmb-utama bunder fadeInBawah">Submit</button></center>
			</div>
			`).hide().fadeIn();

			// Hide Pop Up Menu Add setelah pilih
			$("#modalAddQuestion").fadeOut();
			$("#modalAddQuestion .modal-content").slideUp();

			// Hide Info Content setelah add question
			$(".info-content").hide().fadeOut();
		}
	});

	// Petak Kotak Centang
	$("#petakKotakCentang").click(function () {
		let cek = $(".content");
		if (cek.length > 0) {
			alert("Complete the current question before creating a new question");
		} else {
			$(".setup").append(`
			<div class="addpetakkotakCentang">
				<div class="content" id="addpetakkotakCentang">
					<div class="line"></div>
					<div class="bungkus-content edit">
						<input type="hidden" name="tipe" value="checkGrid">
						<p>Checkbox questions in rows and columns</p>
						<input type="text" name="body" id="pilihanganda" class="text"
							placeholder="Question text" required>
						<div class="baris">
							<label for="">Row</label>
							<div class="edit-group setInput">
								<input type="checkbox" name="pilih" id="pilih1" disabled>
								<input type="text" name="opsix" id="opsi" class="text" placeholder="Option text" required >
							</div>

							<div class="edit-group addInput">
								<input type="checkbox" name="pilih" id="pilih1" disabled>
								<input type="text" class="text addOpsiCheckBaris" placeholder="Add Row" readonly>
							</div>
						</div>
						<div class="kolom">
							<label for="">Column</label>
							<div class="edit-group setInput">
								<input type="checkbox" name="pilih" id="pilih1" disabled>
								<input type="text" name="opsiy" id="opsi" class="text" placeholder="Option text" required >
							</div>

							<div class="edit-group addInput">
								<input type="checkbox" name="pilih" id="pilih1" disabled>
								<input type="text" class="text addOpsiCheckKolom" placeholder="Add Column" readonly>
							</div>
						</div>

						<div class="container-control-edit">
							<div class="control-edit">
								<span class="wajib"><input type="checkbox" disabled name="useWajib" class="wajibisi"><label class="wajiblabel"><s>Required</s></label></span>
								<span class="divider">|</span>
								<button class="remove" type="button"><i class="fas fa-trash"></i></button>
							</div>
						</div>
					</div>
				</div>
				<center><button class="tombol-md tmb-utama bunder fadeInBawah">Submit</button></center>
			</div>
			`).hide().fadeIn();

			// Hide Pop Up Menu Add setelah pilih
			$("#modalAddQuestion").fadeOut();
			$("#modalAddQuestion .modal-content").slideUp();

			// Hide Info Content setelah add question
			$(".info-content").hide().fadeOut();
		}
	});

	// Daftar Pilihan
	$("#dropDown").click(function () {
		let cek = $(".content");
		if (cek.length > 0) {
			alert("Complete the current question before creating a new question");
		} else {
			$(".setup").append(`
			<div class="adddropDown">
				<div class="content" id="adddropDown">
					<div class="line"></div>
					<div class="bungkus-content edit">
						<input type="hidden" name="tipe" value="dropDown">
						<p>Questions with choice list answers</p>
						<input type="text" name="body" id="pilihdropdown" class="text" placeholder="Question text"
							required>

						<div class="edit-group setInput">
							<span id="nomor" class="nomor">&#9672;</span>
							<input type="text" name="opsiy" id="opsi" class="text" placeholder="Option text" required>
						</div>

						<div class="edit-group addInput">
							<span id="nomor">&#9672;</span>
							<input type="text" class="text addOpsiDaftar" placeholder="Add option" readonly>
						</div>

						<div class="control-edit">
							<span class="wajib"><input type="checkbox" name="useWajib" class="wajibisi"><label class="wajiblabel">Required</label></span>
							<span class="divider">|</span>
							<button class="remove" type="button"><i class="fas fa-trash"></i></button>
						</div>
					</div>
				</div>
				<center><button class="tombol-md tmb-utama bunder fadeInBawah">Submit</button></center>
			</div>
			`).hide().fadeIn();

			// Hide Pop Up Menu Add setelah pilih
			$("#modalAddQuestion").fadeOut();
			$("#modalAddQuestion .modal-content").slideUp();

			// Hide Info Content setelah add question
			$(".info-content").hide().fadeOut();
		}
	});

	// Tanggal
	$("#tanggal").click(function () {
		let cek = $(".content");
		if (cek.length > 0) {
			alert("Complete the current question before creating a new question");
		} else {
			$(".setup").append(`
			<div class="addTanggal">
				<div class="content" id="addTanggal">
					<div class="line"></div>
					<div class="bungkus-content edit">
						<input type="hidden" name="tipe" value="date">
						<p>Question with date answer</p>
						<input type="text" name="body" id="tanya" class="text" placeholder="Question text"
							required>

						<div class="control-edit">
							<span class="wajib"><input type="checkbox" name="useWajib" class="wajibisi"><label class="wajiblabel">Required</label></span>
							<span class="divider">|</span>
							<button class="remove" type="button"><i class="fas fa-trash"></i></button>
						</div>
					</div>
				</div>
				<center><button class="tombol-md tmb-utama bunder fadeInBawah">Submit</button></center>
			</div>
			`).hide().fadeIn();

			// Hide Pop Up Menu Add setelah pilih
			$("#modalAddQuestion").fadeOut();
			$("#modalAddQuestion .modal-content").slideUp();

			// Hide Info Content setelah add question
			$(".info-content").hide().fadeOut();
		}
	});

	// Waktu
	$("#waktu").click(function () {
		let cek = $(".content");
		if (cek.length > 0) {
			alert("Complete the current question before creating a new question");
		} else {
			$(".setup").append(`
			<div class="addWaktu">
				<div class="content" id="addWaktu">
					<div class="line"></div>
					<div class="bungkus-content edit">
						<input type="hidden" name="tipe" value="time">
						<p>Question with time answer</p>
						<input type="text" name="body" id="tanya" class="text" placeholder="Question text"
							required>

						<div class="control-edit">
							<span class="wajib"><input type="checkbox" name="useWajib" class="wajibisi"><label class="wajiblabel">Required</label></span>
							<span class="divider">|</span>
							<button class="remove" type="button"><i class="fas fa-trash"></i></button>
						</div>
					</div>
				</div>
				<center><button class="tombol-md tmb-utama bunder fadeInBawah">Submit</button></center>
			</div>
			`).hide().fadeIn();

			// Hide Pop Up Menu Add setelah pilih
			$("#modalAddQuestion").fadeOut();
			$("#modalAddQuestion .modal-content").slideUp();

			// Hide Info Content setelah add question
			$(".info-content").hide().fadeOut();
		}
	});

	// Tanggal dan Waktu
	$("#tglwaktu").click(function () {
		let cek = $(".content");
		if (cek.length > 0) {
			alert("Complete the current question before creating a new question");
		} else {
			$(".setup").append(`
			<div class="addTglWaktu">
				<div class="content" id="addTglWaktu">
					<div class="line"></div>
					<div class="bungkus-content edit">
						<input type="hidden" name="tipe" value="dateTime">
						<p>Question with date and time answer</p>
						<input type="text" name="body" id="tanya" class="text"
							placeholder="Question text" required>

						<div class="control-edit">
							<span class="wajib"><input type="checkbox" name="useWajib" class="wajibisi"><label class="wajiblabel">Required</label></span>
							<span class="divider">|</span>
							<button class="remove" type="button"><i class="fas fa-trash"></i></button>
						</div>
					</div>
				</div>
				<center><button class="tombol-md tmb-utama bunder fadeInBawah">Submit</button></center>
			</div>
      `).hide().fadeIn();

			// Hide Pop Up Menu Add setelah pilih
			$("#modalAddQuestion").fadeOut();
			$("#modalAddQuestion .modal-content").slideUp();

			// Hide Info Content setelah add question
			$(".info-content").hide().fadeOut();
		}
	});

	// Skala Linear
	$("#skalaLinear").click(function () {
		let cek = $(".content");
		if (cek.length > 0) {
			alert("Complete the current question before creating a new question");
		} else {
			$(".setup").append(`
			<div class="addskalaLinier">
				<div class="content" id="addskalaLinier">
					<div class="line"></div>
					<div class="bungkus-content edit">
						<input type="hidden" name="tipe" value="linearScale">
						<p>Questions with linear scale answers</p>
						<input type="text" name="body" class="text" placeholder="Question text" required>
						<select name="sl" class="dropdown ddA">
							<option value="0">0</option>
							<option value="1">1</option>
						</select>

						<span>to</span>

						<select name="sl" class="dropdown ddB">
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
						</select>
						<div class="label-skala">
							<span id="skala-a" class="skala-a">0</span>
							<input type="text" name="label" class="" placeholder="Label (optional)">
						</div>
						<div class="label-skala">
							<span id="skala-b" class="skala-b">10</span>
							<input type="text" name="label" class="" placeholder="Label (optional)">
						</div>

						<div class="control-edit">
							<span class="wajib"><input type="checkbox" name="useWajib" class="wajibisi"><label class="wajiblabel">Required</label></span>
							<span class="divider">|</span>
							<button class="remove" type="button"><i class="fas fa-trash"></i></button>
						</div>
					</div>
				</div>
				<center><button class="tombol-md tmb-utama bunder fadeInBawah">Submit</button></center>
			</div>
			`).hide().fadeIn();

			// Hide Pop Up Menu Add setelah pilih
			$("#modalAddQuestion").fadeOut();
			$("#modalAddQuestion .modal-content").slideUp();

			// Hide Info Content setelah add question
			$(".info-content").hide().fadeOut();
		}
	});
});

// Hapus Pertanyaan
$(document).ready(function () {
	$("body").on("click", ".remove", function () {
		$(this).parents(".addjawabSingkat").fadeOut(function () {
			$(this).remove();
		});
		$(".info-content").show().fadeIn();
	});

	$("body").on("click", ".remove", function () {
		$(this).parents(".addjawabPanjang").fadeOut(function () {
			$(this).remove();
		});
		$(".info-content").show().fadeIn();
	});

	$("body").on("click", ".remove", function () {
		$(this).parents(".addpilihanGanda").fadeOut(function () {
			$(this).remove();
		});
		$(".info-content").show().fadeIn();
	});

	$("body").on("click", ".remove", function () {
		$(this).parents(".addkisipilihanGanda").fadeOut(function () {
			$(this).remove();
		});
		$(".info-content").show().fadeIn();
	});

	$("body").on("click", ".remove", function () {
		$(this).parents(".addkotakCentang").fadeOut(function () {
			$(this).remove();
		});
		$(".info-content").show().fadeIn();
	});

	$("body").on("click", ".remove", function () {
		$(this).parents(".addpetakkotakCentang").fadeOut(function () {
			$(this).remove();
		});
		$(".info-content").show().fadeIn();
	});

	$("body").on("click", ".remove", function () {
		$(this).parents(".adddropDown").fadeOut(function () {
			$(this).remove();
		});
		$(".info-content").show().fadeIn();
	});

	$("body").on("click", ".remove", function () {
		$(this).parents(".addTanggal").fadeOut(function () {
			$(this).remove();
		});
		$(".info-content").show().fadeIn();
	});

	$("body").on("click", ".remove", function () {
		$(this).parents(".addWaktu").fadeOut(function () {
			$(this).remove();
		});
		$(".info-content").show().fadeIn();
	});

	$("body").on("click", ".remove", function () {
		$(this).parents(".addTglWaktu").fadeOut(function () {
			$(this).remove();
		});
		$(".info-content").show().fadeIn();
	});

	$("body").on("click", ".remove", function () {
		$(this).parents(".addskalaLinier").fadeOut(function () {
			$(this).remove();
		});
		$(".info-content").show().fadeIn();
	});
});

// Copy Pertanyaan
$(document).ready(function () {
	$("body").on("click", ".copy", function () {
		$(this).parents(".addjawabSingkat").clone().appendTo(".setup").hide().fadeIn();
	});

	$("body").on("click", ".copy", function () {
		$(this).parents(".addjawabPanjang").clone().appendTo(".setup").hide().fadeIn();
	});

	$("body").on("click", ".copy", function () {
		$(this).parents(".addpilihanGanda").clone().appendTo(".setup").hide().fadeIn();
	});

	$("body").on("click", ".copy", function () {
		$(this).parents(".addkisipilihanGanda").clone().appendTo(".setup").hide().fadeIn();
	});

	$("body").on("click", ".copy", function () {
		$(this).parents(".addkotakCentang").clone().appendTo(".setup").hide().fadeIn();
	});

	$("body").on("click", ".copy", function () {
		$(this).parents(".addpetakkotakCentang").clone().appendTo(".setup").hide().fadeIn();
	});

	$("body").on("click", ".copy", function () {
		$(this).parents(".adddropDown").clone().appendTo(".setup").hide().fadeIn();
	});

	$("body").on("click", ".copy", function () {
		$(this).parents(".addTanggal").clone().appendTo(".setup").hide().fadeIn();
	});

	$("body").on("click", ".copy", function () {
		$(this).parents(".addWaktu").clone().appendTo(".setup").hide().fadeIn();
	});

	$("body").on("click", ".copy", function () {
		$(this).parents(".addTglWaktu").clone().appendTo(".setup").hide().fadeIn();
	});

	$("body").on("click", ".copy", function () {
		$(this).parents(".addskalaLinier").clone().appendTo(".setup").hide().fadeIn();

		// Belum sempurna saat copy ke dua
		$(".ddA option[value='" + $(".ddA").val() + "'] , .ddB option[value='" + $(".ddB").val() + "']").attr("selected", "selected");
	});
});

// Delete Text Input
$(document).ready(function () {
	$("body").on("click", ".del", function () {
		$(this).parents(".setInput").fadeOut(function () {
			$(this).remove();
		});
	});
});

// Insert Text Input
$(document).ready(function () {

	// Input with radio Baris
	$("body").on("click", ".addOpsiBaris", function () {
		$(this).parents(".addInput").before(`
            <div class="edit-group setInput">
                <input type="radio" name="pilih" id="pilih1" disabled>
                <input type="text" name="opsix" id="opsi" class="text" placeholder="Option text" required>
                <a class="del btn-del"><i class="fas fa-times"></i></a>
            </div>
        `);
	});

	// Input with radio Kolom
	$("body").on("click", ".addOpsiKolom", function () {
		$(this).parents(".addInput").before(`
            <div class="edit-group setInput">
                <input type="radio" name="pilih" id="pilih1" disabled>
                <input type="text" name="opsiy" id="opsi" class="text" placeholder="Option text" required>
                <a class="del btn-del"><i class="fas fa-times"></i></a>
            </div>
        `);
	});

	// Input with checkbox Baris
	$("body").on("click", ".addOpsiCheckBaris", function () {
		$(this).parents(".addInput").before(`
            <div class="edit-group setInput">
                <input type="checkbox" name="pilih" id="pilih1" disabled>
                <input type="text" name="opsix" id="opsi" class="text" placeholder="Option text" required>
                <a class="del btn-del"><i class="fas fa-times"></i></a>
            </div>
        `);
	});

	// Input with checkbox Kolom
	$("body").on("click", ".addOpsiCheckKolom", function () {
		$(this).parents(".addInput").before(`
            <div class="edit-group setInput">
                <input type="checkbox" name="pilih" id="pilih1" disabled>
                <input type="text" name="opsiy" id="opsi" class="text" placeholder="Option text" required>
                <a class="del btn-del"><i class="fas fa-times"></i></a>
            </div>
        `);
	});

	// Input with number
	$("body").on("click", ".addOpsiDaftar", function () {
		$(this).parents(".addInput").before(`
            <div class="edit-group setInput">
                <span id="nomor" class="nomor">&#9672;</span>
                <input type="text" name="opsiy" id="opsi" class="text" placeholder="Option text" required>
                <a class="del btn-del"><i class="fas fa-times"></i></a>
            </div>
        `);
	});
});

// Onchange Dropdown Skala Linear
$(document).ready(function () {
	$("body").on("change", ".ddA", function () {
		let va = $(this).val();
		console.log(va);
		$(this).parents(".bungkus-content").find(".skala-a").text(va);
	});

	$("body").on("change", ".ddB", function () {
		let va = $(this).val();
		console.log(va);
		$(this).parents(".bungkus-content").find(".skala-b").text(va);
	});
});

// Cek space
$(document).ready(function () {
	$("body").on("click", ".execute", function () {
		let cek = $("input:text").val();
		let space = cek.slice(0, 1);
		if (space === " ") {
			alert(`No blank space allowed!`);
		}
	});
});