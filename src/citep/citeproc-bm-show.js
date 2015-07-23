var waitAtLoadMs = 2000;
var theBibNewDiv;
var theTimeDiv;
var theBibOutDiv;
var theBibRefDiv;
var theBibLinksDiv;
var theAsLinksChk;

window.addEventListener("load", function() {
    if (stopIt) return;

    theBibNewDiv = document.getElementById("bib-outnew-div");
    theBibNewDiv.innerHTML =
        "Just waiting "+(waitAtLoadMs/1000).toFixed(0)+" s ... (to make debugging possible)"
    setTimeout(whenLoaded, waitAtLoadMs);
});

var fErr = function(what) { logIt("fetch Error", what); }

function whenLoaded(){
    console.log("whenLoaded, opener", window.opener);

    theBibOutDiv = document.getElementById("bib-out-div");
    theBibRefDiv = document.getElementById("bib-ref-div");
    theBibLinksDiv = document.getElementById("bib-links-div");
    theTimeDiv = document.getElementById("scrap-time-div");
    theAsLinksChk = document.getElementById("ids-as-url");
    theAsLinksChk.addEventListener("change", function(ev) {
        if (this.checked) {
            theBibLinksDiv.style.display = "block";
        } else {
            theBibLinksDiv.style.display = "none";
        }
        selectRefOutput();
    });

    theBibNewDiv.innerHTML = "Starting ...";

    var oldItems;
    window.addEventListener("message", function(ev){
        console.log("citeproc-bm-show.js got message, ev", ev);
        var data = ev.data;
        var items = data.cslData;
        if (!items) return; // fix-me: not for us!
        if (oldItems) {
            console.log("Uh, got data a second time");
            return;
        }
        var infoDiv = document.getElementById("info");
        console.log("0000000000 data.info", data.info);
        infoDiv.innerHTML = data.info+"";
        // console.log(infoDiv);
        oldItems = items;
        console.log("oldItems", oldItems);
        // citations = data.cslData;
        citations = {};
        promises = [];
        var scraping = false;
        Object.keys(items).forEach(function(key){
            console.log("key", key);
            var item = items[key];
            if (key === "pageData") {
                var page = item["_page"];
                if (page) {
                    scraping = true;
                    // Remove some things to avoid network calls etc.
                    // - iframes
                    page = page.replace(new RegExp("<iframe[\\s\\S]*?</iframe>", "g"), "");
                    // - styles
                    // page = page.replace(new RegExp("<link[\\s\\S]*?>", "g"), "");
                    page = page.replace(new RegExp("<style[\\s\\S]*?</style>", "g"), "");
                    // - scripts
                    page = page.replace(new RegExp("<script[\\s\\S]*?</script>", "g"), "");
                    // console.log(page);

                    var parser = new DOMParser();
                    var pageDoc = parser.parseFromString(page, "text/html");
                    myPageDoc = pageDoc; // fix-me, for debugging
                    console.log("pageDoc", pageDoc);

                    var pageUrl = item["_url"];
                    var pageCookie = item["_cookie"];

                    var baseTag = pageDoc.querySelector("base");
                    console.log("baseTag", baseTag);
                    if (!baseTag) {
                        baseTag = pageDoc.createElement("base");
                        baseTag.href = pageUrl;
                        pageDoc.head.insertBefore(baseTag, pageDoc.head.firstChild);
                    }

                    var startTime = performance.now();
                    
                    zscrapSetDocUrlCookie(pageDoc, pageUrl, pageCookie);
                    zscrapSetTranslateItemCallback(function(items) {
                        console.log("zscriptSetTranslateItemCallback called");
                        var ids = {};
                        function getIdsForLinks(zItm) {
                            var zDoi = zItm["DOI"];
                            var zExtra = zItm["extra"];
                            if (zDoi) { ids["doi"] = zDoi; }
                            if (zExtra) {
                                var rePmid = new RegExp(/\bpmid:\s*(\d+)\b/i);
                                var m = rePmid.exec(zExtra);
                                if (m) { ids["pmid"] = m[1]; }
                                var rePmcid = new RegExp(/\bpmcid:\s*(pmc\d+)\b/i);
                                var m = rePmcid.exec(zExtra);
                                if (m) { ids["pmcid"] = m[1]; }
                            }
                        }
                        console.log("zscrap items", items);
                        var cslItems = {};
                        for (var i=0, zItem; zItem=items[i++];){
                            console.log("zItem", zItem);
                            getIdsForLinks(zItem);
                            var cslItem = item2Csl(zItem);
                            console.log("cslItem", cslItem);
                            var id = cslItem["id"];
                            cslItems[id] = cslItem;
                        }
                        console.log("cslItems", cslItems);
                        myItem = cslItems;
                        theBibNewDiv.innerHTML = 
                            "<b>ZOTERO item:</b><br><br>\n"
                            +JSON.stringify(items).replace(/,/g, ",<br>\n")
                            +"<br><br>\n"
                            +"<b>citeproc item:</b><br><br>\n"
                            +JSON.stringify(cslItems).replace(/,/g, ",<br>\n");

                        var endTime = performance.now();
                        var time = endTime - startTime;
                        theTimeDiv.innerHTML =
                            'Zotero translators elapsed time (including their web requests): '
                            + time.toFixed(0) + " ms";
                        citations = cslItems;
                        renderBib(data.cslXml, data.locale);
                        renderIds(ids, pageUrl);
                        selectRefOutput();
                    });
                    zoteroInjectBaseSetDocument();
                    injectStartTranslation();
                    if (typeof zoteroIframeBaseSendTranslate === "function") zoteroIframeBaseSendTranslate();
                    return;
                }
            }
            citations[key] = items[key];
        });
        if (!scraping) {
            var traceDiv = document.getElementById("trace");
            trace.style.display = "none";
        }
        // fix-me
        Promise.all(promises).then(function(){
            renderBib(data.cslXml, data.locale);
            var cslTitle = getCslTitle(data.cslXml) || "Could not get style name";
            var eltStyleName = document.getElementById("style-name");
            eltStyleName.innerHTML = "<i>Style format:</i> "+cslTitle;
        });
    });
    opener.postMessage("citeproc-bm-show-ready", "*");
}

