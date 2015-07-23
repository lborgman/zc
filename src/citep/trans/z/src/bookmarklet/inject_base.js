/*
    ***** BEGIN LICENSE BLOCK *****
    
    Copyright © 2011 Center for History and New Media
		     George Mason University, Fairfax, Virginia, USA
		     http://zotero.org
    
    This file is part of Zotero.
    
    Zotero is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    Zotero is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.
    
    You should have received a copy of the GNU Affero General Public License
    along with Zotero.	If not, see <http://www.gnu.org/licenses/>.
    
    ***** END LICENSE BLOCK *****
*/

var pos = (Zotero.isIE && document.compatMode === "BackCompat" ? "absolute" : "fixed");
var cssBookmarkletFrameDimmer = {"background":"black", "opacity":"0.5", "position":pos,
	"top":"0px", "bottom":"0px", "left":"0px", "right":"0px", "zIndex":"16777270",
	"height":"100%", "width":"100%", "filter":"alpha(opacity = 50);"};
var cssBookmarkletFrame = {"position":pos, "zIndex":"16777271", "top":"50%",
	"left":"50%", "background":"white"};

Zotero.initInject();
Zotero.Connector_Types.init();

/**
 * Creates a new frame with the specified width and height
 * @constructor
 */
var BookmarkletFrame = function(url, width, height) {
	var parentWin = window.parent,
		parentDoc = parentWin.document;
	
	this._appendFrameTo = (document.body ? document.body : document.documentElement);
	this._appendDimmerTo = (parentDoc.body ? parentDoc.body : parentDoc.documentElement);
	
	// Make sure iframe is not bigger than window
	var windowWidth, windowHeight;
	if(parentWin.innerWidth) {
		windowWidth = parentWin.innerWidth;
		windowHeight = parentWin.innerHeight;
	} else if(parentDoc.documentElement.offsetWidth) {
		windowWidth = parentDoc.documentElement.offsetWidth;
		windowHeight = parentDoc.documentElement.offsetHeight;
	} else if(parentDoc.body && parentDoc.body.offsetWidth) {
		windowWidth = parentDoc.body.offsetWidth;
		windowHeight = parentDoc.body.offsetHeight;
	} else {
		windowWidth = windowHeight = Infinity;
	}
	
	// Add width and height
	height = Math.min(windowHeight-10, height);
	width = Math.min(windowWidth-10, width);
	
	this._dimmer = parentDoc.createElement("div");
	this._dimmer.style.cssText = cssDivClearString;
	for(var i in cssBookmarkletFrameDimmer) this._dimmer.style[i] = cssBookmarkletFrameDimmer[i];
	this._appendDimmerTo.appendChild(this._dimmer);
	
	// Add iframe
	if(url) {
		this._frame = document.createElement("iframe");
		this._frame.src = url;
	} else {
		this._frame = zoteroIFrame;
		zoteroIFrame.style.display = "block";
	}
	this._frame.style.position = "absolute";
	this._frame.style.top = "0px";
	this._frame.style.left = "0px";
	this._frame.style.width = "100%";
	this._frame.style.height = "100%";
	this._frame.style.borderStyle = "none";
	this._frame.setAttribute("frameborder", "0");
	
	var frameElementStyle = window.frameElement.style;
	for(var i in cssBookmarkletFrame) frameElementStyle[i] = cssBookmarkletFrame[i];
	frameElementStyle.display = "block";
	frameElementStyle.margin = "-"+height/2+"px 0 0 -"+width/2+"px";
	frameElementStyle.width = width+"px";
	frameElementStyle.height = height+"px";
	if(url) this._appendFrameTo.appendChild(this._frame);
}

/**
 * Removes the frame
 */
BookmarkletFrame.prototype.remove = function() {
	this._appendDimmerTo.removeChild(this._dimmer);
	if(this._frame == zoteroIFrame) {
		zoteroIFrame.style.display = "none";
	} else {
		this._appendFrameTo.removeChild(this._frame);
	}
	window.frameElement.style.display = "none";
}

var translate = new Zotero.Translate.Web(),
	selectCallback, cancelled, haveItem, attachmentsSaving;

// fix-me
// translate.setDocument(window.parent.document);
function zoteroInjectBaseSetDocument() {
        var doc = window.parent.document;
        if (typeof zscrapDoc !== "undefined") { doc = zscrapDoc; }
        translate.setDocument(doc);
}
if (typeof zscrapZoteroDontSetDocument === "undefined" || !zscrapZoteroDontSetDocument) {
        zoteroInjectBaseSetDocument();
}

