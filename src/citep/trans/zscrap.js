// var transUrlDir = "https://dl.dropboxusercontent.com/u/848981/it/zotero-connectors/src/zotero/translators/";
var transUrlDir = "https://dl.dropboxusercontent.com/u/848981/it/zotrans/git/translators/"; // new versions

var transKeys = Object.keys(splittedTrans);

var translatorID2Filename = {};
Object.keys(splittedTrans).forEach(function(key, index) {
    // console.log(key, this[key]["stamp"]["priority"]);
    var stamp = this[key]["stamp"];
    var translatorID = stamp["translatorID"];
    translatorID2Filename[translatorID] = key;
}, splittedTrans);

function zscrapTranslatorURL(transId) {
    return transUrlDir + translatorID2Filename[transId];
}


var stopIt;
window.addEventListener("error", function(ev){
    console.log("window error", ev, ev.error, ev.error.stack);
    stopIt = true;
});
// a+b;

// fix-me: no need to sort if using Zotero code (though it does not hurt very much).
transKeys.sort(function(a, b) {
    aPrio = splittedTrans[a]["stamp"]["priority"];
    bPrio = splittedTrans[b]["stamp"]["priority"];

    // Metatags first (is this why pubmed does not work??)
    // if (aPrio < bPrio) return 1;
    // if (aPrio > bPrio) return -1;

    // Metatags last
    if (aPrio < bPrio) return -1;
    if (aPrio > bPrio) return 1;
    return 0;
});



//////////////////////////////////////////////////////////////////////
// https://www.zotero.org/support/dev/translators/coding#using_gettranslatorobject

// fix-me: redefine those

function completeItem(doc, newItem) {
    debugger;
    console.log("completeItem", doc, newItem);
}


// var exports = {};
// var injectZotero;
// if (Zotero && Zotero.API) {
//     // fix-me:
//     // 
//     // This is the object from inject.js
//     // Wrong object we want the translators object, see trans/inject.js RDF DATA MODE.
//     injectZotero = Zotero;
// }
// var origZotero = Zotero;

// // console.log("Zotero.Utilities.Translate.prototype.doGet",Zotero.Utilities.Translate.prototype.doGet);
// // var origUtilTrans = new Zotero.Utilities.Translate();
// // throw "Stop here";

// // Zotero = {};
// // var RdfTranslatorZotero = {};
// // if (injectZotero) {
// //     RdfTranslatorZotero.RDF = new injectZotero.Translate.IO._RDFSandbox();
// // }
// console.log("Zotero", Zotero);


// // Create a new Zotero object that can fit here. Just copy the needed code at the moment.
// //
// // fix-me: Can we just use prototype declarations here? As functions? Or do we have to copy them?
// // 
// var RDFZotero = {
//     "whichZotero": "RDFZotero",
//     "logError": function(msg, v2, v3) {
//         console.log("RDFZotero.logError", msg, v2, v3);
//     },
//     "debug": function(msg) {
//         console.log("RDFZotero.debug", msg);
//     },

//     "Utilities": origZotero.Utilities,
//     "CreatorTypes": origZotero.CreatorTypes,

//     // fix-me: guess based on inject.js, sandbox
//     // "Zotero.Item = function (itemType) {"+
//     //     "const createArrays = "+createArrays+";"+
//     //     "this.itemType = itemType;"+
//     //     "for(var i=0, n=createArrays.length; i<n; i++) {"+
//     //     "this[createArrays[i]] = [];"+
//     //     "}"+
//     //     "};";

//     "Item": function(itemType) {
//         console.log("Item",itemType);
//         if (!itemType) debugger;
//         // const createArrays = createArrays;
// 	var createArrays = ['creators', 'notes', 'tags', 'seeAlso', 'attachments'];
//         this.itemType = itemType;
//         for(var i=0, n=createArrays.length; i<n; i++) {
//             this[createArrays[i]] = [];
//         }
//         this.attachments = [];
//     },

//     // fix-me: guess based on inject.js
//     "setProgress":function(translate, value) {
//         console.log("RDFZotero.setProgress", translate, value);
//         if (value) debugger;
//         return;
//         // fix-me: totally wrong
// 	if(typeof value !== "number") {
// 	    translate._progress = null;
// 	} else {
// 	    translate._progress = value;
// 	}
//     },
//     "RDF":{

