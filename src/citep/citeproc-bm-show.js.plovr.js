
// See http://www.plovr.com/options.html
{
    "id": "citeproc-bm-show",
    "experimental-compiler-options": {
        "languageIn": "ECMASCRIPT5"
    },
    "inputs": [
        "../js/log-it.js",
        "../js/promise-load.js",
        "../js/xhragent.js",
        "citeproc-js/xmldom.js",
        "citeproc-js/citeproc.js",
        "get-cite-data.js",
        
        "trans/translators-idx.js",
        "trans/common.js",
        "trans/zscrap.js",
        
        "citeproc-bm-show.js",
    ],
    "paths": ".",
    "jsdoc-html-output-path": "./jsdoc/",
    "externs": [
        // "citeproc-bm-show-externs.js",
        // Externs that comes the closure compiler are used like this.
        // See closure-compiler/contrib/externs directory.
        // "//es6.js",
        // "//jquery-1.9.js",
        // "//google_maps_api_v2.js",
    ],
    "custom-externs-only": false,
    // "mode":"advanced",
    "mode":"whitespace",
    "output-file": "citeproc-bm-show-cld.js",
    "output-wrapper": "/* Copyright 2015 lennart.borgman@gmail.com */ (function(){%output%})();",
    "output-charset": "UTF-8"
}