translate.setHandler("translators", function(obj, translators) {
	selectCallback = cancelled = haveItem = null;
	
	if(translators && translators.length) {
		if(translators[0].runMode === Zotero.Translator.RUN_MODE_IN_BROWSER) {
			Zotero.ProgressWindow.changeHeadline("Saving Item...");
		} else if(translators[0].runMode === Zotero.Translator.RUN_MODE_ZOTERO_SERVER) {
			Zotero.ProgressWindow.changeHeadline("Saving via Server...");
		} else {
			Zotero.ProgressWindow.changeHeadline("Saving via Zotero Standalone...");
		}
		
		translate.setTranslator(translators[0]);
		translate.translate();
	} else {
		Zotero.ProgressWindow.changeHeadline("Saving Failed");
		
		new Zotero.ProgressWindow.ErrorMessage("noTranslator");
		Zotero.ProgressWindow.startCloseTimer(8000);
		cleanup();
	}
});
translate.setHandler("select", function(obj, items, callback) {
	var frame = new BookmarkletFrame(ZOTERO_CONFIG.BOOKMARKLET_URL+"itemSelector.html#"
		+encodeURIComponent(JSON.stringify([null, items])), 600, 350);
	
	selectCallback = function(items) {
		frame.remove();
		callback(items);
	};
});
var _itemProgress = {};
translate.setHandler("itemSaving", function(obj, item) {
	if(!_itemProgress[item.id]) {
		_itemProgress[item.id] = new Zotero.ProgressWindow.ItemProgress(
			Zotero.ItemTypes.getImageSrc(item.itemType), item.title);
	}
});
translate.setHandler("itemDone", function(obj, dbItem, item) {
        console.log("inject_base.js itemDone", item);
	var itemProgress = _itemProgress[item.id];
	if(!itemProgress) {
		itemProgress = _itemProgress[item.id] = new Zotero.ProgressWindow.ItemProgress(
			Zotero.ItemTypes.getImageSrc(item.itemType), item.title);
	}
	itemProgress.setProgress(100);
	haveItem = true;
	for(var i=0; i<item.attachments.length; i++) {
		var attachment = item.attachments[i];
		_itemProgress[attachment.id] = new Zotero.ProgressWindow.ItemProgress(
			Zotero.ItemTypes.getImageSrc(attachment.mimeType === "application/pdf"
				? "attachment-pdf" : "attachment-snapshot"), attachment.title, itemProgress);
	}
});
translate.setHandler("attachmentProgress", function(obj, attachment, progress) {
	var attachmentProgress = _itemProgress[attachment.id];
	if(!attachmentProgress) return;
	if(progress === false) {
		attachmentProgress.setError();
	} else {
		if(attachment.linkMode === "linked_url") {
			attachmentProgress.setIcon(Zotero.ItemTypes.getImageSrc("attachment-web-link"));
		}
		attachmentProgress.setProgress(progress);
	}
});
translate.setHandler("done", function(obj, returnValue) {
	if(returnValue && haveItem) {
		Zotero.ProgressWindow.startCloseTimer(2500);
	} else if(!cancelled) {
		new Zotero.ProgressWindow.ErrorMessage("translationError");
		// Zotero.ProgressWindow.startCloseTimer(8000);
	}
	cleanup();
});

// Add message listener for translate, so we don't call until the iframe is loaded
Zotero.Messaging.addMessageListener("translate", function(data, event) {
	Zotero.ProgressWindow.changeHeadline("Looking for Translators...");
	if(Zotero.isIE) installXPathIfNecessary(window.parent);
	if(event.origin.substr(0, 6) === "https:" && ZOTERO_CONFIG.BOOKMARKLET_URL.substr(0, 5) === "http:") {
		ZOTERO_CONFIG.BOOKMARKLET_URL = "https:"+ZOTERO_CONFIG.BOOKMARKLET_URL.substr(5);
	}
	translate.getTranslators();
});
Zotero.Messaging.addMessageListener("selectDone", function(returnItems) {
	// if no items selected, close save dialog immediately
	if(!returnItems || Zotero.Utilities.isEmpty(returnItems)) {
		cancelled = true;
		Zotero.ProgressWindow.close();
	}
	selectCallback(returnItems);
});

// We use these for OAuth, so that we can load the OAuth pages in a child frame of the privileged
// iframe
var revealedFrame;
Zotero.Messaging.addMessageListener("revealZoteroIFrame", function() {
	if(revealedFrame) return;
	revealedFrame = new BookmarkletFrame(null, 800, 400);
});
Zotero.Messaging.addMessageListener("hideZoteroIFrame", function() {
	revealedFrame.remove();
});

// For IE, load from http to avoid a warning
if(Zotero.isIE && window.parent.location.protocol === "http:") {
	ZOTERO_CONFIG.BOOKMARKLET_URL = ZOTERO_CONFIG.BOOKMARKLET_URL.replace("https", "http");
}

// var zoteroIFrame; // fix-me

/**
 * Load privileged iframe and begin translation
 */
function injectStartTranslation() {
	Zotero.ProgressWindow.show();
	Zotero.ProgressWindow.changeHeadline("Looking for Zotero Standalone...");

	// fix-me:
	zoteroIFrame = document.createElement("iframe");
	zoteroIFrame.id = "zotero-privileged-iframe";
        if ((typeof zscrapZoteroIframeUrl !== undefined) && zscrapZoteroIframeUrl) {
	        zoteroIFrame.src = zscrapZoteroIframeUrl;
        } else {
	        zoteroIFrame.src =
                        ZOTERO_CONFIG.BOOKMARKLET_URL+"iframe"+(Zotero.isIE ? "_ie" : "")+".html";
        }
        console.log("inject iframe src", zoteroIFrame.src);
	zoteroIFrame.style.display = "none";
	document.body.appendChild(zoteroIFrame);
	document.body.style.overflow = "hidden";
}

/**
 * Remove the frames
 */
function cleanup() {
	if (!zoteroIFrame) return;
	zoteroIFrame.parentNode.removeChild(zoteroIFrame);
	if (window.frameElement) window.frameElement.parentNode.removeChild(window.frameElement);
}

if (typeof zscrapZoteroDontStart === "undefined" || !zscrapZoteroDontStart) {
        if(document.readyState && document.readyState !== "interactive" && document.readyState !== "complete") {
	        window.onload = injectStartTranslation;
        } else {
	        injectStartTranslation();
        }
}

/******** For Emacs */
/* Local Variables:  */
/* js-indent-level: 8 */
/* indent-tabs-mode: t */
/* End:		     */