//         // fix-me: guess based on inject.js
// 	"getArcsOut":function(resource) {
// 	    console.log("getArcsOut",resource);
// 	    var statements = this._dataStore.subjectIndex[this._dataStore.canon(this._getResource(resource))];
// 	    if(!statements) return false;
	    
// 	    var returnArray = [];
// 	    for(var i=0; i<statements.length; i++) {
// 		returnArray.push(statements[i].predicate.uri);
// 	    }
// 	    return returnArray;
// 	},

//         // fix-me: guess based on inject.js
// 	"getResourceURI":function(resource) {
// 	    console.log("getResourceURI",resource);
// 	    if(typeof(resource) == "string") return resource;
	    
// 	    var rdf = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
// 	    var values = this.getTargets(resource, rdf + 'value');
// 	    if(values && values.length) return this.getResourceURI(values[0]);
	    
// 	    if(resource.uri) return resource.uri;
// 	    if(resource.toNT == undefined) throw new Error("Zotero.RDF: getResourceURI called on invalid resource");
// 	    return resource.toNT();
// 	},
	
//         // fix-me: guess based on inject.js
// 	"getTargets":function(resource, property) {
// 	    var statements = this._dataStore.statementsMatching(this._getResource(resource), this._getResource(property));
// 	    if(!statements.length) return false;
	    
// 	    var returnArray = [];
// 	    for(var i=0; i<statements.length; i++) {
// 		returnArray.push(statements[i].object.termType == "literal" ? statements[i].object.toString() : statements[i].object);
// 	    }
// 	    return returnArray;
// 	},
	
//         // fix-me: guess based on inject.js
// 	"getSources":function(resource, property) {
// 	    console.log("getSources",resource, property);
// 	    var statements = this._dataStore.statementsMatching(undefined, this._getResource(property), this._getResource(resource));
// 	    if(!statements.length) return false;
	    
// 	    var returnArray = [];
// 	    for(var i=0; i<statements.length; i++) {
// 		returnArray.push(statements[i].subject);
// 	    }
// 	    return returnArray;
// 	},

//         // fix-me: guess based on inject.js
// 	"getAllResources":function() {
//             // fix-me: assumes a different format. Or, something seems really weird here.
//             console.log("getAllResources");
// 	    var returnArray = [];
//             tdsTemp = this._dataStore;

// 	    for(var i in this._dataStore.subjectIndex) {
// 	    	returnArray.push(this._dataStore.subjectIndex[i][0].subject);
// 	    }

// 	    // for(var i in this._dataStore.subjectIndex[0]) {
// 	    //     returnArray.push(this._dataStore.subjectIndex[0][i].subject);
// 	    // }

// 	    return returnArray;
// 	},

//         // fix-me: guess based on inject.js
// 	"_getResource":function(about) {
//             console.log("_getResource", about);
// 	    // return (typeof about == "object" ? about : new Zotero.RDF.AJAW.Symbol(about));
// 	    return (typeof about == "object" ? about : new $rdf.Symbol(about));
// 	},

//         // fix-me: guess based on inject.js
//         "_dataStore": (function(){
//             var ret = new $rdf.IndexedFormula();
//             console.log("_dataStore ret", ret);
//             return ret;
//         })(),

//         // fix-me: copied from inject.js
// 	"addStatement":function(about, relation, value, literal) {
// 	    console.log("addStatement",about, relation, value, literal);
// 	    if(about === null || about === undefined) {
// 		throw new Error("about must be defined in Zotero.RDF.addStatement");
// 	    }
// 	    if(relation === null || relation === undefined) {
// 		throw new Error("relation must be defined in Zotero.RDF.addStatement");
// 	    }
// 	    if(value === null || value === undefined) {
// 		throw new Error("value must be defined in Zotero.RDF.addStatement");
// 	    }
	    
// 	    if(literal) {
// 		// zap chars that Mozilla will mangle
// 		value = value.toString().replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');
// 	    } else {
// 		value = this._getResource(value);
// 	    }
	    
// 	    this._dataStore.add(this._getResource(about), this._getResource(relation), value);
// 	},
//     }
// };
// // This version is for the translators and can't be used here:
// // RDFZotero.Utilities.HTTP = origZotero.HTTP;

// // fix-me: Just grab the code from the Translate prototype ... :-(
// // After all we are reorganizing.
// //
// // fix-me: Zotero.Utiliities.Translate is defined in inject.js where is the original defs?
// // Probably in utilities_translate.js!

