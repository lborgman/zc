console.log("save-detect-web.js start");

var theOutputDiv;
promiseDOMready().then(function() {
    console.log("DOM ready");
    theOutputDiv = document.getElementById("output-div");
    window.addEventListener("message", function(ev){
        console.log("got message", ev);
        theOutputDiv.innerHTML = ev.data;
    });
    console.log("posting to opener", opener);
    opener.postMessage("ready", "*");
});
        