function getCslTitle(cslXml) {
    // console.log("cslXml", cslXml);
    // temp = cslXml;
    var m = new RegExp("<title>(.*?)</title>").exec(cslXml);
    if (!m) return;
    var title = m[1];
    return title;
}

var citations;

function postRender(html) {
    // console.log("postRender in", html);
    var newHtml = html;
    var asLinks = theAsLinksChk.checked;
    
    newHtml = newHtml.replace(/([^">])(https?:[^ \t\r\n<]+)/g, '$1<a target="_blank" href="$2">$2</a>');
    if (asLinks) {
        newHtml = newHtml.replace(/doi:(10[^ \t\r\n<]+)/ig, 'doi: <a target="_blank" href="http://dx.doi.org/$1">$1</a>');
    } else {
        newHtml = newHtml.replace(/doi:(10[^ \t\r\n<]+)/ig, 'doi:<a target="_blank" href="http://dx.doi.org/$1">$1</a>');
    }
    // console.log("postRender out", newHtml);
    return newHtml;
}

function selectRefOutput() {
    var range = document.createRange();
    range.selectNodeContents(theBibOutDiv);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
}

//// from demo.js (modified)
function renderBib(styleAsText, locale) {
    console.log("renderBib start");

    //// from demo.js (moved, changed)
    // Initialize a system object, which contains two methods needed by the
    // engine.
    citeprocSys = {
        // Given a language tag in RFC-4646 form, this method retrieves the
        // locale definition file.  This method must return a valid *serialized*
        // CSL locale. (In other words, an blob of XML as an unparsed string.  The
        // processor will fail on a native XML object or buffer).
        // xretrieveLocale: function (lang){
        //     var xhr = new XMLHttpRequest();
        //     xhr.open('GET', 'locales-' + lang + '.xml', false);
        //     xhr.send(null);
        //     return xhr.responseText;
        // },
        retrieveLocale: function (lang){ return locale; },

        // Given an identifier, this retrieves one citation item.  This method
        // must return a valid CSL-JSON object.
        retrieveItem: function(id){
            return citations[id];
        }
    };

    var citeproc = new CSL.Engine(citeprocSys, styleAsText);
    var itemIDs = [];
    for (var key in citations) { itemIDs.push(key); }
    citeproc.updateItems(itemIDs);
    var bibResult = citeproc.makeBibliography();
    html = bibResult[1].join('\n');
    html = postRender(html);
    theBibRefDiv.innerHTML = html;
}

function renderIds(ids, url) {
    console.log("renderIds", ids);
    var refText = theBibRefDiv.textContent;
    console.log("refText", refText);
    theBibLinksDiv.innerHTML = "";
    var links = [];
    Object.keys(ids).sort().reverse().forEach(function(key){
        var val = ids[key];
        var lnk = null;
        if (key === "doi") {
            lnk = "http://dx.doi.org/"+val;
        } else if (key === "pmid") {
            lnk = "http://www.ncbi.nlm.nih.gov/m/pubmed/"+val;
        } else if (key === "pmcid") {
            lnk = "http://www.ncbi.nlm.nih.gov/pmc/articles/"+val+"/";
        } else {
            theBibLinksDiv.appendChild(mkElt("span", null, "ERROR: unknown id in renderIds: "+key+"="+val));
        }
        if (lnk) links.unshift([key, lnk]);
    });
    if (links.length === 0) { links.unshift(["url", url]); }
    for (var i=0, lnkRec; lnkRec=links[i++];){
        var id  = lnkRec[0];
        var lnk = lnkRec[1];
        if (refText.indexOf(lnk) === -1) {
            var elt = mkElt("div", null,
                            [id, " - ", mkElt("a", {"href":lnk, "target":"_blank"}, lnk)]);
            theBibLinksDiv.appendChild(elt);
        }
    }
}

// zscrapZotero flags
var zscrapZoteroDontStart = true;
var zscrapZoteroDontSetDocument = true;
var zscrapZoteroIframeUrl = location.href.substr(0, location.href.lastIndexOf("/")+1)+"citeproc-bm-iframe.html";