// var ourDoGet1 = function(url, callbackText, v3, v4, v5) {
//     console.log("ourDoGet1", url, callbackText, v3, v4, v5);
//     debugger;
//     throw "stop in ourDoGet1";
// }
// var ourDoGet2 = function(v1, v2, v3, v4, v5) {
//     console.log("ourDoGet2", v1, v2, v3, v4, v5);
//     debugger;
//     throw "stop in ourDoGet2";
// }
// var ourResolveUrl = function(v1, v2, v3, v4) {
//     console.log("ourResolveUrl", v1, v2, v3, v4, v5);
//     throw "stop in ourResolveUrl";
// }
// var ourZUtilities = {
//     "Translate": {
//         "traceId": "ourZUtilities Translate",
//         // "doGet": Zotero.Utilities.Translate.prototype.doGet,
//         "doGet": ourDoGet2,
//         // "resolveURL": Zotero.Utilities.Translate.prototype.resolveURL,
//         "resolveURL": ourResolveUrl,
//     },
//     "HTTP": {
//         "traceId": "ourZUtilities HTTP",
//         // "doGet": Zotero.Utilities.Translate.prototype.doGet,

//         // This one wants text in callback. Looks like the one in utilities_translate.js
//         // So when is that object created? And how?
//         "doGet": ourDoGet1,

//         // fix-me: maybe build a new translate.js
//         "_translate": new origZotero.Translate.Base(),
//     },
// };

// // throw "stop and check Utilities";

// RDFZotero.Utilities.HTTP = ourZUtilities.HTTP;
// RDFZotero.Utilities.Translate = ourZUtilities.Translate;

// RDFZotero.HTTP = origZotero.HTTP;

// // fix-me: This seems do need the other HTTP functions. Or, how many versions are there?
// // RDFZotero.Utilities.HTTP = {
// //     "doGet": Zotero.Utilities.Translate.prototype.doGet,
// // };

// console.log("RDFZotero.Utilities.Translate", RDFZotero.Utilities.Translate);


// // stopIt = true; throw "stop it 2";


    
// RDFZotero.Translate = {
// };
// // Zotero = RDFZotero;

// var theScrapCallback;
// RDFZotero.Item.prototype.complete = function(v1) {
//     console.log("zotero.item.complete", v1, this);
//     // Here this is RDFZotero.Item, grab data here!
//     debugger;
//     theScrapCallback(this);
// }


// var Z= Z || {
//     "debug": function(msg){
//         console.log("Z.debug", msg);
//     },
// };
// var theItemType;
// var zoteroDone;
// // Zotero.done = function(v1) {
// RDFZotero.done = function(v1) {
//     console.log("Zotero.done", v1);
//     theItemType = v1; // depreceated, but still used?
//     zoteroDone = true;
// }
// // Zotero.loadTranslator = function(v1, v2) {
// RDFZotero.loadTranslator = function(v1, v2) {
//     console.log("Zotero.loadTranslator", v1, v2);
//     if (v2) debugger;
//     return new Translator(v1);
// }

// safeTranslator.__exposedProps__ = {
//     "setSearch":"r",
//     "setDocument":"r",
//     "setHandler":"r",
//     "setString":"r",
//     "setTranslator":"r",
//     "getTranslators":"r",
//     "translate":"r",
//     "getTranslatorObject":"r"
// };

function zscrapTranslator(what){
    this.traceId = "our Translator";
    this.what = what;
    this.setString = function(text){
        console.log("setString", this);
        // throw "stop in setSTring";
        this.string = text;
    };
    this.setTranslator = function(id){
        var file = transIds[id];
        this.translatorId = id;
        this.translatorFile = file;
        console.log("Translator.setTranslator", id, file);
        var self = this;
        promFetchTrans(file).then(function(code){
            console.log("Translator.got", file, code.length);
            self.exports = zscrapEvalTrans(code, file);
            console.log("Translator:this.exports", self.exports);
            console.log("self", self);
            // self.getTranslatorObject(self.exports);
        });
        // debugger;
    };
    this.eventHandlers = {};
    this.getTranslatorObject = function(v1, v2){
        // console.log("Translator.getTranslatorObject", v1.toString(), v2);
        // this.getTranslatorObjectFun = function(arg){
        //     var givenFun = v1;
        //     console.log("Translator.getTranslatorObjectFun", v1.toString());
        //     // var Zotero = RDFZotero;
        //     givenFun(arg);
        // }
        // if (v2) debugger;
	if(!callback) {
	    throw "COMPAT WARNING: Translator must pass a callback";
	}
        console.log("getTranslatorObject", this);
        throw "stop a while";
        var sandbox = {};
	sandbox.exports.Zotero = sandbox.Zotero;
	sandbox = sandbox.exports;
	try {
	    callback(sandbox);
	} catch(e) {
	    translate.complete(false, e);
	    return;
        }
    };
    this.setHandler = function(eventName, handlerFun, v2, v3, v4){
        console.log("Translator.setHandler", eventName, handlerFun.toString(), v2, v3, v4);
        this.eventHandlers[eventName] = function(obj, newItem){
            console.log("Translator.trans event", eventName, obj, newItem);
            debugger;
            handlerFun(obj, newItem);
        };
    };
}


