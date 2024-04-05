(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.FileSaver = mod.exports;
  }
})(this, function () {
  "use strict";

  var _global = typeof window === 'object' && window.window === window ? window : typeof self === 'object' && self.self === self ? self : typeof global === 'object' && global.global === global ? global : void 0;

  function saveAs(blob, name, opts, popup) {
    popup = popup || open('', '_blank');

    if (popup) {
      popup.document.title = popup.document.body.innerText = 'downloading...';
    }

    if (typeof blob === 'string') return download(blob, name, opts);
    var force = blob.type === 'application/octet-stream';

    var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari;

    var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);

    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== 'undefined') {
      var reader = new FileReader();

      reader.onloadend = function () {
        if (popup) popup.location.href = reader.result;
        else location = reader.result;
        popup = null;
      };

      reader.readAsDataURL(blob);
    } else {
      if (popup) popup.location = blob;
      else location.href = blob;
      popup = null;
    }
  }

  _global.saveAs = saveAs.saveAs = saveAs;

  if (typeof module !== 'undefined') {
    module.exports = saveAs;
  }
});
