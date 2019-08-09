!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).buffer=t()}}(function(){return function(){return function t(r,e,n){function o(f,u){if(!e[f]){if(!r[f]){var s="function"==typeof require&&require;if(!u&&s)return s(f,!0);if(i)return i(f,!0);var h=new Error("Cannot find module '"+f+"'");throw h.code="MODULE_NOT_FOUND",h}var a=e[f]={exports:{}};r[f][0].call(a.exports,function(t){return o(r[f][1][t]||t)},a,a.exports,t,r,e,n)}return e[f].exports}for(var i="function"==typeof require&&require,f=0;f<n.length;f++)o(n[f]);return o}}()({1:[function(t,r,e){(function(r){"use strict";var n=t("base64-js"),o=t("ieee754");e.Buffer=r,e.SlowBuffer=function(t){+t!=t&&(t=0);return r.alloc(+t)},e.INSPECT_MAX_BYTES=50;var i=2147483647;function f(t){if(t>i)throw new RangeError('The value "'+t+'" is invalid for option "size"');var e=new Uint8Array(t);return e.__proto__=r.prototype,e}function r(t,r,e){if("number"==typeof t){if("string"==typeof r)throw new TypeError('The "string" argument must be of type string. Received type number');return h(t)}return u(t,r,e)}function u(t,e,n){if("string"==typeof t)return function(t,e){"string"==typeof e&&""!==e||(e="utf8");if(!r.isEncoding(e))throw new TypeError("Unknown encoding: "+e);var n=0|p(t,e),o=f(n),i=o.write(t,e);i!==n&&(o=o.slice(0,i));return o}(t,e);if(ArrayBuffer.isView(t))return a(t);if(null==t)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(z(t,ArrayBuffer)||t&&z(t.buffer,ArrayBuffer))return function(t,e,n){if(e<0||t.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(n||0))throw new RangeError('"length" is outside of buffer bounds');var o;o=void 0===e&&void 0===n?new Uint8Array(t):void 0===n?new Uint8Array(t,e):new Uint8Array(t,e,n);return o.__proto__=r.prototype,o}(t,e,n);if("number"==typeof t)throw new TypeError('The "value" argument must not be of type number. Received type number');var o=t.valueOf&&t.valueOf();if(null!=o&&o!==t)return r.from(o,e,n);var i=function(t){if(r.isBuffer(t)){var e=0|c(t.length),n=f(e);return 0===n.length?n:(t.copy(n,0,0,e),n)}if(void 0!==t.length)return"number"!=typeof t.length||D(t.length)?f(0):a(t);if("Buffer"===t.type&&Array.isArray(t.data))return a(t.data)}(t);if(i)return i;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof t[Symbol.toPrimitive])return r.from(t[Symbol.toPrimitive]("string"),e,n);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}function s(t){if("number"!=typeof t)throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function h(t){return s(t),f(t<0?0:0|c(t))}function a(t){for(var r=t.length<0?0:0|c(t.length),e=f(r),n=0;n<r;n+=1)e[n]=255&t[n];return e}function c(t){if(t>=i)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+i.toString(16)+" bytes");return 0|t}function p(t,e){if(r.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||z(t,ArrayBuffer))return t.byteLength;if("string"!=typeof t)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);var n=t.length,o=arguments.length>2&&!0===arguments[2];if(!o&&0===n)return 0;for(var i=!1;;)switch(e){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":return N(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return P(t).length;default:if(i)return o?-1:N(t).length;e=(""+e).toLowerCase(),i=!0}}function l(t,r,e){var n=t[r];t[r]=t[e],t[e]=n}function y(t,e,n,o,i){if(0===t.length)return-1;if("string"==typeof n?(o=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),D(n=+n)&&(n=i?0:t.length-1),n<0&&(n=t.length+n),n>=t.length){if(i)return-1;n=t.length-1}else if(n<0){if(!i)return-1;n=0}if("string"==typeof e&&(e=r.from(e,o)),r.isBuffer(e))return 0===e.length?-1:g(t,e,n,o,i);if("number"==typeof e)return e&=255,"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,e,n):Uint8Array.prototype.lastIndexOf.call(t,e,n):g(t,[e],n,o,i);throw new TypeError("val must be string, number or Buffer")}function g(t,r,e,n,o){var i,f=1,u=t.length,s=r.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||r.length<2)return-1;f=2,u/=2,s/=2,e/=2}function h(t,r){return 1===f?t[r]:t.readUInt16BE(r*f)}if(o){var a=-1;for(i=e;i<u;i++)if(h(t,i)===h(r,-1===a?0:i-a)){if(-1===a&&(a=i),i-a+1===s)return a*f}else-1!==a&&(i-=i-a),a=-1}else for(e+s>u&&(e=u-s),i=e;i>=0;i--){for(var c=!0,p=0;p<s;p++)if(h(t,i+p)!==h(r,p)){c=!1;break}if(c)return i}return-1}function d(t,r,e,n){e=Number(e)||0;var o=t.length-e;n?(n=Number(n))>o&&(n=o):n=o;var i=r.length;n>i/2&&(n=i/2);for(var f=0;f<n;++f){var u=parseInt(r.substr(2*f,2),16);if(D(u))return f;t[e+f]=u}return f}function w(t,r,e,n){return j(N(r,t.length-e),t,e,n)}function v(t,r,e,n){return j(function(t){for(var r=[],e=0;e<t.length;++e)r.push(255&t.charCodeAt(e));return r}(r),t,e,n)}function b(t,r,e,n){return v(t,r,e,n)}function m(t,r,e,n){return j(P(r),t,e,n)}function A(t,r,e,n){return j(function(t,r){for(var e,n,o,i=[],f=0;f<t.length&&!((r-=2)<0);++f)e=t.charCodeAt(f),n=e>>8,o=e%256,i.push(o),i.push(n);return i}(r,t.length-e),t,e,n)}function E(t,r,e){return 0===r&&e===t.length?n.fromByteArray(t):n.fromByteArray(t.slice(r,e))}function B(t,r,e){e=Math.min(t.length,e);for(var n=[],o=r;o<e;){var i,f,u,s,h=t[o],a=null,c=h>239?4:h>223?3:h>191?2:1;if(o+c<=e)switch(c){case 1:h<128&&(a=h);break;case 2:128==(192&(i=t[o+1]))&&(s=(31&h)<<6|63&i)>127&&(a=s);break;case 3:i=t[o+1],f=t[o+2],128==(192&i)&&128==(192&f)&&(s=(15&h)<<12|(63&i)<<6|63&f)>2047&&(s<55296||s>57343)&&(a=s);break;case 4:i=t[o+1],f=t[o+2],u=t[o+3],128==(192&i)&&128==(192&f)&&128==(192&u)&&(s=(15&h)<<18|(63&i)<<12|(63&f)<<6|63&u)>65535&&s<1114112&&(a=s)}null===a?(a=65533,c=1):a>65535&&(a-=65536,n.push(a>>>10&1023|55296),a=56320|1023&a),n.push(a),o+=c}return function(t){var r=t.length;if(r<=U)return String.fromCharCode.apply(String,t);var e="",n=0;for(;n<r;)e+=String.fromCharCode.apply(String,t.slice(n,n+=U));return e}(n)}e.kMaxLength=i,r.TYPED_ARRAY_SUPPORT=function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()}catch(t){return!1}}(),r.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(r.prototype,"parent",{enumerable:!0,get:function(){if(r.isBuffer(this))return this.buffer}}),Object.defineProperty(r.prototype,"offset",{enumerable:!0,get:function(){if(r.isBuffer(this))return this.byteOffset}}),"undefined"!=typeof Symbol&&null!=Symbol.species&&r[Symbol.species]===r&&Object.defineProperty(r,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1}),r.poolSize=8192,r.from=function(t,r,e){return u(t,r,e)},r.prototype.__proto__=Uint8Array.prototype,r.__proto__=Uint8Array,r.alloc=function(t,r,e){return function(t,r,e){return s(t),t<=0?f(t):void 0!==r?"string"==typeof e?f(t).fill(r,e):f(t).fill(r):f(t)}(t,r,e)},r.allocUnsafe=function(t){return h(t)},r.allocUnsafeSlow=function(t){return h(t)},r.isBuffer=function(t){return null!=t&&!0===t._isBuffer&&t!==r.prototype},r.compare=function(t,e){if(z(t,Uint8Array)&&(t=r.from(t,t.offset,t.byteLength)),z(e,Uint8Array)&&(e=r.from(e,e.offset,e.byteLength)),!r.isBuffer(t)||!r.isBuffer(e))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===e)return 0;for(var n=t.length,o=e.length,i=0,f=Math.min(n,o);i<f;++i)if(t[i]!==e[i]){n=t[i],o=e[i];break}return n<o?-1:o<n?1:0},r.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},r.concat=function(t,e){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return r.alloc(0);var n;if(void 0===e)for(e=0,n=0;n<t.length;++n)e+=t[n].length;var o=r.allocUnsafe(e),i=0;for(n=0;n<t.length;++n){var f=t[n];if(z(f,Uint8Array)&&(f=r.from(f)),!r.isBuffer(f))throw new TypeError('"list" argument must be an Array of Buffers');f.copy(o,i),i+=f.length}return o},r.byteLength=p,r.prototype._isBuffer=!0,r.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var r=0;r<t;r+=2)l(this,r,r+1);return this},r.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var r=0;r<t;r+=4)l(this,r,r+3),l(this,r+1,r+2);return this},r.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var r=0;r<t;r+=8)l(this,r,r+7),l(this,r+1,r+6),l(this,r+2,r+5),l(this,r+3,r+4);return this},r.prototype.toString=function(){var t=this.length;return 0===t?"":0===arguments.length?B(this,0,t):function(t,r,e){var n=!1;if((void 0===r||r<0)&&(r=0),r>this.length)return"";if((void 0===e||e>this.length)&&(e=this.length),e<=0)return"";if((e>>>=0)<=(r>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return I(this,r,e);case"utf8":case"utf-8":return B(this,r,e);case"ascii":return C(this,r,e);case"latin1":case"binary":return _(this,r,e);case"base64":return E(this,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return T(this,r,e);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}.apply(this,arguments)},r.prototype.toLocaleString=r.prototype.toString,r.prototype.equals=function(t){if(!r.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===r.compare(this,t)},r.prototype.inspect=function(){var t="",r=e.INSPECT_MAX_BYTES;return t=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(t+=" ... "),"<Buffer "+t+">"},r.prototype.compare=function(t,e,n,o,i){if(z(t,Uint8Array)&&(t=r.from(t,t.offset,t.byteLength)),!r.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(void 0===e&&(e=0),void 0===n&&(n=t?t.length:0),void 0===o&&(o=0),void 0===i&&(i=this.length),e<0||n>t.length||o<0||i>this.length)throw new RangeError("out of range index");if(o>=i&&e>=n)return 0;if(o>=i)return-1;if(e>=n)return 1;if(this===t)return 0;for(var f=(i>>>=0)-(o>>>=0),u=(n>>>=0)-(e>>>=0),s=Math.min(f,u),h=this.slice(o,i),a=t.slice(e,n),c=0;c<s;++c)if(h[c]!==a[c]){f=h[c],u=a[c];break}return f<u?-1:u<f?1:0},r.prototype.includes=function(t,r,e){return-1!==this.indexOf(t,r,e)},r.prototype.indexOf=function(t,r,e){return y(this,t,r,e,!0)},r.prototype.lastIndexOf=function(t,r,e){return y(this,t,r,e,!1)},r.prototype.write=function(t,r,e,n){if(void 0===r)n="utf8",e=this.length,r=0;else if(void 0===e&&"string"==typeof r)n=r,e=this.length,r=0;else{if(!isFinite(r))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");r>>>=0,isFinite(e)?(e>>>=0,void 0===n&&(n="utf8")):(n=e,e=void 0)}var o=this.length-r;if((void 0===e||e>o)&&(e=o),t.length>0&&(e<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var i=!1;;)switch(n){case"hex":return d(this,t,r,e);case"utf8":case"utf-8":return w(this,t,r,e);case"ascii":return v(this,t,r,e);case"latin1":case"binary":return b(this,t,r,e);case"base64":return m(this,t,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return A(this,t,r,e);default:if(i)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),i=!0}},r.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var U=4096;function C(t,r,e){var n="";e=Math.min(t.length,e);for(var o=r;o<e;++o)n+=String.fromCharCode(127&t[o]);return n}function _(t,r,e){var n="";e=Math.min(t.length,e);for(var o=r;o<e;++o)n+=String.fromCharCode(t[o]);return n}function I(t,r,e){var n=t.length;(!r||r<0)&&(r=0),(!e||e<0||e>n)&&(e=n);for(var o="",i=r;i<e;++i)o+=k(t[i]);return o}function T(t,r,e){for(var n=t.slice(r,e),o="",i=0;i<n.length;i+=2)o+=String.fromCharCode(n[i]+256*n[i+1]);return o}function L(t,r,e){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+r>e)throw new RangeError("Trying to access beyond buffer length")}function S(t,e,n,o,i,f){if(!r.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>i||e<f)throw new RangeError('"value" argument is out of bounds');if(n+o>t.length)throw new RangeError("Index out of range")}function R(t,r,e,n,o,i){if(e+n>t.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("Index out of range")}function x(t,r,e,n,i){return r=+r,e>>>=0,i||R(t,0,e,4),o.write(t,r,e,n,23,4),e+4}function M(t,r,e,n,i){return r=+r,e>>>=0,i||R(t,0,e,8),o.write(t,r,e,n,52,8),e+8}r.prototype.slice=function(t,e){var n=this.length;(t=~~t)<0?(t+=n)<0&&(t=0):t>n&&(t=n),(e=void 0===e?n:~~e)<0?(e+=n)<0&&(e=0):e>n&&(e=n),e<t&&(e=t);var o=this.subarray(t,e);return o.__proto__=r.prototype,o},r.prototype.readUIntLE=function(t,r,e){t>>>=0,r>>>=0,e||L(t,r,this.length);for(var n=this[t],o=1,i=0;++i<r&&(o*=256);)n+=this[t+i]*o;return n},r.prototype.readUIntBE=function(t,r,e){t>>>=0,r>>>=0,e||L(t,r,this.length);for(var n=this[t+--r],o=1;r>0&&(o*=256);)n+=this[t+--r]*o;return n},r.prototype.readUInt8=function(t,r){return t>>>=0,r||L(t,1,this.length),this[t]},r.prototype.readUInt16LE=function(t,r){return t>>>=0,r||L(t,2,this.length),this[t]|this[t+1]<<8},r.prototype.readUInt16BE=function(t,r){return t>>>=0,r||L(t,2,this.length),this[t]<<8|this[t+1]},r.prototype.readUInt32LE=function(t,r){return t>>>=0,r||L(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},r.prototype.readUInt32BE=function(t,r){return t>>>=0,r||L(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},r.prototype.readIntLE=function(t,r,e){t>>>=0,r>>>=0,e||L(t,r,this.length);for(var n=this[t],o=1,i=0;++i<r&&(o*=256);)n+=this[t+i]*o;return n>=(o*=128)&&(n-=Math.pow(2,8*r)),n},r.prototype.readIntBE=function(t,r,e){t>>>=0,r>>>=0,e||L(t,r,this.length);for(var n=r,o=1,i=this[t+--n];n>0&&(o*=256);)i+=this[t+--n]*o;return i>=(o*=128)&&(i-=Math.pow(2,8*r)),i},r.prototype.readInt8=function(t,r){return t>>>=0,r||L(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},r.prototype.readInt16LE=function(t,r){t>>>=0,r||L(t,2,this.length);var e=this[t]|this[t+1]<<8;return 32768&e?4294901760|e:e},r.prototype.readInt16BE=function(t,r){t>>>=0,r||L(t,2,this.length);var e=this[t+1]|this[t]<<8;return 32768&e?4294901760|e:e},r.prototype.readInt32LE=function(t,r){return t>>>=0,r||L(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},r.prototype.readInt32BE=function(t,r){return t>>>=0,r||L(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},r.prototype.readFloatLE=function(t,r){return t>>>=0,r||L(t,4,this.length),o.read(this,t,!0,23,4)},r.prototype.readFloatBE=function(t,r){return t>>>=0,r||L(t,4,this.length),o.read(this,t,!1,23,4)},r.prototype.readDoubleLE=function(t,r){return t>>>=0,r||L(t,8,this.length),o.read(this,t,!0,52,8)},r.prototype.readDoubleBE=function(t,r){return t>>>=0,r||L(t,8,this.length),o.read(this,t,!1,52,8)},r.prototype.writeUIntLE=function(t,r,e,n){(t=+t,r>>>=0,e>>>=0,n)||S(this,t,r,e,Math.pow(2,8*e)-1,0);var o=1,i=0;for(this[r]=255&t;++i<e&&(o*=256);)this[r+i]=t/o&255;return r+e},r.prototype.writeUIntBE=function(t,r,e,n){(t=+t,r>>>=0,e>>>=0,n)||S(this,t,r,e,Math.pow(2,8*e)-1,0);var o=e-1,i=1;for(this[r+o]=255&t;--o>=0&&(i*=256);)this[r+o]=t/i&255;return r+e},r.prototype.writeUInt8=function(t,r,e){return t=+t,r>>>=0,e||S(this,t,r,1,255,0),this[r]=255&t,r+1},r.prototype.writeUInt16LE=function(t,r,e){return t=+t,r>>>=0,e||S(this,t,r,2,65535,0),this[r]=255&t,this[r+1]=t>>>8,r+2},r.prototype.writeUInt16BE=function(t,r,e){return t=+t,r>>>=0,e||S(this,t,r,2,65535,0),this[r]=t>>>8,this[r+1]=255&t,r+2},r.prototype.writeUInt32LE=function(t,r,e){return t=+t,r>>>=0,e||S(this,t,r,4,4294967295,0),this[r+3]=t>>>24,this[r+2]=t>>>16,this[r+1]=t>>>8,this[r]=255&t,r+4},r.prototype.writeUInt32BE=function(t,r,e){return t=+t,r>>>=0,e||S(this,t,r,4,4294967295,0),this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t,r+4},r.prototype.writeIntLE=function(t,r,e,n){if(t=+t,r>>>=0,!n){var o=Math.pow(2,8*e-1);S(this,t,r,e,o-1,-o)}var i=0,f=1,u=0;for(this[r]=255&t;++i<e&&(f*=256);)t<0&&0===u&&0!==this[r+i-1]&&(u=1),this[r+i]=(t/f>>0)-u&255;return r+e},r.prototype.writeIntBE=function(t,r,e,n){if(t=+t,r>>>=0,!n){var o=Math.pow(2,8*e-1);S(this,t,r,e,o-1,-o)}var i=e-1,f=1,u=0;for(this[r+i]=255&t;--i>=0&&(f*=256);)t<0&&0===u&&0!==this[r+i+1]&&(u=1),this[r+i]=(t/f>>0)-u&255;return r+e},r.prototype.writeInt8=function(t,r,e){return t=+t,r>>>=0,e||S(this,t,r,1,127,-128),t<0&&(t=255+t+1),this[r]=255&t,r+1},r.prototype.writeInt16LE=function(t,r,e){return t=+t,r>>>=0,e||S(this,t,r,2,32767,-32768),this[r]=255&t,this[r+1]=t>>>8,r+2},r.prototype.writeInt16BE=function(t,r,e){return t=+t,r>>>=0,e||S(this,t,r,2,32767,-32768),this[r]=t>>>8,this[r+1]=255&t,r+2},r.prototype.writeInt32LE=function(t,r,e){return t=+t,r>>>=0,e||S(this,t,r,4,2147483647,-2147483648),this[r]=255&t,this[r+1]=t>>>8,this[r+2]=t>>>16,this[r+3]=t>>>24,r+4},r.prototype.writeInt32BE=function(t,r,e){return t=+t,r>>>=0,e||S(this,t,r,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t,r+4},r.prototype.writeFloatLE=function(t,r,e){return x(this,t,r,!0,e)},r.prototype.writeFloatBE=function(t,r,e){return x(this,t,r,!1,e)},r.prototype.writeDoubleLE=function(t,r,e){return M(this,t,r,!0,e)},r.prototype.writeDoubleBE=function(t,r,e){return M(this,t,r,!1,e)},r.prototype.copy=function(t,e,n,o){if(!r.isBuffer(t))throw new TypeError("argument should be a Buffer");if(n||(n=0),o||0===o||(o=this.length),e>=t.length&&(e=t.length),e||(e=0),o>0&&o<n&&(o=n),o===n)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("Index out of range");if(o<0)throw new RangeError("sourceEnd out of bounds");o>this.length&&(o=this.length),t.length-e<o-n&&(o=t.length-e+n);var i=o-n;if(this===t&&"function"==typeof Uint8Array.prototype.copyWithin)this.copyWithin(e,n,o);else if(this===t&&n<e&&e<o)for(var f=i-1;f>=0;--f)t[f+e]=this[f+n];else Uint8Array.prototype.set.call(t,this.subarray(n,o),e);return i},r.prototype.fill=function(t,e,n,o){if("string"==typeof t){if("string"==typeof e?(o=e,e=0,n=this.length):"string"==typeof n&&(o=n,n=this.length),void 0!==o&&"string"!=typeof o)throw new TypeError("encoding must be a string");if("string"==typeof o&&!r.isEncoding(o))throw new TypeError("Unknown encoding: "+o);if(1===t.length){var i=t.charCodeAt(0);("utf8"===o&&i<128||"latin1"===o)&&(t=i)}}else"number"==typeof t&&(t&=255);if(e<0||this.length<e||this.length<n)throw new RangeError("Out of range index");if(n<=e)return this;var f;if(e>>>=0,n=void 0===n?this.length:n>>>0,t||(t=0),"number"==typeof t)for(f=e;f<n;++f)this[f]=t;else{var u=r.isBuffer(t)?t:r.from(t,o),s=u.length;if(0===s)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(f=0;f<n-e;++f)this[f+e]=u[f%s]}return this};var O=/[^+\/0-9A-Za-z-_]/g;function k(t){return t<16?"0"+t.toString(16):t.toString(16)}function N(t,r){var e;r=r||1/0;for(var n=t.length,o=null,i=[],f=0;f<n;++f){if((e=t.charCodeAt(f))>55295&&e<57344){if(!o){if(e>56319){(r-=3)>-1&&i.push(239,191,189);continue}if(f+1===n){(r-=3)>-1&&i.push(239,191,189);continue}o=e;continue}if(e<56320){(r-=3)>-1&&i.push(239,191,189),o=e;continue}e=65536+(o-55296<<10|e-56320)}else o&&(r-=3)>-1&&i.push(239,191,189);if(o=null,e<128){if((r-=1)<0)break;i.push(e)}else if(e<2048){if((r-=2)<0)break;i.push(e>>6|192,63&e|128)}else if(e<65536){if((r-=3)<0)break;i.push(e>>12|224,e>>6&63|128,63&e|128)}else{if(!(e<1114112))throw new Error("Invalid code point");if((r-=4)<0)break;i.push(e>>18|240,e>>12&63|128,e>>6&63|128,63&e|128)}}return i}function P(t){return n.toByteArray(function(t){if((t=(t=t.split("=")[0]).trim().replace(O,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function j(t,r,e,n){for(var o=0;o<n&&!(o+e>=r.length||o>=t.length);++o)r[o+e]=t[o];return o}function z(t,r){return t instanceof r||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===r.name}function D(t){return t!=t}}).call(this,t("buffer").Buffer)},{"base64-js":2,buffer:5,ieee754:3}],2:[function(t,r,e){"use strict";e.byteLength=function(t){var r=h(t),e=r[0],n=r[1];return 3*(e+n)/4-n},e.toByteArray=function(t){var r,e,n=h(t),f=n[0],u=n[1],s=new i(function(t,r,e){return 3*(r+e)/4-e}(0,f,u)),a=0,c=u>0?f-4:f;for(e=0;e<c;e+=4)r=o[t.charCodeAt(e)]<<18|o[t.charCodeAt(e+1)]<<12|o[t.charCodeAt(e+2)]<<6|o[t.charCodeAt(e+3)],s[a++]=r>>16&255,s[a++]=r>>8&255,s[a++]=255&r;2===u&&(r=o[t.charCodeAt(e)]<<2|o[t.charCodeAt(e+1)]>>4,s[a++]=255&r);1===u&&(r=o[t.charCodeAt(e)]<<10|o[t.charCodeAt(e+1)]<<4|o[t.charCodeAt(e+2)]>>2,s[a++]=r>>8&255,s[a++]=255&r);return s},e.fromByteArray=function(t){for(var r,e=t.length,o=e%3,i=[],f=0,u=e-o;f<u;f+=16383)i.push(a(t,f,f+16383>u?u:f+16383));1===o?(r=t[e-1],i.push(n[r>>2]+n[r<<4&63]+"==")):2===o&&(r=(t[e-2]<<8)+t[e-1],i.push(n[r>>10]+n[r>>4&63]+n[r<<2&63]+"="));return i.join("")};for(var n=[],o=[],i="undefined"!=typeof Uint8Array?Uint8Array:Array,f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",u=0,s=f.length;u<s;++u)n[u]=f[u],o[f.charCodeAt(u)]=u;function h(t){var r=t.length;if(r%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var e=t.indexOf("=");return-1===e&&(e=r),[e,e===r?0:4-e%4]}function a(t,r,e){for(var o,i,f=[],u=r;u<e;u+=3)o=(t[u]<<16&16711680)+(t[u+1]<<8&65280)+(255&t[u+2]),f.push(n[(i=o)>>18&63]+n[i>>12&63]+n[i>>6&63]+n[63&i]);return f.join("")}o["-".charCodeAt(0)]=62,o["_".charCodeAt(0)]=63},{}],3:[function(t,r,e){e.read=function(t,r,e,n,o){var i,f,u=8*o-n-1,s=(1<<u)-1,h=s>>1,a=-7,c=e?o-1:0,p=e?-1:1,l=t[r+c];for(c+=p,i=l&(1<<-a)-1,l>>=-a,a+=u;a>0;i=256*i+t[r+c],c+=p,a-=8);for(f=i&(1<<-a)-1,i>>=-a,a+=n;a>0;f=256*f+t[r+c],c+=p,a-=8);if(0===i)i=1-h;else{if(i===s)return f?NaN:1/0*(l?-1:1);f+=Math.pow(2,n),i-=h}return(l?-1:1)*f*Math.pow(2,i-n)},e.write=function(t,r,e,n,o,i){var f,u,s,h=8*i-o-1,a=(1<<h)-1,c=a>>1,p=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,l=n?0:i-1,y=n?1:-1,g=r<0||0===r&&1/r<0?1:0;for(r=Math.abs(r),isNaN(r)||r===1/0?(u=isNaN(r)?1:0,f=a):(f=Math.floor(Math.log(r)/Math.LN2),r*(s=Math.pow(2,-f))<1&&(f--,s*=2),(r+=f+c>=1?p/s:p*Math.pow(2,1-c))*s>=2&&(f++,s/=2),f+c>=a?(u=0,f=a):f+c>=1?(u=(r*s-1)*Math.pow(2,o),f+=c):(u=r*Math.pow(2,c-1)*Math.pow(2,o),f=0));o>=8;t[e+l]=255&u,l+=y,u/=256,o-=8);for(f=f<<o|u,h+=o;h>0;t[e+l]=255&f,l+=y,f/=256,h-=8);t[e+l-y]|=128*g}},{}],4:[function(t,r,e){"use strict";e.byteLength=function(t){var r=h(t),e=r[0],n=r[1];return 3*(e+n)/4-n},e.toByteArray=function(t){for(var r,e=h(t),n=e[0],f=e[1],u=new i(function(t,r,e){return 3*(r+e)/4-e}(0,n,f)),s=0,a=f>0?n-4:n,c=0;c<a;c+=4)r=o[t.charCodeAt(c)]<<18|o[t.charCodeAt(c+1)]<<12|o[t.charCodeAt(c+2)]<<6|o[t.charCodeAt(c+3)],u[s++]=r>>16&255,u[s++]=r>>8&255,u[s++]=255&r;2===f&&(r=o[t.charCodeAt(c)]<<2|o[t.charCodeAt(c+1)]>>4,u[s++]=255&r);1===f&&(r=o[t.charCodeAt(c)]<<10|o[t.charCodeAt(c+1)]<<4|o[t.charCodeAt(c+2)]>>2,u[s++]=r>>8&255,u[s++]=255&r);return u},e.fromByteArray=function(t){for(var r,e=t.length,o=e%3,i=[],f=0,u=e-o;f<u;f+=16383)i.push(a(t,f,f+16383>u?u:f+16383));1===o?(r=t[e-1],i.push(n[r>>2]+n[r<<4&63]+"==")):2===o&&(r=(t[e-2]<<8)+t[e-1],i.push(n[r>>10]+n[r>>4&63]+n[r<<2&63]+"="));return i.join("")};for(var n=[],o=[],i="undefined"!=typeof Uint8Array?Uint8Array:Array,f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",u=0,s=f.length;u<s;++u)n[u]=f[u],o[f.charCodeAt(u)]=u;function h(t){var r=t.length;if(r%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var e=t.indexOf("=");return-1===e&&(e=r),[e,e===r?0:4-e%4]}function a(t,r,e){for(var o,i,f=[],u=r;u<e;u+=3)o=(t[u]<<16&16711680)+(t[u+1]<<8&65280)+(255&t[u+2]),f.push(n[(i=o)>>18&63]+n[i>>12&63]+n[i>>6&63]+n[63&i]);return f.join("")}o["-".charCodeAt(0)]=62,o["_".charCodeAt(0)]=63},{}],5:[function(t,r,e){arguments[4][1][0].apply(e,arguments)},{"base64-js":4,buffer:5,dup:1,ieee754:6}],6:[function(t,r,e){arguments[4][3][0].apply(e,arguments)},{dup:3}]},{},[1])(1)});