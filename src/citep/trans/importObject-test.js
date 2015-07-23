mySandboxZotero = null;
function myImportObject(object, passAsFirstArgument, attachTo) {
    console.log("myImportObject", object, passAsFirstArgument, attachTo);
    if(!attachTo) {
        mySandboxZotero = {"mySandbox":true};
        attachTo = mySandboxZotero;
    }
    console.log("myImportObject attachTo", attachTo);
    
    for(var key in (object.__exposedProps__ ? object.__exposedProps__ : object)) {
	if(Function.prototype[key]) continue;
	if(typeof object[key] === "function" || typeof object[key] === "object") {
	    // magic closures
	    attachTo[key] = new function() {
		var fn = object[key];
		return function() {
                    var isImported = true;
		    var args = (passAsFirstArgument ? [passAsFirstArgument] : []);
		    for(var i=0; i<arguments.length; i++) {
			args.push(arguments[i]);
		    }
		    fn.isImported = true;
		    var ret = fn.apply(object, args);
		    fn.isImported = false;
                    return ret;
		};
	    }
	    
	    // attach members
	    // this.importObject(object[key], passAsFirstArgument ? passAsFirstArgument : null, attachTo[key]);
	} else {
	    attachTo[key] = object[key];
	}
    }
}
function myFun() {
    console.log("myFun here, typeof isImported=", typeof isImported, "myFun.isImported", myFun.isImported);
}

myImportObject({"myImportedFun":myFun});
