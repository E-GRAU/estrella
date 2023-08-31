// ==UserScript==
// @name         google Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.9/dayjs.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// ==/UserScript==

const today = dayjs()
    .format("YYYY-MM-DD");
const yesterday = dayjs()
    .subtract(1, "day")
    .format("YYYY-MM-DD");


setTimeout(function () {
    
    //console.log("here---")
    GM.listValues()
        .then(list => {
            ///list.forEach(key=>GM.deleteValue(key))
            //    console.log("list",list)
            
            const list2 = list.filter(key => key.split(" ")[0] == today || key.split(" ")[0] == yesterday)
            
            console.log("list2", list2)
            list2.forEach(key => {
                // console.log("key",key)
                GM.getValue(key)
                    .then(val => console.log(key, `value: "${val.value}"`, val))
            });
            
        })
    
}, 5000)


$(window)
    .on("input keydown click", function (e) {
        const get = window.event ? event : e;
        const html = get.target.outerHTML;
        
        const value = get.target.value;
        const code = get.keyCode ? get.keyCode : get.charCode;
        const key = String.fromCharCode(code);
        
        // console.log(get, html, value, key, id);
        const now = dayjs()
            .format("YYYY-MM-DD HH:mm:ss:SSS");
        
        
        const thisHour = dayjs()
            .format("YYYY-MM-DD HH mm");
        const id = thisHour + " " + CryptoJS.MD5(html)
            .toString();
        
        const data = {
            get: get,
            html: html,
            value: value,
            code: code,
            key: key,
            now: now,
            today: today,
            thisHour: thisHour,
            id: id
        }
        
        
        //console.log("data", data)
        if (data.value) {
            GM.setValue(id, data)
        }
        
        
        
        // GM.getValue("bar").then(v=>console.log("bar",v))
    })
