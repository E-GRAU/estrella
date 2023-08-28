// ==UserScript==
// @name         SunatRUC Data UserScript
// @namespace    http://tampermonkey.net/
// @version      2.0.1
// @description  try to take over the world!
// @author       You
// @match        https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias
// @icon         https://www.google.com/s2/favicons?domain=gob.pe
// @require      https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js
// @require      https://www.gstatic.com/firebasejs/8.9.1/firebase-firestore.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js
// @require      https://nesmdev.github.io/ndev/dist/ndev.1.0.9.js
// @resource     TOASTR https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    "use strict";

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

    GM_addStyle(GM_getResourceText("TOASTR"));
    toastr.options.positionClass = "toast-bottom-left";
    toastr.options.preventDuplicates = true;

    // Your code here...

    let returnTimeout;
    let returnInterval;

    const $Ruc = $("div.row div.row:contains('Número de RUC:')")
        .children()
        .eq(1);
    const text = $Ruc.text().trim();
    console.log("texto", text);
    const ruc = text.split("-")[0].trim();
    console.log("ruc", ruc);
    const nombre = text.split("-").slice(1).join("-").trim();
    console.log("nombre", nombre);
    const direccion = $("div.row div.row:contains('Domicilio Fiscal:')")
        .children()
        .eq(1)
        .text()
        .trim()
        .split(" ")
        .map((ch) => ch.trim())
        .filter((ch) => ch)
        .join(" ");

    console.log("direccion", direccion);

    $Ruc.html(`
     <div>
        <div class="row">
           <div class="col-md-3">
              <input id="nruc" value="${ruc}" class="form-control" disabled/>
           </div>
           <div class="col-md-9">
              <button class="btn btn-primary btn-sm"  id="copy-ruc">Copiar RUC</button>
           </div>
        </div>

        <hr/>
        <input id="nnombre" value="${nombre}" class="form-control"/>
        <br/>
        <button class="btn btn-default btn-sm" id="reset-nombre">Restaurar</button>
        <button class="btn btn-default btn-sm btn-nombre" id="clear-nombre" >Reducir</button>
        <button class="btn btn-primary btn-sm" id="copy-nombre">Copiar nombre</button>
        <hr/>
        <textarea id="ndireccion" class="form-control" rows="3">${direccion}</textarea>
        <br/>
        <button class="btn btn-default btn-sm btn-direccion" id="clear-direccion" >Reducir</button>
        <button class="btn btn-default btn-sm btn-direccion" id="reset-direccion" >Restaurar</button>
        <button class="btn btn-primary btn-sm btn-direccion" id="copy-direccion" >Copiar direccion</button>

        <span id="txtdireccion" style="float:right"></span>
     </div>
    `);

    async function getCat() {
        // $("#ncat").html(`<img src="https://i.imgur.com/TkU1Hqo.gif" alt="">`);
        // await new Promise((done) => setTimeout(done(), 3000));
        return $.get("https://api.thecatapi.com/v1/images/search").then((res) => {
            const cat = res[0].url;
            $("#ncat")
                .html(
                    `<img
                        id="imgcat"
                        src="${cat}"
                        alt="Haz click sobre mí"
                        title="Haz click sobre mí"
                        onerror="this.src='https://i.imgur.com/TkU1Hqo.gif'">`
                )
                .on("click", getCat)
                .hide()
                .fadeIn(3000);
            $("body").css("background-image", `url('${cat}')`);
            return cat;
        });
    }

    $("#copy-ruc").on("click", copyRuc);

    $("#copy-nombre").on("click", copyNombre);
    $("#reset-nombre").on("click", resetNombre);
     $("#clear-nombre").on("click", clearNombre);

    $("#ndireccion").on("keypress keyup",validateDireccion);
    $("#clear-direccion").on("click", clearDireccion);
    $("#reset-direccion").on("click", resetDireccion);
    $("#copy-direccion").on("click", copyDireccion);
    $(".btn-direccion").on("click",validateDireccion);

    function clearDireccion() {
        const direccion = $("#ndireccion")
            .val()
            .replace(/ *\([^)]*\) */g, " ")
            .replace(/PROV. CONST. DEL CALLAO/g, "CALLAO")
            .replace(/SANTIAGO DE SURCO/g, "SURCO")
            .replace(/SAN JUAN DE LURIGANCHO/g, "LURIGANCHO")
            .replace(/SAN JUAN DE MIRAFLORES/g, "MIRAFLORES")
            .replaceAll("NRO.","N°")
            .replaceAll("---","-")
            .replaceAll("--","-")
            //.replaceAll("SOCIEDAD ANONIMA CERRADA","S. A. C.")
            //.replaceAll("SOCIEDAD ANONIMA","S. A.")
        $("#ndireccion").val(direccion);
        // toastr.options.positionClass="toast-bottom-right";
    }

    function clearNombre(){
      const nombre = $("#nnombre")
           .val()
            .replaceAll("SOCIEDAD ANONIMA CERRADA","S.A.C.")
            .replaceAll("SOCIEDAD ANONIMA","S.A.");
        $("#nnombre").val(nombre);
    }

    function validateDireccion(){
      const direccion = $("#ndireccion").val().trim();
        const max =80;
        const size = direccion.length;
      const valid = direccion.length<=max;
      $("#txtdireccion")
      .html(valid?`<span>La dirección tiene ${size} caracteres.</span>`:`<span>La dirección es muy larga (${size} caracteres).</span><br/><span>Reducir a ${max} o menos.</span>`)
          .toggleClass("nvalid",valid)
          .toggleClass("nerror",!valid);

      $("#ndireccion")
          .toggleClass("nvalid",valid)
        .toggleClass("nerror",!valid);
    }

    function copyRuc() {
        const ruc = $("#nruc").val().trim();
        new nstring(ruc).copy2();
        toastr.success("Copiado:\n" + ruc);
        saveData("copy-ruc");
    }

    function copyNombre() {
        const nombre = $("#nnombre").val().trim();
        new nstring(nombre).copy2();
        toastr.success("Copiado:\n" + nombre);
        saveData("copy-nombre");
    }

    function resetNombre() {
        $("#nnombre").val(nombre);
    }

    function copyDireccion() {
        const direccion = $("#ndireccion").val().trim();
        new nstring(direccion).copy2();
        toastr.success("Copiado:\n" + direccion);
        saveData("copy-direccion");
    }

    function resetDireccion() {
        $("#ndireccion").val(direccion);
    }



    async function startReturnCounter() {
        if (returnTimeout) clearTimeout(returnTimeout);
        if (returnInterval) clearInterval(returnInterval);

        let sec = 201;
        returnTimeout = setTimeout(() => {
            $("button:contains(Volver)")[0].click();
        }, sec * 1000);

        returnInterval = setInterval(() => {
            sec--;
            // if (sec <= 30) {
            $("#nreturn").text("Regresará al inicio en " + sec + " segundos");
            // }
        }, 1000);
    }

    function saveData(action){
       const data={
         user: "Estrella GRAU",
         action:action,
         date:new Date(),
         ruc: $("#nruc").val(),
         nombre: $("#nnombre").val(),
         direccion: $("#ndireccion").val(),
         cat:$("#imgcat").prop("src"),
       }


       db.collection("actions").add(data);

    }

    $(document).ready(async function() {
        $("body").append(`
            <style>
               img {
                max-width: 100%;
                max-height: 100%;
                border-radius:15px;
               }

               span.nvalid {
                 color: green;
                 background-color: #FFFF8A;
                 font-weight:bold;

               }

               textarea.nvalid {
                 color: green;
                 background-color: #FFFF8A;
                 font-weight:bold;
                 border: 1px solid green;
               }

               span.nerror {
                 color:red;
                 font-weight: bold;

               }

               textarea.nerror {
                  border: 1px solid red;
               }

            </style>`);

        $(".panel-heading").append(
            `<span id="nreturn" style="float:right"></span>`
        );
        $(".col-sm-5:contains(Número de RUC)").append("<div id='ncat'></div>");
        await getCat();
        startReturnCounter();
        validateDireccion();
        saveData("search");

        //$.get("https://ip-api.com/json/").then(res=>console.log("res",res));
    });

    $(document).on("click keypress", startReturnCounter);
})();
