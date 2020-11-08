(()=>{"use strict";const e=e=>new Promise(((t,n)=>{(async(e="competitions")=>{const t=await fetch("https://api.football-data.org/v2/"+e,{headers:{"X-Auth-Token":"61ce6832498046a1959ee87aad74d8d2"}});return await t.json()})("teams/"+e).then((e=>{var n;document.querySelector("#team-info").innerHTML=`\n      <div class="col s12 m4"><img src="${(n=e).crestUrl}" alt="${n.name}" style="margin: 0 auto; display: block"></div>\n      <div class="col s12 m8" style="margin-bottom: 10px">\n        <table class="highlight">\n          <thead>\n            <tr>\n              <th colspan="3" class="center-align info">\n                <h5>Informasi Umum</h5>\n              </th>\n            </tr>\n          </thead>\n    \n          <tbody>\n            <tr>\n              <td><b>Nama Tim</b></td>\n              <td> : </td>\n              <td>${n.name}</td>\n            </tr>\n            <tr>\n              <td><b>Asal Negara</b></td>\n              <td> : </td>\n              <td>${n.area.name}</td>\n            </tr>\n            <tr>\n              <td><b>Tahun didirikan</b></td>\n              <td> : </td>\n              <td>${n.founded}</td>\n            </tr>\n            <tr>\n              <td><b>Alamat Tim</b></td>\n              <td> : </td>\n              <td>${n.address}</td>\n            </tr>\n            <tr>\n              <td><b>No Telp & Email</b></td>\n              <td> : </td>\n              <td>${n.phone} - ${n.email} </td>\n            </tr>\n            <tr>\n              <td><b>Website</b></td>\n              <td> : </td>\n              <td>${n.website}</td>\n            </tr>\n            <tr>\n              <td><b>Stadion</b></td>\n              <td> : </td>\n              <td>${n.venue}</td>\n            </tr>\n            <tr>\n              <td><b>Warna Tim</b></td>\n              <td> : </td>\n              <td>${n.clubColors}</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    `,t(e)})).catch((e=>console.error(e)))}));let t,n;const r=new WeakMap,a=new WeakMap,o=new WeakMap,s=new WeakMap,i=new WeakMap;let d={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return a.get(e);if("objectStoreNames"===t)return e.objectStoreNames||o.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return l(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function c(e){return"function"==typeof e?(s=e)!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(n||(n=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(s)?function(...e){return s.apply(u(this),e),l(r.get(this))}:function(...e){return l(s.apply(u(this),e))}:function(e,...t){const n=s.call(u(this),e,...t);return o.set(n,e.sort?e.sort():[e]),l(n)}:(e instanceof IDBTransaction&&function(e){if(a.has(e))return;const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("complete",a),e.removeEventListener("error",o),e.removeEventListener("abort",o)},a=()=>{t(),r()},o=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",a),e.addEventListener("error",o),e.addEventListener("abort",o)}));a.set(e,t)}(e),i=e,(t||(t=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((e=>i instanceof e))?new Proxy(e,d):e);var s,i}function l(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("success",a),e.removeEventListener("error",o)},a=()=>{t(l(e.result)),r()},o=()=>{n(e.error),r()};e.addEventListener("success",a),e.addEventListener("error",o)}));return t.then((t=>{t instanceof IDBCursor&&r.set(t,e)})).catch((()=>{})),i.set(t,e),t}(e);if(s.has(e))return s.get(e);const t=c(e);return t!==e&&(s.set(e,t),i.set(t,e)),t}const u=e=>i.get(e),m=["get","getKey","getAll","getAllKeys","count"],b=["put","add","delete","clear"],p=new Map;function h(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(p.get(t))return p.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,a=b.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!a&&!m.includes(n))return;const o=async function(e,...t){const o=this.transaction(e,a?"readwrite":"readonly");let s=o.store;r&&(s=s.index(t.shift()));const i=await s[n](...t);return a&&await o.done,i};return p.set(t,o),o}var v;v=d,d={...v,get:(e,t,n)=>h(e,t)||v.get(e,t,n),has:(e,t)=>!!h(e,t)||v.has(e,t)};const f=new URLSearchParams(window.location.search).get("id"),g=document.querySelector("#save");e(f),g.onclick=()=>{e(f).then((e=>{return t=e,void(async()=>await function(e,t,{blocked:n,upgrade:r,blocking:a,terminated:o}={}){const s=indexedDB.open(e,t),i=l(s);return r&&s.addEventListener("upgradeneeded",(e=>{r(l(s.result),e.oldVersion,e.newVersion,l(s.transaction))})),n&&s.addEventListener("blocked",(()=>n())),i.then((e=>{o&&e.addEventListener("close",(()=>o())),a&&e.addEventListener("versionchange",(()=>a()))})).catch((()=>{})),i}("info-bola",1,{upgrade(e){e.objectStoreNames.contains("data_team")||e.createObjectStore("data_team").createIndex("team_name","team_name",{unique:!1})}}))().then((e=>{const n=e.transaction("data_team","readwrite");return n.objectStore("data_team").add(t,"team-"+t.id),console.log("berhasil disimpan"),n.complete})).catch((()=>console.error("Terjadi kesalahan saat menyimpan data")));var t})).catch((e=>console.error(e)))},"serviceWorker"in navigator?window.addEventListener("load",(()=>{navigator.serviceWorker.register("service-worker.js",{scope:"/"}).then((()=>console.info("service worker berhasil diinstal"))).catch((e=>console.error(e)))})):console.log("Browser tidak mendukung service worker.")})();