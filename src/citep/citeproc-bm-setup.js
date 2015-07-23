// 

promiseDOMready().then(function(){
        afterLoad();
    try {
    } catch(e) { logIt(e.message); }});

var theStyleUrlInp;
var theCslUrl;
var theForm;
function afterLoad() {
    // console.log("afterLoad");
    theForm = document.forms["mk-bm-form"];
    var inpUrl = mkElt("input", { "type":"text", "id":"style-url", "name":"style-url"});
    theStyleUrlInp = inpUrl;
    var inpTest1 = mkElt("input", {
        "class":"my-button test",
        "type":"submit",
        "name":"test1",
        "value":"Test",
        "title":"Click to test this style",
        "disabled":"disabled",
    });
    // var inpTest2 = mkElt("input", {
    //     "class":"my-button test",
    //     "type":"submit",
    //     "name":"test2",
    //     "value":"Test 2 (pmid)",
    //     "title":"Click to test pmid",
    //     "disabled":"disabled",
    // });
    // var inpTest3 = mkElt("input", {
    //     "class":"my-button test",
    //     "type":"submit",
    //     "name":"test3",
    //     "value":"Test 3 (page)",
    //     "title":"Click to test this page",
    //     "disabled":"disabled",
    // });
    var urlInpDiv = mkElt("div", {"class":"xinline"}, [inpUrl, "Test formatting for this style: ", inpTest1]);
    var urlDiv = mkElt("div", {"id":"bm-input"}, ["Enter link to the CSL file: ", urlInpDiv]);
    var inpMake = mkElt("input", {
        "class":"my-button test",
        "type":"submit",
        "name":"make",
        "value":"Make bookmarklet",
        "title":"Click to create bookmarklet",
        "xdisabled":"disabled",
    });
    var aBm = mkElt("a", {"id":"the-bm"}, "");
    var bmOutDiv = mkElt("div", {"id":"bm-container"}, aBm);
    var bmDiv = mkElt("div", {"id":"bm-output"}, [inpMake, bmOutDiv]);
                      
    theForm = mkElt("form", {"name":"mk-bm-form", "action":"javascript:null"},
                    [urlDiv, bmDiv]);
    var formDiv = document.getElementById("form-div");

    // fix-me: some strange resizing of buttons at loading. frag did not help.
    // The problem was click-wave in the css file.
    // 
    // formDiv.appendChild(theForm);
    var frag = document.createDocumentFragment();
    frag.appendChild(theForm);
    formDiv.appendChild(frag);
                        

    // fix-me:
    var addTestCsl = true;
    if (addTestCsl) {
        var testA = document.getElementById("test-csl-link");
        theStyleUrlInp.value = testA.href;
        theForm["test1"].removeAttribute("disabled");
        // theForm["test2"].removeAttribute("disabled");
        // theForm["test3"].removeAttribute("disabled");
    }

    var theSubmitAction;
    theForm.addEventListener("submit", function(ev){
            switch(theSubmitAction) {
            case "test1":
                testCslUrl();
                break;
            // case "test2":
            //     testPmid();
            //     break;
            // case "test3":
            //     testPage();
            //     break;
            case "make":
                makeBm();
                break;
            default:
                logIt("bad submit action="+theSubmitAction);
            }
        try {
        } catch(err) { logIt("theForm submit: "+err) }
    });

    theForm["test1"].addEventListener("click", function(){ theSubmitAction = "test1"; });
    // theForm["test2"].addEventListener("click", function(){ theSubmitAction = "test2"; });
    // theForm["test3"].addEventListener("click", function(){ theSubmitAction = "test3"; });
    theForm["make"].addEventListener("click", function(){ theSubmitAction = "make"; });

    // https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
    var reCslUrl = new RegExp("^https?://[^.]+?\.[^/]+?.*.csl$");
    theForm["style-url"].addEventListener("change", checkCslUrl);
    theForm["style-url"].addEventListener("blur", checkCslUrl);
    theForm["style-url"].addEventListener("keyup", checkCslUrl);
    function checkCslUrl(ev){
        // console.log("change style-url event");
        try {
            aBm.removeAttribute("href");
            aBm.innerHTML = "(no bookmarklet)";
            getCslUrl();
            // console.log("new theCslUrl=", theCslUrl);
            if (theCslUrl === "") {
                // setCustomValidity does not work for empty fields in Chrome (2015-06-22)
                theForm["test1"].setAttribute("disabled", "");
                return;
            }
            theForm["test1"].removeAttribute("disabled");
            if (!reCslUrl.test(theCslUrl)) {
                console.log("setCV bad");
                this.setCustomValidity("Please give an link to a CSL file!");
            } else {
                console.log("setCV ok");
                this.setCustomValidity("");
            }
        } catch(err) { logIt("style-url change: "+err) }
    }
}

