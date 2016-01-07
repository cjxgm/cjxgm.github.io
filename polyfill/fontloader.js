(function(){'use strict';var f=[];function g(a){f.push(a);1===f.length&&l()}function m(){for(;f.length;)f[0](),f.shift()}if(window.MutationObserver){var n=document.createElement("div");(new MutationObserver(m)).observe(n,{attributes:!0});var l=function(){n.setAttribute("x",0)}}else l=function(){setTimeout(m)};function p(a){this.a=q;this.b=void 0;this.f=[];var b=this;try{a(function(a){r(b,a)},function(a){t(b,a)})}catch(c){t(b,c)}}var q=2;function u(a){return new p(function(b,c){c(a)})}function v(a){return new p(function(b){b(a)})}
function r(a,b){if(a.a===q){if(b===a)throw new TypeError("Promise settled with itself.");var c=!1;try{var d=b&&b.then;if(null!==b&&"object"===typeof b&&"function"===typeof d){d.call(b,function(b){c||r(a,b);c=!0},function(b){c||t(a,b);c=!0});return}}catch(e){c||t(a,e);return}a.a=0;a.b=b;w(a)}}function t(a,b){if(a.a===q){if(b===a)throw new TypeError("Promise settled with itself.");a.a=1;a.b=b;w(a)}}
function w(a){g(function(){if(a.a!==q)for(;a.f.length;){var b=a.f.shift(),c=b[0],d=b[1],e=b[2],b=b[3];try{0===a.a?"function"===typeof c?e(c.call(void 0,a.b)):e(a.b):1===a.a&&("function"===typeof d?e(d.call(void 0,a.b)):b(a.b))}catch(h){b(h)}}})}p.prototype.g=function(a){return this.c(void 0,a)};p.prototype.c=function(a,b){var c=this;return new p(function(d,e){c.f.push([a,b,d,e]);w(c)})};
function x(a){return new p(function(b,c){function d(c){return function(d){h[c]=d;e+=1;e===a.length&&b(h)}}var e=0,h=[];0===a.length&&b(h);for(var k=0;k<a.length;k+=1)v(a[k]).c(d(k),c)})}function y(a){return new p(function(b,c){for(var d=0;d<a.length;d+=1)v(a[d]).c(b,c)})};window.Promise||(window.Promise=p,window.Promise.resolve=v,window.Promise.reject=u,window.Promise.race=y,window.Promise.all=x,window.Promise.prototype.then=p.prototype.c,window.Promise.prototype["catch"]=p.prototype.g);}());

