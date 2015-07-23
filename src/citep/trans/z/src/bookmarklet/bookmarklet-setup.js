window.addEventListener("load", function(){
    var hrefBase = location.href;
    hrefBase = hrefBase.replace(/[^\/]*$/, "");
    // console.log(hrefBase);

    var js = "javascript:(function(){";
    js += "var z='"+hrefBase+"';";
    js += "window['zotBmBaseUrl']=z;";
    js += "var d=document,s=d.createElement('script');";
    js += "s.src=z+'loader.js';";
    js += "(d.body?d.body:d.documentElement).appendChild(s);void(0);";
    js += "})();";
    // console.log(js);

    var aElt = document.getElementById("a-elt");
    aElt.href = js;

    var textElt = document.getElementById("text-elt");
    my = textElt;
    textElt.value = js;
});
