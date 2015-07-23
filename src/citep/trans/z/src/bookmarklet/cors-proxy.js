/* Copyright 2015 lennart.borgman@gmail.com License: GPL 3 or later. */

/**
 * Proxy for CORS problems.
 *
 * @param {string} url URL called from translators
 * @return {string}
 */

var sitesCORSproxy = [
	"www.sciencedirect.com/",
];

function needCORSproxy(url) {
	var pos = url.indexOf("://");
	var fromHost = url.substr(pos+3);
	for (var i=0, host; host=sitesCORSproxy[i++];){
		if (fromHost.indexOf(host) === 0) return true;
	}
}

function addCORSproxyIfNeeded(url) {
	if (!needCORSproxy(url)) return url;
	// fix-me
	var retUrl;
	retUrl = "http://localhost/pxy/ba-simple-proxy4zc.php?mode=native&url="+encodeURIComponent(url);
	return retUrl;
}
