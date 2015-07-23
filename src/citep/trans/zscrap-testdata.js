(function(){
    var htmlMeta = '<!DOCTYPE html> <html> <head> <meta charset="UTF-8"> <title>ZC reference bookmarklet setup</title> <meta name="viewport" content="initial-scale=1" > <meta name="dc:title" content="citeproc bib style bookmarklet setup" /> <meta name="dc:author" content="Lennart Borgman" /> <meta name="dc:description" content="This is the setup page for the bookmarklet." /> <meta name="dc:keywords" content="zotero citeproc bookmarklet" /> </head> <body> <div class="page"> <div class="header"> <h1>ZC reference bookmarklet setup</h1> </div> <div class="main"> <p> This bookmarklet can be used to get a bibliography from the web page you are visiting. </p> <p> You choose the bibliography style to use below. The style must be defined in a CSL (Citation Style Language) file. You can find such style files with the instructions here: <a href="http://citationstyles.org/styles/" target="_blank">Styles | CitationStyles.org</a> </p> <p class="not-ready"> <a id="test-csl-link" href="https://dl.dropboxusercontent.com/u/848981/it/citep/apa.csl">APA style</a> <i>(This is already entered below.)</i> <br> <br> Note 2: The bookmarklet is not ready yet. </p> <div id="form-div"> </div> <p> Some technical info: The bookmarklet uses the Zotero translators to grab data from web pages and citeproc-js to show it. </p> </div> </div> </body> </html>';

    var domMeta = new DOMParser().parseFromString(htmlMeta, "text/html");
    var urlMeta = "https://dl.dropboxusercontent.com/u/848981/it/citep/citeproc-bm-setup.html";
    var locationMeta = {
        "ancestorOrigins":{"length":0},
        "origin":"https://dl.dropboxusercontent.com",
        "hash":"",
        "search":"",
        "pathname":"/u/848981/it/citep/citeproc-bm-setup.html",
        "port":"",
        "hostname":"dl.dropboxusercontent.com",
        "host":"dl.dropboxusercontent.com",
        "protocol":"https:",
        "href":"https://dl.dropboxusercontent.com/u/848981/it/citep/citeproc-bm-setup.html",
        "toString": function(){return "https://dl.dropboxusercontent.com/u/848981/it/citep/citeproc-bm-setup.html"; }
    };
    var cookieMeta = "";

    // fix-me
    // var val = scrapWithSplittedTrans(urlMeta, domMeta, function(item){
    //     console.log("scrapWithSplittedTrans callback", item);
    //     testItem = item;
    // });

    // zscrapSetUrlAndDoc(urlMeta, domMeta);
    // zscrapSetUrlDocCookie(urlMeta, domMeta, cookieMeta);
    zscrapSetDocUrlCookie(domMeta, urlMeta, cookieMeta);
    zscrapSetTranslateItemCallback(function(items) {
        console.log("zscrap items", items);
        var cslItems = {};
        for (var i=0, zItem; zItem=items[i++];){
            console.log("zItem", zItem);
            var cslItem = item2Csl(zItem);
            console.log("cslItem", cslItem);
            var id = cslItem["id"];
            cslItems[id] = cslItem;
        }
        console.log("cslItems", cslItems);
    });
})();
