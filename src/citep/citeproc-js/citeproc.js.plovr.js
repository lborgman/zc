
// See http://www.plovr.com/options.html
{
    "id": "citeproc",
    "experimental-compiler-options": {
        "languageIn": "ECMASCRIPT5"
    },
    "inputs": [
        "citeproc.js",
    ],
    "paths": ".",
    "jsdoc-html-output-path": "./jsdoc/",
    "externs": [
        // "citeproc-externs.js",
        // Externs that comes the closure compiler are used like this.
        // See closure-compiler/contrib/externs directory.
        // "//es6.js",
        // "//jquery-1.9.js",
        // "//google_maps_api_v2.js",
    ],
    "custom-externs-only": false,
    "mode":"advanced",
    // "mode":"whitespace",
    "output-file": "citeproc-cld.js",
    "output-wrapper": "/* Copyright 2015 lennart.borgman@gmail.com */ (function(){%output%})();",
    "output-charset": "UTF-8"
}
