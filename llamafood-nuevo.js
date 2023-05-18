// ==UserScript==
// @name         Llamafood Nuevo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://llamafood-operations-v2.web.app/branchop/250/llamafood-delivery
// @icon         https://www.google.com/s2/favicons?domain=web.app
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @require      https://nesmdev.github.io/ndev/dist/ndev.1.0.9.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    let Total=0;

    function formatOrders(){
        //console.clear();
        console.log("Formatting orders...");

        const $orders = Array.from($("app-order-lld:visible"));
        $orders.forEach(order=>{
            const $img=$(order)
                .find("img")
                .removeAttr("style")
               // .addClass("driver-img");
         .css({cssText:"max-height: 150px !important"});
            if(!$img.hasClass("nwrapped")){
                 $img.wrap(`<a href="${$img.prop("src")}" target="_blank"></a>`).addClass("nwrapped");
            }

            const id = $(order).find(".badge.bg-dark").text().trim();
            $(order).attr("id","order-"+id);
            const texto=$(order).text().replace("boletafacturaordenCancelar","");
            const comprobante= new nstring(texto.toLowerCase()).includesSome(["boleta","factura","ruc","dni","documento","comprobante"]);
            //const colorComp=
            const $div= $(order)
                .find(".list-group-item-transparent.d-flex")
                .css({cssText:`background-color: ${comprobante?"#292c4c":"#b86614"} !important`})
                .eq(0);
            /*
            if(!$div.hasClass("has-check")){
                const total = $(order).find(".flex-fill:contains(Total)").next().text().replace("S/","").trim();
                 $div.after(`<input class="total-order"  type="checkbox" id="select-${id}" value="${total}" />`).addClass("has-check");
                $("#select"+id).on("click",function(){
                $(order).toggleClass("nselected",this.checked);

                })
            }*/
           const llego_a_tienda = $(order).find("button:contains('Driver llegó (')").length;
            const en_camino = $(order).find("button:contains(Driver está en camino)").length;
            const llego_al_cliente =$(order).find("button:contains(Driver llegó al cliente)").length;
             const finalizado =$(order).find("button:contains(Driver finalizó)").length;
            if(finalizado){
               $(order).find("button:contains(Ocultar)")[0].click();
                console.log("Se finalizó orden "+id);
            }else if(llego_al_cliente){
                $(order).parent().parent().fadeOut(3000);
                console.log("Driver llegó al cliente. Orden "+id);
            } else if(en_camino){
                $(order).parent().parent().fadeTo("slow",0.5);

                console.log("Driver está en camino. Orden "+id);
            }else if(llego_a_tienda){
                //$(order).parent().css("border","7px solid #00FFFF");
                $(order).parent().css("border","7px solid green");
            }




       // console.log($(order).text())
        })
    }

    function addStyles(){
     const styles=`<style>
       .driver-img{
          max-height: 110px !important;
       }

       .nblack{
         background-color: black !important;
       }
       .nselected {
         border: 3px solid green;
       }

</style>

     `;

        $("body").append(styles);

    }

   $(document).ready(()=>{



    setTimeout(()=>{
       addStyles();
    formatOrders();
    setInterval(formatOrders,5*1000);
    },9*1000)
   })
})();
