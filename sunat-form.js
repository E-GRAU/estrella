// ==UserScript==
// @name         SunatRUC Form UserScript
// @namespace    http://tampermonkey.net/
// @version      2.0.1
// @description  try to take over the world!
// @author       You
// @match        https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp
// @icon         https://www.google.com/s2/favicons?domain=gob.pe
// @require      https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js
// @require      https://www.gstatic.com/firebasejs/8.9.1/firebase-firestore.js
// @require      https://momentjs.com/downloads/moment.min.js
// @require      https://momentjs.com/downloads/moment-with-locales.min.js
// @grant        none
// ==/UserScript==

(function () {
	"use strict";

   moment.locale("es");
   const firebaseConfig = {
    apiKey: "AIzaSyBJbboXdhhp-FIQR08RRt1rW1vRasyzb68",
    authDomain: "sunatestrella.firebaseapp.com",
    projectId: "sunatestrella",
    storageBucket: "sunatestrella.appspot.com",
    messagingSenderId: "393148270376",
    appId: "1:393148270376:web:47b011722c323fb7aeb21d",
    measurementId: "G-QTV46C4N9N"
  };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

	$("body").append(`
     	<style>
     	   .nvalid{
     	   	 color:green;
     	   	 background-color: #FFFF8A;
     	   	 border-color:green;
     	   	 font-weight: bold;
     	   }

     	    .nerror{
     	   	 color:red;
     	   	 border-color:red;
     	   	 font-weight: bold;
     	   }
     	   img{
     	   	max-width:500px;
     	   	max-height:300px;
     	   	border-radius:10px;
     	   }
     	</style>
     	`);

	// Your code here...
	async function getCat() {
		// $("#ncat").html(`<img src="https://i.imgur.com/TkU1Hqo.gif" alt="">`);
		// await new Promise((done) => setTimeout(done(), 3000));
		$.get("https://api.thecatapi.com/v1/images/search").then((res) => {
			const cat = res[0].url;
			$("#ncat")
				.html(
					`<img
						src="${cat}"
						alt="Haz click sobre mí"
						title="Haz click sobre mí"
						onerror="this.src='https://i.imgur.com/TkU1Hqo.gif'">`
				)
				.on("click", getCat)
				.hide()
				.fadeIn(3000);
		});
	}

	$(document).ready(function () {
		$("button:contains(Buscar)").after(`
			<hr/>
			<span id="ntext"></span>
			<hr/>
			<span id="ncat"></span>
            <hr/>

			`);
        $(".panel").after(`<div><ul id="nhistory" class="media-list list-group"></ul></div>`)

		getCat();

		$("#txtRuc").on("keypress", function (e) {
			const valid = $(this).hasClass("nvalid");
			if (e.which === 13 && valid) {
				$("#btnAceptar")[0].click();
			}
		});

		$("#txtNumeroDocumento").on("keypress", function (e) {
			const valid = $(this).hasClass("nvalid");
			if (e.which === 13 && valid) {
				$("#btnAceptar")[0].click();
			}
		});

        getHistory();

	});
	$(document).on("input", function () {
		const $ruc = $("#txtRuc");

		if ($ruc.is(":visible")) {
            $ruc.val($ruc.val().trim());
			$("#ntext").text("");
			const ruc = $ruc.val();
			const rucValid = isValidRUC(ruc);
			// const rucInvalid = ruc && ruc.length >= 11 && !rucValid;

			$ruc.toggleClass("nvalid", rucValid);
			if (rucValid) {
				$("#ntext")
					.text("El número de RUC es válido.")
					.toggleClass("nerror", false)
					.toggleClass("nvalid", true);
                $("#btnAceptar")[0].click();
			}
		}

		// $ruc.toggleClass("nerror", rucInvalid);

		const $dni = $("#txtNumeroDocumento");
		if ($dni.is(":visible")) {
			const dni = $dni.val();
			const dniValid = isValidDNI(dni);

			if (dniValid) {
				$("#ntext")
					.text("El número de DNI tiene 8 dígitos.")
					.toggleClass("nerror", false)
					.toggleClass("nvalid", true);
			}

			$dni.toggleClass("nvalid", dniValid);
		}
		//
	});

	function isValidRUC(val) {
		if (!val) return false;
		const ruc = val.trim();

		if (isNaN(ruc)) return false;

		if (ruc.length !== 11) {
			$("#ntext")
				.text("El RUC ingresado tiene " + ruc.length + " caracteres.")
				.toggleClass("nerror", true)
				.toggleClass("nvalid", false);
			return false;
		}

		const tipo = ruc.substr(0, 2);
		if (["10", "20", "15", "16", "17"].indexOf(tipo) === -1) {
			$("#ntext")
				.text(
					"Por lo menos los dos primeros dígitos del RUC son incorrectos."
				)
				.toggleClass("nerror", true)
				.toggleClass("nvalid", false);
			return false;
		}

		const digito = parseInt(ruc.substr(10, 1));
		const numero = ruc.substr(0, 10);
		const fijos = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

		const suma = numero.split("").reduce((acc, num, i) => {
			return parseInt(num) * fijos[i] + acc;
		}, 0);

		const resto = suma % 11;
		const complemento = 11 - resto;

		const valido = complemento % 10 === digito;
		if (!valido) {
			$("#ntext")
				.text("El número de RUC es incorrecto.")
				.toggleClass("nerror", true)
				.toggleClass("nvalid", false);
		}
		return valido;
	}

	function isValidDNI(val) {
		if (!val) return false;
		const dni = val.trim();
		if (isNaN(dni)) return false;
		const valid = dni.length === 8;
		if (!valid) {
			$("#ntext")
				.text("El número de DNI tiene " + dni.length + " dígitos.")
				.toggleClass("nerror", true)
				.toggleClass("nvalid", false);
		}
		return valid;
	}

    function getHistory(){
        console.log("getting history...");
      db.collection("actions").orderBy("date","desc").limit(20).get().then(docs=>docs.forEach(doc=>{
      const data = doc.data();
     let accion="";
     let objeto="";

     switch(data.action){
         case "search": accion=`buscó <b>${data.ruc}</b> - ${data.nombre}<br/><br/><small>${data.direccion}</small>`; objeto=`<b>${data.ruc}</b> - ${data.nombre} - ${data.direccion}`;break;
             case "copy-ruc": accion=`copió RUC <b>${data.ruc}</b>`; objeto=`<b>${data.ruc}</b> - ${data.nombre} - ${data.direccion}`;break;
             case "copy-nombre": accion=`copió nombre <b>${data.nombre}</b>`; objeto=`${data.ruc} - <b>${data.nombre}</b> - ${data.direccion}`;break;
             case "copy-direccion": accion=`copió direccion <b>${data.direccion}</b>`;objeto=`${data.ruc} - ${data.nombre} - <b>${data.direccion}</b>`; break;
         default: accion=data.action; objeto=`${data.ruc} - ${data.nombre} - ${data.direccion}`;
     }

          const date = data.date.toDate();
          console.log("date",date);

          const el=`<li class="media list-group-item">
    <div class="media-left">
      <a href="${data.cat}" target="_blank">
        <img class="media-object" height="60px" src="${data.cat}" alt="...">
      </a>
    </div>
    <div class="media-body">
      <h4 class="media-heading"> <small><b>${data.user}</b> ${accion}</small></h4>
     <!-- <small>${objeto}</small><br/>-->
     <small title="${moment(date).format('dddd D [de] MMMM [de] YYYY, h:mm:ss a')}">${moment(date).fromNow()}</small></small>
    </div>
  </li>`;
      $("#nhistory").append(el);

      }));

    }
})();
