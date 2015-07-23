# zc
Building a bookmarklet using Zotero translators and citeproc-js reference formatting.

This is a test project. The purpose is to try to use Zotero JavaScript translators to get references from a web page and then use citeproc-js JavaScript code to format references. This should be done by only JavaScript as far as possible. A simple server-side proxy to cross CORS barriers is however needed and is included (written in PHP).

The status of the probject is that the code seems to be working fine, but needs more testing. And the code need to be cleaned up.

The changes from the original Zotero code are quite small and apply mainly to the process of selecting translators. A drawback with this JavaScript only code is that all the nearly 500 translators must be available for selecting in JavaScript. Currently they are just thrown in one big JavaScript file, translator-idx.js (where detectWeb etc, but not doWeb is included). The size of this is nearly 380 kB, but it can be reduced to 65 kB (if detectWeb etc are excluded) and stored permanently in the users browser (using html5 manifests).

There are no changes to citeproc.js.

The code should be working in html5 browsers. However some things might be troublesome since standards may be missing. The crucial part is in the start of the scrapping process. Unlike the current Zotero bookmarklet this new bookmarklet just grabs the current page DOM and send the head.innerHTML + body.innerHTML to a new page together with url and cookies. Then the DOM is recreated in the new page and a &lt;base href=url> tag is added. The url and cookies are added as dataset attribute to the DOM (to keep the code as close to the current Zotero code as possible).

This process might break. Some tags are removed in the source text, i.e. iframe, script and style tags. That might break since this is just done with some regexp. The adding of &lt;base href=url> might not work as expected to produce absolute URLs.