function getCslUrl() {
    theCslUrl = theStyleUrlInp.value.trim();
    return theCslUrl;
}

var theCsl, theLocale;
var fErr = function(what) { logIt("fetch Error", what); }
function promiseFetchCslAndLocale() {
    getCslUrl();
    var lang = "en-US";
    var localeUrl = 'locales-' + lang + '.xml';
    var fOkCsl = function(txt) {
        theCsl = txt;
    }
    var fOkLocale = function(txt) {
        theLocale = txt;
    }
    var promCsl = xhragent.get(theCslUrl, null, fOkCsl, fErr);
    var promLocale = xhragent.get(localeUrl, null, fOkLocale, fErr);
    return Promise.all([ promCsl, promLocale ]);
}


function testCslUrl() {
    makeShowWin(); // Can't be in the promise because of popup blockers.
    var testDataUrl = location.protocol+"/"+"/"+location.host+location.pathname
        +"/../citeproc-js/demo/citations.json";
    var testData;
    var fOkTestData = function(txt){
        testData = JSON.parse(txt); return;
        var jtxt1 = txt.replace(/\/\/[^\r\n]*/g, "");
        var jtxt2 = jtxt1.replace(new RegExp("/\\*\\*[\\s\\S]*?\\*/", "g"), "");
        var jtxt3 = jtxt2.replace(/[ \t]*$/gm, "");
        var jtxt4 = jtxt3.replace(/^(\s*\n\n)+/gm, "\n") 
        var jtxt5 = jtxt4.replace(/^(\s*\n)+/gm, "\n") 
        testData = JSON.parse(jtxt5);
    }
    var promTestData = xhragent.get(testDataUrl, null, fOkTestData, fErr);

    Promise.all([promiseFetchCslAndLocale(), promTestData]).then(function() {
        try {
            postToShowWin(theCsl, theLocale, testData,
                          "This is the output of style testdata for the ZC bookmarklet.");
        } catch(e) { logIt(e.message); }
    })
        .catch(function(val){
            logIt(val);
            if (theBmOutWin) {
                try { theBmOutWin.close(); } catch(e) { logIt(e.message); }
            }
        });
}


/// http://stackoverflow.com/questions/5612787/converting-an-object-to-a-string
//
// does not work all the way, i.e. internal function are left out.
//
//Make an object a string that evaluates to an equivalent object
//  Note that eval() seems tricky and sometimes you have to do
//  something like eval("a = " + yourString), then use the value
//  of a.
//
//  Also this leaves extra commas after everything, but JavaScript
//  ignores them.
// function convertToText(obj) {
//     //create an array that will later be joined into a string.
//     var string = [];

//     //is object
//     //    Both arrays and objects seem to return "object"
//     //    when typeof(obj) is applied to them. So instead
//     //    I am checking to see if they have the property
//     //    join, which normal objects don't have but
//     //    arrays do.
//     if (typeof(obj) == "object" && (obj.join == undefined)) {
//         string.push("{");
//         for (prop in obj) {
//             string.push("\"", prop, "\"", ": ", convertToText(obj[prop]), ",");
//         };
//         string.push("}");

