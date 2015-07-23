function promiseTrans(fileName) {
    var transUrlDir = "https://dl.dropboxusercontent.com/u/848981/it/zotrans/git/translators/"; // new versions
    var transUrl = transUrlDir+fileName;
    var fOk = function(txt){
        console.log("promiseTrans got ", fileName);
        var eltCode = "var stamp = "+txt;
        var scriptElt = document.createElement("script");
        scriptElt.setAttribute("id", fileName);
        scriptElt.innerHTML = eltCode;
        document.head.appendChild(scriptElt);
    };
    var fErr = function(val){
        console.log("xhragent error", val);
    };
    return xhragent.get(transUrl, null, fOk, fErr);
}