/**
 * @return object exports
 */
function zscrapEvalTrans(code, file) {
    if (!file) throw "Missing file parameter";
    code = "var stamp2 = "+code;
    code += "grabExports = exports;\n";
    code = "(function(){"+code+"})();";
    var grabExports = {};
    // var Zotero = RDFZotero; // fix-me
    var ZU = Zotero.Utilities;
    console.log("<<<<<<<<<<<<<<<<< eval in zscrapEvalTrans");
    eval(code);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log("evaled code, grabExports", grabExports);
    var isRdfJs = file === "RDF.js";
    if (isRdfJs) {
        // grabExports["Zotero"] = RdfTranslatorZotero;
        // grabExports["Zotero"] = injectZotero;
        // grabExports["Zotero"] = {};
        // grabExports["Zotero"]["RDF"] = new injectZotero.Translate.IO._RDFSandbox();
        // grabExports["Zotero"]["RDF"] = {};
        grabExports["Zotero"] = RDFZotero;
    }
    return grabExports;
}

// console.log("RDFZotero at start", RDFZotero, Zotero);


// See getTranslatorsFromRepo() in translator.js for return values.
function zscrapGetTranslators(url) {
    var matching = [];
    Object.keys(splittedTrans).forEach(function(key, index) {
        // console.log(key, this[key]["stamp"]["priority"]);
        // var stamp = this[key]["stamp"];
        var rec = this[key];
        var stamp = rec["stamp"];
        var targetUrl = stamp["target"];
        var urlRe = new RegExp(targetUrl);
        if (urlRe && urlRe.test(url)) {
            if (rec["detectWeb"]) {
                // fix-me: detectWeb
                matching.push(stamp);
            }
        }
    }, splittedTrans);
    return matching;
}

var zscrapDoc;
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>> zscrapDoc", zscrapDoc);
function zscrapSetDocUrlCookie(doc, url, cookie) {
    zscrapDoc = doc;
    doc.body.dataset.locationHref = url;
    doc.body.dataset.cookie = cookie;
}
var zscrapTranslateItemCallback;
function zscrapSetTranslateItemCallback(callback) {
    zscrapTranslateItemCallback = callback;
}