(function(){'use strict';var g=document.createElement("div");
function h(a){g.style.cssText="font:"+a;if(g.style.fontFamily){a:{a=g.style.fontFamily;for(var b="",c=[],e=0;e<a.length;e++){var d=a.charAt(e);if("'"===d||'"'===d){b=e+1;do if(b=a.indexOf(d,b)+1,!b){a=null;break a}while("\\"===a.charAt(b-2));c.push(a.slice(e+1,b-1));e=b-1;b=""}else","===d?(b=b.trim(),""!==b&&(c.push(b),b="")):b+=d}b=b.trim();""!==b&&c.push(b);a=c}if(a)return{size:g.style.fontSize,lineHeight:g.style.lineHeight||"normal",style:g.style.fontStyle||"normal",variant:g.style.fontVariant||
"normal",weight:g.style.fontWeight||"normal",stretch:g.style.fontStretch||"normal",family:a}}return null};function m(){this.fonts=[];this.b="loaded";Object.defineProperties(this,{status:{get:function(){return this.b}},size:{get:function(){return this.fonts.length}}})}
m.prototype.add=function(a){if(!this.has(a)){n||(n=document.createElement("style"),document.head.appendChild(n));var b=null;if("loaded"===a.b){for(var b=new Uint8Array(a.f),c="",e=0;e<b.length;e++)c+=String.fromCharCode(b[e]);b="url(data:font/opentype;base64,"+btoa(c)+")"}else b=a.l;n.sheet.insertRule('@font-face{font-family:"'+a.family+'";font-style:'+a.style+";font-weight:"+a.weight+";unicode-range:"+a.unicodeRange+";src:"+b+";}",0);a.c=n.sheet.cssRules[0];this.fonts.push(a)}};
m.prototype["delete"]=function(a){var b=this.fonts.indexOf(a);if(-1!==b){if(n&&a.c)for(var c=0;c<n.sheet.cssRules.length;c++)if(a.c===n.sheet.cssRules[c]){n.sheet.deleteRule(c);a.c=null;break}this.fonts.splice(b,1);return!0}return!1};m.prototype.clear=function(){this.fonts=[]};m.prototype.has=function(a){return-1!==this.fonts.indexOf(a)};m.prototype.forEach=function(a){var b=this;this.fonts.forEach(function(c,e){a(c,e,b)})};
function r(a,b){function c(a){return"bold"===a?700:"normal"===a?400:a}var e=h(b);return null===e?null:a.fonts.filter(function(a){for(var b=e.family,f=0;f<b.length;f++)if(a.family===b[f]&&a.style===e.style&&a.stretch===e.stretch&&c(a.weight)===c(e.weight))return!0;return!1})}
m.prototype.load=function(a){var b=this,c=r(this,a);return null===c?Promise.reject([]):c.length?(b.b="loading",Promise.all(c.map(function(a){return a.h()})).then(function(){b.b="loaded";return c}).catch(function(){b.b="loaded";return c})):Promise.resolve([])};m.prototype.check=function(a){a=r(this,a);if(0===a.length)return!1;for(var b=0;b<a.length;b++)if("loaded"!==a[b].status)return!1;return!0};function x(a){for(var b=/\burl\((\'|\"|)([^\'\"]+?)\1\)( format\((\'|\"|)([^\'\"]+?)\4\))?/g,c=null,e=[];c=b.exec(a);)c[2]&&e.push({url:c[2],format:c[5]});return e};function y(a,b){this.status=b.status;this.ok=200<=b.status&&300>b.status||0===b.status;this.statusText=b.statusText;this.body=a}y.prototype.arrayBuffer=function(){return Promise.resolve(this.body)};var z=!(window.XDomainRequest&&!("responseType"in XMLHttpRequest.prototype));
function A(a){var b={};return new Promise(function(c,e){if(z){var d=new XMLHttpRequest;d.onload=function(){c(new y(d.response,{status:d.status,statusText:d.statusText}))};d.onerror=function(){e(new TypeError("Network request failed"))};d.open("GET",a);d.responseType="arraybuffer";b&&Object.keys(b).forEach(function(a){d.setRequestHeader(a,b[a])});d.send(null)}else d=new XDomainRequest,d.open("GET",a.replace(/^http(s)?:/i,window.location.protocol)),d.ontimeout=function(){return!0},d.onprogress=function(){return!0},
d.onload=function(){c(new y(d.responseText,{status:d.status,statusText:d.statusText}))},d.onerror=function(){e(new TypeError("Network request failed"))},setTimeout(function(){d.send(null)},0)})};function C(a){document.body?a():document.addEventListener("DOMContentLoaded",a)};function D(){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode("@"));this.c=document.createElement("span");this.f=document.createElement("span");this.i=document.createElement("span");this.h=document.createElement("span");this.g=-1;this.c.style.cssText="display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.f.style.cssText="display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.h.style.cssText="display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.i.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;";this.c.appendChild(this.i);this.f.appendChild(this.h);this.a.appendChild(this.c);this.a.appendChild(this.f)}
function E(a,b,c){a.a.style.cssText="min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font-size:100px;font-family:"+b+";"+c}function F(a){var b=a.a.offsetWidth,c=b+100;a.h.style.width=c+"px";a.f.scrollLeft=c;a.c.scrollLeft=a.c.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}
function G(a,b){a.c.addEventListener("scroll",function(){F(a)&&null!==a.a.parentNode&&b(a.g)},!1);a.f.addEventListener("scroll",function(){F(a)&&null!==a.a.parentNode&&b(a.g)},!1);F(a)};function H(){var a={};this.family="_fff_";this.style=a.style||"normal";this.variant=a.variant||"normal";this.weight=a.weight||"normal";this.stretch=a.stretch||"stretch";this.featureSettings=a.featureSettings||"normal"}var I=null;
function J(){var a=new H,b="font-style:"+a.style+";font-variant:"+a.variant+";font-weight:"+a.weight+";font-stretch:"+a.stretch+";font-feature-settings:"+a.featureSettings+";-moz-font-feature-settings:"+a.featureSettings+";-webkit-font-feature-settings:"+a.featureSettings+";",c=document.createElement("div"),e=new D,d=new D,p=new D,f=-1,k=-1,l=-1,t=-1,u=-1,v=-1;return new Promise(function(q,M){function B(){null!==c.parentNode&&c.parentNode.removeChild(c)}function w(){if(-1!==f&&-1!==k||-1!==f&&-1!==
l||-1!==k&&-1!==l)if(f===k||f===l||k===l){if(null===I){var b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);I=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))}I?f===t&&k===t&&l===t||f===u&&k===u&&l===u||f===v&&k===v&&l===v||(B(),q(a)):(B(),q(a))}}C(function(){function q(){if(5E3<=Date.now()-N)B(),M(a);else{var b=document.hidden;if(!0===b||void 0===b)f=e.a.offsetWidth,k=d.a.offsetWidth,l=p.a.offsetWidth,w();setTimeout(q,50)}}var N=Date.now();E(e,
"sans-serif",b);E(d,"serif",b);E(p,"monospace",b);c.appendChild(e.a);c.appendChild(d.a);c.appendChild(p.a);document.body.appendChild(c);t=e.a.offsetWidth;u=d.a.offsetWidth;v=p.a.offsetWidth;q();G(e,function(a){f=a;w()});E(e,'"'+a.family+'",sans-serif',b);G(d,function(a){k=a;w()});E(d,'"'+a.family+'",serif',b);G(p,function(a){l=a;w()});E(p,'"'+a.family+'",monospace',b)})})};var K=null;
function L(){if(!K){var a=document.createElement("style"),b=document.getElementsByTagName("head")[0];a.appendChild(document.createTextNode('@font-face{font-family:"_fff_";src:url(data:font/woff2;base64,d09GMgABAAAAAADcAAoAAAAAAggAAACWAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABk4ALAoUNAE2AiQDCAsGAAQgBSAHIBtvAciuMTaGVo8IaqBbcKPeB3CyAAIO4unr9nb72QE3p00iGQQIZcAAcAMEJOztBx7zdWVWn//BAPW1l0BN429cPrCPE75MA637gPs0DjavNxzHtWeXXErKIV3AF9TbHqCTOATL2BgjeIH30lQwSAonU1LabV8Iz12wDvgd/obV5QVxXDKvUhW1QfWNrS6HzEQJaP4tBA==) format("woff2"),url(data:application/font-woff;base64,d09GRgABAAAAAAHgAAoAAAAAAggAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABUAAAABcAAABOBIQEIWNtYXAAAAFwAAAAJgAAACwADABzZ2x5ZgAAAaAAAAAUAAAAFAwBPQJoZWFkAAAA9AAAAC0AAAA2CHEB92hoZWEAAAEkAAAAFgAAACQMAQgDaG10eAAAAWgAAAAIAAAACAgAAABsb2NhAAABmAAAAAYAAAAGAAoAAG1heHAAAAE8AAAAEwAAACAABAACbmFtZQAAAbQAAAAeAAAAIAAjCF5wb3N0AAAB1AAAAAwAAAAgAAMAAHgBY2BkYABhb81vuvH8Nl8ZmFgYQOBCWvVrMP3VURxEczBAxBmYQAQAAFIIBgAAAHgBY2BkYGBhAAEOKAkUQQVMAAJKABkAAHgBY2BkYGBgAkIgjQ0AAAC+AAcAeAFjAIEUBkYGcoECgwILmAEiASBRAK4AAAAAAAgAAAB4AWNgYGBkYAZiBgYeBhYGBSDNAoQgvsP//xDy/0EwnwEATX4GfAAAAAAAAAAKAAAAAQAAAAAIAAQAAAEAADEBCAAEAHgBY2BgYGKQY2BmYGThZGAEshmgbCYw2wEABjMAigAAeAFjYGbACwAAfQAE) format("woff")}'));b.appendChild(a);
K=J().then(function(){var c=new D,e=["opentype","truetype"];E(c,"_fff_","");document.body.appendChild(c.a);var d=c.a.offsetWidth;200<=d&&e.unshift("woff");300==d&&e.unshift("woff2");b.removeChild(a);document.body.removeChild(c.a);return e},function(){return["opentype","truetype"]})}return K};function O(a,b,c){var e=this,d=c||{};this.l=b;this.f=null;this.a=[];this.j=new Promise(function(a,b){e.i=a;e.g=b});this.b="unloaded";this.c=null;Object.defineProperties(this,{family:{get:function(){return a}},style:{get:function(){return d.style||"normal"}},weight:{get:function(){return d.weight||"normal"}},stretch:{get:function(){return d.stretch||"normal"}},unicodeRange:{get:function(){return d.unicodeRange||"U+0-10FFFF"}},variant:{get:function(){return d.variant||"normal"}},featureSettings:{get:function(){return d.featureSettings||
"normal"}},status:{get:function(){return this.b}},loaded:{get:function(){return this.j}}});"string"===typeof b?this.a=x(b):(this.f=b,this.b="loaded",this.i(e))}var n=null;function P(a,b){for(var c=null,e=0;e<b.length;e++)for(var d=0;d<a.a.length;d++)if(b[e]===a.a[d].format&&null===c){c=a.a[d].url;break}c||0===b.length||(c=a.a[0].url);return c}
O.prototype.h=function(){var a=this;"unloaded"===a.b&&(a.b="loading",L().then(function(b){(b=P(a,b))?A(b).then(function(a){if(a.ok)return a.arrayBuffer();throw a;}).then(function(b){a.f=b;a.b="loaded";a.i(a)}).catch(function(){a.b="error";a.g(a)}):(a.b="error",a.g(a))}).catch(function(){a.b="error";a.g(a)}));return this.j};window.FontFace||(window.FontFace=O,window.FontFace.prototype.load=O.prototype.h,document.fonts=new m);}());