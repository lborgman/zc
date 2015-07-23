console.log("collect-detect-web.js starting!");

promiseDOMready().then(function() {
    console.log("DOM ready");
    var startButton = document.getElementById("start");
    var theJsWin;
    startButton.addEventListener("click", function(ev){
        var postIt = function(ev) {
            console.log("postIt what:files ev", ev);
            if (ev.data.what !== "send files") return;
            // theJsWin.postMessage("FIRST Message", "*");
            theJsWin.postMessage({"what":"files", "files":files}, "*");
            window.removeEventListener("message", postIt);
        }
        window.addEventListener("message", postIt);
        console.log("open it");
        theJsWin = window.open("collect-detect-web.html", "");
    });
});