//         //is array
//     } else if (typeof(obj) == "object" && !(obj.join == undefined)) {
//         string.push("[")
//         for(prop in obj) {
//             string.push(convertToText(obj[prop]), ",");
//         }
//         string.push("]")

//         //is function
//     } else if (typeof(obj) == "function") {
//         string.push(obj.toString())

//         //all other values can be done with JSON.stringify
//     } else {
//         string.push(JSON.stringify(obj))
//     }

//     return string.join("").replace(/\/\/[^\r\n]*/g, "");
// }

function makeBm() {
    Promise.all([promiseFetchCslAndLocale()]).then(function() {
        try {
            var dataObj = {
                "csl":theCsl,
                "locale":theLocale,
                // "info":"Reference from the page <b>"+document.title+"</b>",
            };
            var bm = "";
            bm += "var theSetupUrl=\""+theSetupUrl+"\";";
            bm += getInfo.toString().replace(/\/\/[^\r\n]*/g, "");
            bm += getPageData.toString().replace(/\/\/[^\r\n]*/g, "");
            bm += getPageHtml.toString().replace(/\/\/[^\r\n]*/g, "");
            bm += "var pageData = getPageData();";
            bm += "var dataObj="+JSON.stringify(dataObj)+";";
            bm += "dataObj['info']=getInfo();";
            bm += "dataObj['pageData']=pageData;";
            bm += makeShowWin.toString().replace(/\/\/[^\r\n]*/g, "");
            bm += postToShowWin.toString().replace(/\/\/[^\r\n]*/g, "");
            bm += "makeShowWin();";
            bm += "postToShowWin(dataObj.csl, dataObj.locale, dataObj.pageData, dataObj.info);";
            // console.log("bm", bm);
            bm = "(function() {"+bm+"})()";
            var bmA = document.getElementById("the-bm");
            bmA.href = "javascript:"+bm;
            bmA.innerHTML = "ZC";
        } catch(e) { logIt(e.message); }
    });
}


/////////////////////////////////////////////////////////////////////////////////////
// Functions etc also used in the bookmarklet

function getInfo() {
    return 'Reference from the page <a href="'+location.href+'" target="_blank"><b>'+document.title+'</b></a>';
}

function getPageHtml() {
    var headTxt = document.head.innerHTML;
    var bodyTxt = document.body.innerHTML;
    var pageTxt = "<html><head>"+headTxt+"</head><body>"+bodyTxt+"</body></html>";
    return pageTxt;
}
function getPageData() {
    return {
        "pageData": {
            "_page":getPageHtml(),
            "_url":location.href,
            "_cookie":document.cookie,
        }
    };
}

var theBmOutWin;
var theSetupUrl = location.protocol+"/"+"/"+location.host+location.pathname;
theSetupUrl = theSetupUrl.substr(0, theSetupUrl.lastIndexOf("/")+1);

function makeShowWin() {
    theBmOutWin = undefined;
    // var url = location.protocol+"/"+"/"+location.host+location.pathname;
    var url = theSetupUrl+"citeproc-bm-show.html";
    console.log("theBmOutWin url", url);
    theBmOutWin = window.open(url, "");
    // console.log("theBmOutWin", theBmOutWin);
}

function postToShowWin(cslXml, locale, cslData, infoHtml) {
    var postData = {
        "cslXml":cslXml,
        "cslData":cslData,
        "locale":locale,
        "info":infoHtml
    };
    console.log("postToShowWin setup", postData);
    var postIt = function(ev){
        console.log("postIt got", ev);
        if (ev.data !== "citeproc-bm-show-ready") return;
        console.log("postIt posting");
        var post2url = "*";
        theBmOutWin.postMessage(postData, post2url);
        window.removeEventListener("message", postIt);
        console.log("postIt listener removed");
    };
    window.addEventListener("message", postIt);
}


/////////////////////////////////////////////////////////////////////////////////////
// Test data

