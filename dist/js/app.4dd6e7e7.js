(function(e){function t(t){for(var n,i,l=t[0],o=t[1],h=t[2],c=0,u=[];c<l.length;c++)i=l[c],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&u.push(r[i][0]),r[i]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n]);_&&_(t);while(u.length)u.shift()();return s.push.apply(s,h||[]),a()}function a(){for(var e,t=0;t<s.length;t++){for(var a=s[t],n=!0,l=1;l<a.length;l++){var o=a[l];0!==r[o]&&(n=!1)}n&&(s.splice(t--,1),e=i(i.s=a[0]))}return e}var n={},r={app:0},s=[];function i(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=n,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(a,n,function(t){return e[t]}.bind(null,n));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=t,l=l.slice();for(var h=0;h<l.length;h++)t(l[h]);var _=o;s.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";var n=a("85ec"),r=a.n(n);r.a},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("p",[a("label",[e._v("mask '+44(8-10)___-___-__-__':")]),a("input",{directives:[{name:"phone-mask",rawName:"v-phone-mask",value:"+44(8-10)___-___-__-__",expression:"'+44(8-10)___-___-__-__'"}]})]),e._m(0),a("strong",[e._v("His struct")]),a("pre",[e._v("div\n  div\n    p\n      label/\n    /p\n    input\n  /div\n/div\n  ")]),a("NestedInput",{directives:[{name:"phone-mask",rawName:"v-phone-mask",value:"+7(___)___-__-__",expression:"'+7(___)___-__-__'"}]})],1)},s=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[a("strong",[e._v("On nested in component input")]),a("br"),a("code",[e._v("NestedInput v-phone-mask=\"'+7(___)___-__-__'\"/")])])}],i=(a("4160"),a("a630"),a("caad"),a("a15b"),a("ac1f"),a("2532"),a("3ca3"),a("5319"),a("159b"),a("b85c")),l=a("d4ec"),o=a("bee2"),h=function(){function e(t,a){var n=this;Object(l["a"])(this,e),this.el=t,this.mask=a,this._mask=Array.from(a),this._replaceableChars=[],this._mask.forEach((function(e,t){"_"===e&&n._replaceableChars.push(t)})),this._changeFunction={insertText:{one:this._insertOneSymbol,many:this._insertOneSymbolInsteadMany},insertFromPaste:{one:this._insertFromPaste,many:this._insertInsteadManySymbolsFromPaste},deleteContentBackward:{one:this._deleteOneSymbolBackward,many:this._deleteManySymbols},deleteContentForward:{one:this._deleteOneSymbolForward,many:this._deleteManySymbols},deleteWordBackward:{one:this._deleteOneWordBackward,many:this._deleteManySymbols},deleteWordForward:{one:this._deleteOneWordForward,many:this._deleteManySymbols},deleteByCut:{many:this._deleteManySymbols}},this._showPlaceholder=this._showPlaceholder.bind(this),this._putCursor=this._putCursor.bind(this),this._masking=this._masking.bind(this)}return Object(o["a"])(e,[{key:"_showPlaceholder",value:function(){this.el.placeholder=this.mask}},{key:"_putCursor",value:function(){var e,t=this,a=Object(i["a"])(this._replaceableChars);try{var n=function(){var a=e.value;if("_"===t._mask[a])return setTimeout((function(){t.el.selectionStart=a,t.el.selectionEnd=a})),"break"};for(a.s();!(e=a.n()).done;){var r=n();if("break"===r)break}}catch(s){a.e(s)}finally{a.f()}}},{key:"_masking",value:function(e){if(e.preventDefault(),!this.el.value||!(this.el.selectionEnd<this._replaceableChars[0]||this.el.selectionStart>this._replaceableChars[this._replaceableChars.length-1]+1)){var t=this.el.selectionStart===this.el.selectionEnd,a=[t?this.el.selectionEnd:{start:this.el.selectionStart,end:this.el.selectionEnd}];if(e.data){if(this.el.selectionStart===this._mask.length)return;var n=this._removeNaN(e.data);if(!n)return;a.push(n)}var r=t?this._changeFunction[e.inputType]["one"].apply(this,a):this._changeFunction[e.inputType]["many"].apply(this,a);this.el.value=this._mask.join(""),this.el.selectionStart=r,this.el.selectionEnd=r,this.el.dispatchEvent(new Event("input"))}}},{key:"_insertOneSymbol",value:function(e,t){var a=this._findMaskPosition(e);return"_"!==this._mask[this._replaceableChars[a]]&&this._moveMaskToEnd(a),this._mask[this._replaceableChars[a]]=t,this._replaceableChars[a]+1}},{key:"_insertOneSymbolInsteadMany",value:function(e,t){var a=this._findMaskPosition(e.start);return this._mask[this._replaceableChars[a]]=t,this._deleteManySymbols({start:this._replaceableChars[a+1],end:e.end})}},{key:"_insertFromPaste",value:function(e,t){var a=this._findMaskPosition(e),n=Math.min(t.length,this._replaceableChars.length-a);return"_"!==this._mask[this._replaceableChars[a]]&&this._moveMaskToEnd(a,n),this._fillMask(t,a,n),a+=n,this._replaceableChars[a]||this._replaceableChars[a-1]+1}},{key:"_insertInsteadManySymbolsFromPaste",value:function(e,t){var a=this._findMaskPosition(e.start),n=this._findMaskPosition(e.end),r=n-a-t.length;return r>0?this._moveMaskToStart(n-r,r):r<0&&this._moveMaskToEnd(n,-r),this._fillMask(t,a)}},{key:"_deleteOneSymbolBackward",value:function(e){if(e--,e<this._replaceableChars[0])return this._replaceableChars[0];if(!this._replaceableChars.includes(e))return this._replaceableChars[this._findMaskPosition(e)-1]+1;var t=this._findMaskPosition(e);return this._moveMaskToStart(t),this._replaceableChars.includes(e-1)?e:t>0?this._replaceableChars[t-1]+1:this._replaceableChars[0]}},{key:"_deleteManySymbols",value:function(e){var t=this._findMaskPosition(e.start),a=this._findMaskPosition(e.end);return this._moveMaskToStart(t,a-t),this._replaceableChars[t]}},{key:"_deleteOneSymbolForward",value:function(e){return this._replaceableChars.includes(e)&&this._moveMaskToStart(this._findMaskPosition(e)),e}},{key:"_deleteOneWordBackward",value:function(e){if(e--,e<this._replaceableChars[0])return this._replaceableChars[0];if(!this._replaceableChars.includes(e))return this._replaceableChars[this._findMaskPosition(e)-1]+1;var t=this._findMaskPosition(e),a=this._findIrreplaceableCharLeft(t);return this._moveMaskToStart(a,t-a+1),this._replaceableChars[a]}},{key:"_deleteOneWordForward",value:function(e){if(this._replaceableChars.includes(e)){var t=this._findMaskPosition(e),a=this._findIrreplaceableCharRight(t);this._moveMaskToStart(t,a-t+1)}return e}},{key:"_moveMaskToStart",value:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,a=e;a<this._replaceableChars.length;a++)this._mask[this._replaceableChars[a]]=this._mask[this._replaceableChars[a+t]]||"_"}},{key:"_moveMaskToEnd",value:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,a=this._replaceableChars.length-1;a>=e;a--)this._mask[this._replaceableChars[a]]=this._mask[this._replaceableChars[a-t]]}},{key:"_fillMask",value:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this._calculateAvailableFilling(e,t),n=0,r=t;n<a;n++,r++)this._mask[this._replaceableChars[r]]=e[n];return a}},{key:"_findMaskPosition",value:function(e){for(var t=0;t<this._replaceableChars.length;t++)if(e<=this._replaceableChars[t])return t;return this._replaceableChars[this._replaceableChars.length-1]+1}},{key:"_calculateAvailableFilling",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Math.min(e.length,this._replaceableChars.length-t)}},{key:"_findIrreplaceableCharLeft",value:function(e){for(var t=e;t>=0;t--)if(this._replaceableChars[t]-1!==this._replaceableChars[t-1])return t}},{key:"_findIrreplaceableCharRight",value:function(e){for(var t=e;t<this._replaceableChars.length-1;t++)if(this._replaceableChars[t]+1!==this._replaceableChars[t+1])return t}},{key:"_removeNaN",value:function(e){return e.replace(/\D+/g,"")}},{key:"hangMask",value:function(){this.el.addEventListener("focus",this._showPlaceholder),this.el.addEventListener("focus",this._putCursor),this.el.addEventListener("beforeinput",this._masking)}},{key:"enter",value:function(e){var t=this._removeNaN(e);this._fillMask(t),this.el.value=this._mask.join(""),this.el.dispatchEvent(new Event("input"))}}],[{key:"takeOffMask",value:function(e){e.removeEventListener("focus",this._showPlaceholder),e.removeEventListener("focus",this._putCursor),e.removeEventListener("beforeinput",this._masking)}}]),e}(),_={bind:function(e,t){if("INPUT"!==e.tagName){var a=e.getElementsByTagName("input");if(1!==a.length)throw new Error("v-phone-mask directive requires 1 input, found "+a.length);e=a[0]}var n=new h(e,t.value);n.hangMask(),e.value&&n.enter(e.value)}},c=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},u=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",[a("p",[a("label")]),a("input")])])}],d=a("2877"),p={},f=Object(d["a"])(p,c,u,!1,null,null,null),v=f.exports,b={name:"App",components:{NestedInput:v},directives:{"phone-mask":_}},m=b,k=(a("034f"),Object(d["a"])(m,r,s,!1,null,null,null)),y=k.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(e){return e(y)}}).$mount("#app")},"85ec":function(e,t,a){}});
//# sourceMappingURL=app.4dd6e7e7.js.map