function scrapWithSplittedTrans(url, dom, callback) {
    theScrapCallback = callback;
    urlMeta = url;
    var nextTransIdx = -1;
    var currentTransRec;
    zoteroDone = false;

    function handleNextTrans() {
        nextTransIdx++;
        handleCurrentTrans();
    }

    function handleCurrentTrans() {
        var key=transKeys[nextTransIdx];
        // if (nextTransIdx > 5) return;
        if (!key) return;
        currentTransRec = splittedTrans[key];
        var stamp = currentTransRec["stamp"];
        var targetUrl = stamp["target"];
        // console.log("RDFZotero", RDFZotero, Zotero);
        if (targetUrl) {
            // console.log("targetUrl", targetUrl);
            var urlRe = new RegExp(targetUrl);
            if (urlRe && !urlRe.test(url)) { setTimeout(handleNextTrans, 0); return; }
        } else {
            //console.log("NO targetUrl");
        }
        var detectWeb = currentTransRec["detectWeb"];
        if (!detectWeb) {
            // console.log("no detectWeb in", key);
            // debugger;
            setTimeout(handleNextTrans, 0);
            return;
        }

        console.log("=========== translator key", key, targetUrl);
        // fix-me: some detectWeb does not return the type
        var bibType;
        var code = currentTransRec["code"];
        if (code) {
            // do we need to eval the code?
            if (true || !currentTransRec["exports"]) {
                code = "var stamp2 = "+code;
                code += "grabExports = exports;\n";
                code += "(function(){"
                code += "console.log('Zotero.whichZotero', Zotero.whichZotero);";
                code += "console.log('Object.Zotero', Object.Zotero);";
		code += "console.log('Zotero.Translate', Zotero.Translate);";
		code += "console.log('Zotero.TranslateDOMWrapper', Zotero.TranslateDOMWrapper);";
                code += "bibType = detectWeb(dom, url);";
                code += "console.log('bibType', bibType);";
                code += "if (bibType) { doWeb(dom, url); }";
                code += "})();";
                var grabExports = {};
                var Zotero = RDFZotero;
                console.log("RDFZotero before eval", RDFZotero, Zotero);
                var ZU = Zotero.Utilities;
                console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<< eal");
                eval(code);
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                console.log("evaled code, grabExports", grabExports);
                currentTransRec["exports"] = grabExports;
                try {
                } catch(e) {
                    console.log("eval code error", e);
                    debugger;
                    return;
                }
            }
            console.log("Using full version of translator");
            // fix-me detecWeb and doWeb are not always exported
            var codeExports = currentTransRec["exports"];
            // var detectWebFun = codeExports["detectWeb"];
            // if (detectWebFun) {
            //     console.log("--- calling bibType = detectWeb(dom, url); (full version)");
            //     bibType = detectWebFun(dom, url);
            //     console.log("bibType", bibType);
            //     try {
            //     } catch(e) {
            //         console.log("detectWebFun gave error", e);
            //     }
            // } else {
            //     console.log("No detetcWeb function");
            // }
            // var doWebFun = codeExports["doWeb"];
            // if (doWebFun) {
            //     console.log("--- calling = doWeb(dom, url)");
            //     doWebFun(dom, url);
            //     try {
            //     } catch(e) {
            //         console.log("doWebFun gave error", e);
            //     }
            // } else {
            //     console.log("No doWeb function");
            // }
        } else {
            var needCode;
            try {
                console.log("=== calling bibType = detectWeb(dom, url); (extracted version)");
                bibType = detectWeb(dom, url);
                console.log("bibType", bibType);
            } catch(e) {
                console.log("detectWeb gave error", e);
                // debugger;
                needCode = true;
            }
            if (needCode) {
                fetchTransAndDetectWeb(key);
                return;
            }
        }
        if (bibType) {
            fetchTransAndUseIt(key, dom);
            return;
        } else {
            console.log("Warning: did not get bibType", zoteroDone);
            // callback("Error: did not get bibType. See console log for more info.");

            if (zoteroDone) return;
            // fix-me: maybe not always an error to be here? Continue
            // here when things are implemented!
            //
            setTimeout(handleNextTrans, 0);
        }
    }
    function fetchTransAndDetectWeb(fileName) {
        x = promFetchTrans(fileName).then(function(response){
            console.log("response", fileName, response.length);
            currentTransRec["code"] = response;
            handleCurrentTrans();
        });
        console.log("x", x);
        // debugger;
    }

    var promDoiJs = promFetchTrans("DOI.js");
    var promUnapiJs = promFetchTrans("unAPI.js");
    var promUnapiJs = promFetchTrans("Embedded Metadata.js");
    Promise.all([promDoiJs, promUnapiJs, promUnapiJs]).then(function(resolved){
        handleNextTrans();
    }).catch(function(rejected){
        console.log("prom all rejected", rejected);
        debugger;
    });
}


function promFetchTrans(fileName) {
    var url = transUrlDir + fileName;
    // console.log("url", url);
    // fOk = function(val) {
    //     console.log("fetchTrans fOk", fileName, val.length);
    // };
    // fErr = function(val) {
    //     console.log("fetchTrans fErr", fileName, val.length);
    // };
    // return xhragent.get(url, null, fOk, fErr);
    return xhragent.get(url).end();
}
function fetchTransAndUseIt(fileName, dom) {
    var fOk = function(txt){
        var code = "var stamp = "+txt;
        try {
            // fix-me: sandbox it or not? In my citeproc bookmarklet
            // there is no need (I believe) since we are already in a
            // new window.
            //
            // https://github.com/eligrey/jsandbox
            // https://github.com/asvd/jailed
            eval(code);
            var zdata = doWeb(dom);
            console.log("zdata", zdata);
        } catch(e) {
            console.log("Error eval trans", e);
        }
    };
}
