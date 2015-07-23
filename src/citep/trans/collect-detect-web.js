console.log("collect-detect-web.js start");

var badFiles = {
    // "Agencia del ISBN.js":"line 74, for each",
    // "Ancestry.com US Federal Census.js": "for each",
    // "Archive Ouverte en Sciences de l'Information et de la Communication  (AOSIC).js": "some err",
    // "Biblio.com.js": "some err",
    // "Bibliontology RDF.js": "some err",
    // "Bryn Mawr Classical Review.js": "some err",
    // "Columbia University Press.js": "some err",
    // "Education Week.js": "some err",
    // "European Educational Research Journal.js": "some err",
    // "HighWire.js": "some err",
    // "IEEE Xplore.js": "some err",
    // "IGN.js": "some err",
    // "InfoTrac.js": "some err",
    // "Inter-Research Science Center.js": "some err",
    // "ISI Web of Knowledge.js": "some err",
    // "Library Catalog (Aleph).js": "some err",
    // "Library Catalog (BiblioCommons).js": "some err",
    "National Library of Australia (new catalog).js": "redefines JSON",
    // "National Library of Australia.js": "some err",
    // // "NCBI PubMed.js": "some err",
    // "NYTimes.com.js": "some err",
    // "OpenJudis - Indian Supreme Court cases.js": "some err",
    // "Oxford Music and Art Online.js": "some err",
    // "Philosopher's Imprint.js": "some err",
}

var transUrlDir = "https://dl.dropboxusercontent.com/u/848981/it/zotero-connectors/src/zotero/translators/";
var transUrlDir = "https://dl.dropboxusercontent.com/u/848981/it/zotrans/git/translators/"; // new versions
var theOutputDiv;
var theCounterDiv;
var theStopDiv;
var theStopBtn;

var fXhragentErr = function(err) {
    console.log("error xhr", err);
    theStopDiv.innerHTML = '<b style="color:red">Error from xhragent:</b>'+err.message;
};

// fix-me: fake a Zotero object for eval:
var zUtil = {
    "cleanAuthor": function(){},
    "formatDate": function(){},
    "getVersion": function(){},
    "getCreatorsForType": function(){},
    "strToDate": function(){},
    "text2html": function(){},
    "trim": function(){},
    "trimInternal": function(){},
    "unescapeHTML": function(){},
};
var Zotero = {
    "read": function(){},
    "debug": function(){},
    "Collection": function(){},
    "Utilities":zUtil,
};

promiseDOMready().then(function() {
    console.log("DOM ready");
    theStopDiv = document.getElementById("stop-div");
    theStopBtn = document.getElementById("stop");
    theStopBtn.addEventListener("click", function(ev){
        nextFile = -nextFile;
    });
    
    theCounterDiv = document.getElementById("counter-div");
    theOutputDiv = document.getElementById("output-div");
    window.addEventListener("message", function(ev){
        console.log("got message", ev);
        if (ev.data.what !== "files") return;
        theFiles = ev.data.files;
        saveAll();
    });
    console.log("posting to opener", opener);
    opener.postMessage({"what":"send files"}, "*");
});

var theFiles;
var nextFile = 0;        
function saveAll() {
    theCounterDiv.innerHTML = theFiles.length;
    var fOkClear = function(val) { console.log("fOkClear", val); };
    xhragent.post("save-detect-web.php", null, fOkClear, fXhragentErr);
    // var file = files[0];
    // saveOne(file);
    saveNextFile();
}

function saveNextFile() {
    if (nextFile < 0) return;
    var file;
    while (!file && nextFile < theFiles.length) {
        file = theFiles[nextFile++];
        if (badFiles[file]) file = false;
    }
    if (file) {
        saveOne(file);
    } else {
        // All done
        theStopBtn.style.visibility = "hidden";
    }
}

function saveOne(file) {
    console.log("saveOne", file);
    // var scriptElt = document.createElement("script");
    // scriptElt.setAttribute("id", "trans-js");
    // scriptElt.addEventListener("error", function(ev){
    //     console.log("scriptElt error", ev);
    //     nextFile = -nextFile;
    // });
    // document.head.appendChild(scriptElt);
    var transUrl = transUrlDir+file;
    var fOk = function(txt){
        // console.log("txt", txt);
        // console.log("scriptElt", scriptElt);
        var eltCode = "var stamp = "+txt;
        try {
            eval(eltCode);
        } catch(e) {
            // console.log(eltCode);
            theStopDiv.innerHTML = '<b style="color:red">Error in file </b>'+file;
            console.log(e);
            nextFile = -nextFile;
        }
        // scriptElt.innerHTML = eltCode;
        // document.head.removeChild(scriptElt);

        theCounterDiv.innerHTML = theFiles.length+" translator files - "+nextFile+" done";
        theOutputDiv.innerHTML = "";
        var code = "";

        var beginSplittedTrans = "splittedTrans[\""+file+"\"] = {\n";
        code += beginSplittedTrans;
        var p = document.createElement("p");
        p.innerText = beginSplittedTrans;
        theOutputDiv.appendChild(p);

        var stampCode = '    "stamp": '+JSON.stringify(stamp)+",\n";
        code += stampCode;
        var p = document.createElement("p");
        p.innerText = stampCode;
        theOutputDiv.appendChild(p);

        // detectWeb is not always defined.
        var detectWebCode = "";
        if (typeof detectWeb === "function") detectWebCode = '    "detectWeb": '+detectWeb.toString()+",\n";
        code += detectWebCode;
        var p = document.createElement("p");
        p.innerText = detectWebCode;
        theOutputDiv.appendChild(p);

        // detectImport is not always defined.
        var detectImportCode = "";
        if (typeof detectImport === "function")
            detectImportCode = '"detectImport": '+detectImport.toString()+",";
        code += detectImportCode;
        var p = document.createElement("p");
        p.innerText = detectImportCode;
        theOutputDiv.appendChild(p);

        var endSplittedTrans = "};\n";
        code += endSplittedTrans;
        var p = document.createElement("p");
        p.innerText = endSplittedTrans;
        theOutputDiv.appendChild(p);

        var codeTransId = 'transIds["'+stamp["translatorID"]+'"] = "'+file+'";\n';
        code += codeTransId;
        var p = document.createElement("p");
        p.innerText = codeTransId;
        theOutputDiv.appendChild(p);

        // code = 'if (typeof splittedTrans === "undefined") var splittedTrans = {};'+"\n"
        code = code+"\n\n";
        // console.log("code", code);

        var fOkCode = function(val){
            console.log("fOkCode", val);
            setTimeout(saveNextFile, 500);
        }
        xhragent.post("save-detect-web.php", code, fOkCode, fXhragentErr);
    };
    xhragent.get(transUrl, null, fOk, fXhragentErr);
    return;
    var theSaveWin = window.open("save-detect-web.html", "");
    var postIt = function(ev) {
        console.log("postIt ev", ev);
        // theJsWin.postMessage("FIRST Message", "*");
        theJsWin.postMessage(file, "*");
        window.removeEventListener("message", postIt);
    }
    window.addEventListener("message", postIt);
}
