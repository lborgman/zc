var splittedTrans = {};
var transIds = {};

splittedTrans["3news.co.nz.js"] = {
    "stamp": {"translatorID":"a9f7b277-e134-4d1d-ada6-8f7942be71a6","label":"3news.co.nz","creator":"Sopheak Hean","target":"^https?://www\\.3news\\.co\\.nz","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-12-09 20:59:33"},
    "detectWeb": function detectWeb(doc, url) {
	var namespace = doc.documentElement.namespaceURI;
	var nsResolver = namespace ? function(prefix) {
	if (prefix == "x" ) return namespace; else return null;
	} : null;
	var test = doc.title;
	if  (test.indexOf("- blog -") != -1){
		return "blogPost";
	} else {
		if (test.indexOf("- Story -") != -1){
			return "newspaperArticle";
		}
	}
	return false;
},
};
transIds["a9f7b277-e134-4d1d-ada6-8f7942be71a6"] = "3news.co.nz.js";


splittedTrans["A Contra Corriente.js"] = {
    "stamp": {"translatorID":"bbf1617b-d836-4665-9aae-45f223264460","label":"A Contra Corriente","creator":"Sebastian Karcher","target":"^https?://tools\\.chass\\.ncsu\\.edu/open_journal/index\\.php/acontracorriente/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-06-19 10:57:55"},
    "detectWeb": function detectWeb(doc, url) {
	var xpath = '//meta[@name="citation_journal_title"]';

	if (ZU.xpath(doc, xpath).length > 0) {
		return "journalArticle";
	}

	if (url.match(/issue\/view|search\/results/)) {
		return "multiple";
	}

	return false;
},
};
transIds["bbf1617b-d836-4665-9aae-45f223264460"] = "A Contra Corriente.js";


splittedTrans["Ab Imperio.js"] = {
    "stamp": {"translatorID":"f3e31f93-c18d-4ba3-9aa6-1963702b5762","label":"Ab Imperio","creator":"Avram Lyon","target":"^https?://(?:www\\.)?abimperio\\.net/","minVersion":"2.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcs","lastUpdated":"2013-02-28 14:52:44"},
    "detectWeb": function detectWeb(doc, url) {
		return FW.detectWeb(doc, url);
},
};
transIds["f3e31f93-c18d-4ba3-9aa6-1963702b5762"] = "Ab Imperio.js";


splittedTrans["ACLWeb.js"] = {
    "stamp": {"translatorID":"f4a5876a-3e53-40e2-9032-d99a30d7a6fc","label":"ACL","creator":"Nathan Schneider","target":"^https?://(www[.])?aclweb\\.org/anthology/[^#]+","minVersion":"1.0.7","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2013-09-16 00:20:13"},
    "detectWeb": function detectWeb(doc, url) {
  var namespace = doc.documentElement.namespaceURI;
	var nsResolver = namespace ? function(prefix) {
		if (prefix == 'x') return prefix; else return null;
	} : namespace;

	var bibXpath = "//a[./text() = 'bib']"
	if(doc.evaluate(bibXpath, doc, nsResolver, XPathResult.ANY_TYPE, null).iterateNext()) {
	  return "multiple"
	}
  //commenting out single stuff
  // if (url.indexOf("/anthology-new/J/")>-1)
  //  return "journalArticle";
  // else
  //  return "conferencePaper";
},
};
transIds["f4a5876a-3e53-40e2-9032-d99a30d7a6fc"] = "ACLWeb.js";


splittedTrans["ACM Digital Library.js"] = {
    "stamp": {"translatorID":"f3f092bf-ae09-4be6-8855-a22ddd817925","label":"ACM Digital Library","creator":"Simon Kornblith, Michael Berkowitz, John McCaffery, and Sebastian Karcher","target":"^https?://([^/]+\\.)?dl\\.acm\\.org/(results|citation)\\.cfm","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-05-21 02:23:33"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("/results.cfm") != -1) {
		return getSearchResults(doc, true) ? 'multiple' : false;
	} else if (url.indexOf("/citation.cfm") != -1) {
		return getArticleType(doc);
	}
},
};
transIds["f3f092bf-ae09-4be6-8855-a22ddd817925"] = "ACM Digital Library.js";


splittedTrans["ACS Publications.js"] = {
    "stamp": {"translatorID":"938ebe32-2b2e-4349-a5b3-b3a05d3de627","label":"ACS Publications","creator":"Sean Takats, Michael Berkowitz, Santawort, and Aurimas Vinckevicius","target":"https?://pubs\\.acs\\.org/(toc/|journal/|topic/|isbn/\\d|doi/(full|abs)/10\\.|action/doSearch\\?)","minVersion":"4.0.5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-05 20:36:28"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.getElementById('articleListHeader_selectAllToc')
		&& getSearchResults(doc, true)
	) {
		return "multiple";
	} else if (getDoi(url)) {
		var h2 = doc.querySelector('.content-header > h2');
		if(h2 && h2.textContent.indexOf("Chapter") !=-1) {
			return "bookSection";
		} else {
			return "journalArticle";
		}
	}
},
};
transIds["938ebe32-2b2e-4349-a5b3-b3a05d3de627"] = "ACS Publications.js";


splittedTrans["AEA Web.js"] = {
    "stamp": {"translatorID":"6044b16f-2452-4ce8-ad02-fab69ef04f13","label":"AEA Web","creator":"Sebatian Karcher","target":"^https?://www\\.aeaweb\\.org/articles\\.php","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2014-12-08 06:33:27"},
    "detectWeb": function detectWeb(doc, url) {
    if (ZU.xpathText(doc, '//a[@title="Export Citation"]')) return "journalArticle";
    else if (ZU.xpath(doc, '//a[contains(@href, "articles.php?doi") and @style="font-weight:bold;"]').length) return "multiple";
},
};
transIds["6044b16f-2452-4ce8-ad02-fab69ef04f13"] = "AEA Web.js";


splittedTrans["African Journals Online.js"] = {
    "stamp": {"translatorID":"9d822257-2eec-4674-b6d0-2504f54c8890","label":"African Journals Online","creator":"Sebastian Karcher","target":"^https?://www\\.ajol\\.info/index\\.php","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-04-15 18:04:37"},
    "detectWeb": function detectWeb(doc, url) {
	var xpath = '//meta[@name="citation_journal_title"]';

	if (ZU.xpath(doc, xpath).length > 0) {
		return "journalArticle";
	}

	if (url.match(/index\/search|index.php\/[a-z]+$/)) {
		return "multiple";
	}

	return false;
},
};
transIds["9d822257-2eec-4674-b6d0-2504f54c8890"] = "African Journals Online.js";


splittedTrans["Agencia del ISBN.js"] = {
    "stamp": {"translatorID":"b8a86e36-c270-48c9-bdd1-22aaa167ef46","label":"Agencia del ISBN","creator":"Michael Berkowitz","target":"^https?://www\\.mcu\\.es/webISBN","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcs","lastUpdated":"2015-06-10 11:33:38"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.evaluate('//div[@class="isbnResultado"]/div[@class="isbnResDescripcion"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	} else if (doc.evaluate('//div[@class="fichaISBN"]/div[@class="cabecera"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "book";
	}
},
};
transIds["b8a86e36-c270-48c9-bdd1-22aaa167ef46"] = "Agencia del ISBN.js";


splittedTrans["AIP.js"] = {
    "stamp": {"translatorID":"48d3b115-7e09-4134-ad5d-0beda6296761","label":"AIP","creator":"Aurimas Vinckevicius","target":"^https?://scitation\\.aip\\.org/(?:search\\?|content/)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-22 21:36:13"},
    "detectWeb": function detectWeb(doc, url) {
	if(url.indexOf('search') !== -1 && getSearchResults(doc).length) {
		return 'multiple';
	}
	
	if(ZU.xpathText(doc, '/html/head/meta[@name="citation_journal_title"]/@content')) {
		return 'journalArticle';
	}
	else if(doc.body.id == 'conferencepaper') return "conferencePaper"
},
};
transIds["48d3b115-7e09-4134-ad5d-0beda6296761"] = "AIP.js";


splittedTrans["Airiti.js"] = {
    "stamp": {"translatorID":"5f0ca39b-898a-4b1e-b98d-8cd0d6ce9801","label":"Airiti","creator":"Aurimas Vinckevicius","target":"^https?://(?:[^/]+\\.)?airitilibrary\\.com/Publication/alDetailedMesh","minVersion":"3.0","maxVersion":"","priority":110,"inRepository":true,"translatorType":12,"browserSupport":"gcsib","lastUpdated":"2014-05-24 08:05:07"},
    "detectWeb": function detectWeb(doc, url) {
	// How can we distinguish thesis from journal article??
	if(ZU.xpathText(doc, '/html/head/meta[@name="citation_title"]/@content')) {
		return 'journalArticle';
	}
},
};
transIds["5f0ca39b-898a-4b1e-b98d-8cd0d6ce9801"] = "Airiti.js";


splittedTrans["Alexander Street Press.js"] = {
    "stamp": {"translatorID":"0a84a653-79ea-4c6a-8a68-da933e3b504a","translatorType":4,"label":"Alexander Street Press","creator":"John West and Michael Berkowitz","target":"http://(?:www\\.)alexanderstreet","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"lastUpdated":"2009-01-08 08:19:07"},
    "detectWeb": function detectWeb(doc, url) {
	if( url.indexOf("object.details.aspx") != -1 ) {
		var zitemtype = doc.getElementById("ctl00_ctl00_MasterContentBody_ContentPlaceHolder1_txtZType").value;
		switch (zitemtype.toLowerCase()) {
		        case "book":
		        	return "book";
		        	break;
		        case "chapter":
		        	return "bookSection";
		        	break;
		        case "journal":
		        	return "journalArticle";
		        	break;
		        case "manuscript":
		        	return "manuscript";
		        	break;
		        case "audio":
		        	return "audioRecording";
		        	break;
		        case "video":
		        	return "videoRecording";
		        	break;
		        case "issue":
		        	return "journalArticle";
		        	break;
		        case "article":
		        	return "journalArticle";
		        	break;
		        case "series":
		        	return "interview";
		        	break;
		        case "session":
		        	return "interview";
		        	break;
		        default:
		        	return "document";
		}
	} else if (url.indexOf("results.aspx") != -1) {
		return "multiple";
	}
},
};
transIds["0a84a653-79ea-4c6a-8a68-da933e3b504a"] = "Alexander Street Press.js";


splittedTrans["AllAfrica.js"] = {
    "stamp": {"translatorID":"34B1E0EA-FD02-4069-BAE4-ED4D98674A5E","label":"allAfrica.com","creator":"Sebastian Karcher","target":"^https?://allafrica\\.com/(stories|search)/*","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsv","lastUpdated":"2012-11-27 20:18:36"},
    "detectWeb": function detectWeb(doc, url) { if(doc.title) return FW.detectWeb(doc, url); },
};
transIds["34B1E0EA-FD02-4069-BAE4-ED4D98674A5E"] = "AllAfrica.js";


splittedTrans["AlterNet.js"] = {
    "stamp": {"translatorID":"ea531652-cdeb-4ec2-940e-627d4b107263","label":"AlterNet","creator":"Jesse Johnson, BBUCommander","target":"^https?://(?:www\\.)alternet\\.org","minVersion":"2.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-08-25 00:26:50"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["ea531652-cdeb-4ec2-940e-627d4b107263"] = "AlterNet.js";


splittedTrans["Aluka.js"] = {
    "stamp": {"translatorID":"e8fc7ebc-b63d-4eb3-a16c-91da232f7220","label":"Aluka","creator":"Sean Takats, Sebastian Karcher","target":"^https?://(?:www\\.)aluka\\.org/action/(?:showMetadata\\?doi=[^&]+|doSearch\\?|doBrowseResults\\?)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-08-06 19:23:07"},
    "detectWeb": function detectWeb(doc, url){
	var xpath = '//a[@class="title"]';
	var type = ZU.xpathText(doc, '//tr/td[contains(text(), "Resource type")]/following-sibling::td');
	Z.debug(type);
	var itemType = typeMap[type]
	if (itemType){
		return itemType
	}
	else if (url.match(/showMetadata\?doi=[^&]+/)){
		return "document";
	} else if(doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	}
},
};
transIds["e8fc7ebc-b63d-4eb3-a16c-91da232f7220"] = "Aluka.js";


splittedTrans["Amazon.js"] = {
    "stamp": {"translatorID":"96b9f483-c44d-5784-cdad-ce21b984fe01","label":"Amazon","creator":"Sean Takats, Michael Berkowitz, and Simon Kornblith","target":"^https?://((?:www\\.)|(?:smile\\.))?amazon","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2015-03-13 21:29:32"},
    "detectWeb": function detectWeb(doc, url) {
	if(getSearchResults(doc, true)) {
		return (Zotero.isBookmarklet ? "server" : "multiple");
	} else {
		var xpath = '//input[contains(@name, "ASIN")]';
		if(doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
			if(Zotero.isBookmarklet) return "server";
			
			var elmt = doc.evaluate('//input[@name="storeID"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext();
			if(elmt) {
				var storeID = elmt.value;
				//Z.debug(storeID);
				if (storeID=="music"|storeID=="dmusic"){
					return "audioRecording";
				} else if (storeID=="dvd"|storeID=="dvd-de"|storeID=="video"|storeID=="movies-tv"){
					return "videoRecording";
				} else if (storeID=="videogames"|storeID=="mobile-apps") {
					return "computerProgram";
				} else {
					return "book";
				}
			} else {
				return "book";
			}
		}
	}
},
};
transIds["96b9f483-c44d-5784-cdad-ce21b984fe01"] = "Amazon.js";


splittedTrans["American Institute of Aeronautics and Astronautics.js"] = {
    "stamp": {"translatorID":"75edc5a1-6470-465a-a928-ccb77d95eb72","label":"American Institute of Aeronautics and Astronautics","creator":"Michael Berkowitz","target":"^https?://arc\\.aiaa\\.org/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcv","lastUpdated":"2013-12-12 03:22:14"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/\/doi\/abs\/10\.|\/doi\/full\/10\./)) {
		return "journalArticle";
	} else if(url.match(/\/action\/doSearch\?|\/toc\//))
		{
		return "multiple";
	}
},
};
transIds["75edc5a1-6470-465a-a928-ccb77d95eb72"] = "American Institute of Aeronautics and Astronautics.js";


splittedTrans["American Prospect.js"] = {
    "stamp": {"translatorID":"57fd3205-7211-4b9b-ad39-d2747247d0af","label":"American Prospect","creator":"Sebastian Karcher","target":"^https?://(www\\.)?prospect\\.org","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2013-01-09 15:36:32"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["57fd3205-7211-4b9b-ad39-d2747247d0af"] = "American Prospect.js";


splittedTrans["AMS Journals.js"] = {
    "stamp": {"translatorID":"bdaac15c-b0ee-453f-9f1d-f35d00c7a994","label":"AMS Journals","creator":"Michael Berkowitz","target":"^https?://www\\.ams\\.org/journals/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-12-04 16:57:35"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/home\.html|\d{4}[^\/]*\/.+/)) {
		return "journalArticle";
	}
	/*multiples are currently broken
	else if (url.match(/jour(nals|search)/)) {
		return "multiple";
	} */
},
};
transIds["bdaac15c-b0ee-453f-9f1d-f35d00c7a994"] = "AMS Journals.js";


splittedTrans["AMS MathSciNet.js"] = {
    "stamp": {"translatorID":"a354331-981b-43de-a61-bc26dd1be3a9","label":"AMS MathSciNet","creator":"Simon Kornblith","target":"^https?://(www\\.)?ams\\.[^/]*/mathscinet(\\-getitem\\?|/search/(?:publications\\.html|publdoc\\.html))","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-06-06 18:23:10"},
    "detectWeb": function detectWeb(doc, url) {
	
	var tableRows = doc.evaluate('//form/div[contains(@class,"headline")]', doc, null,
			XPathResult.ANY_TYPE, null);
	var itemType;
	if(tableRows.iterateNext()) {
		return "multiple"
	} else if(itemType = ZU.xpathText(doc, '//div[@class="headlineMenu"]/*[last()-1]')) {
		switch(itemType.trim().toLowerCase()) {
			case 'article':
				return "journalArticle";
			case 'book':
				return "book";
			case 'chapter':
				return "bookSection";
		}	
	}
},
};
transIds["a354331-981b-43de-a61-bc26dd1be3a9"] = "AMS MathSciNet.js";


splittedTrans["Ancestry.com US Federal Census.js"] = {
    "stamp": {"translatorID":"0dda3f89-15de-4479-987f-cc13f1ba7999","label":"Ancestry.com US Federal Census","creator":"Elena Razlogova","target":"^https?://search\\.ancestry\\.com/.*(usfedcen|1890orgcen|1910uscenindex)","minVersion":"1.0.0b4.r1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"g","lastUpdated":"2015-06-02 10:57:09"},
    "detectWeb": function detectWeb(doc, url) {
	var namespace = doc.documentElement.namespaceURI;
	var nsResolver = namespace ? function(prefix) {
		if (prefix == 'x') return namespace; else return null;
	} : null;
		
	var result = doc.evaluate('//div[@class="g_container"]/div[@class="g_panelWrap"]/div[@class="g_panelCore"]/div[@class="s_container"]/div[@class="p_rsltList"]', doc, nsResolver,
	             XPathResult.ANY_TYPE, null).iterateNext();

	var rows = doc.evaluate('//div[@class="g_container"]/div[@class="g_panelWrap"]/div[@class="g_panelCore"]/div[@class="s_container"]/div[@class="p_rsltList"]/table/tbody/tr[@class="tblrow record"]', 
				doc, nsResolver, XPathResult.ANY_TYPE, null);
	var row;
	while(row = rows.iterateNext()) {
		links = doc.evaluate('.//a', row, nsResolver, XPathResult.ANY_TYPE, null);
		var linkNo=0;
		while(link=links.iterateNext()) {
			linkNo=linkNo+1;
		}
		break;
	}
	
	if(result && linkNo == 2) {
		return "multiple";
	} else {
		var indivRe = /indiv=1/;
		var m = indivRe.exec(doc.location.href);
		var indiv = 0;
		if(m) {
			indiv = 1;
			}

		checkURL = doc.location.href.replace("pf=", "");
		if(doc.location.href == checkURL && indiv == 1) {
			return "bookSection";
		}
	} 
},
};
transIds["0dda3f89-15de-4479-987f-cc13f1ba7999"] = "Ancestry.com US Federal Census.js";


splittedTrans["Annual Reviews.js"] = {
    "stamp": {"translatorID":"5f22bd25-5b70-11e1-bb1d-c4f24aa18c1e","label":"Annual Reviews","creator":"Aurimas Vinckevicius","target":"https?://[^/]*annualreviews\\.org(:[\\d]+)?(?=/)[^?]*(/(toc|journal|doi)/|showMost(Read|Cited)Articles|doSearch)","minVersion":"3.0","maxVersion":"","priority":150,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-08-26 03:31:19"},
    "detectWeb": function detectWeb(doc, url) {
	var title = doc.title.toLowerCase();

	if( url.match(/\/doi\/(abs|full|pdf)\//) ) {

		return 'journalArticle';

	} else if( title.match('- table of contents -') ||
		title.match('- most downloaded reviews') ||
		title.match('- most cited reviews') ||
		title.match('- forthcoming -') ||
		title.match('search results') ||
		url.match('/journal/') ) {		//individual journal home page

		return 'multiple';
	}
},
};
transIds["5f22bd25-5b70-11e1-bb1d-c4f24aa18c1e"] = "Annual Reviews.js";


splittedTrans["APA PsycNET.js"] = {
    "stamp": {"translatorID":"1e1e35be-6264-45a0-ad2e-7212040eb984","label":"APA PsycNET","creator":"Michael Berkowitz and Aurimas Vinckevicius","target":"^https?://psycnet\\.apa\\.org/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-04-24 21:47:37"},
    "detectWeb": function detectWeb(doc, url) {
	var type;
	url = url.toLowerCase();
	if (url.indexOf('search.searchresults') != -1) {
	//permission error (still relevant?)
	//return false;
		return "multiple";
	}

	if(url.indexOf('search.displayrecord') != -1) {
		type = doc.getElementById('rdcPubType');
		if(!type) return false;
		type = type.textContent.replace(/[\s\[\]]/g,'').split(';');
		switch(type[0].toLowerCase()) {
			case 'book':
				return 'book';
			case 'chapter':
				return 'bookSection';
			case 'journalarticle':
			case 'editorial':
				return 'journalArticle';
			default:
				return false;
		}
	}

	if(url.search(/journals\/\S+\/\d+\/\d+\/\d+\//) != -1) {
		return "journalArticle";
	}

	if(url.search(/\/books\/\d+/) != -1) {
		var pubType = doc.getElementById('rdcPubType');
		if (pubType && pubType.textContent.indexOf('Chapter') != -1) {
			return "bookSection";
		}
		
		fields.title = '(//h3[@id="bwcBookTitle"])[1]';
		fields.authors = '(//div[@id="bwcBookAuthors"])[1]';
		fields.voliss = '(//div[@id="bwcBookSource"])[1]';
		fields.abstract = '(//div[@id="bwcAbstract"])[1]';

		return "book";
	}

	if(url.indexOf('buy.optiontobuy') != -1
		&& url.indexOf('id=') != -1
		&& (type = doc.getElementById('obArticleHeaderText')) ) {
		fields.title = '(//div[@id="obArticleTitleHighlighted"])[1]';
		fields.authors = '(//div[@id="obAuthor"])[1]';
		fields.voliss = '(//div[@id="obSource"])[1]';
		fields.abstract = '(//div[@id="obAbstract"])[1]';

		if(type.textContent.toLowerCase().indexOf('article') != -1) {
			return 'journalArticle';
		}

		if(type.textContent.toLowerCase().indexOf('chapter') != -1) {
			return 'bookSection';
		}
	}

	/**for the book database - item IDs ending in 000 are books
	 * everything else chapters
	 */
	if (url.search(/psycinfo\/[0-9]{4}-[0-9]+-000/) != -1){
		return "book";
	}

	if (url.search(/psycinfo\/[0-9]{4}-[0-9]+-[0-9]{3}/) != -1){
		return "bookSection";
	}
},
};
transIds["1e1e35be-6264-45a0-ad2e-7212040eb984"] = "APA PsycNET.js";


splittedTrans["APN.ru.js"] = {
    "stamp": {"translatorID":"737216af-fc48-4aa5-bfae-560c9cfc5df5","label":"Агенство политических новостей","creator":"Avram Lyon","target":"^https?:\\/\\/www\\.apn\\.ru\\/","minVersion":"2.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-03-03 23:38:28"},
    "detectWeb": function detectWeb(doc, url) { 
		return FW.detectWeb(doc, url);
},
};
transIds["737216af-fc48-4aa5-bfae-560c9cfc5df5"] = "APN.ru.js";


splittedTrans["APS-Physics.js"] = {
    "stamp": {"translatorID":"f318ab1e-71c6-4f67-8ac3-4b1144e5bf4e","label":"APS-Physics","creator":"Will Shanks","target":"^https?://(?:www\\.)?(physics)\\.aps\\.org([^/]*/(articles|story)/?|/browse(\\?|$))","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-12-06 17:44:20"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("/browse")!=-1) return "multiple";
	else return "journalArticle";
},
};
transIds["f318ab1e-71c6-4f67-8ac3-4b1144e5bf4e"] = "APS-Physics.js";


splittedTrans["APS.js"] = {
    "stamp": {"translatorID":"2c310a37-a4dd-48d2-82c9-bd29c53c1c76","label":"APS","creator":"Aurimas Vinckevicius","target":"^https?://journals\\.aps\\.org/([^/]+/(abstract|supplemental|references|cited-by|issues)/|search\\?)","minVersion":"3.0.12","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-03-18 01:28:18"},
    "detectWeb": function detectWeb(doc, url) {
	if(getSearchResults(doc).length){
		return "multiple";
	}
	
	var title = doc.getElementById('title');
	if(title && ZU.xpath(title, './/a[@data-reveal-id="export-article"]').length) {
		return "journalArticle";
	}
},
};
transIds["2c310a37-a4dd-48d2-82c9-bd29c53c1c76"] = "APS.js";


splittedTrans["Archeion.js"] = {
    "stamp": {"translatorID":"f6717cbb-2771-4043-bde9-dbae19129bb3","label":"Archeion - MemoryBC - Aberta on Record","creator":"Sebastian Karcher","target":"^https?://www\\.(archeion|memorybc|albertaonrecord)\\.ca","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-02-27 22:58:40"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/;search\?/)) {
		return "multiple";
	} else if (url.match(/;rad$/)|| ZU.xpathText(doc, '//section[@id="action-icons"]//a[contains(@href, ";dc?sf_format=xml")]/@href')) {
		return "book";
	}
},
};
transIds["f6717cbb-2771-4043-bde9-dbae19129bb3"] = "Archeion.js";


splittedTrans["Archiv fuer Sozialgeschichte.js"] = {
    "stamp": {"translatorID":"7ecb9512-9195-478a-a525-40e71b01f3b0","label":"Archiv fuer Sozialgeschichte","creator":"Sebastian Karcher","target":"^https?://library\\.fes\\.de/jportal/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcbv","lastUpdated":"2013-05-15 20:05:47"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("MCRSearchServlet?mode=results")!=-1 || url.indexOf("/receive/jportal_jpvolume_")!=-1) {
		return "multiple";
	} 
	else if (url.indexOf("/receive/jportal_jparticle")!=-1) return "journalArticle"
},
};
transIds["7ecb9512-9195-478a-a525-40e71b01f3b0"] = "Archiv fuer Sozialgeschichte.js";


splittedTrans["Archive Ouverte en Sciences de l'Information et de la Communication  (AOSIC).js"] = {
    "stamp": {"translatorID":"dedcae51-073c-48fb-85ce-2425e97f128d","label":"Archive Ouverte en Sciences de l'Information et de la Communication  (AOSIC)","creator":"Michael Berkowitz","target":"^https?://archivesic\\.ccsd\\.cnrs\\.fr/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-02 05:58:49"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.title.toLowerCase().match(/::\ search|::\ recherche/)) {
	return "multiple";
	//return false;
	} else if (url.match(/sic_\d+|tel-\d+/)) {
		return "journalArticle";
	}
},
};
transIds["dedcae51-073c-48fb-85ce-2425e97f128d"] = "Archive Ouverte en Sciences de l'Information et de la Communication  (AOSIC).js";


splittedTrans["Archives Canada-France.js"] = {
    "stamp": {"translatorID":"d9a16cf3-8b86-4cab-8610-dbd913ad1a44","label":"Archives Canada-France","creator":"Adam Crymble","target":"^https?://bd\\.archivescanadafrance\\.org","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"browserSupport":"gcsibv","inRepository":true,"translatorType":4,"lastUpdated":"2012-01-01 01:42:16"},
    "detectWeb": function detectWeb(doc, url) {
	
	if (doc.location.href.match("doc.xsp?")) {
		return "book";
	} else if (doc.evaluate('//li/a', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	} else if (doc.evaluate('//td[1][@class="icones"]/a', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	}
},
};
transIds["d9a16cf3-8b86-4cab-8610-dbd913ad1a44"] = "Archives Canada-France.js";


splittedTrans["Archives Canada.js"] = {
    "stamp": {"translatorID":"18bc329c-51af-497e-a7cf-aa572fae363d","label":"Archives Canada","creator":"Adam Crymble","target":"^https?://(www\\.)?archivescanada\\.ca","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2013-12-07 15:18:12"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.location.href.match("RouteRqst")) {
		return "multiple";
	} else if (doc.location.href.match("ItemDisplay")) {
		return "book";
	}	
},
};
transIds["18bc329c-51af-497e-a7cf-aa572fae363d"] = "Archives Canada.js";


splittedTrans["Artefacts Canada.js"] = {
    "stamp": {"translatorID":"661fc39a-2500-4710-8285-2d67ddc00a69","label":"Artefacts Canada","creator":"Adam Crymble","target":"^https?://(www\\.)?pro\\.rcip-chin\\.gc\\.ca","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-09-16 00:25:18"},
    "detectWeb": function detectWeb(doc, url) {
	var multi1 = '';
	var single1 = '';
	
	if (doc.evaluate('//div[@id="mainContent"]/table/tbody/tr/td[1]/h1', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		
		multi1 = doc.evaluate('//div[@id="mainContent"]/table/tbody/tr/td[1]/h1', doc, null, XPathResult.ANY_TYPE, null).iterateNext().textContent;
	}
	
	var xpath = '//tbody/tr[1]/td[2]/span';
	if (doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		single1 = doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null).iterateNext().textContent;
	}
	
	if (multi1.match("Search Results") || multi1.match("Résultats de recherche")) {
		return "multiple";
	} else if (single1.match("Document") || single1.match("Enregistrement")) {
		return "artwork";
	}
	
},
};
transIds["661fc39a-2500-4710-8285-2d67ddc00a69"] = "Artefacts Canada.js";


splittedTrans["ARTFL Encyclopedie.js"] = {
    "stamp": {"translatorID":"72cb2536-3211-41e0-ae8b-974c0385e085","label":"ARTFL Encyclopedie","creator":"Sean Takats, Sebastian Karcher","target":"^https?://artflsrv\\d+\\.uchicago\\.edu/cgi-bin/philologic/(getobject\\.pl\\?[cp]\\.[0-9]+:[0-9]+(:[0-9]+)?\\.encyclopedie|navigate.pl\\?encyclopedie|search3t\\?dbname=encyclopedie)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcv","lastUpdated":"2014-03-12 04:43:57"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("getobject.pl") != -1){
		return "encyclopediaArticle";
	} else if (url.indexOf("navigate.pl")!=-1){//browsing
		return "multiple";
	} else if (url.indexOf("search3t?")!=-1){//search results
		return "multiple"
	}
},
};
transIds["72cb2536-3211-41e0-ae8b-974c0385e085"] = "ARTFL Encyclopedie.js";


splittedTrans["ARTstor.js"] = {
    "stamp": {"translatorID":"5278b20c-7c2c-4599-a785-12198ea648bf","label":"ARTstor","creator":"Sebastian Karcher","target":"^https?://library\\.artstor\\.org","minVersion":"3.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcs","lastUpdated":"2014-11-13 15:09:17"},
    "detectWeb": function detectWeb(doc, url) {
	//monitor changes to body's direct children. That's where the metadata popup is added
	Zotero.monitorDOMChanges(doc.body, {childList: true});

	if (getData(doc, true)) {
		return "artwork";
	}
},
};
transIds["5278b20c-7c2c-4599-a785-12198ea648bf"] = "ARTstor.js";


splittedTrans["arXiv.org.js"] = {
    "stamp": {"translatorID":"ecddda2e-4fc6-4aea-9f17-ef3b56d7377a","label":"arXiv.org","creator":"Sean Takats and Michael Berkowitz","target":"^https?://(?:[^\\.]+\\.)?(?:(?:arxiv\\.org|xxx.lanl.gov)/(?:find/\\w|list/\\w|abs/)|eprintweb.org/S/(?:search|archive|article)(?!.*(?:refs|cited)$))","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsv","lastUpdated":"2014-06-07 08:29:23"},
    "detectWeb": function detectWeb(doc, url) {
	var searchRe = /^https?:\/\/(?:([^\.]+\.))?(?:(?:arxiv\.org|xxx\.lanl\.gov)\/(?:find|list)|eprintweb.org\/S\/(?:archive|search$))/;
	
	if(searchRe.test(url)) {
		return "multiple";
	} else {
		return "journalArticle";
	}
},
};
transIds["ecddda2e-4fc6-4aea-9f17-ef3b56d7377a"] = "arXiv.org.js";


splittedTrans["ASCE.js"] = {
    "stamp": {"translatorID":"303bdfc5-11b8-4107-bca1-63ca97701a0f","label":"ASCE","creator":"Sebastian Karcher","target":"^https?://(www\\.)?ascelibrary\\.org/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-06-24 14:22:53"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/\/doi\/abs\/10\.|\/doi\/full\/10\./)) {
		return "journalArticle";
	} else if(url.match(/\/action\/doSearch\?|\/toc\//))
		{
		return "multiple";
	}
},
};
transIds["303bdfc5-11b8-4107-bca1-63ca97701a0f"] = "ASCE.js";


splittedTrans["ASCO Meeting Library.js"] = {
    "stamp": {"translatorID":"03d1aac2-bee2-43f4-8d9c-b96ef31e8c61","label":"ASCO Meeting Library","creator":"Sebastian Karcher","target":"^https?://meetinglibrary\\.asco.\\org/(content|search)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-09-18 23:57:40"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["03d1aac2-bee2-43f4-8d9c-b96ef31e8c61"] = "ASCO Meeting Library.js";


splittedTrans["Atlanta Journal Constitution.js"] = {
    "stamp": {"translatorID":"01322929-5782-4612-81f7-d861fb46d9f2","label":"Atlanta Journal Constitution","creator":"Sebastian Karcher","target":"^https?://(www\\.|blogs\\.)?ajc\\.com","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-09-16 00:28:46"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["01322929-5782-4612-81f7-d861fb46d9f2"] = "Atlanta Journal Constitution.js";


splittedTrans["Atypon Journals.js"] = {
    "stamp": {"translatorID":"5af42734-7cd5-4c69-97fc-bc406999bdba","label":"Atypon Journals","creator":"Sebastian Karcher","target":"^https?://[^?#]+(?:/doi/(?:abs|abstract|full|figure|ref|citedby|book)/10\\.|/action/doSearch\\?)|^https?://[^/]+/toc/","minVersion":"3.0","maxVersion":"","priority":270,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-10-04 22:19:55"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.search(/^https?:\/\/[^\/]+\/toc\/|\/action\/doSearch\?/) != -1) {
		return getSearchResults(doc, true) ? "multiple" : false;
	}
	
	if (url.indexOf('/doi/book/') != -1) {
		return 'book';
	}
	else if (url.search(/\.ch\d+$/)!=-1){
		return 'bookSection';
	}
	return "journalArticle";
},
};
transIds["5af42734-7cd5-4c69-97fc-bc406999bdba"] = "Atypon Journals.js";


splittedTrans["AustLII and NZLII.js"] = {
    "stamp": {"translatorID":"5ed5ab01-899f-4a3b-a74c-290fb2a1c9a4","label":"AustLII and NZLII","creator":"Bill McKinney and Sebastian Karcher","target":"^https?://www\\.(?:austlii\\.edu\\.au|nzlii\\.org)","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-05-16 23:48:05"},
    "detectWeb": function detectWeb(doc, url) {
	var austliiRegexp = /\/cases\/.+\d\.html/
	if(austliiRegexp.test(url)) {
		return "case";
	} else {
		var aTags = doc.getElementsByTagName("a");
		for(var i=0; i<aTags.length; i++) {
			if(austliiRegexp.test(aTags[i].href)) {
				return "multiple";
			}
		}
	}
},
};
transIds["5ed5ab01-899f-4a3b-a74c-290fb2a1c9a4"] = "AustLII and NZLII.js";


splittedTrans["Australian Dictionary of Biography.js"] = {
    "stamp": {"translatorID":"0aea3026-a246-4201-a4b5-265f75b9a6a7","label":"Australian Dictionary of Biography","creator":"Sebastian Karcher","target":"^https?://adb\\.anu\\.edu\\.au/biography/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2012-03-19 11:33:08"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["0aea3026-a246-4201-a4b5-265f75b9a6a7"] = "Australian Dictionary of Biography.js";


splittedTrans["BAILII.js"] = {
    "stamp": {"translatorID":"5ae63913-669a-4792-9f45-e089a37de9ab","label":"BAILII","creator":"Bill McKinney","target":"^https?:\\/\\/www\\.bailii\\.org(?:\\/cgi\\-bin\\/markup\\.cgi\\?doc\\=)?\\/\\w+\\/cases\\/.+","minVersion":"1.0.0b4.r1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-03 16:36:35"},
    "detectWeb": function detectWeb(doc, url) {
	var liiRegexp= /^https?:\/\/www\.bailii\.org(?:\/cgi\-bin\/markup\.cgi\?doc\=)?\/\w+\/cases\/.+\.html/
	if(liiRegexp.test(url)) {
		return "case";
	} else {
		var aTags = doc.getElementsByTagName("a");
		for(var i=0; i<aTags.length; i++) {
			if(liiRegexp.test(aTags[i].href)) {
				return "multiple";
			}
		}
	}
},
};
transIds["5ae63913-669a-4792-9f45-e089a37de9ab"] = "BAILII.js";


splittedTrans["BBC.js"] = {
    "stamp": {"translatorID":"f4130157-93f7-4493-8f24-a7c85549013d","label":"BBC","creator":"Ben Parr","target":"^https?://(?:www|news?)\\.bbc\\.co\\.uk","minVersion":"1.0.0b4.r1","maxVersion":"","priority":100,"browserSupport":"gcsibv","inRepository":true,"translatorType":4,"lastUpdated":"2012-08-06 19:23:07"},
    "detectWeb": function detectWeb(doc, url)
{

	   var namespace = doc.documentElement.namespaceURI;
	  var nsResolver = namespace ? function(prefix) {
	  if (prefix == 'x') return namespace; else return null;
	  } : null;

	var xpath;
	  
	 xpath='//meta[@name="Headline"]';
	 if(content=doc.evaluate(xpath, doc, nsResolver,XPathResult.ANY_TYPE, null).iterateNext())
	 { return "newspaperArticle";  }
	 
	 xpath='//font[@class="poshead"]/b';
	 if(doc.evaluate(xpath, doc, nsResolver,XPathResult.ANY_TYPE, null).iterateNext())
	{ return "newspaperArticle";  }
	
	  return null;
},
};
transIds["f4130157-93f7-4493-8f24-a7c85549013d"] = "BBC.js";


splittedTrans["beck-online.js"] = {
    "stamp": {"translatorID":"e8544423-1515-4daf-bb5d-3202bf422b58","label":"beck-online","creator":"Philipp Zumstein","target":"^https?://beck-online\\.beck\\.de/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcs","lastUpdated":"2015-03-29 09:11:30"},
    "detectWeb": function detectWeb(doc, url) {
	var dokument = doc.getElementById("dokument");
	if (!dokument) return;
	
	var type = mappingClassNameToItemType[dokument.className.toUpperCase()];
	
	if (type == 'multiple') {
		return getSearchResults(doc, true) ? type : false;
	}
	
	return type;
},
};
transIds["e8544423-1515-4daf-bb5d-3202bf422b58"] = "beck-online.js";


splittedTrans["Beobachter.js"] = {
    "stamp": {"translatorID":"a571680e-6338-46c2-a740-3cd9eb80fc7f","label":"Beobachter","creator":"ibex","target":"^https?://((www\\.)?beobachter\\.ch/.)","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-03 16:37:44"},
    "detectWeb": function detectWeb(doc, url) {
	// Z.debug("ibex detectWeb URL = " + url);
	if (doc.location.href.match(/.*\/artikel\//i) && (ZU.xpath(doc, '//div[' + containingClass('mediaarticleSingleView') + ']//h3').length > 0)) {
		return "magazineArticle";
	// AJAX-ified results are currently not compatible with Zotero.
	// The following condition is not useful:
	// http://forums.zotero.org/discussion/18518/import-citation-from-an-ajaxbased-site/
	// } else if (doc.location.href.match(/\/suche\//i) && (ZU.xpath(doc, '//div[@id = "multiSerachListContainer"]') + ']').length > 0)) {
	} else if (ZU.xpath(doc, '//html/body[' + containingClass('article') + ']').length > 0) {
		return "multiple";
	}
},
};
transIds["a571680e-6338-46c2-a740-3cd9eb80fc7f"] = "Beobachter.js";


splittedTrans["Bezneng Gajit.js"] = {
    "stamp": {"translatorID":"7500180d-ca99-4ef7-a9a9-3e58bba91d28","label":"Безнең гәҗит","creator":"Avram Lyon","target":"^https?://(?:www\\.)?beznen\\.ru","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2013-12-11 21:31:13"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["7500180d-ca99-4ef7-a9a9-3e58bba91d28"] = "Bezneng Gajit.js";


splittedTrans["BibLaTeX.js"] = {
    "stamp": {"translatorID":"b6e39b57-8942-4d11-8259-342c46ce395f","translatorType":2,"label":"BibLaTeX","creator":"Simon Kornblith, Richard Karnesky and Anders Johansson","target":"bib","minVersion":"2.1.9","maxVersion":"null","priority":100,"inRepository":true,"configOptions":{"getCollections":true},"displayOptions":{"exportCharset":"UTF-8","exportNotes":false,"exportFileData":false,"useJournalAbbreviation":false},"lastUpdated":"2014-08-25 06:43:15"},
};
transIds["b6e39b57-8942-4d11-8259-342c46ce395f"] = "BibLaTeX.js";


splittedTrans["Biblio.com.js"] = {
    "stamp": {"translatorID":"9932d1a7-cc6d-4d83-8462-8f6658b13dc0","label":"Biblio.com","creator":"Adam Crymble, Michael Berkowitz, and Sebastian Karcher","target":"^https?://www\\.biblio\\.com/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-02 08:32:10"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.location.href.match("bookseller_search") || doc.location.href.match("bookstores") || doc.location.href.match("textbooks")) {
		
	} else if (doc.location.href.search(/\/search\.php/)!=-1) {
		return "multiple";
	} else if (doc.location.href.search(/\/book/)!=-1) {
		return "book";
	}
},
};
transIds["9932d1a7-cc6d-4d83-8462-8f6658b13dc0"] = "Biblio.com.js";


splittedTrans["Bibliontology RDF.js"] = {
    "stamp": {"translatorID":"14763d25-8ba0-45df-8f52-b8d1108e7ac9","translatorType":3,"label":"Bibliontology RDF","creator":"Simon Kornblith","target":"rdf","minVersion":"2.0","maxVersion":"","priority":50,"browserSupport":"gcs","configOptions":{"getCollections":"true","dataMode":"rdf/xml"},"displayOptions":{"exportNotes":true},"inRepository":false,"lastUpdated":"2015-06-27 13:43:17"},
"detectImport": function detectImport() {
	// look for a bibo item type
	var rdfTypes = Zotero.RDF.getStatementsMatching(null, RDF_TYPE, null);
	if(rdfTypes) {
		for (var i=0; i<rdfTypes.length; i++) {
			if(typeof rdfTypes[i][2] === "object" && Z.RDF.getResourceURI(rdfTypes[i][2]).substr(0, BIBO_NS_LENGTH) == n.bibo) return true;
		}
	}
	return false;
},};
transIds["14763d25-8ba0-45df-8f52-b8d1108e7ac9"] = "Bibliontology RDF.js";


splittedTrans["Bibliotheque et Archives Nationale du Quebec (Pistard).js"] = {
    "stamp": {"translatorID":"1eb5eb03-26ab-4015-bd0d-65487734744a","translatorType":4,"label":"Bibliotheque et Archives Nationale du Quebec (Pistard)","creator":"Adam Crymble","target":"http://pistard.banq.qc.ca","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"lastUpdated":"2008-08-06 17:00:00"},
    "detectWeb": function detectWeb(doc, url) {
	
	if (doc.title.match("Liste détaillée des fonds")) {
		return "multiple";
	} else if (doc.title.match("Description fonds")) {
		return "book";
	}
},
};
transIds["1eb5eb03-26ab-4015-bd0d-65487734744a"] = "Bibliotheque et Archives Nationale du Quebec (Pistard).js";


splittedTrans["Bibliotheque et Archives nationales du Quebec.js"] = {
    "stamp": {"translatorID":"59cce211-9d77-4cdd-876d-6229ea20367f","translatorType":4,"label":"Bibliothèque et Archives nationales du Québec","creator":"Adam Crymble","target":"http://catalogue.banq.qc.ca","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"lastUpdated":"2008-12-12 12:35:00"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.title.match("Search")) {
		return "multiple";
	} else if (doc.title.match("Recherche")) {
		return "multiple";
		
	} else if (doc.evaluate('//td[2]/a/img', doc, null, XPathResult.ANY_TYPE, null).iterateNext().src.match("book")) {
		return "book";
	} else if (doc.evaluate('//td[2]/a/img', doc, null, XPathResult.ANY_TYPE, null).iterateNext().src.match("mmusic")) {
		return "book";	
	} else if (doc.evaluate('//td[2]/a/img', doc, null, XPathResult.ANY_TYPE, null).iterateNext().src.match("manalytic")) {
		return "book";
		
	} else if (doc.evaluate('//td[2]/a/img', doc, null, XPathResult.ANY_TYPE, null).iterateNext().src.match("msdisc")) {
		return "audioRecording";
	} else if (doc.evaluate('//td[2]/a/img', doc, null, XPathResult.ANY_TYPE, null).iterateNext().src.match("msound")) {
		return "audioRecording";
	} else if (doc.evaluate('//td[2]/a/img', doc, null, XPathResult.ANY_TYPE, null).iterateNext().src.match("mscas")) {
		return "audioRecording";
		
	} else if (doc.evaluate('//td[2]/a/img', doc, null, XPathResult.ANY_TYPE, null).iterateNext().src.match("mvdisc")) {
		return "videoRecording";
	
	} else if (doc.evaluate('//td[2]/a/img', doc, null, XPathResult.ANY_TYPE, null).iterateNext().src.match("mpaint")) {
		return "artwork";
	
	} else if (doc.evaluate('//td[2]/a/img', doc, null, XPathResult.ANY_TYPE, null).iterateNext().src.match("mserial")) {
		return "report";
	
	} else if (doc.evaluate('//td[2]/a/img', doc, null, XPathResult.ANY_TYPE, null).iterateNext().src.match("mcomponent")) {
		return "newspaperArticle";
	}
},
};
transIds["59cce211-9d77-4cdd-876d-6229ea20367f"] = "Bibliotheque et Archives nationales du Quebec.js";


splittedTrans["Bibliotheque nationale de France.js"] = {
    "stamp": {"translatorID":"47533cd7-ccaa-47a7-81bb-71c45e68a74d","label":"Bibliothèque nationale de France","creator":"Florian Ziche","target":"^https?://[^/]*catalogue\\.bnf\\.fr","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"g","lastUpdated":"2013-02-28 14:51:02"},
    "detectWeb": function detectWeb(doc, url) {
	var resultRegexp = /ID=[0-9]+/i;
	//Single result ?
	if(resultRegexp.test(url)) {
		var type = Bnf.getDCType(doc, url);
		return Bnf.translateDCType(type);
	} 
	//Muliple result ?
	else if(Bnf.getResultsTable(doc)) {
		return "multiple";
	}
	//No items 
	return undefined;
},
};
transIds["47533cd7-ccaa-47a7-81bb-71c45e68a74d"] = "Bibliotheque nationale de France.js";


splittedTrans["BIBSYS.js"] = {
    "stamp": {"translatorID":"ab961e61-2a8a-4be1-b8a3-044f20d52d78","label":"BIBSYS","creator":"Ramesh Srigiriraju","target":"^https?://ask\\.bibsys\\.no/ask/action","minVersion":"1.0.0b4.r1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-04-04 10:08:22"},
    "detectWeb": function detectWeb(doc, url)	{
	var multireg=new RegExp("^https?://ask\.bibsys\.no/ask/action/result");
	if(multireg.test(url))
		return "multiple";
	var singlereg=new RegExp("^https?://ask\.bibsys\.no/ask/action/show");
	if(singlereg.test(url))
		return "book";
},
};
transIds["ab961e61-2a8a-4be1-b8a3-044f20d52d78"] = "BIBSYS.js";


splittedTrans["BibTeX.js"] = {
    "stamp": {"translatorID":"9cb70025-a888-4a29-a210-93ec52da40d4","label":"BibTeX","creator":"Simon Kornblith, Richard Karnesky and Emiliano heyns","target":"bib","minVersion":"2.1.9","maxVersion":"","priority":200,"configOptions":{"getCollections":true},"displayOptions":{"exportCharset":"UTF-8","exportNotes":true,"exportFileData":false,"useJournalAbbreviation":false},"inRepository":true,"translatorType":3,"browserSupport":"gcsv","lastUpdated":"2015-05-20 22:03:17"},
"detectImport": function detectImport() {
	var maxChars = 1048576; // 1MB
	
	var inComment = false;
	var block = "";
	var buffer = "";
	var chr = "";
	var charsRead = 0;
	
	var re = /^\s*@[a-zA-Z]+[\(\{]/;
	while((buffer = Zotero.read(4096)) && charsRead < maxChars) {
		Zotero.debug("Scanning " + buffer.length + " characters for BibTeX");
		charsRead += buffer.length;
		for (var i=0; i<buffer.length; i++) {
			chr = buffer[i];
			
			if (inComment && chr != "\r" && chr != "\n") {
				continue;
			}
			inComment = false;
			
			if(chr == "%") {
				// read until next newline
				block = "";
				inComment = true;
			} else if((chr == "\n" || chr == "\r"
				// allow one-line entries
						|| i == (buffer.length - 1))
						&& block) {
				// check if this is a BibTeX entry
				if(re.test(block)) {
					return true;
				}
				
				block = "";
			} else if(" \n\r\t".indexOf(chr) == -1) {
				block += chr;
			}
		}
	}
},};
transIds["9cb70025-a888-4a29-a210-93ec52da40d4"] = "BibTeX.js";


splittedTrans["BioOne.js"] = {
    "stamp": {"translatorID":"7cb0089b-9551-44b2-abca-eb03cbf586d9","label":"BioOne","creator":"Michael Berkowitz","target":"^https?://[^/]*www\\.bioone\\.org[^/]*/s","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-03 16:38:14"},
    "detectWeb": function detectWeb(doc, url) {
  if (url.match(/\/doi\/abs\/10\.|\/doi\/full\/10\./))	return "journalArticle";
  else if(url.match(/\/action\/doSearch|\/toc\//))	return "multiple";
},
};
transIds["7cb0089b-9551-44b2-abca-eb03cbf586d9"] = "BioOne.js";


splittedTrans["Blaetter.js"] = {
    "stamp": {"translatorID":"e8e10bd4-fd6f-4297-a060-a8e0a479043f","label":"Blaetter fuer deutsche und internationale Politik","creator":"Martin Meyerhoff","target":"^https?://www\\.blaetter\\.de","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-03 16:42:18"},
    "detectWeb": function detectWeb(doc, url) {

	// I use XPaths. Therefore, I need the following block.
	var Blaetter_ArticleTools_XPath = ".//div[contains(@id, 'node')]/h2";
	var Blaetter_Multiple_XPath = ".//div[contains(@class, 'teaser') and not(contains(@class, 'dossier'))]/h3[@class='headline']/a";
	
	if (doc.evaluate(Blaetter_ArticleTools_XPath, doc, null, XPathResult.ANY_TYPE, null).iterateNext() ){ 
		Zotero.debug("magazineArticle");
		return "magazineArticle";
	} else if (doc.evaluate(Blaetter_Multiple_XPath, doc, null, XPathResult.ANY_TYPE, null).iterateNext() ){ 
		Zotero.debug("multiple");
		return "multiple";
	}
},
};
transIds["e8e10bd4-fd6f-4297-a060-a8e0a479043f"] = "Blaetter.js";


splittedTrans["Blogger.js"] = {
    "stamp": {"translatorID":"6f9aa90d-6631-4459-81ef-a0758d2e3921","label":"Blogger","creator":"Adam Crymble","target":"\\.blogspot\\.com","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-02-14 00:20:16"},
    "detectWeb": function detectWeb(doc, url) {
	var result = doc.evaluate('//h3[contains(@class,"post-title") and contains(@class,"entry-title")]', doc, null, XPathResult.ANY_TYPE, null);
	var entry = result.iterateNext();
	if (entry && result.iterateNext()) {
		return "multiple";
	} else if (entry) {
		return "blogPost";
	} else {
		return false;
	}
},
};
transIds["6f9aa90d-6631-4459-81ef-a0758d2e3921"] = "Blogger.js";


splittedTrans["Bloomberg.js"] = {
    "stamp": {"translatorID":"a509f675-cf80-4b70-8cbc-2ea8664dd38f","label":"Bloomberg","creator":"Sebastian Karcher","target":"^https?://(www|search.?)?\\.bloomberg(view)?\\.com","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-03-01 09:53:32"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["a509f675-cf80-4b70-8cbc-2ea8664dd38f"] = "Bloomberg.js";


splittedTrans["BOCC.js"] = {
    "stamp": {"translatorID":"ecd1b7c6-8d31-4056-8c15-1807b2489254","label":"BOCC","creator":"José Antonio Meira da Rocha","target":"^https?:\\/\\/[^/]*bocc[^/]*/(?:_listas|_esp)","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-04-04 10:08:43"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.evaluate("//table[@class='ag']/tbody/tr[1]/td[@class='agenda']", doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		Zotero.debug("multiple");
		return "multiple";
	}
},
};
transIds["ecd1b7c6-8d31-4056-8c15-1807b2489254"] = "BOCC.js";


splittedTrans["BOFiP-Impots.js"] = {
    "stamp": {"translatorID":"7d03e952-04ad-4d1d-845a-50b9eb545b10","label":"BOFiP-Impôts","creator":"Guillaume Adreani","target":"https?://bofip\\.impots\\.gouv\\.fr/bofip/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2013-03-30 23:52:25"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["7d03e952-04ad-4d1d-845a-50b9eb545b10"] = "BOFiP-Impots.js";


splittedTrans["Bookmarks.js"] = {
    "stamp": {"translatorID":"4e7119e0-02be-4848-86ef-79a64185aad8","label":"Bookmarks","creator":"Avram Lyon","target":"html","minVersion":"2.1b6","maxVersion":"","priority":100,"inRepository":true,"translatorType":3,"browserSupport":"gcs","lastUpdated":"2014-03-31 20:27:28"},
"detectImport": function detectImport() {
	var text = "";
	var line, m;
	var lastIndex = 0;
	var i = 0;
	while((line = Zotero.read()) !== false && (i++ < MAX_DETECT_LINES)) {
		text += line;

		bookmarkRE.lastIndex = lastIndex; //don't restart searches from begining
		m = bookmarkRE.exec(text);
		if(m && lastIndex < bookmarkRE.lastIndex) lastIndex = bookmarkRE.lastIndex;

		if (m && m[2].toUpperCase().indexOf('PLACE:') !== 0) {
			Zotero.debug("Found a match with line: "+m[0]);
			return true;
		}
	}
	return false;	
},};
transIds["4e7119e0-02be-4848-86ef-79a64185aad8"] = "Bookmarks.js";


splittedTrans["Boston Review.js"] = {
    "stamp": {"translatorID":"55d28a64-e56e-4d3c-93db-a5fc584776de","label":"Boston Review","creator":"Sebastian Karcher","target":"^https?://(www\\.)?bostonreview\\.net","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-06-08 11:15:54"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["55d28a64-e56e-4d3c-93db-a5fc584776de"] = "Boston Review.js";


splittedTrans["Bracero History Archive.js"] = {
    "stamp": {"translatorID":"f9373e49-e6ac-46f7-aafe-bb24a2fbc3f0","label":"Bracero History Archive","creator":"Adam Crymble","target":"^https?://braceroarchive\\.org","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-01-30 22:52:20"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.title.match("Item")) {
		return "book";
	} else if (doc.evaluate('//div[@class="item-meta"]/h2/a', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	}
},
};
transIds["f9373e49-e6ac-46f7-aafe-bb24a2fbc3f0"] = "Bracero History Archive.js";


splittedTrans["Brill Journals.js"] = {
    "stamp": {"translatorID":"6d087de8-f858-4ac5-9fbd-2bf2b35ee41a","label":"Brill Journals","creator":"Sebastian Karcher","target":"^https?://(www\\.)?booksandjournals\\.brillonline\\.com","minVersion":"3.0","maxVersion":"","priority":150,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-08-26 03:35:40"},
    "detectWeb": function detectWeb(doc,url) {
	var xpath='//meta[@name="citation_journal_title"]';
	var xpathtoc = '//div[contains(@class, "publistwrapper")]/div[@id="tabbedpages"]'	
	if (ZU.xpath(doc, xpath).length > 0) {
		return "journalArticle";
	}
	//TOCs		
	if (ZU.xpath(doc, xpathtoc).length > 0) {
		return "multiple";
	}
	//search results
	if (url.indexOf("/search?value")!=-1){
		return "multiple";
	}
	
	return false;
},
};
transIds["6d087de8-f858-4ac5-9fbd-2bf2b35ee41a"] = "Brill Journals.js";


splittedTrans["Bryn Mawr Classical Review.js"] = {
    "stamp": {"translatorID":"635c1246-e0c8-40a0-8799-a73a0b013ad8","label":"Bryn Mawr Classical Review","creator":"Michael Berkowitz","target":"^https?://bmcr\\.brynmawr\\.edu/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-02 10:52:41"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/by_reviewer/) || url.match(/by_author/) || url.match(/recent.html/) || url.match(/\/\d{4}\/$/)) {
		return "multiple";
	} else if (url.match(/[\d\-]+\.html$/)) {
		return "journalArticle";
	}
},
};
transIds["635c1246-e0c8-40a0-8799-a73a0b013ad8"] = "Bryn Mawr Classical Review.js";


splittedTrans["Bundesgesetzblatt.js"] = {
    "stamp": {"translatorID":"e23afbe8-b5cb-42cc-af90-e915b2c00de2","label":"Bundesgesetzblatt","creator":"Philipp Zumstein","target":"^https?://www\\.bgbl\\.de/","minVersion":"4.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-10-28 18:30:15"},
    "detectWeb": function detectWeb(doc, url) {
	//we have to listen to dom changes for the correct icon:
	var contentDiv = doc.getElementById('xaver_component_Text_0');//txtcontent topUB
	if (contentDiv) {
		Z.monitorDOMChanges(contentDiv, {childList: true});
	}
	
	if (onTextView(doc) && doc.getElementById('PDFcontainer') && extractTitle(doc)) {//single item
		return "journalArticle";
	} else if (getSearchResults(doc, true)) {
		return "multiple";
	}
},
};
transIds["e23afbe8-b5cb-42cc-af90-e915b2c00de2"] = "Bundesgesetzblatt.js";


splittedTrans["Business Standard.js"] = {
    "stamp": {"translatorID":"e8d40f4b-c4c9-41ca-a59f-cf4deb3d3dc5","label":"Business Standard","creator":"Sebastian Karcher","target":"^https?://www\\.business-standard\\.com","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-12-09 17:47:50"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["e8d40f4b-c4c9-41ca-a59f-cf4deb3d3dc5"] = "Business Standard.js";


splittedTrans["BusinessWeek.js"] = {
    "stamp": {"translatorID":"fb342bae-7727-483b-a871-c64c663c2fae","label":"BusinessWeek","creator":"Michael Berkowitz","target":"^https?://(www\\.|search\\.)?businessweek\\.com","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-02-14 00:21:11"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.evaluate('//body[contains(@class, "searchResults")]|//div[contains(@class, "search_result")]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	} else if (doc.evaluate('//h1[@class="headline"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "magazineArticle";
	}
},
};
transIds["fb342bae-7727-483b-a871-c64c663c2fae"] = "BusinessWeek.js";


splittedTrans["CABI - CAB Abstracts.js"] = {
    "stamp": {"translatorID":"a29d22b3-c2e4-4cc0-ace4-6c2326144332","label":"CABI - CAB Abstracts","creator":"Sebastian Karcher","target":"^https?://www\\.cabi?direct\\.org/","minVersion":"3.0.4","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2012-12-13 16:39:11"},
    "detectWeb": function detectWeb(doc, url) {
	var shortTag = ZU.xpath(doc, '//meta/@name')
	var hwType;
	for (i in shortTag) {
		switch (shortTag[i].textContent) {
		case "citation_journal_title":
			hwType = "journalArticle";
			break;
		case "citation_technical_report_institution":
			hwType = "report";
			break;
		case "citation_conference_title":
		case "citation_conference":
			hwType = "conferencePaper";
			break;
		case "citation_book_title":
			hwType = "bookSection";
			break;
		case "citation_dissertation_institution":
		case "citation_dissertation_name":
			hwType = "thesis";
			break;
		case "citation_title":
			//fall back to journalArticle, since this is quite common
		case "citation_series_title":
			//possibly journal article, though it could be book
			hwType = "journalArticle";
			break;
		}
	};
	if (hwType) return hwType;
	else if (url.match(/\/search\.html/)) {
		return "multiple";
	}
	return false;
},
};
transIds["a29d22b3-c2e4-4cc0-ace4-6c2326144332"] = "CABI - CAB Abstracts.js";


splittedTrans["cablegatesearch.net.js"] = {
    "stamp": {"translatorID":"8b73dd9c-b873-4d13-b36a-45922b9f04a1","label":"cablegatesearch.net","creator":"Yannick Ringot","target":"^https?://(?:www\\.)?cablegatesearch\\.net/cable\\.php\\?id=","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-03-02 17:30:34"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["8b73dd9c-b873-4d13-b36a-45922b9f04a1"] = "cablegatesearch.net.js";


splittedTrans["CAIRN Info.js"] = {
    "stamp": {"translatorID":"f46cc903-c447-47d6-a2cf-c75ed22dc96b","label":"CAIRN Info","creator":"Sebastian Karcher","target":"^https?://www\\.cairn\\.info/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-03-11 22:36:38"},
    "detectWeb": function detectWeb(doc,url) {
	var xpath='//meta[@name="citation_journal_title"]';
		
	if (ZU.xpath(doc, xpath).length > 0) {
		return "journalArticle";
	}
			
	if (ZU.xpathText(doc, '//div[contains(@class, "list_articles")]//div[contains(@class, "article") or contains(@class, "articleBookList")]')) {
		return "multiple";
	}

	return false;
},
};
transIds["f46cc903-c447-47d6-a2cf-c75ed22dc96b"] = "CAIRN Info.js";


splittedTrans["Cambridge Journals Online.js"] = {
    "stamp": {"translatorID":"850f4c5f-71fb-4669-b7da-7fb7a95500ef","label":"Cambridge Journals Online","creator":"Sean Takats, Michael Berkowitz, Avram Lyon, and Aurimas Vinckevicius","target":"^https?://[^/]*journals.cambridge.org[^/]*//?action/(quickSearch|search|displayAbstract|displayFulltext|displayIssue|displayJournal)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-10-28 04:35:23"},
    "detectWeb": function detectWeb(doc, url)	{
	var xpath = '//div[@class="tableofcontents-row"][div/input[@type="checkbox"][@name="toView"]]';
	if (url.indexOf("/action/displayAbstract") != -1
		|| url.indexOf("action/displayFulltext") != -1
	) {
		return "journalArticle";
	} else if (getSearchResults(doc, true)){
		return "multiple";			
	}
},
};
transIds["850f4c5f-71fb-4669-b7da-7fb7a95500ef"] = "Cambridge Journals Online.js";


splittedTrans["Canada.com.js"] = {
    "stamp": {"translatorID":"4da40f07-904b-4472-93b6-9bea1fe7d4df","label":"Canada.com","creator":"Adam Crymble","target":"^https?://www\\.canada\\.com","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-01-30 22:52:08"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.location.href.match("story")) {
		return "newspaperArticle";
	} else if (doc.location.href.match("search")) {
		return "multiple";
	}
},
};
transIds["4da40f07-904b-4472-93b6-9bea1fe7d4df"] = "Canada.com.js";


splittedTrans["Canadian Letters and Images.js"] = {
    "stamp": {"translatorID":"a7c8b759-6f8a-4875-9d6e-cc0a99fe8f43","label":"Canadian Letters and Images","creator":"Adam Crymble","target":"^https?://(www\\.)?canadianletters\\.ca/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-01-30 22:52:00"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.location.href.match("results")) {
		return "multiple";
	} else if (doc.location.href.match("letters.php")) {
		return "letter";
	} else if (doc.location.href.match("template")) {
		return "artwork";
	}
	
},
};
transIds["a7c8b759-6f8a-4875-9d6e-cc0a99fe8f43"] = "Canadian Letters and Images.js";


splittedTrans["Canadiana.ca.js"] = {
    "stamp": {"translatorID":"2d174277-7651-458f-86dd-20e168d2f1f3","label":"Canadiana.ca","creator":"Adam Crymble, Sebastian Karcher","target":"^https?://eco\\.canadiana\\.ca","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-07-03 16:44:04"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/\/view\//)) {
		return "book";
	} else if (url.match(/\/search\?/)) {
		return "multiple";
	}
},
};
transIds["2d174277-7651-458f-86dd-20e168d2f1f3"] = "Canadiana.ca.js";


splittedTrans["CanLII.js"] = {
    "stamp": {"translatorID":"84799379-7bc5-4e55-9817-baf297d129fe","label":"CanLII","creator":"Sebastian Karcher","target":"^https?://(?:www\\.)?canlii\\.org/(?:en|fr)/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-06-11 01:31:00"},
    "detectWeb": function detectWeb(doc, url) {
	if (canLiiRegexp.test(url)) {
		return "case";
	} else {
		var aTags = doc.getElementsByTagName("a");
		for (var i = 0; i < aTags.length; i++) {
			if (canLiiRegexp.test(aTags[i].href)) {
				return "multiple";
			}
		}
	}
},
};
transIds["84799379-7bc5-4e55-9817-baf297d129fe"] = "CanLII.js";


splittedTrans["CCfr (BnF).js"] = {
    "stamp": {"translatorID":"899d10f5-3f35-40e6-8dfb-f8ee2dfb1849","label":"CCfr (BnF)","creator":"Sylvain Machefert, Aurimas Vinckevicius","target":"^https?://ccfr\\.bnf\\.fr/portailccfr/.*\\b(?:action=search|menu=menu_view_grappage|search\\.jsp)\\b","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"g","lastUpdated":"2014-09-18 14:08:05"},
    "detectWeb": function detectWeb(doc, url) {
	if (getSearchResults(doc))
	{
		return "multiple";
	}
	else if (url.indexOf("menu=menu_view_grappage") != -1) {
		return CCFRTypeDoc(doc);
	}
},
};
transIds["899d10f5-3f35-40e6-8dfb-f8ee2dfb1849"] = "CCfr (BnF).js";


splittedTrans["Cell Press.js"] = {
    "stamp": {"translatorID":"f26cfb71-efd7-47ae-a28c-d4d8852096bd","label":"Cell Press","creator":"Michael Berkowitz, Sebastian Karcher, Aurimas Vinckevicius","target":"^https?://([^/]*\\.)?cell\\.com","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-03-31 15:18:16"},
    "detectWeb": function detectWeb(doc, url) {
	if(ZU.xpathText(doc, '//meta[@name="citation_journal_title"]/@content')) {
		return 'journalArticle';
	} else if(url.indexOf('doSearch?') != -1 &&
		ZU.xpath(doc, '//form[contains(@id, "Search")] //a[contains(@href, "abstract") or contains(@href, "fulltext")]') ) {
		return 'multiple';
	}
},
};
transIds["f26cfb71-efd7-47ae-a28c-d4d8852096bd"] = "Cell Press.js";


splittedTrans["Chadwyck Literature Online.js"] = {
    "stamp": {"translatorID":"e13b0f9d-44ba-4ece-aa22-77993bb26ef2","label":"Chadwyck Literature Online","creator":"Sebastian Karcher","target":"^https?://(lion|collections)\\.chadwyck\\.com/search","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2014-03-31 15:22:07"},
    "detectWeb": function detectWeb(doc, url) {
	//this may not always get the right item type, but doing that may neither be possible nor terribly important.
	if (url.indexOf("searchFullrec.do?")!=-1||url.indexOf("searchFulltext.do?")!=-1){ 
		if(ZU.xpathText(doc, '//a[@class="bold" and contains(text(), "Download citation")]/@href')) return "journalArticle";
	}
	//I think these are all possible search results - not sure, though, may need to add
	if (url.indexOf("searchQuick")!=-1||url.indexOf("searchTexts") != -1) return "multiple";
},
};
transIds["e13b0f9d-44ba-4ece-aa22-77993bb26ef2"] = "Chadwyck Literature Online.js";


splittedTrans["Champlain Society - Collection.js"] = {
    "stamp": {"translatorID":"50d3ca81-3c4c-406b-afb2-0fe8105b9b38","label":"Champlain Society - Collection","creator":"Adam Crymble","target":"^https?://link\\.library\\.utoronto\\.ca","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-07-13 07:33:49"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.location.href.match("search_results")) {
		return "multiple";
	} else if (doc.location.href.match("item_record")) {
		return "book";
	}
},
};
transIds["50d3ca81-3c4c-406b-afb2-0fe8105b9b38"] = "Champlain Society - Collection.js";


splittedTrans["Christian Science Monitor.js"] = {
    "stamp": {"translatorID":"04c0db88-a7fc-4d1a-9cf7-471d0990acb1","label":"Christian Science Monitor","creator":"Sebastian Karcher","target":"^https?://(features\\.csmonitor|www\\.csmonitor)\\.com","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-06-11 21:21:44"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["04c0db88-a7fc-4d1a-9cf7-471d0990acb1"] = "Christian Science Monitor.js";


splittedTrans["Chronicling America.js"] = {
    "stamp": {"translatorID":"fa8f8274-ada5-415a-96dd-a5c19fce7046","label":"Chronicling America","creator":"Sebastian Karcher","target":"^https?://chroniclingamerica\\.loc\\.gov","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-03-31 23:29:08"},
    "detectWeb": function detectWeb(doc,url) {
	var xpath='//meta[@name="citation_title"]';
		
	if (ZU.xpath(doc, xpath).length > 0) {
		return "newspaperArticle";
	}
			
	if (url.search(/\/search\/pages\/results\/?/)!=-1) {
		return "multiple";
	}

	return false;
},
};
transIds["fa8f8274-ada5-415a-96dd-a5c19fce7046"] = "Chronicling America.js";


splittedTrans["CiNii.js"] = {
    "stamp": {"translatorID":"46291dc3-5cbd-47b7-8af4-d009078186f6","label":"CiNii","creator":"Michael Berkowitz and Mitsuo Yoshida","target":"^https?://ci\\.nii\\.ac\\.jp/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-11-24 13:12:41"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/naid/)) {
		return "journalArticle";
	} else if (doc.evaluate('//a[contains(@href, "/naid/")]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	}
},
};
transIds["46291dc3-5cbd-47b7-8af4-d009078186f6"] = "CiNii.js";


splittedTrans["CiteSeer.js"] = {
    "stamp": {"translatorID":"fa396dd4-7d04-4f99-95e1-93d6f355441d","label":"CiteSeer","creator":"Sebastian Karcher","target":"^https?://citeseerx?\\.ist\\.psu\\.edu","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-24 02:37:16"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf('/search?q') != -1 && getSearchResults(doc).length) {
		return "multiple";
	}
	if (url.indexOf('/viewdoc/') != -1 && doc.getElementById('bibtex')) {
		return "journalArticle";
	}
},
};
transIds["fa396dd4-7d04-4f99-95e1-93d6f355441d"] = "CiteSeer.js";


splittedTrans["CiteULike.js"] = {
    "stamp": {"translatorID":"8917b41c-8527-4ee7-b2dd-bcbc3fa5eabd","label":"CiteULike","creator":"Sean Takats","target":"https?://(?:www\\.)?citeulike.org(?:.*/tag/[^/]*$|/search/|/journal/|/user/|/group/[0-9]+/library$|/\\?page=[0-9]+$|/.*article/[0-9]+$|/$)","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-02-24 23:19:16"},
    "detectWeb": function detectWeb(doc, url){
	var articleRe = /\/article\/[0-9]+$/;
	var m = url.match(articleRe);
	var newUris = new Array();
	
	if (m){
		return "journalArticle";
	} else {
		return "multiple";
	}
},
};
transIds["8917b41c-8527-4ee7-b2dd-bcbc3fa5eabd"] = "CiteULike.js";


splittedTrans["Civilization.ca.js"] = {
    "stamp": {"translatorID":"8451431a-895f-4732-8339-79eb6756d2f9","label":"Civilization.ca","creator":"Adam Crymble","target":"^https?://collections\\.civilization\\.ca","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-07-13 07:33:49"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.evaluate('//tr/td[2]/a/font', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	} else if (doc.location.href.match("Display.php")) {
		return "artwork";
	}
},
};
transIds["8451431a-895f-4732-8339-79eb6756d2f9"] = "Civilization.ca.js";


splittedTrans["CLACSO.js"] = {
    "stamp": {"translatorID":"a6f95213-468c-4558-94a3-59b2436cbcdd","label":"CLACSO","creator":"Sebastian Karcher","target":"^https?://biblioteca\\.clacso\\.edu\\.ar/gsdl/cgi-bin/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"g","lastUpdated":"2013-02-28 14:47:57"},
    "detectWeb": function detectWeb(doc, url) {
	if (ZU.xpath(doc, '//div[@class="document"]/div[@class="documenttext"]').length>0) return getType(doc);
	else if (ZU.xpath(doc, '//div[@class="document"]/div[@class="divbar"]').length>0) return "multiple";
},
};
transIds["a6f95213-468c-4558-94a3-59b2436cbcdd"] = "CLACSO.js";


splittedTrans["CLASE.js"] = {
    "stamp": {"translatorID":"1dd21245-29cf-434d-b5b8-49eae0a6912a","label":"CLASE","creator":"Sebastian Karcher","target":"^https?://132\\.248\\.9\\.1\\:","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-12-07 15:15:58"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("func=full-set") != -1) return "journalArticle"
	else if (url.indexOf("func=short") != -1 || url.indexOf("func=find") != -1)  return "multiple";
},
};
transIds["1dd21245-29cf-434d-b5b8-49eae0a6912a"] = "CLASE.js";


splittedTrans["CNKI.js"] = {
    "stamp": {"translatorID":"5c95b67b-41c5-4f55-b71a-48d5d7183063","label":"CNKI","creator":"Aurimas Vinckevicius","target":"^https?://(?:[^/]+\\.)?cnki.net","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcs","lastUpdated":"2013-08-25 04:10:34"},
    "detectWeb": function detectWeb(doc, url) {
	var id = getIDFromPage(doc, url);
	Z.debug(id);
	if(id) {
		return getTypeFromDBName(id.dbname);
	}
	
	var items = getItemsFromSearchResults(doc, url);
	if(items) return "multiple";
},
};
transIds["5c95b67b-41c5-4f55-b71a-48d5d7183063"] = "CNKI.js";


splittedTrans["Code4Lib Journal.js"] = {
    "stamp": {"translatorID":"a326fc49-60c2-405b-8f44-607e5d18b9ad","label":"Code4Lib Journal","creator":"Michael Berkowitz","target":"http://journal.code4lib.org/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-05-11 06:22:36"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.evaluate('//h2[@class="articletitle"]/a', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	} else if (doc.evaluate('//h1[@class="articletitle"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "journalArticle";
	}
},
};
transIds["a326fc49-60c2-405b-8f44-607e5d18b9ad"] = "Code4Lib Journal.js";


splittedTrans["COinS.js"] = {
    "stamp": {"translatorID":"05d07af9-105a-4572-99f6-a8e231c0daef","label":"COinS","creator":"Simon Kornblith","target":"","minVersion":"2.1","maxVersion":"","priority":310,"inRepository":true,"translatorType":6,"browserSupport":"gcsv","lastUpdated":"2015-06-04 03:25:10"},
    "detectWeb": function detectWeb(doc, url) {
	var spanTags = doc.getElementsByTagName("span");

	var encounteredType = false;
	
	// This and the x: prefix in the XPath are to work around an issue with pages
	// served as application/xhtml+xml
	//
	// https://developer.mozilla.org/en/Introduction_to_using_XPath_in_JavaScript#Implementing_a_default_namespace_for_XML_documents
	function nsResolver() {
		return 'http://www.w3.org/1999/xhtml';
	}
	
	var spans = doc.evaluate('//x:span[contains(@class, " Z3988") or contains(@class, "Z3988 ") or @class="Z3988"][@title]', doc, nsResolver, XPathResult.ANY_TYPE, null);
	var span;
	while(span = spans.iterateNext()) {
		// determine if it's a valid type
		var item = new Zotero.Item;
		var success = Zotero.Utilities.parseContextObject(span.title, item);
		
		if(item.itemType) {
			if(encounteredType) {
				return "multiple";
			} else {
				encounteredType = item.itemType;
			}
		}
	}
	
	return encounteredType;
},
};
transIds["05d07af9-105a-4572-99f6-a8e231c0daef"] = "COinS.js";


splittedTrans["Columbia University Press.js"] = {
    "stamp": {"translatorID":"a75e0594-a9e8-466e-9ce8-c10560ea59fd","label":"Columbia University Press","creator":"Michael Berkowitz","target":"^https?://(www\\.)?cup\\.columbia\\.edu/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-02 10:55:49"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/book\//)) {
		return "book";
	} else if (doc.evaluate('//p[@class="header"]/a/span[@class="_booktitle"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	}
},
};
transIds["a75e0594-a9e8-466e-9ce8-c10560ea59fd"] = "Columbia University Press.js";


splittedTrans["Common-Place.js"] = {
    "stamp": {"translatorID":"c3edb423-f267-47a1-a8c2-158c247f87c2","label":"Common-Place","creator":"Frederick Gibbs","target":"^https?://(www\\.)?(common-place\\.org/vol-.*/no-.*/.|historycooperative\\.org/journals/cp)","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-01-30 22:51:17"},
    "detectWeb": function detectWeb(doc, url) {
	if(doc.title.indexOf("Previous Issues") != -1 || doc.title.indexOf("Search Site") != -1 ) {
		return "multiple";
	} else {
		return "journalArticle";
	}
},
};
transIds["c3edb423-f267-47a1-a8c2-158c247f87c2"] = "Common-Place.js";


splittedTrans["Copernicus.js"] = {
    "stamp": {"translatorID":"8082115d-5bc6-4517-a4e8-abed1b2a784a","label":"Copernicus","creator":"Michael Berkowitz","target":"^https?://www\\.(?:adv-sci-res|earth-syst-dynam|adv-geosci|adv-radio-sci|ann-geophys|astrophys-space-sci-trans|atmos-chem-phys|atmos-meas-tech|biogeosciences|clim-past|electronic-earth|hydrol-earth-syst-sci|nat-hazards-earth-syst-sci|nonlin-processes-geophys|ocean-sci|soc-geogr|surv-perspect-integr-environ-soc|the-cryosphere|geosci-model-dev)(?:-discuss)?\\.net/","minVersion":"2.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-03-31 13:44:16"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.evaluate('//div[@id="publisher"]/iframe', doc, null, XPathResult.ANY_TYPE, null).iterateNext() || doc.evaluate('//td[*[a[contains(text(), "Abstract")]]]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	} else if (doc.title.match(/Abstract/)) {
		return "journalArticle";
	}
},
};
transIds["8082115d-5bc6-4517-a4e8-abed1b2a784a"] = "Copernicus.js";


splittedTrans["Cornell LII.js"] = {
    "stamp": {"translatorID":"930d49bc-44a1-4c22-9dde-aa6f72fb11e5","label":"Cornell LII","creator":"Bill McKinney","target":"^https?://www\\.law\\.cornell\\.edu/supct/.+","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2013-02-09 12:09:10"},
    "detectWeb": function detectWeb(doc, url) {
	var liiRegexp = /\/supct\/html\/.+/
	if(liiRegexp.test(url)) {
		return "case";
	} else {
		var aTags = doc.getElementsByTagName("a");
		for(var i=0; i<aTags.length; i++) {
			if(liiRegexp.test(aTags[i].href)) { 
				return "multiple";
			}
		}
	}
},
};
transIds["930d49bc-44a1-4c22-9dde-aa6f72fb11e5"] = "Cornell LII.js";


splittedTrans["Cornell University Press.js"] = {
    "stamp": {"translatorID":"4363275e-5cc5-4627-9a7f-951fb58a02c3","label":"Cornell University Press","creator":"Sebastian Karcer","target":"^https?://www\\.cornellpress\\.cornell\\.edu/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-09-17 22:52:51"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match("/book/")) {
		return "book";
	} else if (url.match("/search/?") || url.match("/catalog/?")) {
		return "multiple";
	}
},
};
transIds["4363275e-5cc5-4627-9a7f-951fb58a02c3"] = "Cornell University Press.js";


splittedTrans["CrossRef.js"] = {
    "stamp": {"translatorID":"11645bd1-0420-45c1-badb-53fb41eeb753","translatorType":8,"label":"CrossRef","creator":"Simon Kornblith","target":"^https?://partneraccess\\.oclc\\.org/","minVersion":"2.1.9","maxVersion":null,"priority":90,"inRepository":true,"browserSupport":"gcsv","lastUpdated":"2014-09-09 20:05:00"},
};
transIds["11645bd1-0420-45c1-badb-53fb41eeb753"] = "CrossRef.js";


splittedTrans["CSIRO Publishing.js"] = {
    "stamp": {"translatorID":"303c2744-ea37-4806-853d-e1ca67be6818","label":"CSIRO Publishing","creator":"Michael Berkowitz","target":"^https?://(www.)?publish\\.csiro\\.au/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-09-04 21:24:38"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.evaluate('//a[@class="searchBoldBlue"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext() || doc.evaluate('//a[@class="linkjournal"]|//a[@class="journal_title"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	} else if (url.indexOf("/view/journals/") != -1 || url.indexOf("paper") != -1) {
		return "journalArticle";
	}
},
};
transIds["303c2744-ea37-4806-853d-e1ca67be6818"] = "CSIRO Publishing.js";


splittedTrans["CSL JSON.js"] = {
    "stamp": {"translatorID":"bc03b4fe-436d-4a1f-ba59-de4d2d7a63f7","label":"CSL JSON","creator":"Simon Kornblith","target":"json","minVersion":"4.0.27","maxVersion":"","priority":100,"inRepository":true,"translatorType":3,"browserSupport":"gcs","lastUpdated":"2015-06-05 23:03:52"},
"detectImport": function detectImport() {
	var CSL_TYPES = {"article":true, "article-journal":true, "article-magazine":true,
		"article-newspaper":true, "bill":true, "book":true, "broadcast":true,
		"chapter":true, "dataset":true, "entry":true, "entry-dictionary":true,
		"entry-encyclopedia":true, "figure":true, "graphic":true, "interview":true,
		"legal_case":true, "legislation":true, "manuscript":true, "map":true,
		"motion_picture":true, "musical_score":true, "pamphlet":true,
		"paper-conference":true, "patent":true, "personal_communication":true,
		"post":true, "post-weblog":true, "report":true, "review":true, "review-book":true,
		"song":true, "speech":true, "thesis":true, "treaty":true, "webpage":true};
		
	parseInput();
	if(!parsedData) return false;
	
	if(typeof parsedData !== "object") return false;
	if(!(parsedData instanceof Array)) parsedData = [parsedData];
	
	for(var i=0; i<parsedData.length; i++) {
		var item = parsedData[i];
		if(typeof item !== "object" || !item.type || !(item.type in CSL_TYPES)) {
			return false;
		}
	}
	return true;
},};
transIds["bc03b4fe-436d-4a1f-ba59-de4d2d7a63f7"] = "CSL JSON.js";


splittedTrans["CSV.js"] = {
    "stamp": {"translatorID":"25f4c5e2-d790-4daa-a667-797619c7e2f2","label":"CSV","creator":"Philipp Zumstein and Aurimas Vinckevicius","target":"csv","minVersion":"3.0","maxVersion":"","priority":100,"displayOptions":{"exportCharset":"UTF-8xBOM","exportNotes":false},"inRepository":true,"translatorType":2,"browserSupport":"g","lastUpdated":"2015-04-23 21:28:32"},
};
transIds["25f4c5e2-d790-4daa-a667-797619c7e2f2"] = "CSV.js";


splittedTrans["Cyberpresse.js"] = {
    "stamp": {"translatorID":"dbfcaa3e-082a-45a4-9619-9892f49399c1","label":"Cyberpresse","creator":"Sebastian Karcher","target":"^https?://(www|recherche)\\.(cyberpresse|lapresse)\\.ca","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2012-05-02 19:20:01"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["dbfcaa3e-082a-45a4-9619-9892f49399c1"] = "Cyberpresse.js";


splittedTrans["DAI-Zenon.js"] = {
    "stamp": {"translatorID":"16199bf0-a365-4aad-baeb-225019ae32dc","label":"DAI-Zenon","creator":"Philipp Zumstein","target":"https?://zenon\\.dainst\\.org/#(book|search|extendedSearch|bibliography|favorites)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsv","lastUpdated":"2014-09-07 13:07:37"},
    "detectWeb": function detectWeb(doc, url) {
	//return "bookSection"; // activate for testing
	//return "journalArticle"; // activate for testing
	if (url.indexOf("/#book") != -1 ) {//book, journalArticle or bookSection --> will be improved during scraping
		return "book";
	} else if (getSearchResults(doc).length>0) {
		return "multiple";
	}
},
};
transIds["16199bf0-a365-4aad-baeb-225019ae32dc"] = "DAI-Zenon.js";


splittedTrans["DART-Europe.js"] = {
    "stamp": {"translatorID":"658f2707-bb46-44eb-af0a-e73a5387fc90","label":"DART-Europe","creator":"Sebastian Karcher","target":"^https?://www\\.dart-europe\\.eu","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-04-17 03:09:28"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("full.php?") != -1) return "thesis";
	if (url.indexOf("results.php?") != -1) return "multiple";
	
},
};
transIds["658f2707-bb46-44eb-af0a-e73a5387fc90"] = "DART-Europe.js";


splittedTrans["DataCite.js"] = {
    "stamp": {"translatorID":"9f1fb86b-92c8-4db7-b8ee-0b481d456428","label":"DataCite","creator":"Aurimas Vinckevicius","target":"","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":8,"browserSupport":"gcs","lastUpdated":"2014-05-29 07:46:16"},
};
transIds["9f1fb86b-92c8-4db7-b8ee-0b481d456428"] = "DataCite.js";


splittedTrans["DBLP Computer Science Bibliography.js"] = {
    "stamp": {"translatorID":"625c6435-e235-4402-a48f-3095a9c1a09c","label":"DBLP Computer Science Bibliography","creator":"Adam Crymble, Sebastian Karcher, Philipp Zumstein","target":"^https?://(www\\.)?(dblp(\\.org|\\.uni-trier\\.de/|\\.dagstuhl\\.de/)|informatik\\.uni-trier\\.de/\\~ley/)","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsv","lastUpdated":"2014-04-03 16:48:03"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf('rec/bibtex') !== -1) {
		if (url.indexOf('journals') !== -1) {
			return "journalArticle";
		} else if (url.indexOf('conf') !== -1) {
			return "conferencePaper";
		} else if (url.indexOf('series') !== -1 || url.indexOf('reference') !== -1) {
			return "bookSection";
		} else if (url.indexOf('books') !== -1) {
			return "book";
		} else if (url.indexOf('phd') !== -1) {
			return "thesis";
		} else { //generic fallback
			return "journalArticle";
		}
	} else if ((url.match(/\/db\/(journals|conf|series|reference)/) || url.match(/\/pers\/(hd|ht|hy)/)) && !url.match(/index[\w-]*\.html/)) {
		return "multiple"
	}
},
};
transIds["625c6435-e235-4402-a48f-3095a9c1a09c"] = "DBLP Computer Science Bibliography.js";


splittedTrans["Defense Technical Information Center.js"] = {
    "stamp": {"translatorID":"99be9976-2ff9-40df-96e8-82edfa79d9f3","label":"Defense Technical Information Center","creator":"Matt Burton","target":"^https?://oai\\.dtic\\.mil/oai/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-01-09 15:36:32"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.title.indexOf("DTIC OAI Index for") != -1) {
		return "multiple";
	} else if (url.indexOf("verb=getRecord") != -1) {
		return "report";
	}
},
};
transIds["99be9976-2ff9-40df-96e8-82edfa79d9f3"] = "Defense Technical Information Center.js";


splittedTrans["DeGruyter.js"] = {
    "stamp": {"translatorID":"2a5dc3ed-ee5e-4bfb-baad-36ae007e40ce","label":"DeGruyter","creator":"Sebastian Karcher","target":"^https?://www\\.degruyter\\.com","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2014-04-21 10:39:45"},
    "detectWeb": function detectWeb(doc,url) {

	if( doc.body.classList.contains('journalArticle') || doc.body.classList.contains('page-viewdatabaseentry') ) {
		return "journalArticle";
	}
	if( doc.body.classList.contains('page-viewbook') || doc.body.classList.contains('page-viewbooktoc')) {
		return "book";
	}
	if(doc.body.classList.contains('page-viewbookchapter')) {
		return "bookSection";
	}
	if( (doc.body.classList.contains('page-search') || doc.body.classList.contains('page-searchwithinbase') || doc.body.classList.contains('page-databasecontent') || doc.body.classList.contains('page-viewjournalissue')) &&  getSearchResults(doc, url)) {
		return "multiple";
	}
	//page-viewjournal --> full/whole journal (type in Zotero is planned)

	return false;
},
};
transIds["2a5dc3ed-ee5e-4bfb-baad-36ae007e40ce"] = "DeGruyter.js";


splittedTrans["Delpher.js"] = {
    "stamp": {"translatorID":"c4008cc5-9243-4d13-8b35-562cdd184558","label":"Delpher","creator":"Hieke Huistra, Thijs Kinkhorst","target":"^https?://[^\\/]+\\.delpher\\.nl","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2014-03-29 16:29:24"},
    "detectWeb": function detectWeb(doc, url) {
	return FW.detectWeb(doc, url);
},
};
transIds["c4008cc5-9243-4d13-8b35-562cdd184558"] = "Delpher.js";


splittedTrans["Demographic Research.js"] = {
    "stamp": {"translatorID":"ed317bdd-0416-4762-856d-435004a9f05c","label":"Demographic Research","creator":"Sebatian Karcher","target":"^https?://www\\.demographic-research\\.org","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2014-11-05 16:12:50"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.search(/vol\d+\/default\.htm|search\/search\.aspx\?/)!=-1){
		return "multiple";	
	}
	else if (ZU.xpathText(doc, '//a[contains(@href, "/refman.plx?")]/@href')){
		return "journalArticle";	
	}
},
};
transIds["ed317bdd-0416-4762-856d-435004a9f05c"] = "Demographic Research.js";


splittedTrans["DEPATISnet.js"] = {
    "stamp": {"translatorID":"d76fea32-fe20-4c00-b5b9-bea8c688c2b0","label":"DEPATISnet","creator":"Klaus Flittner","target":"^https?://depatisnet\\.dpma\\.de/DepatisNet/depatisnet","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-03-12 04:43:57"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("action=bibdat") !== -1) {
		return "patent";
	}
	if (url.indexOf("action=treffer") !== -1 && Object.keys(getSearchResults(doc)).length) {
		return "multiple";
	}
},
};
transIds["d76fea32-fe20-4c00-b5b9-bea8c688c2b0"] = "DEPATISnet.js";


splittedTrans["Der Freitag.js"] = {
    "stamp": {"translatorID":"1ab8b9a4-72b5-4ef4-adc8-4956a50718f7","label":"Der Freitag","creator":"Sebastian Karcher","target":"^https?://www\\.freitag\\.de","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-09-18 00:47:29"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["1ab8b9a4-72b5-4ef4-adc8-4956a50718f7"] = "Der Freitag.js";


splittedTrans["Deutsche Nationalbibliothek.js"] = {
    "stamp": {"translatorID":"d8341c22-8cf4-428f-be3b-ada9fa8933eb","label":"Deutsche Nationalbibliothek","creator":"Philipp Zumstein","target":"^https?://portal\\.dnb\\.de/opac\\.htm\\?","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-05-20 10:31:05"},
    "detectWeb": function detectWeb(doc, url) {
	if (
		url.indexOf('method=showFullRecord')>-1 ||
		(url.indexOf('method=simpleSearch')>-1 && doc.getElementById('fullRecordTable'))
	) {
		var type=ZU.xpathText(doc, '//table[@id="fullRecordTable"]/tbody/tr/td/img/@alt');
		if (typeMapping[type]) {
			return typeMapping[type];
		} else {
			return "book";
		}
	} else if (getSearchResults(doc, true)) {
		return "multiple";
	}
},
};
transIds["d8341c22-8cf4-428f-be3b-ada9fa8933eb"] = "Deutsche Nationalbibliothek.js";


splittedTrans["dhistory.js"] = {
    "stamp": {"translatorID":"946ddf3a-74ca-4309-9917-85aa30297f4c","label":"dhistory","creator":"Tim Sherratt","target":"http://(www\\.)?dhistory\\.org/archives/naa/items/\\d+","minVersion":"2.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2012-08-27 09:42:02"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["946ddf3a-74ca-4309-9917-85aa30297f4c"] = "dhistory.js";


splittedTrans["Dialnet.js"] = {
    "stamp": {"translatorID":"938ccabb-e297-4092-aa15-22b6511bbd0f","label":"Dialnet","creator":"Sebastian Karcher","target":"^https?://dialnet\\.unirioja\\.es/(servlet|buscar)/","minVersion":"2.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-02-14 00:53:15"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["938ccabb-e297-4092-aa15-22b6511bbd0f"] = "Dialnet.js";


splittedTrans["Die Zeit.js"] = {
    "stamp": {"translatorID":"312bbb0e-bfb6-4563-a33c-085445d391ed","label":"Die Zeit","creator":"Martin Meyerhoff","target":"^https?://www\\.zeit\\.de/","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-03 16:49:40"},
    "detectWeb": function detectWeb(doc, url) {

	var Zeit_ArticleTools_XPath = ".//*[@id='informatives']/ul[@class='tools']/li";
	var Zeit_Archive_XPath = "//h4/a|//h2/a";
	
	if (doc.evaluate(Zeit_ArticleTools_XPath, doc, null, XPathResult.ANY_TYPE, null).iterateNext() ){ 
		Zotero.debug("newspaperArticle");
		return "newspaperArticle";
	} else if (doc.evaluate(Zeit_Archive_XPath, doc, null, XPathResult.ANY_TYPE, null).iterateNext() ){ 
		Zotero.debug("multiple");
		return "multiple";
	}
},
};
transIds["312bbb0e-bfb6-4563-a33c-085445d391ed"] = "Die Zeit.js";


splittedTrans["digibib.net.js"] = {
    "stamp": {"translatorID":"e99bd723-39e6-418c-9524-390dbc583e08","label":"digibib.net","creator":"Heiko Jansen (hbz), Ingolf Kuss (hbz), Bernhard Assmann (hbz)","target":"https?://.*\\.digibib\\.net/(Digibib|jumpto|metasearch|opensearch|template)","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcs","lastUpdated":"2013-02-10 23:07:57"},
    "detectWeb": function detectWeb(doc, url) {
	var namespace = doc.documentElement.namespaceURI;

	var indicator = doc.evaluate('/html/body//span[@id="zotero"]', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	var indicator_class = indicator.getAttribute('class');
	if (indicator_class.match(/multi/)) {
		// There's one or more result list each containing one or more hits in this page
		return "multiple";
	}
	if (indicator_class.match(/single/)) {
		// There's one hit in this page
		return "single";
	}

	return "";
},
};
transIds["e99bd723-39e6-418c-9524-390dbc583e08"] = "digibib.net.js";


splittedTrans["Digital Humanities Quarterly.js"] = {
    "stamp": {"translatorID":"bbad0221-134b-495a-aa56-d77cfaa67ab5","label":"Digital Humanities Quarterly","creator":"Michael Berkowitz","target":"^https?://(www\\.)?digitalhumanities\\.org/(dhq)?","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-09-20 20:46:53"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.evaluate('//div[@class="DHQarticle"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "journalArticle";
	} else if (doc.evaluate('//div[@id="mainContent"]/div/p', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	}
},
};
transIds["bbad0221-134b-495a-aa56-d77cfaa67ab5"] = "Digital Humanities Quarterly.js";


splittedTrans["Digital Medievalist.js"] = {
    "stamp": {"translatorID":"5e684d82-73a3-9a34-095f-19b112d77bbe","label":"Digital Medievalist","creator":"Fred Gibbs, Sebastian Karcher","target":"^https?://digitalmedievalist\\.org/(index\\.html)?($|journal/?$|(journal/[3-9]))","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-03-12 00:24:31"},
    "detectWeb": function detectWeb(doc, url) {

	if(doc.title == "Digital Medievalist: Journal" || doc.title == "Digital Medievalist" || doc.title == "Digital Medievalist Journal") {
		return "multiple";
	} else {
		return "journalArticle";
	}
},
};
transIds["5e684d82-73a3-9a34-095f-19b112d77bbe"] = "Digital Medievalist.js";


splittedTrans["DigiZeitschriften.js"] = {
    "stamp": {"translatorID":"e46830a2-1b19-4b6b-9f1a-e5e9760a0f80","label":"DigiZeitschriften","creator":"Philipp Zumstein","target":"^https?://www\\.digizeitschriften\\.de/((en/)?dms/|index\\.php\\?id=27[24])","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsv","lastUpdated":"2014-05-08 23:06:53"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("/img/") != -1 || url.indexOf("index.php?id=274") != -1 ) {//e.g. http://www.digizeitschriften.de/index.php?id=274&PPN=PPN342672002_0020&DMDID=dmdlog84&L=2
		return "journalArticle";
	} else if ( (url.indexOf("/toc/") != -1 || url.indexOf("index.php?id=272")) && getSearchResults(doc).length>0) {
		return "multiple";
	}
},
};
transIds["e46830a2-1b19-4b6b-9f1a-e5e9760a0f80"] = "DigiZeitschriften.js";


splittedTrans["dLibra.js"] = {
    "stamp": {"translatorID":"915e3ae2-afa9-4b1d-9780-28ed3defe0ab","label":"dLibra","creator":"Pawel Kolodziej <p.kolodziej@gmail.com>","target":"/.*dlibra/(doccontent|docmetadata|collectiondescription|results)|/dlibra/?","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-04-17 03:09:28"},
    "detectWeb": function detectWeb(doc, url) {
	
	var singleRe = /.*dlibra\/(doccontent|docmetadata|publication).*/;
	var multipleRe = /.*dlibra\/(collectiondescription|results).*|.*\/dlibra\/?/;
	if(singleRe.test(url)) 
		return "book"; 
	if(multipleRe.test(url)) 
		return "multiple";
},
};
transIds["915e3ae2-afa9-4b1d-9780-28ed3defe0ab"] = "dLibra.js";


splittedTrans["DOI.js"] = {
    "stamp": {"translatorID":"c159dcfe-8a53-4301-a499-30f6549c340d","label":"DOI","creator":"Simon Kornblith","target":"","minVersion":"3.0","maxVersion":"","priority":320,"inRepository":true,"translatorType":4,"browserSupport":"gcsv","lastUpdated":"2015-02-12 07:40:24"},
    "detectWeb": function detectWeb(doc, url) {
	// Blacklist the advertising iframe in ScienceDirect guest mode:
	// http://www.sciencedirect.com/science/advertisement/options/num/264322/mainCat/general/cat/general/acct/...
	// This can be removed from blacklist when 5c324134c636a3a3e0432f1d2f277a6bc2717c2a hits all clients (Z 3.0+)
	var blacklistRe = /^https?:\/\/[^/]*(?:google\.com|sciencedirect\.com\/science\/advertisement\/)/i;
	
	if(!blacklistRe.test(url)) {
		var DOIs = getDOIs(doc);
		if(DOIs.length) {
			return "multiple";
		}
	}
	return false;
},
};
transIds["c159dcfe-8a53-4301-a499-30f6549c340d"] = "DOI.js";


splittedTrans["Douban.js"] = {
    "stamp": {"translatorID":"fc353b26-8911-4c34-9196-f6f567c93901","label":"Douban","creator":"Ace Strong<acestrong@gmail.com>","target":"^https?://(?:www|book).douban.com/(?:subject|doulist|people/[a-zA-Z._]*/(?:do|wish|collect)|.*?status=(?:do|wish|collect)|group/[0-9]*?/collection|tag)","minVersion":"2.0rc1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-05-12 18:08:35"},
    "detectWeb": function detectWeb(doc, url) {
	var pattern = /subject_search|doulist|people\/[a-zA-Z._]*?\/(?:do|wish|collect)|.*?status=(?:do|wish|collect)|group\/[0-9]*?\/collection|tag/;

	if (pattern.test(url)) {
		return "multiple";
	} else {
		return "book";
	}

	return false;
},
};
transIds["fc353b26-8911-4c34-9196-f6f567c93901"] = "Douban.js";


splittedTrans["DPLA.js"] = {
    "stamp": {"translatorID":"117feb72-21bb-4424-a47b-c9ca6b71f979","label":"DPLA","creator":"Sebastian Karcher","target":"^https?://dp\\.la/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcv","lastUpdated":"2013-10-24 09:48:34"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("/search?") != -1) return "multiple";

	else if (url.indexOf("/item/") != -1) {
		var type = ZU.xpathText(doc, '//article[@id="content"]/div[@class="table"]/ul/li[h6[contains(text(), "Type")]]/following-sibling::li')
		//Z.debug(type)
		//we can't use the typemap below, as the types get merged together when scraping them
		if (type){
			if (type.search(/^(image|physical)/) != -1) return "artwork";
			else if (type.search(/^(image|physical)/) != -1) return "artwork";
			else if (type.search(/^sound/) != -1) return "audioRecording";
			else if (type.search(/^moving/) != -1) return "film";
			else if (type.search(/^software/) != -1) return "computerProgram";
			else if (type.search(/^(dataset|interactive)/) != -1) return "webpage";
			else return "book";
		}
		else return "book";
	}
},
};
transIds["117feb72-21bb-4424-a47b-c9ca6b71f979"] = "DPLA.js";


splittedTrans["DrugBank.ca.js"] = {
    "stamp": {"translatorID":"b2a735f3-11ac-4e9f-b22b-00e1b1d3c9f6","label":"DrugBank.ca","creator":"Tom Hodder <tom@limepepper.co.uk>","target":"^https?://(?:www\\.)?drugbank.ca/drugs/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-03-11 23:31:35"},
    "detectWeb": function detectWeb(doc, url) {
	return FW.detectWeb(doc, url);
},
};
transIds["b2a735f3-11ac-4e9f-b22b-00e1b1d3c9f6"] = "DrugBank.ca.js";


splittedTrans["Dryad Digital Repository.js"] = {
    "stamp": {"translatorID":"7a81d945-7d9c-4f8c-bd7b-4226c1cab40e","label":"Dryad Digital Repository","creator":"Nathan Day","target":"^https?://(www\\.)?datadryad\\.org/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-23 02:09:11"},
    "detectWeb": function detectWeb(doc, url) {
	// Dryad search page
	if (url.indexOf('/discover?') != -1) {
		return getSearchResults(doc, true) ? 'multiple' : false;
	} else {
		var result = ZU.xpathText(doc,'//meta[@name="DC.type"][1]/@content');
		// Dryad data package
		if (result === 'Article') {
			return 'journalArticle';
		// Dryad data file
		} else if (result === 'Dataset') {
			//return 'dataset';
			return 'journalArticle';
		}
	}
	return false;
},
};
transIds["7a81d945-7d9c-4f8c-bd7b-4226c1cab40e"] = "Dryad Digital Repository.js";


splittedTrans["DTU Orbit.js"] = {
    "stamp": {"translatorID":"097c963e-3866-4c6f-a6b4-f5e9d0d15530","label":"DTU Orbit","creator":"Sebastian Karcher","target":"^https?://orbit\\.dtu\\.dk/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcbv","lastUpdated":"2013-05-15 20:05:47"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.search(/publications\/search\.html/)!=-1) return "multiple";
	else if (url.search(/\/publications\/.+\.html/)!=-1) return "journalArticle";
	return false;
},
};
transIds["097c963e-3866-4c6f-a6b4-f5e9d0d15530"] = "DTU Orbit.js";


splittedTrans["Early English Books Online.js"] = {
    "stamp": {"translatorID":"b86bb082-6310-4772-a93c-913eaa3dfa1b","label":"Early English Books Online","creator":"Michael Berkowitz","target":"^https?://[^/]*eebo\\.chadwyck\\.com[^/]*(/works)?/search","minVersion":"2.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2014-04-03 16:50:31"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.title == "Search Results - EEBO" || doc.title=="Author's Works - EEBO") {
		return "multiple";
	} else if (doc.title != "Basic Search - EEBO") {
		return "book";
	}
},
};
transIds["b86bb082-6310-4772-a93c-913eaa3dfa1b"] = "Early English Books Online.js";


splittedTrans["Eastview.js"] = {
    "stamp": {"translatorID":"c59896bc-4beb-43ed-8109-a73a13251828","label":"Eastview","creator":"Sebastian Karcher","target":"^https?://dlib\\.eastview\\.com/(search/(advanced|simple)/|browse/(doc|favorites|issue))","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2014-09-01 13:01:04"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.search("/search/simple/articles?") != -1 || url.indexOf("/search/advanced/articles") != -1 || url.search(/browse\/(favorites|issue)/) != -1) {
		if (ZU.xpath(doc, '//td[contains(@class, "title-cell")]/a').length) return "multiple";
	} else {
		return "newspaperArticle"
	}
},
};
transIds["c59896bc-4beb-43ed-8109-a73a13251828"] = "Eastview.js";


splittedTrans["ebrary.js"] = {
    "stamp": {"translatorID":"2abe2519-2f0a-48c0-ad3a-b87b9c059459","label":"ebrary","creator":"Sebastian Karcher","target":"^https?://site\\.ebrary\\.com/.+(?:docDetail|search|detail)\\.action\\?","minVersion":"4.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcv","lastUpdated":"2014-10-24 09:38:21"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("docDetail.action?") != -1 || url.indexOf("detail.action?") != -1) return "book";
	else if (url.indexOf("search.action?") != -1) {
		if (ZU.xpathText(doc, '//div[@class="book_info_titlelist"]')) return "multiple";
	}
},
};
transIds["2abe2519-2f0a-48c0-ad3a-b87b9c059459"] = "ebrary.js";


splittedTrans["EBSCOhost.js"] = {
    "stamp": {"translatorID":"d0b1914a-11f1-4dd7-8557-b32fe8a3dd47","label":"EBSCOhost","creator":"Simon Kornblith, Michael Berkowitz, Josh Geller","target":"^https?://[^/]+/(eds|bsi|ehost)/(results|detail|folder|pdfviewer)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2015-05-21 22:39:54"},
    "detectWeb": function detectWeb(doc, url) {
	// See if this is a search results or folder results page
	var multiple = getResultList(doc, {}, {});	//we don't care about actual data at this point
	if(multiple) {
		return "multiple";
	}

	var persistentLink = doc.getElementsByClassName("permalink-link");
	if(persistentLink.length && persistentLink[0].nodeName.toUpperCase() == 'A') {
		return "journalArticle";
	}
	else if(ZU.xpathText(doc, '//section[@class="record-header"]/h2')){
		return "journalArticle";
	}
},
};
transIds["d0b1914a-11f1-4dd7-8557-b32fe8a3dd47"] = "EBSCOhost.js";


splittedTrans["Edinburgh University Press Journals.js"] = {
    "stamp": {"translatorID":"b7bd798d-e518-46d1-aa13-a69f2864fa91","label":"Edinburgh University Press Journals","creator":"Sebastian Karcher","target":"^https?://www\\.euppublishing\\.com/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-01-22 02:43:55"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/\/doi\/abs\/10\.|\/doi\/full\/10\./)) return "journalArticle";
	else if (url.match(/\/action\/doSearch|\/toc\//) && getSearchResults(doc).length) return "multiple";
},
};
transIds["b7bd798d-e518-46d1-aa13-a69f2864fa91"] = "Edinburgh University Press Journals.js";


splittedTrans["Education Week.js"] = {
    "stamp": {"translatorID":"7e51d3fb-082e-4063-8601-cda08f6004a3","label":"Education Week","creator":"Ben Parr","target":"^https?://(www2?\\.|blogs\\.)?edweek\\.org/","minVersion":"1.0.0b4.r1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-02 11:18:49"},
    "detectWeb": function detectWeb(doc,url)
{
	   var namespace = doc.documentElement.namespaceURI;
	   var nsResolver = namespace ? function(prefix) {
	   if (prefix == 'x') return namespace; else return null;
	   } : null;

	   var xpath='//meta[@name="Story_type"]/@content';
	   var temp=doc.evaluate(xpath, doc, nsResolver,XPathResult.ANY_TYPE,null).iterateNext();
	   if(temp)
	   {
			   if(temp.value=="Blog")
					   {return "blogPost";}
			   if(temp.value.indexOf("Story")>-1)
					   {return "magazineArticle";}
	   }
},
};
transIds["7e51d3fb-082e-4063-8601-cda08f6004a3"] = "Education Week.js";


splittedTrans["EIDR.js"] = {
    "stamp": {"translatorID":"79c3d292-0afc-42a1-bd86-7e706fc35aa5","label":"EIDR","creator":"Aurimas Vinckevicius","target":"","minVersion":"1.0","maxVersion":"","priority":80,"inRepository":true,"translatorType":8,"browserSupport":"gcsi","lastUpdated":"2014-05-29 01:51:21"},
};
transIds["79c3d292-0afc-42a1-bd86-7e706fc35aa5"] = "EIDR.js";


splittedTrans["Electronic Colloquium on Computational Complexity.js"] = {
    "stamp": {"translatorID":"09a9599e-c20e-a405-d10d-35ad4130a426","label":"Electronic Colloquium on Computational Complexity","creator":"Jonas Schrieb","target":"^https?://(www\\.)?eccc\\.(uni-trier|hpi-web)\\.de/","minVersion":"1.0.0b3.r1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2014-04-03 17:35:30"},
    "detectWeb": function detectWeb(doc, url) {
	var singleRe   = /^https?:\/\/(www\.)?eccc\.(uni-trier|hpi-web)\.de\/report\/\d{4}\/\d{3}/;
	var multipleRe = /^https?:\/\/(www\.)?eccc\.(uni-trier|hpi-web)\.de\/(title|year|keyword)\//;
	if(singleRe.test(url)) {
		return "report";
	} else if(multipleRe.test(url)) {
		return "multiple";
	}
},
};
transIds["09a9599e-c20e-a405-d10d-35ad4130a426"] = "Electronic Colloquium on Computational Complexity.js";


splittedTrans["eLibrary.ru.js"] = {
    "stamp": {"translatorID":"587709d3-80c5-467d-9fc8-ed41c31e20cf","label":"eLibrary.ru","creator":"Avram Lyon","target":"^https?://elibrary\\.ru/","minVersion":"2.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-04-03 17:36:01"},
    "detectWeb": function detectWeb(doc, url){
	if (url.match(/\/item.asp/)) {
		return "journalArticle";
	} else if (url.match(/\/(query_results|contents|org_items|itembox_items)\.asp/)){
		return "multiple";
	}
},
};
transIds["587709d3-80c5-467d-9fc8-ed41c31e20cf"] = "eLibrary.ru.js";


splittedTrans["eLife.js"] = {
    "stamp": {"translatorID":"98ad3ad1-9d43-4b2e-bc36-172cbf00ba1d","label":"eLife","creator":"Aurimas Vinckevicius","target":"https?://elife.elifesciences.org/(?:content/|elife/search\\?|category/|browse)","minVersion":"4.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-06-01 17:43:22"},
    "detectWeb": function detectWeb(doc, url) {
	if(getSearchResults(doc).length) {
		return "multiple";
	}
	
	return "journalArticle";
},
};
transIds["98ad3ad1-9d43-4b2e-bc36-172cbf00ba1d"] = "eLife.js";


splittedTrans["Elsevier Health Journals.js"] = {
    "stamp": {"translatorID":"b043e7ed-b921-4444-88af-2fcc39881ee2","label":"Elsevier Health Journals","creator":"Sebastian Karcher","target":"/search/(quick|results)$|/article/[^/]+/(abstract|fulltext|references|images)$","minVersion":"1.0","maxVersion":"","priority":250,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-04-03 15:57:35"},
    "detectWeb": function detectWeb(doc,url) {
	
	var footer = doc.getElementById('footer');
	if(!footer) return;
	var elsevierLink = footer.getElementsByTagName('a')[0];
	if(!elsevierLink || elsevierLink.textContent.trim() != 'Elsevier') return;
	var xpath='//meta[@name="citation_journal_title"]';
		
	if (ZU.xpath(doc, xpath).length > 0) {
		return "journalArticle";
	}
			
	if (url.match(/\/search\/(results|quick)/)) {
		if (getMultiples(doc).length>0) return "multiple";
	}
	return false;
},
};
transIds["b043e7ed-b921-4444-88af-2fcc39881ee2"] = "Elsevier Health Journals.js";


splittedTrans["Embedded Metadata.js"] = {
    "stamp": {"translatorID":"951c027d-74ac-47d4-a107-9c3069ab7b48","label":"Embedded Metadata","creator":"Simon Kornblith and Avram Lyon","target":"","minVersion":"3.0.4","maxVersion":"","priority":400,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-28 14:44:06"},
    "detectWeb": function detectWeb(doc, url) {
	//blacklist wordpress jetpack comment plugin so it doesn't override other metadata
	if (url.indexOf("jetpack.wordpress.com/jetpack-comment/")!=-1) return false;
	if(exports.itemType) return exports.itemType;

	init(doc, url, Zotero.done);
},
};
transIds["951c027d-74ac-47d4-a107-9c3069ab7b48"] = "Embedded Metadata.js";


splittedTrans["eMedicine.js"] = {
    "stamp": {"translatorID":"ab88d517-d88c-4a73-a0ad-c94c76cca849","label":"eMedicine","creator":"William Smith","target":"^https?://emedicine\\.medscape\\.com/article/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-04-15 18:04:37"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.location.href.match("(overview|treatment|diagnosis|followup|media)")) {
		return "journalArticle";
	}
},
};
transIds["ab88d517-d88c-4a73-a0ad-c94c76cca849"] = "eMedicine.js";


splittedTrans["eMJA.js"] = {
    "stamp": {"translatorID":"966a7612-900c-42d9-8780-2a3247548588","label":"eMJA","creator":"Sebastian Karcher","target":"^https?://www\\.mja\\.com\\.au/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-05-08 12:53:01"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["966a7612-900c-42d9-8780-2a3247548588"] = "eMJA.js";


splittedTrans["Encyclopedia of Chicago.js"] = {
    "stamp": {"translatorID":"0689f3e1-f0b4-4c0c-b795-4aebdfea08e0","label":"Encyclopedia of Chicago","creator":"Brodie Austin","target":"^https?://encyclopedia\\.chicagohistory\\.org/pages","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-04-03 17:36:22"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["0689f3e1-f0b4-4c0c-b795-4aebdfea08e0"] = "Encyclopedia of Chicago.js";


splittedTrans["Endnote XML.js"] = {
    "stamp": {"translatorID":"eb7059a4-35ec-4961-a915-3cf58eb9784b","label":"Endnote XML","creator":"Sebastian Karcher","target":"xml","minVersion":"4.0","maxVersion":"","priority":100,"configOptions":{"getCollections":true},"displayOptions":{"exportNotes":true,"exportFileData":false},"inRepository":true,"translatorType":3,"browserSupport":"gcv","lastUpdated":"2015-03-05 03:20:38"},
"detectImport": function detectImport() {

	var doc = Zotero.getXML().documentElement;

	if (!doc) {
		return false;
	} else if (ZU.xpathText(doc, '//record/ref-type')) {
		return true;
	}
},};
transIds["eb7059a4-35ec-4961-a915-3cf58eb9784b"] = "Endnote XML.js";


splittedTrans["Engineering Village.js"] = {
    "stamp": {"translatorID":"1f40baef-eece-43e4-a1cc-27d20c0ce086","label":"Engineering Village","creator":"Ben Parr, Sebastian Karcher","target":"^https?://(?:www\\.)?engineeringvillage(2)?\\.(?:com|org)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2014-02-02 07:20:12"},
    "detectWeb": function detectWeb(doc, url)
{
	var xpath='//span/a[@id="downloadlink"][@href]';
	if(doc.evaluate(xpath, doc,
		null,XPathResult.ANY_TYPE,null).iterateNext())
		{  return "journalArticle";}
		
	xpath='//div[@id="resultslist"]';
	if(doc.evaluate(xpath, doc,
		null,XPathResult.ANY_TYPE,null).iterateNext())
		{  return "multiple";}		
	return null; 
},
};
transIds["1f40baef-eece-43e4-a1cc-27d20c0ce086"] = "Engineering Village.js";


splittedTrans["EPA National Library Catalog.js"] = {
    "stamp": {"translatorID":"99f11c5d-4413-4f96-9fc7-72fbd40372ef","label":"EPA National Library Catalog","creator":"Sebastian Karcher","target":"^https?://cfpub\\.epa\\.gov/ols","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcv","lastUpdated":"2014-03-17 19:59:24"},
    "detectWeb": function detectWeb(doc, url){
	if (url.indexOf("records_found.cfm")!=-1){
		return "multiple"
	}
	else {
		return findItemType(doc);
	}
},
};
transIds["99f11c5d-4413-4f96-9fc7-72fbd40372ef"] = "EPA National Library Catalog.js";


splittedTrans["Epicurious.js"] = {
    "stamp": {"translatorID":"aee2323e-ce00-4fcc-a949-06eb1becc98f","label":"Epicurious","creator":"Sean Takats","target":"^https?://www\\.epicurious\\.com/(?:tools/searchresults|recipes/food/views)","minVersion":"1.0.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2013-09-22 22:16:30"},
    "detectWeb": function detectWeb(doc, url) {

	var xpath = '//div[@id="ingredients"]';
	var multxpath = '//div[@id="searchresults"]';

	if (doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "document";
	}
	// multiple disabled bc of permission issue
	else if (doc.evaluate(multxpath, doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	}

},
};
transIds["aee2323e-ce00-4fcc-a949-06eb1becc98f"] = "Epicurious.js";


splittedTrans["ePrint IACR.js"] = {
    "stamp": {"translatorID":"04a23cbe-5f8b-d6cd-8eb1-2e23bcc8ae8f","label":"ePrint IACR","creator":"Jonas Schrieb","target":"^https?://eprint\\.iacr\\.org/","minVersion":"1.0.0b3.r1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-27 02:17:58"},
    "detectWeb": function detectWeb(doc, url) {
	var singleRe   = /^https?:\/\/eprint\.iacr\.org\/(\d{4}\/\d{3}|cgi-bin\/print\.pl)/;
	var multipleRe = /^https?:\/\/eprint\.iacr\.org\/(complete|curr|\d{4}|(cgi|eprint)-bin\/search\.pl)/;
	if(singleRe.test(url)) {
		return "report";
	} else if(multipleRe.test(url)) {
		return "multiple";
	}
},
};
transIds["04a23cbe-5f8b-d6cd-8eb1-2e23bcc8ae8f"] = "ePrint IACR.js";


splittedTrans["ERIC.js"] = {
    "stamp": {"translatorID":"e4660e05-a935-43ec-8eec-df0347362e4c","label":"ERIC","creator":"Sebastian Karcher","target":"^https?://(?:www\\.)?eric\\.ed\\.gov/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-12-14 16:36:31"},
    "detectWeb": function detectWeb(doc,url) {
	var xpath='//meta[@name="citation_journal_title"]';
	var type = ZU.xpathText(doc, '//meta[@name="source"]/@content');	
	if (ZU.xpath(doc, xpath).length > 0) {
		if (type && type.indexOf("Non-Journal")!=-1) return "book"
		else return "journalArticle";
	}
			
	else if (getMultiples(doc).length>0) return "multiple";
	return false;
},
};
transIds["e4660e05-a935-43ec-8eec-df0347362e4c"] = "ERIC.js";


splittedTrans["ESpacenet.js"] = {
    "stamp": {"translatorID":"176948f7-9df8-4afc-ace7-4c1c7318d426","label":"ESpacenet","creator":"Sebastian Karcher and Aurimas Vinckevicius","target":"^https?://worldwide\\.espacenet\\.com/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-08-15 02:07:20"},
    "detectWeb": function detectWeb(doc, url) {
	if(url.indexOf("searchResults?") !== -1
		&& getSearchResults(doc).length) {
			return "multiple";
	}

	if (url.indexOf("biblio") !== -1
		&& getTitle(doc)) {
		return "patent";
	}
},
};
transIds["176948f7-9df8-4afc-ace7-4c1c7318d426"] = "ESpacenet.js";


splittedTrans["etatar.ru.js"] = {
    "stamp": {"translatorID":"9d8fb229-a563-489b-b36d-3bdaa69ddf1f","label":"etatar.ru","creator":"Avram Lyon","target":"^https?://(?:www\\.)?etatar\\.ru/","minVersion":"2.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2011-09-13 10:20:59"},
    "detectWeb": function detectWeb(doc, url) { 
		return FW.detectWeb(doc, url);
},
};
transIds["9d8fb229-a563-489b-b36d-3bdaa69ddf1f"] = "etatar.ru.js";


splittedTrans["Euclid.js"] = {
    "stamp": {"translatorID":"2e1c09a0-3006-11de-8c30-0800200c9a66","label":"Euclid","creator":"Guy Freeman and Avram Lyon","target":"^https?://[^/]*projecteuclid\\.org[^/]*/","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-06-05 07:32:38"},
    "detectWeb": function detectWeb(doc,url) {

	var xpath='//meta[@name="citation_journal_title"]';
	if (ZU.xpath(doc, xpath).length > 0) {
		return "journalArticle";
	}
			
	multxpath = '//div[@class="article-item"]/span[@class="title"]|//div[@class="result"]/h3'
	
	if (ZU.xpath(doc, multxpath).length>0){
		return "multiple";
	}
	return false;
},
};
transIds["2e1c09a0-3006-11de-8c30-0800200c9a66"] = "Euclid.js";


splittedTrans["EurasiaNet.js"] = {
    "stamp": {"translatorID":"58ae38d2-80d3-4569-81eb-9cefc43ac5b4","label":"EurasiaNet","creator":"Avram Lyon","target":"^https?://www\\.eurasianet\\.org/","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2012-03-04 20:52:45"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["58ae38d2-80d3-4569-81eb-9cefc43ac5b4"] = "EurasiaNet.js";


splittedTrans["European Educational Research Journal.js"] = {
    "stamp": {"translatorID":"2e304579-dd7b-4770-85e9-0d724c9b49a5","label":"European Educational Research Journal","creator":"Michael Berkowitz","target":"^https?://www\\.wwwords\\.co\\.uk/eerj/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-10 11:34:28"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.evaluate('//div[@id="maincontent"]/table[*//p[@class="articletitle"]]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	}
},
};
transIds["2e304579-dd7b-4770-85e9-0d724c9b49a5"] = "European Educational Research Journal.js";


splittedTrans["Evernote.js"] = {
    "stamp": {"translatorID":"18dd188a-9afc-4cd6-8775-1980c3ce0fbf","label":"Simple Evernote Export","creator":"Volodymir Skipa","target":"enex","minVersion":"2.1.9","maxVersion":"","priority":50,"displayOptions":{"exportNotes":true},"inRepository":false,"translatorType":2,"browserSupport":"g","lastUpdated":"2012-02-17 11:51:00"},
};
transIds["18dd188a-9afc-4cd6-8775-1980c3ce0fbf"] = "Evernote.js";


splittedTrans["Factiva.js"] = {
    "stamp": {"translatorID":"7bdb79e-a47f-4e3d-b317-ccd5a0a74456","label":"Factiva","creator":"Philipp Zumstein and Aurimas Vinckevicius","target":"^https?://(?:global\\.factiva\\.com|[^/]*\\bglobal-factiva-com\\b[^/]+)/(?:[gh]a|redir|np)/default\\.aspx","minVersion":"4.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsv","lastUpdated":"2015-02-13 21:54:59"},
    "detectWeb": function detectWeb(doc, url) {
	if(doc.body.classList.contains('articleView')) {
		// This is not sufficient for multiples, because the class does not change when filtering results
		Z.monitorDOMChanges(doc.body, {attributes: true, attributeFilter: ['class']});
		return "newspaperArticle";
	}
	
	var splitter = doc.getElementById('hldSplitter');
	if (splitter) Z.monitorDOMChanges(splitter, { attributes: true, attributeFilter: ['style'] });
	if (getSearchResults(doc, true)) return "multiple";
},
};
transIds["7bdb79e-a47f-4e3d-b317-ccd5a0a74456"] = "Factiva.js";


splittedTrans["FAZ.NET.js"] = {
    "stamp": {"translatorID":"4f0d0c90-5da0-11df-a08a-0800200c9a66","label":"FAZ.NET","creator":"ibex, Sebastian Karcher","target":"^https?://((www\\.)?faz\\.net/.)","minVersion":"2.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-05-10 09:55:17"},
    "detectWeb": function detectWeb(doc, url) {

	//Zotero.debug("ibex detectWeb URL= "+ url);
	if (doc.title == "Suche und Suchergebnisse - FAZ" && doc.evaluate('//div[@class = "SuchergebnisListe"]', doc, null, XPathResult.ANY_TYPE, null)) {
		return "multiple";
	} else if (ZU.xpathText(doc, '//div[@class = "FAZArtikelEinleitung"]')) {
		return "newspaperArticle";
	}
},
};
transIds["4f0d0c90-5da0-11df-a08a-0800200c9a66"] = "FAZ.NET.js";


splittedTrans["feb-web.ru.js"] = {
    "stamp": {"translatorID":"e92c8359-c3fc-468b-bc6a-107b2744fd17","label":"feb-web.ru","creator":"Avram Lyon","target":"^https?://(?:www\\.)?feb-web\\.ru\\/.*cmd=2","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-08-08 22:38:57"},
    "detectWeb": function detectWeb(doc, url) {
	return "bookSection";
},
};
transIds["e92c8359-c3fc-468b-bc6a-107b2744fd17"] = "feb-web.ru.js";


splittedTrans["Figshare.js"] = {
    "stamp": {"translatorID":"ab5983ab-6ad9-4060-aff1-4b455c89a3b3","label":"Figshare","creator":"Sebatian Karcher","target":"^https?://figshare\\.com","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2013-12-10 16:57:47"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("search?q") != -1 || url.indexOf("/browse") != -1) {
		return "multiple";
	} else if (url.indexOf("/article") != -1) {
		//no great item type here - switch once we have dataset.
		return "document";
	}
},
};
transIds["ab5983ab-6ad9-4060-aff1-4b455c89a3b3"] = "Figshare.js";


splittedTrans["Financial Times.js"] = {
    "stamp": {"translatorID":"fc9b7700-b3cc-4150-ba89-c7e4443bd96d","label":"Financial Times","creator":"Sebastian Karcher","target":"^https?://(www|search|ftalphaville)\\.ft\\.com","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsv","lastUpdated":"2015-02-22 03:36:42"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["fc9b7700-b3cc-4150-ba89-c7e4443bd96d"] = "Financial Times.js";


splittedTrans["fishpond.co.nz.js"] = {
    "stamp": {"translatorID":"c436f3c7-4246-4ed3-a227-a538c8113a0e","label":"fishpond.co.nz","creator":"Sopheak Hean, Sebastian Karcher","target":"^https?://www\\.fishpond\\.co\\.nz/","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-10-07 14:06:56"},
    "detectWeb": function detectWeb(doc, url) {
	var definePath = '//td[contains(@class, "product_info")]//h1';
	var XpathObject = doc.evaluate(definePath, doc, null, XPathResult.ANY_TYPE, null).iterateNext();
	if  (XpathObject) {
		return "book";
	} else {
		var definePath = '//td[@id="page_title"]/h1';
		var XpathObject = doc.evaluate(definePath, doc, null, XPathResult.ANY_TYPE, null).iterateNext();
		if  (XpathObject) {
			return "multiple";
		}
	}
},
};
transIds["c436f3c7-4246-4ed3-a227-a538c8113a0e"] = "fishpond.co.nz.js";


splittedTrans["Flickr.js"] = {
    "stamp": {"translatorID":"5dd22e9a-5124-4942-9b9e-6ee779f1023e","label":"Flickr","creator":"Sean Takats, Rintze Zelle, and Aurimas Vinckevicius","target":"^https?://(?:www\\.)?flickr\\.com/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-12-18 04:44:52"},
    "detectWeb": function detectWeb(doc, url) {
	if (ZU.xpath(doc,'//h1[@property="dc:title" and starts-with(@id, "title_div")]').length) {
		return getPhotoId(doc) ? "artwork" : null;
	}
	
	var type = ZU.xpathText(doc,'//meta[@name="og:type"]/@content');
	if ( type && type.substr(type.length - 5) == 'photo') {
		return getPhotoId(doc) ? "artwork" : null;
	}
	
	if (getSearchResults(doc, true)) {
		return "multiple";
	}
},
};
transIds["5dd22e9a-5124-4942-9b9e-6ee779f1023e"] = "Flickr.js";


splittedTrans["Foreign Affairs.js"] = {
    "stamp": {"translatorID":"4ab6d49c-d94e-4a9c-ae9a-3310c44ba612","label":"Foreign Affairs","creator":"Sebastian Karcher","target":"^https?://www\\.foreignaffairs\\.com","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-09-09 06:34:22"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["4ab6d49c-d94e-4a9c-ae9a-3310c44ba612"] = "Foreign Affairs.js";


splittedTrans["Foreign Policy.js"] = {
    "stamp": {"translatorID":"0e7ab798-bb96-4a3a-9a01-8d1d67153908","label":"Foreign Policy","creator":"Sebastian Karcher","target":"^https?://[^/]*foreignpolicy\\.com","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-01-04 16:38:42"},
    "detectWeb": function detectWeb(doc, url) {
	if(!ZU.xpath(doc, '//article/h1').length && !ZU.xpath(doc, '//div[@class="inner"]//div[contains(@class, "text_wrapper")]/h2/a')) {
		return;
	}
	return FW.detectWeb(doc, url);
},
};
transIds["0e7ab798-bb96-4a3a-9a01-8d1d67153908"] = "Foreign Policy.js";


splittedTrans["fr-online.de.js"] = {
    "stamp": {"translatorID":"488fe1e0-b7d2-406f-8257-5060418ce9b2","label":"fr-online.de","creator":"Martin Meyerhoff","target":"^https?://www\\.fr-online\\.de","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-03 17:37:43"},
    "detectWeb": function detectWeb(doc, url) {
	var FR_article_XPath = "//h1[contains(@class, 'ArticleHeadline')]|//h1[contains(@class, 'Title')]";
	var FR_multiple_XPath = ".//*[@id='ContainerContent']/div//div[contains(@class, 'ItemHeadline')]/a"


	if (doc.evaluate(FR_article_XPath, doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		//Zotero.debug("newspaperArticle");
		return "newspaperArticle";
	} else if (doc.location.href.match(/^http\:\/\/www\.fr-online\.de\/.*?page\/search/)) {
		//Zotero.debug("multiple");
		return "multiple";
	} else if (doc.evaluate(FR_multiple_XPath, doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		//Zotero.debug("multiple");
		return "multiple";
	}
},
};
transIds["488fe1e0-b7d2-406f-8257-5060418ce9b2"] = "fr-online.de.js";


splittedTrans["FreeCite.js"] = {
    "stamp": {"translatorID":"7bbef39f-8bb9-44d7-826f-47ce75eb15ae","label":"FreeCite","creator":"Philipp Zumstein","target":"^https?://freecite\\.library\\.brown\\.edu/citations/create","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-03-16 23:13:55"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.getElementsByTagName("code").length &&
		doc.getElementsByTagName("code")[0].textContent.indexOf("<")>-1) {
		return "multiple";
	}
},
};
transIds["7bbef39f-8bb9-44d7-826f-47ce75eb15ae"] = "FreeCite.js";


splittedTrans["FreePatentsOnline.js"] = {
    "stamp": {"translatorID":"879d738c-bbdd-4fa0-afce-63295764d3b7","label":"FreePatentsOnline","creator":"Adam Crymble","target":"^https?://www\\.freepatentsonline\\.com","minVersion":"2.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-04-15 18:04:37"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.location.href.match("result.html")) {
		return "multiple";
	} else if (doc.evaluate('//div[@class="disp_doc2"]/div', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "patent";
	}
},
};
transIds["879d738c-bbdd-4fa0-afce-63295764d3b7"] = "FreePatentsOnline.js";


splittedTrans["Frontiers.js"] = {
    "stamp": {"translatorID":"cb9e794e-7a65-47cd-90f6-58cdd191e8b0","label":"Frontiers","creator":"Jason Friedman and Simon Kornblith","target":"^https?://(www|journal)\\.frontiersin\\.org.*/","minVersion":"2.1.10","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-07-22 19:46:46"},
    "detectWeb": function detectWeb(doc, url) {

	if (url.indexOf("abstract") != -1) {
		return "journalArticle";
	} else if (url.indexOf("full") != -1) {
		return "journalArticle";
	} else if (!ZU.isEmpty(getItems(doc, url))) {
		return "multiple";
	}
},
};
transIds["cb9e794e-7a65-47cd-90f6-58cdd191e8b0"] = "Frontiers.js";


splittedTrans["GaleGDC.js"] = {
    "stamp": {"translatorID":"04e63564-b92b-41cd-a9d5-366a02056d10","label":"GaleGDC","creator":"GaleGDC","target":"/gdc/ncco|/gdc/xsearch|/gdc/artemis","minVersion":"3.0","maxVersion":"","priority":270,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2014-08-26 03:45:45"},
    "detectWeb": function detectWeb(doc, url) {
	return GaleZotero.detectGaleWeb(doc, url);
},
};
transIds["04e63564-b92b-41cd-a9d5-366a02056d10"] = "GaleGDC.js";


splittedTrans["Galegroup.js"] = {
    "stamp": {"translatorID":"4ea89035-3dc4-4ae3-b22d-726bc0d83a64","label":"Galegroup","creator":"Sebastian Karcher and Aurimas Vinckevicius","target":"https?://(find|go)\\.galegroup\\.com","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2014-09-26 22:55:11"},
    "detectWeb": function detectWeb(doc, url) {
	if(url.indexOf('/newspaperRetrieve.do') != -1) {
		return "newspaperArticle";
	}
	
	if(url.indexOf('/retrieve.do') != -1
		|| url.indexOf('/i.do') != -1
		|| url.indexOf('/infomark.do') != -1) {
		
		if(url.indexOf('/ecco/') != -1) return "book";
		
		return "journalArticle";
	}
	
	if(getSearchResults(doc).length) return "multiple";
},
};
transIds["4ea89035-3dc4-4ae3-b22d-726bc0d83a64"] = "Galegroup.js";


splittedTrans["Gallica.js"] = {
    "stamp": {"translatorID":"58ab2618-4a25-4b9b-83a7-80cd0259f896","label":"Gallica","creator":"Sylvain Machefert","target":"^https?://gallica\\.bnf\\.fr","minVersion":"1.0.0b3.r1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-04-04 10:09:18"},
    "detectWeb": function detectWeb(doc, url) {
	var indexSearch = url.toString().indexOf('http://gallica.bnf.fr/Search');
	var indexArk = url.toString().indexOf('http://gallica.bnf.fr/ark:');
	var indexSNE = url.toString().indexOf('http://gallica.bnf.fr/VisuSNE');
	
	if (indexSearch == 0)
	{
		var errorXpath = '//div[@class="errorMessage"]';
		if  (elt = doc.evaluate(errorXpath, doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
			// We are on a search page result but it can be an empty result page.
			// Nothing to return;
		}
		else
		{
			return "multiple";
		}
	}
	else if (indexArk == 0)
	{
		var iconxpath = '//div[@class="contenu1"]/img';
		if (elt = doc.evaluate(iconxpath, doc, null, XPathResult.ANY_TYPE, null).iterateNext())
		{
			var icon = elt.getAttribute('src');
			return getDoctypeGallica(icon);
		}
		
		// For some biblio, the icon picture is located in another div ...
		var iconxpath = '//div[@class="titrePeriodiqueGauche"]/img';
		if  (elt = doc.evaluate(iconxpath, doc, null,
		XPathResult.ANY_TYPE, null).iterateNext())
		{
			var icon = elt.getAttribute('src');
			return getDoctypeGallica(icon);
		}
	}
	else if (indexSNE == 0)
	{
		return "book";
	}
},
};
transIds["58ab2618-4a25-4b9b-83a7-80cd0259f896"] = "Gallica.js";


splittedTrans["Gasyrlar Awazy.js"] = {
    "stamp": {"translatorID":"8afd6209-ef61-4e64-ae6c-3b2d6f71aa50","label":"Гасырлар авазы / Эхо веков","creator":"Avram Lyon","target":"^https?://www\\.archive\\.gov\\.tatarstan\\.ru/magazine/go/anonymous/main/\\?path=mg:/","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-03-03 23:38:39"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/numbers\/\d{4}[^/]*\/[\d_]+\/[\d_]+\/?$/)) {
		return FW.detectWeb(doc, url);
	}
	return false; // no multi now
},
};
transIds["8afd6209-ef61-4e64-ae6c-3b2d6f71aa50"] = "Gasyrlar Awazy.js";


splittedTrans["Gemeinsamer Bibliotheksverbund ISBN.js"] = {
    "stamp": {"translatorID":"de0eef58-cb39-4410-ada0-6b39f43383f9","label":"Gemeinsamer Bibliotheksverbund ISBN","creator":"Philipp Zumstein","target":"","minVersion":"4.0","maxVersion":"","priority":99,"inRepository":true,"translatorType":8,"browserSupport":"gcsibv","lastUpdated":"2015-04-16 18:45:00"},
};
transIds["de0eef58-cb39-4410-ada0-6b39f43383f9"] = "Gemeinsamer Bibliotheksverbund ISBN.js";


splittedTrans["Gene Ontology.js"] = {
    "stamp": {"translatorID":"cee0cca2-e82a-4618-b6cf-16327970169d","label":"Gene Ontology","creator":"Amelia Ireland","target":"^https?://.*\\.geneontology\\.org","minVersion":"2.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcv","lastUpdated":"2014-01-05 11:26:46"},
    "detectWeb": function detectWeb(doc, url) {
	var xPath = '//cite//*[@class="pmid"] | //cite//a[contains (@href, "pubmed")]';
	var cites = doc.evaluate(xPath, doc, null, XPathResult.ANY_TYPE, null).iterateNext();

	if (cites)
	{	Zotero.debug("Found some cites!");
		return "multiple";
	}
},
};
transIds["cee0cca2-e82a-4618-b6cf-16327970169d"] = "Gene Ontology.js";


splittedTrans["Glenbow Library.js"] = {
    "stamp": {"translatorID":"330f283f-12e9-4421-aa59-e17ec5f4aa37","label":"Glenbow Library","creator":"Adam Crymble","target":"^https?://ww2\\.glenbow\\.org/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-03-12 01:00:30"},
    "detectWeb": function detectWeb(doc, url) {

	if (doc.title.match("Library Main Catalogue Search Results") && doc.location.href.match("GET_RECORD")) {
			return "book";
	} else if
		(doc.title.match("Library Map Collection Search Results") && doc.location.href.match("GET_RECORD")) {
			return "map";

	} else if
		(doc.title.match("Library Main Catalogue Search Results") && !(doc.location.href.match("GET_RECORD"))) {
			return "multiple";
	} else if
		(doc.title.match("Map Collection Search Results") && !(doc.location.href.match("GET_RECORD"))) {
			return "multiple";
	}
},
};
transIds["330f283f-12e9-4421-aa59-e17ec5f4aa37"] = "Glenbow Library.js";


splittedTrans["Gmail.js"] = {
    "stamp": {"translatorID":"58a778cc-25e2-4884-95b3-6b22d7571183","label":"Gmail","creator":"Aurimas Vinckevicius","target":"https?://mail.google.com/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2015-04-08 01:50:09"},
    "detectWeb": function detectWeb(doc, url) {
	//only trigger on print pages
	var docOnLoad = doc.body.attributes.onload;
	if(docOnLoad && docOnLoad.textContent == 'Print()') {
		return 'email';
	}
	var scriptNodesText = ZU.xpathText(doc, '//script');
	if (scriptNodesText.indexOf("window.print()")>-1) {
		return 'email';
	}
},
};
transIds["58a778cc-25e2-4884-95b3-6b22d7571183"] = "Gmail.js";


splittedTrans["Google Blogs.js"] = {
    "stamp": {"translatorID":"58641ca2-d324-445b-a618-4e7c4631726f","label":"Google Blogs","creator":"Avram Lyon","target":"^https?://www\\.google\\.[^/]+/.*[?#&]tbm=blg","minVersion":"2.1.8","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2013-09-26 16:47:31"},
    "detectWeb": function detectWeb(doc, url) {
	return "multiple";
},
};
transIds["58641ca2-d324-445b-a618-4e7c4631726f"] = "Google Blogs.js";


splittedTrans["Google Books.js"] = {
    "stamp": {"translatorID":"3e684d82-73a3-9a34-095f-19b112d88bbf","label":"Google Books","creator":"Simon Kornblith, Michael Berkowitz and Rintze Zelle","target":"^https?://(books|www)\\.google\\.[a-z]+(\\.[a-z]+)?/(books(?:\\/.*)?\\?(.*id=.*|.*q=.*)|search\\?.*?(btnG=Search\\+Books|tbm=bks))|^https?://play\\.google\\.[a-z]+(\\.[a-z]+)?\\/(store\\/)?(books|search\\?.+&c=books)","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2014-12-11 17:17:45"},
    "detectWeb": function detectWeb(doc, url) {
	if(singleRe.test(url)) {
		return "book";
	} else {
		return "multiple";
	}
},
};
transIds["3e684d82-73a3-9a34-095f-19b112d88bbf"] = "Google Books.js";


splittedTrans["Google Patents.js"] = {
    "stamp": {"translatorID":"d71e9b6d-2baa-44ed-acb4-13fe2fe592c0","label":"Google Patents","creator":"Adam Crymble, Avram Lyon","target":"^https?://(www\\.)?google\\.[^/]+/(?:patents|[^/]*[&?#]tbm=pts)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-08-15 02:22:24"},
    "detectWeb": function detectWeb(doc, url) {
	if (!doc.getElementsByTagName("body")[0].hasChildNodes()) return;

	if (getSearchResults(doc).length) {
		return "multiple";
	} else if(getScraper(doc)) {
		return "patent";
	}
},
};
transIds["d71e9b6d-2baa-44ed-acb4-13fe2fe592c0"] = "Google Patents.js";


splittedTrans["Google Play.js"] = {
    "stamp": {"translatorID":"abc89357-6185-4ddd-8583-80034b754832","label":"Google Play","creator":"Avram Lyon","target":"^https?://play\\.google\\.com/","minVersion":"4.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2015-02-12 08:57:37"},
    "detectWeb": function detectWeb(doc, url) {
	var bodyContent = doc.getElementById('body-content');
	if (bodyContent) {
		Z.monitorDOMChanges(bodyContent, {childList: true});
	}

	if (url.indexOf('/apps/details?id=') !== -1) {
		return "computerProgram";
	}

	if (url.indexOf('/store/apps') !== -1
			|| url.indexOf('&c=apps') !== -1) {
		return cardListFindCards(doc).length ? "multiple" : false;
	}
},
};
transIds["abc89357-6185-4ddd-8583-80034b754832"] = "Google Play.js";


splittedTrans["Google Scholar.js"] = {
    "stamp": {"translatorID":"57a00950-f0d1-4b41-b6ba-44ff0fc30289","label":"Google Scholar","creator":"Simon Kornblith, Frank Bennett, Aurimas Vinckevicius","target":"^https?://scholar\\.google\\.(?:com|cat|(?:com?\\.)?[a-z]{2})/(?:scholar(?:_case)?\\?|citations\\?)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-05-07 23:55:08"},
    "detectWeb": function (doc, url) {
	// Icon shows only for search results and law cases
	if (url.indexOf('/scholar_case?') != -1
		&& url.indexOf('about=') == -1
	) {
			return "case";
	} else if(url.indexOf('/citations?') != -1) {
		//individual saved citation
		var link = ZU.xpathText(doc, '//a[@class="gsc_title_link"]/@href');
		if(!link) return;
		
		if(link.indexOf('/patents?') != -1) {
			return 'patent';
		} else if(link.indexOf('/scholar_case?') != -1) {
			return 'case';
		} else {
			//Can't distinguish book from journalArticle
			//Both have "Journal" fields
			return 'journalArticle';
		}
	} else if( getViableResults(doc).length ) {
		return "multiple";
	}
},
};
transIds["57a00950-f0d1-4b41-b6ba-44ff0fc30289"] = "Google Scholar.js";


splittedTrans["GPO Access e-CFR.js"] = {
    "stamp": {"translatorID":"dede653d-d1f8-411e-911c-44a0219bbdad","label":"GPO Access e-CFR","creator":"Bill McKinney, Sebastian Karcher","target":"^https?://(www\\.)?ecfr\\.gov/cgi-bin/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-03 17:38:54"},
    "detectWeb": function detectWeb(doc, url) {
	var re = new RegExp("^https?://(www\.)?ecfr\.gov/cgi-bin/(text-idx|retrieveECFR\?)");
	if(re.test(doc.location.href)) {
		return "statute";
	} else {
		return "multiple";
	}
},
};
transIds["dede653d-d1f8-411e-911c-44a0219bbdad"] = "GPO Access e-CFR.js";


splittedTrans["Gulag Many Days, Many Lives.js"] = {
    "stamp": {"translatorID":"c41c9c66-8540-4216-b138-7c00532748c9","label":"Gulag: Many Days, Many Lives","creator":"Adam Crymble","target":"^https?://gulaghistory\\.org","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-01-30 22:49:27"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.evaluate('//div[@class="field"][@id="citation"]/p', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "book";
	} else if (doc.evaluate('//h3/a', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	}
},
};
transIds["c41c9c66-8540-4216-b138-7c00532748c9"] = "Gulag Many Days, Many Lives.js";


splittedTrans["HAL Archives Ouvertes.js"] = {
    "stamp": {"translatorID":"f20f91fe-d875-47e7-9656-0abb928be472","label":"HAL Archives Ouvertes","creator":"Sebastian Karcher","target":"^https?://hal\\.archives-ouvertes\\.fr","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-11-08 21:46:36"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.search(/\/search\/index\//)!=-1) return "multiple";
	if (url.search(/\index\.php\?halsid=|\.fr\/[a-z]+-\d+/)!=-1) return findItemType(doc, url);
},
};
transIds["f20f91fe-d875-47e7-9656-0abb928be472"] = "HAL Archives Ouvertes.js";


splittedTrans["Handelszeitung.js"] = {
    "stamp": {"translatorID":"cfbb3e2c-8292-43d0-86d5-e457399107de","label":"Handelszeitung","creator":"ibex","target":"^https?://((www\\.)?(handelszeitung|bilanz|stocks)\\.ch/.)","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-06-01 19:22:55"},
    "detectWeb": function detectWeb(doc, url) {
	//Z.debug("ibex detectWeb URL = " + url);
	if (doc.location.href.match(/\/search\//) && (ZU.xpath(doc, '//dl[contains(@class, "search-results")]').length > 0)) {
		return "multiple";
	} else if (doc.location.href.match(/./) && (ZU.xpath(doc, '//div[' + containingClass('node-type-article') + ']').length > 0)) {
		return "newspaperArticle";
	}
},
};
transIds["cfbb3e2c-8292-43d0-86d5-e457399107de"] = "Handelszeitung.js";


splittedTrans["Hanrei Watch.js"] = {
    "stamp": {"translatorID":"8e5f8616-05d0-4d33-8554-dad76b20ecbx","label":"Hanrei Watch RSS service","creator":"Frank Bennett","target":"^https?://kanz\\.jp/hanrei/detail/[0-9]+/","minVersion":"1.0.0b3.r1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-01-30 22:49:15"},
    "detectWeb": function detectWeb(doc, url) {
	return "case";
},
};
transIds["8e5f8616-05d0-4d33-8554-dad76b20ecbx"] = "Hanrei Watch.js";


splittedTrans["Harpers.js"] = {
    "stamp": {"translatorID":"36e28164-afac-42c6-9a99-ed757b640002","label":"Harpers","creator":"Sebastian Karcher","target":"^https?://(www\\.)?harpers\\.org","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-12-07 05:46:23"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["36e28164-afac-42c6-9a99-ed757b640002"] = "Harpers.js";


splittedTrans["Hathi Trust.js"] = {
    "stamp": {"translatorID":"31da33ad-b4d9-4e99-b9ea-3e1ddad284d8","label":"Hathi Trust","creator":"Sebastian Karcher","target":"^https?://(catalog|babel)\\.hathitrust\\.org","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-02-24 00:03:36"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/\/Record\/\d+/)) return "book";

	if ((url.indexOf("/Search/") != -1 || url.indexOf("a=listis;"))
		&& getSearchResults(doc).length) {
		return "multiple";
	}
},
};
transIds["31da33ad-b4d9-4e99-b9ea-3e1ddad284d8"] = "Hathi Trust.js";


splittedTrans["HighWire 2.0.js"] = {
    "stamp": {"translatorID":"8c1f42d5-02fa-437b-b2b2-73afc768eb07","label":"HighWire 2.0","creator":"Matt Burton","target":"^[^?#]+(/content/([0-9]+[A-Z\\-]*/|current|firstcite|early)|/search\\?.*?\\bsubmit=|/search(/results)?\\?fulltext=|/cgi/collection/.|/search/.)","minVersion":"3.0","maxVersion":"","priority":250,"inRepository":true,"translatorType":4,"browserSupport":"gcsv","lastUpdated":"2015-02-26 05:47:57"},
    "detectWeb": function detectWeb(doc, url) {
	var highwiretest = false;

	//quick test for highwire embedded pdf page
	highwiretest = url.indexOf('.pdf+html') != -1;

	//only queue up the sidebar for data extraction (it seems to always be present)
	if(highwiretest && url.indexOf('?frame=sidebar') == -1) {
		return;
	}

	if (!highwiretest) {
		// lets hope this installations don't tweak this...
		highwiretest = ZU.xpath(doc,
				"//link[@href='/shared/css/hw-global.css']|//link[contains(@href,'highwire.css')]").length;
	}
	
	if(highwiretest) {
		if (getSearchResults(doc, url, true)) {
			return "multiple";
		} else if ( /content\/(early\/)?[0-9]+/.test(url)
			&& url.indexOf('/suppl/') == -1
		) {
			return "journalArticle";
		}
	}
},
};
transIds["8c1f42d5-02fa-437b-b2b2-73afc768eb07"] = "HighWire 2.0.js";


splittedTrans["HighWire.js"] = {
    "stamp": {"translatorID":"5eacdb93-20b9-4c46-a89b-523f62935ae4","label":"HighWire","creator":"Simon Kornblith","target":"^https?://[^/]+/(cgi/searchresults|cgi/search|cgi/content/(abstract|full|short|summary)|current\\.dtl$|content/vol[0-9]+/issue[0-9]+/(index\\.dtl)?$)","minVersion":"2.1","maxVersion":"","priority":250,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2015-06-02 17:33:54"},
    "detectWeb": function detectWeb(doc, url) {
	if(doc.title.indexOf(" -- Search Result") !== -1) {
		if(doc.evaluate('//table/tbody/tr[td/input[@type="checkbox"][@name="gca"]]', doc,
			null, XPathResult.ANY_TYPE, null).iterateNext()) return "multiple";
	} else if(doc.title.indexOf(" -- Table of Contents") != -1) {
		if(doc.evaluate('//form/dl', doc, null, XPathResult.ANY_TYPE,null).iterateNext()) return "multiple";
	} else {
		if(doc.evaluate('//a[substring(@href, 1, 16) = "/cgi/citmgr?gca="]', doc, null,
			XPathResult.ANY_TYPE, null).iterateNext()) return "journalArticle";
	}
	
	return false;
},
};
transIds["5eacdb93-20b9-4c46-a89b-523f62935ae4"] = "HighWire.js";


splittedTrans["Hindawi Publishers.js"] = {
    "stamp": {"translatorID":"186efdd2-3621-4703-aac6-3b5e286bdd86","label":"Hindawi Publishers","creator":"Sebastian Karcher","target":"http://www.hindawi.com/(journals|search)/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-05-01 00:37:52"},
    "detectWeb": function detectWeb(doc,url) {
	var namespace = {"x"  : "http://www.w3.org/1999/xhtml"}
	var xpath='//x:meta[@name="citation_journal_title"]';

	if (ZU.xpath(doc, xpath, namespace).length > 0) {
		return "journalArticle";
	}
			
	if (url.indexOf("/search/")!=-1 || url.indexOf("/journals/")!=-1) {
		multxpath = '//x:div[@class="middle_content"]/x:ul/x:li/x:a[contains(@href, "/journals/")]| //x:div[contains(@id, "SearchResult")]/x:ul/x:li/x:a[contains(@href, "/journals/")]'
	
	if (ZU.xpath(doc, multxpath, namespace).length>0){
			return "multiple";
		}
	}
	return false;
},
};
transIds["186efdd2-3621-4703-aac6-3b5e286bdd86"] = "Hindawi Publishers.js";


splittedTrans["Hispanic-American Periodical Index (Beta).js"] = {
    "stamp": {"translatorID":"cc4b1ea4-3349-4bb4-af55-cce5e06e4669","label":"Hispanic-American Periodical Index (Beta)","creator":"Sebastian Karcher","target":"^https?://hapi\\.ucla\\.edu","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2014-09-07 10:21:42"},
    "detectWeb": function detectWeb(doc, url) {
    if (url.indexOf("article/citation") != -1) return "journalArticle";
    else if (url.indexOf("/search") != -1 || url.indexOf("/name/") != -1) return "multiple";
},
};
transIds["cc4b1ea4-3349-4bb4-af55-cce5e06e4669"] = "Hispanic-American Periodical Index (Beta).js";


splittedTrans["Hispanic-American Periodical Index.js"] = {
    "stamp": {"translatorID":"09e8f8a2-a7e6-4430-b86c-47c99ca40a38","label":"Hispanic-American Periodical Index","creator":"Sebastian Karcher","target":"^https?://hapi\\.ucla\\.edu","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2013-12-10 17:20:41"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("search/detail.php") != -1) return "journalArticle"
	else if (url.indexOf("search/results.php") != -1) return "multiple";
},
};
transIds["09e8f8a2-a7e6-4430-b86c-47c99ca40a38"] = "Hispanic-American Periodical Index.js";


splittedTrans["HLAS (historical).js"] = {
    "stamp": {"translatorID":"9f52911f-e1b5-41f8-be66-b16982269e6a","label":"HLAS (historical)","creator":"Sebastian Karcher","target":"^https?://lcweb2\\.loc\\.gov/cgi-bin/query","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsv","lastUpdated":"2013-06-01 14:47:30"},
    "detectWeb": function detectWeb(doc, url) {
	//Z.debug(doc.title)
	if (doc.title.indexOf("Search Results")!=-1 && ZU.xpathText(doc, '//p/table/tbody/tr[td/a[contains(@href, "/cgi-bin/query/D?hlasbib")]]')) return "multiple";
	if (doc.title.indexOf("Bibliographic Display")!=-1) return "book";
},
};
transIds["9f52911f-e1b5-41f8-be66-b16982269e6a"] = "HLAS (historical).js";


splittedTrans["Hoovers.js"] = {
    "stamp": {"translatorID":"c2f5f114-c255-4cf7-a7b8-d5c95e82291f","label":"Hoovers","creator":"Sebastian Karcher","target":"^https?://(www\\.|subscriber\\.)?hoovers\\.com","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"g","lastUpdated":"2014-03-11 22:07:50"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["c2f5f114-c255-4cf7-a7b8-d5c95e82291f"] = "Hoovers.js";


splittedTrans["Huff Post.js"] = {
    "stamp": {"translatorID":"36e34937-2ec3-418b-8199-2c8cc3488875","label":"Huff Post","creator":"Sebastian Karcher","target":"^https?://(www|search)\\.huffingtonpost\\.com","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsv","lastUpdated":"2014-02-24 00:25:56"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["36e34937-2ec3-418b-8199-2c8cc3488875"] = "Huff Post.js";


splittedTrans["Hurricane Digital Memory Bank.js"] = {
    "stamp": {"translatorID":"9418dcc2-cc1e-432b-b7a6-7b00b7402d2f","label":"Hurricane Digital Memory Bank","creator":"Adam Crymble","target":"^https?://hurricanearchive\\.org","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-01-30 22:49:09"},
    "detectWeb": function detectWeb(doc, url) {

	if (doc.evaluate('//p[@id="cite-as"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "book";
	} else if (doc.evaluate('//p[@class="object_description"]/a', doc, null, XPathResult.ANY_TYPE, null).iterateNext()){
		return "multiple";
	}
},
};
transIds["9418dcc2-cc1e-432b-b7a6-7b00b7402d2f"] = "Hurricane Digital Memory Bank.js";


splittedTrans["IASSIST Quarterly.js"] = {
    "stamp": {"translatorID":"ac721d14-f081-4613-91e8-255c22ad05eb","label":"IASSIST Quarterly","creator":"Sebastian Karcher","target":"^https?://www\\.iassistdata\\.org/iq/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-04-15 18:04:37"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["ac721d14-f081-4613-91e8-255c22ad05eb"] = "IASSIST Quarterly.js";


splittedTrans["IBISWorld.js"] = {
    "stamp": {"translatorID":"b16d76b4-ce4d-4774-b29c-b6aea71d417b","label":"IBISWorld","creator":"Sebastian Karcher","target":"^https?://clients\\d\\.ibisworld\\.com/(reports|search)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gc","lastUpdated":"2014-03-12 04:43:57"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["b16d76b4-ce4d-4774-b29c-b6aea71d417b"] = "IBISWorld.js";


splittedTrans["IEEE Computer Society.js"] = {
    "stamp": {"translatorID":"8d72adbc-376c-4a33-b6be-730bc235190f","label":"IEEE Computer Society","creator":"fasthae@gmail.com, Sebastian Karcher","target":"^https?://(www[0-9]?|search[0-9]?)\\.computer\\.org/(csdl/(mags/[0-9a-z/]+|trans/[0-9a-z/]+|letters/[0-9a-z]+|proceedings/[0-9a-z/]+|doi|abs/proceedings)|search/results|portal/web/computingnow/.*content\\?)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-11-18 22:27:18"},
    "detectWeb": function detectWeb(doc, url) {
	//supports table of contents, seach results and single document pages
	if (url.indexOf("search/results") > 1) {
		return "multiple";
	} else if (url.indexOf("/csdl/mags/") > 1) {
		if (url.indexOf("index.html") != -1) return "multiple";
		else return "magazineArticle";
	} else if (url.search(/\/portal\/web\/computingnow\/.*content/) > 1) {
		if (url.indexOf("index.html") != -1) return "multiple";
		else if(ZU.xpath(doc, '//li/a[contains(text(), "BibTex") and contains(@href, ".bib")]|//div[@id="bibText-content"]').length > 0) return "magazineArticle";
	} else if (url.indexOf("/csdl/trans/") > 1) {
		if (url.indexOf("index.html") != -1) return "multiple";
		else return "journalArticle";
	} else if (url.indexOf("/csdl/proceedings/") > 1) {
		if (url.indexOf("index.html") != -1) return "multiple";
		else return "conferencePaper";
	} else if (url.indexOf("/csdl/abs/proceedings/") > 1) {
		return "multiple";
	} else if (url.indexOf("/csdl/letters/") > 1) {
		if (url.indexOf("index.html") != -1) return "multiple";
		else return "journalArticle";
	} else if (url.indexOf("/portal/web/csdl/doi/") > 1) {
		var refWork = doc.evaluate('//div[@id="refWorksText-content"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext();
		refWork = refWork.textContent.substr(0, 9);
		if (refWork.indexOf("JOUR") > 1) return "journalArticle";
		else if (refWork.indexOf("MGZN") > 1) return "magazineArticle";
		else if (refWork.indexOf("CONF") > 1) return "conferencePaper";
		else return false;
	} else {
		return false;
	}

},
};
transIds["8d72adbc-376c-4a33-b6be-730bc235190f"] = "IEEE Computer Society.js";


splittedTrans["IEEE Xplore.js"] = {
    "stamp": {"translatorID":"92d4ed84-8d0-4d3c-941f-d4b9124cfbb","label":"IEEE Xplore","creator":"Simon Kornblith, Michael Berkowitz, Bastian Koenings, and Avram Lyon","target":"^https?://([^/]+\\.)?ieeexplore\\.ieee\\.org/([^#]+[&?]arnumber=\\d+|search/(searchresult|selected)\\.jsp|xpl\\/(mostRecentIssue|tocresult).jsp\\?)","minVersion":"3.0.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-09 07:32:25"},
    "detectWeb": function detectWeb(doc, url) {
	if(doc.defaultView !== doc.defaultView.top) return;
	
	if (/[?&]arnumber=(\d+)/i.test(url)) {
		return "journalArticle";
	}
	
	// Issue page
	var results = doc.getElementById('results-blk');
	if (results) {
		return getSearchResults(doc, true) ? "multiple" : false;
	}
	
	var search = ZU.xpath(doc, '//div[@ng-app="xpl.search"]')[0];
	if (!search) {
		Zotero.debug("No search scope");
		return;
	}
	
	Z.monitorDOMChanges(search, {childList: true});
	
	var searchResults = search.getElementsByClassName('search-results')[0];
	if (!searchResults) {
		Zotero.debug("no search results");
		return;
	}
	
	if (getSearchResults(doc, true)) {
		return "multiple";
	}
},
};
transIds["92d4ed84-8d0-4d3c-941f-d4b9124cfbb"] = "IEEE Xplore.js";


splittedTrans["IGN.js"] = {
    "stamp": {"translatorID":"d210c5a1-73e1-41ad-a3c9-331d5a3ead48","label":"IGN","creator":"odie5533","target":"^https?://[^/]+\\.ign\\.com/","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-02 19:11:09"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/articles/)) {
		return "webpage";
	}
},
};
transIds["d210c5a1-73e1-41ad-a3c9-331d5a3ead48"] = "IGN.js";


splittedTrans["ILO Labordoc.js"] = {
    "stamp": {"translatorID":"d8873d23-d874-4b62-b081-1db12ff5a5de","label":"ILO Labordoc","creator":"Sebastian Karcher, Vesa Sivunen","target":"^https?://labordoc\\.ilo\\.org","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-03-19 17:53:17"},
    "detectWeb": function detectWeb(doc, url) {
   if (url.match(/\/search\?/)) return "multiple";
   else if (url.match(/\/record\//)) return "book";
},
};
transIds["d8873d23-d874-4b62-b081-1db12ff5a5de"] = "ILO Labordoc.js";


splittedTrans["IMDb.js"] = {
    "stamp": {"translatorID":"a30274ac-d3d1-4977-80f4-5320613226ec","label":"IMDb","creator":"Avram Lyon","target":"^https?://www\\.imdb\\.com/","minVersion":"2.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-06-05 07:43:14"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/\/title\/tt\d+/)) {
		return "film";
	} else if (url.match(/\/find\?/)) {
		return "multiple";
	}
},
};
transIds["a30274ac-d3d1-4977-80f4-5320613226ec"] = "IMDb.js";


splittedTrans["In These Times.js"] = {
    "stamp": {"translatorID":"88268d51-dc41-4f98-bb93-d13af50ba1ab","label":"In These Times","creator":"Sebastian Karcher","target":"^https?://(www\\.)?inthesetimes\\.com","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-03-19 01:53:20"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["88268d51-dc41-4f98-bb93-d13af50ba1ab"] = "In These Times.js";


splittedTrans["Informationssystem Medienpaedagogik.js"] = {
    "stamp": {"translatorID":"f4469574-1d96-4a4a-a0ac-1b9f7c49654b","label":"Informationssystem Medienpaedagogik","creator":"Sebastian Karcher","target":"^https?://www.ism-info\\.de/ism-info\\.html\\?","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-04-15 18:04:37"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("?feldname") != -1) return "multiple";
	else return itemType(doc);
},
};
transIds["f4469574-1d96-4a4a-a0ac-1b9f7c49654b"] = "Informationssystem Medienpaedagogik.js";


splittedTrans["Informit Australia.js"] = {
    "stamp": {"translatorID":"1fdc31af-065d-4923-9e90-ab4afe5cca8b","label":"Informit Australia","creator":"Sebastian Karcher","target":"^https?://search\\.informit\\.com\\.au/search","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcs","lastUpdated":"2013-12-06 14:04:29"},
    "detectWeb": function detectWeb(doc, url) {

	var type = ZU.xpathText(doc, '//p[span[contains(text(), "Document Type")]]')
	if (type) {
		type=type.replace(/^[^\:]+\:/, "").replace(/;.+/,"").trim();
		if (typeMap[type]) return typeMap[type]
	else return "journalArticle"
	}
	else if(url.match(/action\=doSearch/)) {
		return "multiple";
	}
	return false;
},
};
transIds["1fdc31af-065d-4923-9e90-ab4afe5cca8b"] = "Informit Australia.js";


splittedTrans["informIT database.js"] = {
    "stamp": {"translatorID":"add79dfd-7951-4c72-af1d-ce1d50aa4fb4","label":"informIT database","creator":"Adam Crymble, Sebastian Karcher","target":"^https?://www\\.informit\\.com","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-10-15 10:37:49"},
    "detectWeb": function detectWeb(doc,  url) {
	if (doc.title.match("Search Results")) {
		return "multiple";
	} else if (doc.location.href.match("topics")) {
		return "multiple";

	} else if (doc.location.href.match("product")) {
		return "book";
	} else if (doc.location.href.match("guides")) {
		return "book";

	} else if (doc.location.href.match("-978")) {
		return "book";
	}else if (doc.location.href.match("library")) {
		return "bookSection";
	} else if (doc.location.href.match(/articles\/article/)) {
		return "bookSection";
	}
},
};
transIds["add79dfd-7951-4c72-af1d-ce1d50aa4fb4"] = "informIT database.js";


splittedTrans["InfoTrac.js"] = {
    "stamp": {"translatorID":"6773a9af-5375-3224-d148-d32793884dec","label":"InfoTrac","creator":"Simon Kornblith","target":"^https?://[^/]+/itw/infomark/","minVersion":"1.0.0b3.r1","maxVersion":"","priority":250,"inRepository":true,"translatorType":4,"browserSupport":"g","lastUpdated":"2015-06-10 10:51:29"},
    "detectWeb": function detectWeb(doc, url) {
	
	// ensure that there is an InfoTrac logo
	if(!doc.evaluate('//img[substring(@alt, 1, 8) = "InfoTrac"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) return false;
	
	if(doc.title.substring(0, 8) == "Article ") {
		if (ZU.xpathText(doc, '//td//img[contains(@src, "ncnp_logo.gif")]/@title')) return "newspaperArticle";
		var genre = doc.evaluate('//comment()[substring(., 1, 6) = " Genre"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext();
		
		if(genre) {
			var value = Zotero.Utilities.trimInternal(genre.nodeValue.substr(7));
			if(value == "article") {
				return "journalArticle";
			} else if(value == "book") {
				return "book";
			} else if(value == "dissertation") {
				return "thesis";
			} else if(value == "bookitem") {
				return "bookSection";
			}
		}
		
		return "magazineArticle";
	} else if(doc.title.substring(0, 10) == "Citations ") {
		return "multiple";
	}
},
};
transIds["6773a9af-5375-3224-d148-d32793884dec"] = "InfoTrac.js";


splittedTrans["IngentaConnect.js"] = {
    "stamp": {"translatorID":"9e306d5d-193f-44ae-9dd6-ace63bf47689","label":"IngentaConnect","creator":"Michael Berkowitz","target":"^https?://(www\\.)?ingentaconnect\\.com","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-09-17 04:55:38"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("article?") != -1 || url.indexOf("article;") != -1 || url.indexOf("/art") != -1) {
		return "journalArticle";
	} 
	//permalinks
	else if (url.indexOf("/content/") != -1  && getRisUrl(doc) ) {
		return "journalArticle";
	}
	
	else if ((url.indexOf("search?") !=-1 || url.indexOf("search;") != -1) && getSearchResults(doc)) {
		return "multiple";
	}
},
};
transIds["9e306d5d-193f-44ae-9dd6-ace63bf47689"] = "IngentaConnect.js";


splittedTrans["Insignia OPAC.js"] = {
    "stamp": {"translatorID":"abd7c626-6913-42d4-a05f-acc6683c69da","label":"Insignia OPAC","creator":"Niko","target":"https?://[^/]+/(?:library|crts)/[^/?#]+\\.aspx","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcs","lastUpdated":"2013-05-05 08:32:45"},
    "detectWeb": function detectWeb(doc, url) {
	var type =  ZU.xpathText(doc, '//input[@id="__ZoteroType"]/@value');
	
	if(type=="book"){
		
		var xPathTitle = '//table[@id="tbDetailInfo_Basic"]/tbody/tr/td/label[@name="Title"]';
		var title = ZU.xpathText(doc, xPathTitle);
		if(title){
			return "book";
		}
	}
},
};
transIds["abd7c626-6913-42d4-a05f-acc6683c69da"] = "Insignia OPAC.js";


splittedTrans["INSPIRE.js"] = {
    "stamp": {"translatorID":"17b1a93f-b342-4b54-ad50-08ecc26e0ac3","label":"INSPIRE","creator":"Sebastian Karcher","target":"^https?://inspirehep\\.net/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-08-26 03:46:51"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("/record/") != -1) {
		return "journalArticle"
	} else if (url.indexOf("search?") != -1) {
		return "multiple";
	}
},
};
transIds["17b1a93f-b342-4b54-ad50-08ecc26e0ac3"] = "INSPIRE.js";


splittedTrans["Institute of Physics.js"] = {
    "stamp": {"translatorID":"9346ddef-126b-47ec-afef-8809ed1972ab","label":"Institute of Physics","creator":"Michael Berkowitz and Avram Lyon","target":"^https?://iopscience\\.iop\\.org/(?:[0-9-X]+/.+|search.+)","minVersion":"2.1","maxVersion":"","priority":99,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2013-12-12 12:48:04"},
    "detectWeb": function detectWeb(doc,url) {
	var xpath='//meta[@name="citation_journal_title"]';
		
	if (ZU.xpath(doc, xpath).length > 0) {
		return "journalArticle";
	}
			
	else if (!url.match(/\/pdf\//) && getResults(doc).length){
		return "multiple";
	}

	return false;
},
};
transIds["9346ddef-126b-47ec-afef-8809ed1972ab"] = "Institute of Physics.js";


splittedTrans["Intellixir.js"] = {
    "stamp": {"translatorID":"20e87da1-e1c9-410d-b400-a1c27272ae19","label":"Intellixir","creator":"Maxime Escourbiac","target":"/intellixir/(afficheliste.aspx|liste_articles.aspx)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2013-05-24 09:49:43"},
    "detectWeb": function detectWeb(doc,url) {
	return "document";
},
};
transIds["20e87da1-e1c9-410d-b400-a1c27272ae19"] = "Intellixir.js";


splittedTrans["Inter-Research Science Center.js"] = {
    "stamp": {"translatorID":"0eeb2ac0-fbaf-4994-b98f-203d273eb9fa","label":"Inter-Research Science Center","creator":"Michael Berkowitz","target":"^https?://www\\.int-res\\.com/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-02 19:17:47"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.evaluate('//div[@class="journal-index"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext() ||
		doc.evaluate('//div[@class="tx-indexedsearch-res"]//tr[1]/td[2]//a', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	} else if (doc.evaluate('//a[@class="citeexport"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "journalArticle";
	}
},
};
transIds["0eeb2ac0-fbaf-4994-b98f-203d273eb9fa"] = "Inter-Research Science Center.js";


splittedTrans["Internet Archive Wayback Machine.js"] = {
    "stamp": {"translatorID":"513a53f5-b95e-4df6-a03e-3348d9ec9f44","label":"Internet Archive Wayback Machine","creator":"Sean Takats","target":"^https?://web\\.archive\\.org/web/","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-07-05 10:50:25"},
    "detectWeb": function detectWeb(doc, url){
	var xpath = '//td[@class="mainBody"]/a';
	var links = doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null);
	if (links.iterateNext()){
		return "multiple";
	}
	return "webpage";
},
};
transIds["513a53f5-b95e-4df6-a03e-3348d9ec9f44"] = "Internet Archive Wayback Machine.js";


splittedTrans["Internet Archive.js"] = {
    "stamp": {"translatorID":"db0f4858-10fa-4f76-976c-2592c95f029c","label":"Internet Archive","creator":"Adam Crymble, Sebastian Karcher","target":"^https?://(www\\.)?archive\\.org/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-07-10 06:51:49"},
    "detectWeb": function detectWeb(doc, url) {
	var mediaType = "1";

	if (doc.evaluate('//h3', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		mediaType = doc.evaluate('//h3', doc, null, XPathResult.ANY_TYPE, null).iterateNext().textContent;

	} else if (doc.evaluate('//div[@class="box"][@id="spotlight"]/h1', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		mediaType = doc.evaluate('//div[@class="box"][@id="spotlight"]/h1', doc, null, XPathResult.ANY_TYPE, null).iterateNext().textContent;

	} else if (doc.evaluate('//div[@class="box"]/h1', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		mediaType = doc.evaluate('//div[@class="box"]/h1', doc, null, XPathResult.ANY_TYPE, null).iterateNext().textContent;
	}

	if (mediaType == "The Item") {
		return "artwork";
	} else if (mediaType.indexOf("Spotlight") != -1) {
		return "book";
	} else if (mediaType.indexOf("book") != -1) {
		return "book";
	} else if (mediaType.indexOf("movie") != -1) {
		return "film";
	} else if (mediaType.indexOf("audio") != -1) {
		return "audioRecording";
	} else if (doc.location.href.match("search") && mediaType == "1") {
		return "multiple";
	}
},
};
transIds["db0f4858-10fa-4f76-976c-2592c95f029c"] = "Internet Archive.js";


splittedTrans["io-port.js"] = {
    "stamp": {"translatorID":"1c0c63d9-4a95-44d4-b441-173cdc1b8688","label":"io-port","creator":"Sebastian Karcher","target":"^https?://www\\.zentralblatt-math\\.org/ioport/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"g","lastUpdated":"2014-03-08 16:26:00"},
    "detectWeb": function detectWeb(doc, url){
	if (ZU.xpath(doc, '//div[@class="content_search_result_item"]').length>0) return "multiple";
},
};
transIds["1c0c63d9-4a95-44d4-b441-173cdc1b8688"] = "io-port.js";


splittedTrans["IRIS.js"] = {
    "stamp": {"translatorID":"8381bf68-11fa-418c-8530-2e00284d3efd","label":"IRIS","creator":"Chad Mills and Michael Berkowitz","target":"^https?://[^/]*www[\\.\\-]iris[\\.\\-]rutgers[\\.\\-]edu[^/]*/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":90,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-06-08 12:14:42"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.evaluate('//div[@class="content_container"]/div[@class="content"]/form[@id="hitlist"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	} else if (doc.evaluate('//div[@class="content_container item_details"]/div[@class="content"]/ul[contains(@class, "detail_page")]/li/div/table', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "book";
	}
},
};
transIds["8381bf68-11fa-418c-8530-2e00284d3efd"] = "IRIS.js";


splittedTrans["Isidore.js"] = {
    "stamp": {"translatorID":"43a53465-0354-42fd-aba9-dc1af8be7061","label":"Isidore","creator":"Guillaume Adreani and Aurimas Vinckevicius","target":"https?://(www\\.)?rechercheisidore\\.fr/search/(resource/)?\\?","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-28 21:06:26"},
    "detectWeb": function detectWeb(doc, url) {
	if(getSearchResults(doc).length) return "multiple";

	var type = ZU.xpathText(doc, '//meta[@name="DC.type"]/@content');
	if(type) return typeMap[type] || 'journalArticle';	//default to journalArticle if we can't recognize it
},
};
transIds["43a53465-0354-42fd-aba9-dc1af8be7061"] = "Isidore.js";


splittedTrans["J-Stage.js"] = {
    "stamp": {"translatorID":"e40a27bc-0eef-4c50-b78b-37274808d7d2","label":"J-Stage","creator":"Sebastian Karcher","target":"^https?://www\\.jstage\\.jst\\.go\\.jp/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-03-19 01:59:25"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/\.jst\.go\.jp\/article\//)) {
		return "journalArticle";
	} else if (url.match(/\.jst\.go\.jp\/result\?/) || url.match(/\.jst\.go\.jp\/browse\//)) {
		return "multiple";
	}
},
};
transIds["e40a27bc-0eef-4c50-b78b-37274808d7d2"] = "J-Stage.js";


splittedTrans["Jahrbuch.js"] = {
    "stamp": {"translatorID":"e5e34825-1314-43bd-a9fe-f38f6ab48403","label":"Jahrbuch","creator":"Aurimas Vinckevicius","target":"https?://jfm.sub.uni-goettingen.de/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gv","lastUpdated":"2013-04-15 18:04:37"},
    "detectWeb": function detectWeb(doc, url) {
	if(getID(url)) return 'journalArticle';	//could be book, but it's hard to tell

	if(url.indexOf('/cgi-bin/') != -1 &&
		(url.indexOf('/quick.html') != -1 ||
			url.indexOf('/full.html') != -1 ||
			url.indexOf('/command.html') != -1) &&
		getSearchResults(doc).length) {
		return 'multiple';
	}
},
};
transIds["e5e34825-1314-43bd-a9fe-f38f6ab48403"] = "Jahrbuch.js";


splittedTrans["Japan Times Online.js"] = {
    "stamp": {"translatorID":"b56d756e-934e-4b46-bc58-d61dccc9f32f","label":"Japan Times Online","creator":"Sebastian Karcher","target":"^https?://(?:www|search)\\.japantimes\\.co\\.jp/(?:cgi-bin|gsearch|search-results|features|entertainment|sports|life|news|rss|\\?)","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-03 17:40:07"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["b56d756e-934e-4b46-bc58-d61dccc9f32f"] = "Japan Times Online.js";


splittedTrans["jmlr.js"] = {
    "stamp": {"translatorID":"80bc4fd3-747c-4dc2-86e9-da7b251e1407","label":"Journal of Machine Learning Research","creator":"Fei Qi","target":"^https?://jmlr\\.csail\\.mit\\.edu/papers","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsv","lastUpdated":"2013-06-08 12:20:25"},
    "detectWeb": function detectWeb(doc, url) {
	var contRe = /(v\d+|topic|special)/;
	var m = contRe.exec(url);
	if (m) {
		if (doc.title.match("JMLR")) return "multiple";
		else return "journalArticle";
	}
	return false;
},
};
transIds["80bc4fd3-747c-4dc2-86e9-da7b251e1407"] = "jmlr.js";


splittedTrans["Journal of Electronic Publishing.js"] = {
    "stamp": {"translatorID":"d93c14fb-d327-4540-b60a-327309ea512b","label":"Journal of Electronic Publishing","creator":"Sebastian Karcher","target":"http://quod.lib.umich.edu/.*c=jep","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-05-08 23:17:32"},
    "detectWeb": function detectWeb(doc,url) {
	var xpath='//meta[@name="DC.citation.volume"]';
	var mxpath= '//table[@id="searchresults"]|//div[@id="picklistbody"]';
	if (ZU.xpath(doc, xpath).length > 0) {
		return "journalArticle";
	}
			
	if (ZU.xpath(doc, mxpath).length > 0) {
		return "multiple";
	}
	return false;
},
};
transIds["d93c14fb-d327-4540-b60a-327309ea512b"] = "Journal of Electronic Publishing.js";


splittedTrans["JRC Publications Repository.js"] = {
    "stamp": {"translatorID":"03df2575-dbd9-49aa-9e58-1e6edd86d562","label":"JRC Publications Repository","creator":"Philipp Zumstein","target":"https?://(www\\.)?publications\\.jrc\\.ec\\.europa\\.eu/repository/(handle/|simple-search\\?|browse\\?)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-01-03 10:59:23"},
    "detectWeb": function detectWeb(doc, url) {
	var type = ZU.xpath(doc, '//meta[@name="DC.type"]/@content');
	if (type.length>0) {
		if (mappingTable[type[0].value]) {
			return mappingTable[type[0].value];
		} else {//generic fallback
			Z.debug('Unrecognized item type: ' + type[0].value);
			return "journalArticle";
		}
	}
	if ( getSearchResults(doc, true) ) {
		return "multiple";
	}
},
};
transIds["03df2575-dbd9-49aa-9e58-1e6edd86d562"] = "JRC Publications Repository.js";


splittedTrans["JSTOR.js"] = {
    "stamp": {"translatorID":"d921155f-0186-1684-615c-ca57682ced9b","label":"JSTOR","creator":"Simon Kornblith, Sean Takats, Michael Berkowitz, and Eli Osherovich","target":"https?://([^/]+\\.)?jstor\\.org/(discover/|action/(showArticle|doBasicSearch|doAdvancedSearch|doLocatorSearch|doAdvancedResults|doBasicResults)|stable/|pss/|openurl\\?|sici\\?)","minVersion":"3.0.12","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2015-02-24 05:27:00"},
    "detectWeb": function detectWeb(doc, url) {
	// See if this is a seach results page or Issue content
	if (doc.title == "JSTOR: Search Results") {
		return getSearchResults(doc, true) ? "multiple" : false;
	} else if (/stable|pss/.test(url) // Issues with DOIs can't be identified by URL
		&& getSearchResults(doc, true)
	) {
		return "multiple";
	}
	
	// If this is a view page, find the link to the citation
	var favLink = getFavLink(doc);
	if( (favLink && getJID(favLink.href)) || getJID(url) ) {
		return "journalArticle";
	}
},
};
transIds["d921155f-0186-1684-615c-ca57682ced9b"] = "JSTOR.js";


splittedTrans["Juricaf.js"] = {
    "stamp": {"translatorID":"86168097-0ce0-4c77-ba34-8bd57f47a3d3","label":"Juricaf","creator":"Guillaume Adreani","target":"^https?://www\\.juricaf\\.org/(arret|recherche)/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-11-24 00:27:07"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["86168097-0ce0-4c77-ba34-8bd57f47a3d3"] = "Juricaf.js";


splittedTrans["Juris.js"] = {
    "stamp": {"translatorID":"bc2ec385-e60a-4899-96ae-d4f0d6574ad7","label":"Juris","creator":"Reto Mantz","target":"^https?://(www\\.)?juris\\.de/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsv","lastUpdated":"2015-04-08 20:15:24"},
    "detectWeb": function detectWeb(doc, url) {
	initData(doc);		// gather data
	
	if ((scrapeData['Beitragstyp'] || scrapeData['Dokumenttyp']) && scrapeData['Autor']) {
		return 'journalArticle';
	}
	if (scrapeData['Dokumenttyp'] && mappingClassNameToItemType[scrapeData['Dokumenttyp'].toUpperCase()]=='case') {
		return 'case';
	}		
},
};
transIds["bc2ec385-e60a-4899-96ae-d4f0d6574ad7"] = "Juris.js";


splittedTrans["JurPC.js"] = {
    "stamp": {"translatorID":"b662c6eb-e478-46bd- bad4-23cdfd0c9d67","label":"JurPC","creator":"Oliver Vivell and Michael Berkowitz","target":"^https?://www\\.jurpc\\.de/jurpc/show\\?id=","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-01-02 18:03:03"},
    "detectWeb": function detectWeb(doc, url) {
	//prevent Zotero from throwing an error here
	var firstLine =  ZU.xpathText(doc, '//h2[1]');
	if (firstLine.indexOf("Urteil vom") != -1 || firstLine.indexOf("Beschluss vom")!=-1) {
		return "case";
	}
	else {
		return "journalArticle";
	}
},
};
transIds["b662c6eb-e478-46bd- bad4-23cdfd0c9d67"] = "JurPC.js";


splittedTrans["KOBV.js"] = {
    "stamp": {"translatorID":"fef07360-ee97-4f67-b022-6f64d5ec0c25","label":"KOBV","creator":"Gunar Maiwald","target":"^https?://vs13\\.kobv\\.de/V/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcs","lastUpdated":"2013-02-26 12:53:22"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.evaluate('//tr /td[@class="no_wrap_center"]/a', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	} else if (doc.evaluate('//tr/th[@class="no_wrap"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "book";
	}
},
};
transIds["fef07360-ee97-4f67-b022-6f64d5ec0c25"] = "KOBV.js";


splittedTrans["Kommersant.js"] = {
    "stamp": {"translatorID":"43bc17ed-e994-4fdb-ac28-594c839658ca","label":"Kommersant","creator":"Avram Lyon","target":"^https?:\\/\\/(www\\.)?kommersant\\.ru\\/","minVersion":"2.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-01-05 17:14:25"},
    "detectWeb": function detectWeb(doc, url) { 
		return FW.detectWeb(doc, url);
},
};
transIds["43bc17ed-e994-4fdb-ac28-594c839658ca"] = "Kommersant.js";


splittedTrans["L'Annee Philologique.js"] = {
    "stamp": {"translatorID":"e04e4bab-64c2-4b9a-b6c2-7fb186281969","label":"L'Annee Philologique","creator":"Sebastian Karcher","target":"^https?://www\\.annee-philologique\\.com/(aph)?/?index\\.php","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2013-04-17 03:09:28"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/index\.php\?do=liste/)) {
		return "multiple";
	} else if (url.match(/index\.php\?do=notice/)) {
		//nothing on the page indicates item type, so we go with the generic book
		return "book";
	}
},
};
transIds["e04e4bab-64c2-4b9a-b6c2-7fb186281969"] = "L'Annee Philologique.js";


splittedTrans["LA Times.js"] = {
    "stamp": {"translatorID":"e4fe1596-a8c4-4d09-945f-120c4d83e580","label":"LA Times","creator":"Sebastian Karcher","target":"^https?://(?:www\\.|travel\\.|articles\\.|latimesblogs\\.)?latimes\\.com","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-06-01 20:25:33"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["e4fe1596-a8c4-4d09-945f-120c4d83e580"] = "LA Times.js";


splittedTrans["Lagen.nu.js"] = {
    "stamp": {"translatorID":"e1356ac2-8254-44d5-8ece-4829827d5bc6","label":"Lagen.nu","creator":"Isak Bergdahl","target":"^https?://lagen\\.nu/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-04-15 18:04:37"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["e1356ac2-8254-44d5-8ece-4829827d5bc6"] = "Lagen.nu.js";


splittedTrans["Landes Publishers.js"] = {
    "stamp": {"translatorID":"74af9c75-dc14-4cdb-bb0b-1bbb13ba2e22","label":"Landes Publishers","creator":"Sebastian Karcher","target":"^https?://www\\.landesbioscience\\.com","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-06-11 21:49:07"},
    "detectWeb": function detectWeb(doc,url) {

	var xpath='//meta[@name="citation_journal_title"]';

	if (ZU.xpath(doc, xpath).length > 0) {
		return "journalArticle";
	}
			
	if (url.indexOf("/search/")!=-1 || url.indexOf("/toc/")!=-1) {
		multxpath = '//a[contains(@class, "toc_title_link") or contains(@class, "search_result_link")]'
	
	if (ZU.xpath(doc, multxpath).length>0){
			return "multiple";
		}
	}
	return false;
},
};
transIds["74af9c75-dc14-4cdb-bb0b-1bbb13ba2e22"] = "Landes Publishers.js";


splittedTrans["Le Devoir.js"] = {
    "stamp": {"translatorID":"d1605270-d7dc-459f-9875-74ad8dde1f7d","translatorType":4,"label":"Le Devoir","creator":"Adam Crymble","target":"http://www.ledevoir.com","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"lastUpdated":"2008-08-21 15:45:00"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.location.href.match("Recherche")) {
		return "multiple";
	} else if (doc.evaluate('//div[@id="autresArticles"]/p', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "newspaperArticle";
	}
},
};
transIds["d1605270-d7dc-459f-9875-74ad8dde1f7d"] = "Le Devoir.js";


splittedTrans["Le Monde Diplomatique_de.js"] = {
    "stamp": {"translatorID":"530cf18c-e80a-4e67-ae9c-9b8c08591610","label":"Le monde diplomatique","creator":"Martin Meyerhoff","target":"^https?://www\\.monde-diplomatique\\.de","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-04 10:09:57"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/^https?:\/\/www\.monde-diplomatique\.de\/pm\/\d\d\d\d\/\d\d/) ){ 
		Zotero.debug("newspaperArticle");
		return "newspaperArticle";
	}  else if (url.match(/search/) ) {
		Zotero.debug("multiple");
		return "multiple";
	} 
},
};
transIds["530cf18c-e80a-4e67-ae9c-9b8c08591610"] = "Le Monde Diplomatique_de.js";


splittedTrans["Le Monde.js"] = {
    "stamp": {"translatorID":"6bc635a4-6823-4f95-acaf-b43e8a158144","label":"Le Monde","creator":"Philipp Zumstein","target":"^https?://(www\\.)?lemonde\\.fr/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-09 20:21:01"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf('/article/')>-1) {
		return "newspaperArticle";
	} else if (getSearchResults(doc, true)) {
		return "multiple";
	}
},
};
transIds["6bc635a4-6823-4f95-acaf-b43e8a158144"] = "Le Monde.js";


splittedTrans["Legifrance.js"] = {
    "stamp": {"translatorID":"2dc0b23d-64d8-4933-b629-5c003451ccf7","label":"Légifrance","creator":"Guillaume Adreani","target":"^https?:\\/\\/(www.)?legifrance\\.gouv\\.fr/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-04-17 03:09:28"},
    "detectWeb": function detectWeb(doc, url) {
		if (url.match(/.CETATEXT|CONSTEXT|JURITEXT./)) { // Détection jurisprudence 
			return "case";
		} else if (url.match(/LEGIARTI|affichCodeArticle|affichTexteArticle|KALICONT|JORFTEXT|CNILTEXT/)) { // Détection textes législatifs 
			return "statute"; // Détection lois et codes
		} else if (url.match(/rechJuriConst|rechExpJuriConst|rechJuriAdmin|rechExpJuriAdmin|rechJuriJudi|rechExpJuriJudi/)) { // Détection occurences multiples uniquement pour la jurisprudence
			return "multiple"; // occurences multiples
		} else return false;
	},
};
transIds["2dc0b23d-64d8-4933-b629-5c003451ccf7"] = "Legifrance.js";


splittedTrans["Legislative Insight.js"] = {
    "stamp": {"translatorID":"2bedae3c-bab5-447f-b127-e9babc0e9cfe","label":"Legislative Insight","creator":"Kari Hemdal","target":"^https?://(preprod\\.)?li\\.proquest\\.com/legislativeinsight/LegHistMain\\.jsp","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2015-04-10 10:10:29"},
    "detectWeb": function detectWeb(doc, url) {
	  
		return "multiple";       
},
};
transIds["2bedae3c-bab5-447f-b127-e9babc0e9cfe"] = "Legislative Insight.js";


splittedTrans["LexisNexis.js"] = {
    "stamp": {"translatorID":"b047a13c-fe5c-6604-c997-bef15e502b09","label":"LexisNexis","creator":"Philipp Zumstein","target":"^https?://[^/]*lexis-?nexis\\.com","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsv","lastUpdated":"2014-03-20 20:48:18"},
    "detectWeb": function detectWeb(doc, url) {
	//besides deciding whether it is a single item or multiple items
	//it is also important here to select the correct frame! Zotero
	//will only focus on one frame and it is possible to work with that
	//frame further.

	//let's go for the navigation bar (2nd frame from top) to call new urls with hidden variables
	//(this is maybe not the natural choice, but it seems to work)
	if (url.indexOf("parent=docview") != -1 && url.indexOf("target=results_listview_resultsNav") != -1 ) {
		return "newspaperArticle";
	}
	
	if ((url.indexOf("contentRenderer.do?") != -1 || url.indexOf("target=results_ResultsList") != -1) && ZU.xpath(doc, '//tr[./td/input[@name="frm_tagged_documents"]]/td/a').length > 0) {
		return "multiple";
	}
},
};
transIds["b047a13c-fe5c-6604-c997-bef15e502b09"] = "LexisNexis.js";


splittedTrans["Library Catalog (Aleph).js"] = {
    "stamp": {"translatorID":"cf87eca8-041d-b954-795a-2d86348999d5","label":"Library Catalog (Aleph)","creator":"Simon Kornblith, Michael Berkowitz, Ming Yeung Cheung","target":"^https?://[^/]+/F(/[A-Z0-9\\-]+(\\?.*)?$|\\?func=find|\\?func=scan|\\?func=short)","minVersion":"1.0.0b3.r1","maxVersion":"","priority":250,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2015-06-02 19:19:06"},
    "detectWeb": function detectWeb(doc, url) {
	var singleRe = new RegExp("^https?://[^/]+/F/[A-Z0-9\-]+\?.*(?:func=full-set-set|func=direct|func=myshelf-full.*)");
	
	if(singleRe.test(doc.location.href)) {
		return "book";
	} else {
		var tags = doc.getElementsByTagName("a");
		for(var i=0; i<tags.length; i++) {
			if(singleRe.test(tags[i].href)) {
				return "multiple";
			}
		}
	}
},
};
transIds["cf87eca8-041d-b954-795a-2d86348999d5"] = "Library Catalog (Aleph).js";


splittedTrans["Library Catalog (Amicus).js"] = {
    "stamp": {"translatorID":"a0a9a45c-cc9e-497c-962e-a366618df985","label":"Library Catalog (Amicus)","creator":"Sebastian Karcher","target":"^https?://amicus\\.collectionscanada\\.ca/aaweb-bin/aamain","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-08-26 03:47:57"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/aamain\/itemdisp/)){
		return "book"
	}
	else if (url.match(/aamain\/rqst_sb/)){
		return "multiple";
	}
},
};
transIds["a0a9a45c-cc9e-497c-962e-a366618df985"] = "Library Catalog (Amicus).js";


splittedTrans["Library Catalog (Aquabrowser).js"] = {
    "stamp": {"translatorID":"915c326f-06c5-4833-b7b7-54c63f88b135","label":"Library Catalog (Aquabrowser)","creator":"Sebastian Karcher","target":"/fullrecordinnerframe\\.ashx\\?.+id=|/result\\.ashx\\?","minVersion":"3.0","maxVersion":"","priority":270,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-08-26 03:51:35"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/\/result\.ashx\?/) && ZU.xpath(doc, '//div[@class="titlenew"]//a[@class="classiclink"]').length>0) return "multiple";
	if (url.match(/\/fullrecordinnerframe\.ashx\?.+id=/)) return "book";
},
};
transIds["915c326f-06c5-4833-b7b7-54c63f88b135"] = "Library Catalog (Aquabrowser).js";


splittedTrans["Library Catalog (BiblioCommons).js"] = {
    "stamp": {"translatorID":"5d506fe3-dbde-4424-90e8-d219c63faf72","label":"Library Catalog (BiblioCommons)","creator":"Avram Lyon","target":"^https?://[^/]+\\.bibliocommons\\.com\\/","minVersion":"2.1","maxVersion":"","priority":250,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-02 20:44:02"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/\/item\/(?:show|catalogue_info)/))
		return "book";
	if (url.match(/\/search\?t=/))
		return "multiple";
	return false;
},
};
transIds["5d506fe3-dbde-4424-90e8-d219c63faf72"] = "Library Catalog (BiblioCommons).js";


splittedTrans["Library Catalog (DRA).js"] = {
    "stamp": {"translatorID":"fb12ae9e-f473-cab4-0546-27ab88c64101","label":"Library Catalog (DRA)","creator":"Simon Kornblith","target":"/web2/tramp2\\.exe/(?:see\\_record/|authority\\_hits/|do_keyword_search|form/|goto/.*\\?.*screen=(MARC)?Record\\.html)","minVersion":"3.0","maxVersion":"","priority":260,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-08-26 03:57:40"},
    "detectWeb": function detectWeb(doc, url) {
	if(doc.location.href.search(/\/authority_hits|\/form\//) > 0) {
		return "multiple";
	} else {
		return "book";
	}
},
};
transIds["fb12ae9e-f473-cab4-0546-27ab88c64101"] = "Library Catalog (DRA).js";


splittedTrans["Library Catalog (Dynix).js"] = {
    "stamp": {"translatorID":"774d7dc2-3474-2684-392c-f787789ec63d","label":"Library Catalog (Dynix)","creator":"Simon Kornblith and Sylvain Machefert","target":"ipac\\.jsp\\?.*(?:uri=(?:link|full)=[0-9]|menu=search|term=)","minVersion":"2.1","maxVersion":"","priority":260,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-08-26 03:59:09"},
    "detectWeb": function detectWeb(doc, url) {
	// make sure there are multiple results
	if (getSearchResults(doc).length) {
	  return "multiple";
	} else if(url.match(/[&?]uri=[^&#]+/)) {	//single item entries have a ui parameter
		return "book";
	}
},
};
transIds["774d7dc2-3474-2684-392c-f787789ec63d"] = "Library Catalog (Dynix).js";


splittedTrans["Library Catalog (Encore).js"] = {
    "stamp": {"translatorID":"446764bf-7da6-49ec-b7a7-fefcbafe317f","label":"Library Catalog (Encore)","creator":"Sebastian Karcher","target":"/iii/encore/(record|search)","minVersion":"1.0","maxVersion":"","priority":270,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2014-08-26 03:59:48"},
    "detectWeb": function detectWeb(doc, url){
	var bibIdRe = new RegExp("encore/record");
	if (bibIdRe.test(url)){
		return "book";
	}

var bibIdSearch = new RegExp("encore/search");
	if (bibIdSearch.test(url)){
		return "multiple";
	}
},
};
transIds["446764bf-7da6-49ec-b7a7-fefcbafe317f"] = "Library Catalog (Encore).js";


splittedTrans["Library Catalog (GEAC).js"] = {
    "stamp": {"translatorID":"c0e6fda6-0ecd-e4f4-39ca-37a4de436e15","label":"Library Catalog (GEAC)","creator":"Simon Kornblith","target":"/(?:GeacQUERY|GeacFETCH[\\:\\?].*[&:]next=html/(?:record\\.html|geacnffull\\.html))","minVersion":"1.0.0b3.r1","maxVersion":"","priority":260,"inRepository":true,"translatorType":4,"browserSupport":"g","lastUpdated":"2014-08-26 04:00:31"},
    "detectWeb": function detectWeb(doc, url) {
	if(doc.location.href.indexOf("/GeacQUERY") > 0) {
		return "multiple";
	} else {
		return "book";
	}
},
};
transIds["c0e6fda6-0ecd-e4f4-39ca-37a4de436e15"] = "Library Catalog (GEAC).js";


splittedTrans["Library Catalog (InnoPAC).js"] = {
    "stamp": {"translatorID":"4fd6b89b-2316-2dc4-fd87-61a97dd941e8","label":"Library Catalog (InnoPAC)","creator":"Simon Kornblith and Michael Berkowitz","target":"(search~|\\/search\\?|(a|X|t|Y|w)\\?|\\?(searchtype|searchscope)|frameset&FF|record=b[0-9]+(~S[0-9])?|/search/q\\?)","minVersion":"2.1.9","maxVersion":"","priority":250,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-08-26 04:02:52"},
    "detectWeb": function detectWeb(doc, url) {

//***********
// URL MATCHING - translator should detect the following urls...
// First page results
// http://bearcat.baylor.edu/search~S7/?searchtype=t&searcharg=test&searchscope=7&sortdropdown=-&SORT=D&extended=0&SUBMIT=Search&searchlimits=&searchorigarg=tone+hundred+years+of+solitude
// http://bearcat.baylor.edu/search~S7?/ttest/ttest/1837%2C1838%2C2040%2CB/browse/indexsort=-
// http://innopac.cooley.edu/search~S0?/Xtest&SORT=DZ/Xtest&SORT=DZ&SUBKEY=test/1%2C960%2C960%2CB/browse
// Individual item from search
// http://bearcat.baylor.edu/search~S7?/ttest/ttest/1837%2C1838%2C2040%2CB/frameset&FF=ttestteori+english&1%2C1%2C/indexsort=-
// http://innopac.cooley.edu/search~S0?/Xtest&SORT=DZ/Xtest&SORT=DZ&SUBKEY=test/1%2C960%2C960%2CB/frameset&FF=Xtest&SORT=DZ&1%2C1%2C
// Persistent URL for item
// http://bearcat.baylor.edu/record=b1540169~S7
// http://innopac.cooley.edu/record=b507916~S0
// http://libcat.dartmouth.edu/record=b4054652~S1
// Persistent URL for item, without suffix
// http://luna.wellesley.edu/record=b2398784
// Specific search parameters
// http://library.cooley.edu/search/q?author=shakespeare&title=hamlet
//***********

// Central Michigan University fix
	var xpath = '//div[@class="bibRecordLink"]';
	var elmt = doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null).iterateNext();
	if(elmt) {
		return "book";
	}
	
	// Regular expression to reduce false positives
	if (!url.match(/SEARCH=/) && !url.match(/searchargs?=/) && !url.match(/&FF/) && !url.match(/search~S[0-9]/) && !url.match(/\/search\/q\?/) && !url.match(/record=/)) return false;
	// First, check to see if the URL alone reveals InnoPAC, since some sites don't reveal the MARC button
	var matchRegexp = new RegExp('^https?://[^/]+/search[^/]*\\??/[^/]+/[^/]+/[^/]+\%2C[^/]+/frameset(.+)$');
	if(matchRegexp.test(doc.location.href)) {
		if (!url.match("SEARCH") && !url.match("searchtype")) {
			return "book";
		}
	}
	// Next, look for the MARC button	
	xpath = '//a[img[@src="/screens/marc_display.gif" or @src="/screens/ico_marc.gif" or @src="/screens/marcdisp.gif" or starts-with(@alt, "MARC ") or @src="/screens/regdisp.gif" or @alt="REGULAR RECORD DISPLAY"]] | //a[span/img[@src="/screens/marc_display.gif" or @src="/screens/ico_marc.gif" or @src="/screens/marcdisp.gif" or starts-with(@alt, "MARC ") or @src="/screens/regdisp.gif" or @alt="REGULAR RECORD DISPLAY"]] | //a[contains(@href, "/marc~")]';
	elmt = doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null).iterateNext();
	if(elmt) {
		return "book";
	}
	// Also, check for links to an item display page
	var tags = ZU.xpath(doc, '//a[@href]');
	for(var i=0; i<tags.length; i++) {
		if(matchRegexp.test(tags[i].href) || tags[i].href.match(/^https?:\/\/([^/]+\/(?:search\??\/|record=?|search%7e\/)|frameset&FF=)/)) {
			return "multiple";
		}
	}
	
	return false;
},
};
transIds["4fd6b89b-2316-2dc4-fd87-61a97dd941e8"] = "Library Catalog (InnoPAC).js";


splittedTrans["Library Catalog (Koha).js"] = {
    "stamp": {"translatorID":"8e66aa6d-5b2a-4b44-b384-a838e23b8538","label":"Library Catalog (Koha)","creator":"Sebastian Karcher","target":"cgi-bin/koha/opac-(detail|search)","minVersion":"2.1.9","maxVersion":"","priority":260,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-09-25 15:46:46"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/\/opac-search\.pl\?/) && getSearchResults(doc, true)) return "multiple";
	if (url.match(/\/opac-detail\.pl\?/)) return "book";
},
};
transIds["8e66aa6d-5b2a-4b44-b384-a838e23b8538"] = "Library Catalog (Koha).js";


splittedTrans["Library Catalog (Mango).js"] = {
    "stamp": {"translatorID":"fa87288d-406b-48cb-a957-7defcf415a64","label":"Library Catalog (Mango)","creator":"Sebastian Karcher","target":"\\.catalog\\.fcla\\.edu/.+\\.jsp\\?","minVersion":"2.1.9","maxVersion":"","priority":200,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-09-24 12:32:34"},
    "detectWeb": function detectWeb(doc, url) {
	var namespace = doc.documentElement.namespaceURI;
	var nsResolver = namespace ? function(prefix) {
		if (prefix == 'x') return namespace; else return null;
	} : null;
	//Try to avoid false positives - test for presence of MARC for individual items.
	var xpath = '//td/a[contains(@href, "&V=M")]|//td/a[contains(@href, "&V=U")]'
	if (doc.evaluate(xpath, doc, nsResolver, XPathResult.ANY_TYPE, null).iterateNext()){
		return "book";
	}
	//for multiples be conservative - make sure these are items that likely have MARC
	else if (url.match(/fl=bo|Book/) && !url.match(/\&DLS=/)) return "multiple";

},
};
transIds["fa87288d-406b-48cb-a957-7defcf415a64"] = "Library Catalog (Mango).js";


splittedTrans["Library Catalog (OPALS).js"] = {
    "stamp": {"translatorID":"83501b8c-1033-4722-ae50-a77d67271ef7","label":"Library Catalog (OPALS)","creator":"Opals","target":"^https?://[^?#&]+/bin/(search|pf|rs)","minVersion":"3.0","maxVersion":"","priority":250,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2014-08-26 04:06:03"},
    "detectWeb": function detectWeb(doc, url) {
    var titles = getTitleList(doc);
    var count = titles.length;
    if (count == 1) return "book";
    else if (count > 1) return "multiple";
},
};
transIds["83501b8c-1033-4722-ae50-a77d67271ef7"] = "Library Catalog (OPALS).js";


splittedTrans["Library Catalog (PICA).js"] = {
    "stamp": {"translatorID":"1b9ed730-69c7-40b0-8a06-517a89a3a278","label":"Library Catalog (PICA)","creator":"Sean Takats, Michael Berkowitz, Sylvain Machefert, Sebastian Karcher","target":"^https?://[^/]+(?:/[^/]+)?//?DB=\\d","minVersion":"3.0","maxVersion":"","priority":248,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2014-09-25 15:49:46"},
    "detectWeb": function detectWeb(doc, url) {
	var multxpath = "//span[@class='tab1']|//td[@class='tab1']";
	if (elt = doc.evaluate(multxpath, doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		var content = elt.textContent;
		//Z.debug(content)
		if ((content == "Liste des résultats") || (content == "shortlist") || (content == 'Kurzliste') || content == 'titellijst') {
			if(!getSearchResults(doc).iterateNext()) return;	//no results. Does not seem to be necessary, but just in case.
			return "multiple";
			
		} else if ((content == "Notice détaillée") || (content == "title data") || (content == 'Titeldaten') || (content == 'Vollanzeige') || 
					(content == 'Besitznachweis(e)') || (content == 'full title') || (content == 'Titelanzeige' || (content == 'titelgegevens'))) {
			var xpathimage = "//span[@class='rec_mat_long']/img|//table[contains(@summary, 'presentation')]/tbody/tr/td/img";
			if (elt = doc.evaluate(xpathimage, doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
				var type = elt.getAttribute('src');
				//Z.debug(type);
				if (type.indexOf('article.') > 0) {
					//book section and journal article have the same icon
					//we can check if there is an ISBN
					if(ZU.xpath(doc, '//tr/td[@class="rec_lable" and .//span[starts-with(text(), "ISBN")]]').length) {
						return 'bookSection';
					}
					return "journalArticle";
				} else if (type.indexOf('audiovisual.') > 0) {
					return "film";
				} else if (type.indexOf('book.') > 0) {
					return "book";
				} else if (type.indexOf('handwriting.') > 0) {
					return "manuscript";
				} else if (type.indexOf('sons.') > 0 || type.indexOf('sound.') > 0 || type.indexOf('score') > 0) {
					return "audioRecording";
				} else if (type.indexOf('thesis.') > 0) {
					return "thesis";
				} else if (type.indexOf('map.') > 0) {
					return "map";
				}
			}
			return "book";
		}
	}
},
};
transIds["1b9ed730-69c7-40b0-8a06-517a89a3a278"] = "Library Catalog (PICA).js";


splittedTrans["Library Catalog (PICA2).js"] = {
    "stamp": {"translatorID":"5236e1d6-fcf2-4ed5-9165-cc5f345ce33e","label":"Library Catalog (PICA2)","creator":"Sean Takats, Michael Berkowitz, Sylvain Machefert, Sebastian Karcher, Aurimas Vinckevicius","target":"^https?://[^/]+/DB=[\\dA-Z]","minVersion":"3.0","maxVersion":"","priority":249,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-08-26 04:07:48"},
    "detectWeb": function detectWeb(doc, url) {
	var multxpath = "//table[@summary='Tab bar']/tbody/tr/td[@class='tab1']";
	if (!ZU.xpathText(doc, "//table[@summary='Tab bar']/tbody/tr/td[@class='tab1']")){
		//this for some permalinks:
		multxpath = "//table[@summary='Tab bar']/tbody/tr/td[@class='tab0']/a[contains(@href, 'PRS=')]";
	}
	if (elt = doc.evaluate(multxpath, doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		var content = elt.textContent;
		if ((content == "Liste des résultats") || (content == "shortlist") || (content == 'Kurzliste') || content == 'titellijst') {
			return "multiple";
		} else if ((content == "Notice détaillée") || (content == "title data") || (content == "Besitznachweis(e)")|| (content == "Vollanzeige")|| (content == 'Titeldaten') || content == "Bestandsinfo"|| (content == 'full title') || (content == 'Titelanzeige' || (content == 'titelgegevens'))) {
			var xpathimage = "//table[@summary='presentation switch']/tbody/tr/td/img"; 
			if (elt = doc.evaluate(xpathimage, doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
				var type = elt.getAttribute('src');
				//Z.debug(type);
				if (type.indexOf('article.') > 0) {
					return "journalArticle";
				} else if (type.indexOf('audiovisual.') > 0) {
					return "film";
				} else if (type.indexOf('book.') > 0) {
					return "book";
				} else if (type.indexOf('handwriting.') > 0) {
					return "manuscript";
				} else if (type.indexOf('sons.') > 0 || type.indexOf('sound.') > 0 || type.indexOf('score') > 0) {
					return "audioRecording";
				} else if (type.indexOf('thesis.') > 0) {
					return "thesis";
				} else if (type.indexOf('map.') > 0) {
					return "map";
				}
			}
			return "book";
		}
	}
},
};
transIds["5236e1d6-fcf2-4ed5-9165-cc5f345ce33e"] = "Library Catalog (PICA2).js";


splittedTrans["Library Catalog (Polaris).js"] = {
    "stamp": {"translatorID":"12541207-ed80-4b59-9d46-fafa3aa61f7f","label":"Library Catalog (Polaris)","creator":"Aurimas Vinckevicius","target":"/polaris/search/(searchresults|title)\\.aspx\\?","minVersion":"3.0","maxVersion":"","priority":250,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-02-19 04:55:29"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf('title.aspx') != -1 && getPos(url) !== null) {
		return getItemType(doc);
	}
	
	if (url.indexOf('searchresults.aspx') != -1 && getSearchResults(doc, true)) {
		return 'multiple'
	}
},
};
transIds["12541207-ed80-4b59-9d46-fafa3aa61f7f"] = "Library Catalog (Polaris).js";


splittedTrans["Library Catalog (SIRSI eLibrary).js"] = {
    "stamp": {"translatorID":"23ba3be6-412d-4dde-9cc1-c4df0cc09378","label":"Library Catalog (SIRSI eLibrary)","creator":"Mang Sun","target":"/uhtbin/(?:cgisirsi|quick_keyword)","minVersion":"3.0","maxVersion":"","priority":250,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-08-26 04:08:13"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.evaluate('//div[@class="columns_container"]/div[contains(@class, "left_column")]/div[@class="content_container"]/div[@class="content"]/form[@id="hitlist"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	} else if (doc.evaluate('//div[@class="columns_container"]/div[contains(@class, "left_column")]/form[@name="item_view"]/div[@class="content_container item_details"]/div[@class="content"]/h3[.="Item Details" or .="Detalles del ítem" or .="Detalle"] ', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "book";
	}
},
};
transIds["23ba3be6-412d-4dde-9cc1-c4df0cc09378"] = "Library Catalog (SIRSI eLibrary).js";


splittedTrans["Library Catalog (SIRSI).js"] = {
    "stamp": {"translatorID":"add7c71c-21f3-ee14-d188-caf9da12728b","label":"Library Catalog (SIRSI)","creator":"Sean Takats,  Hicham El Kasmi","target":"/uhtbin/(?:cgisirsi|quick_keyword)","minVersion":"2.1","maxVersion":"","priority":250,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-08-26 04:09:11"},
    "detectWeb": function detectWeb(doc, url) {

	var xpath = '//tr[th[@class="viewmarctags"]][td[@class="viewmarctags"]]';
	if(doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		Zotero.debug("SIRSI detectWeb: viewmarctags");
		return "book";
	}
	
	var xpath = '//dl[dt[@class="viewmarctags"]][dd[@class="viewmarctags"]]';
	if(doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		Zotero.debug("SIRSI detectWeb: viewmarctags");
		return "book";
	}
	var xpath = '//input[@name="VOPTIONS"]';
	if(doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		Zotero.debug("SIRSI detectWeb: VOPTIONS");
		return "book";
	}
	var elmts = doc.evaluate('/html/body/form//text()', doc, null,
					 XPathResult.ANY_TYPE, null);
	while(elmt = elmts.iterateNext()) {
		if(Zotero.Utilities.superCleanString(elmt.nodeValue) == "Viewing record") {
			Zotero.debug("SIRSI detectWeb: Viewing record");
			return "book";
		}
	}
	
	var xpath = '//td[@class="searchsum"]/table';
	if(doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		Zotero.debug("SIRSI detectWeb: searchsum");
		return "multiple";
	}
	var xpath = '//form[@name="hitlist"]/table/tbody/tr';
	if(doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		Zotero.debug("SIRSI detectWeb: hitlist");
		return "multiple";
	}
},
};
transIds["add7c71c-21f3-ee14-d188-caf9da12728b"] = "Library Catalog (SIRSI).js";


splittedTrans["LIbrary Catalog (SLIMS).js"] = {
    "stamp": {"translatorID":"fc3ac6f7-b461-49fe-879c-dd234f9c101c","label":"LIbrary Catalog (SLIMS)","creator":"Sebastian Karcher","target":"(^https?://makassarlib\\.net|^https?://kit\\.ft\\.ugm\\.ac\\.id/ucs|/libsenayan)/index\\.php","minVersion":"2.1","maxVersion":"","priority":250,"inRepository":true,"translatorType":4,"browserSupport":"gcv","lastUpdated":"2014-08-26 04:10:09"},
    "detectWeb": function detectWeb(doc, url) {
	
	if (url.match(/show_detail&id=/)) return "book";
	else if (ZU.xpathText(doc, '//div[contains(@class, "item alterList")]/a')) return "multiple"
	
},
};
transIds["fc3ac6f7-b461-49fe-879c-dd234f9c101c"] = "LIbrary Catalog (SLIMS).js";


splittedTrans["Library Catalog (Talis Prism 2).js"] = {
    "stamp": {"translatorID":"dc024bfc-2252-4257-b10e-cb95a0f213aa","label":"Library Catalog (Talis Prism 2)","creator":"Sebastian Karcher","target":"/items(/\\d+|\\?query=)","minVersion":"2.1.9","maxVersion":"","priority":260,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-08-26 04:11:00"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/\/items\?query=/) && ZU.xpathText(doc, '//div[@id="searchResults"]//h2[@class="title"]/a')!=null ) return "multiple";
	if (url.match(/\/items\/\d+/)) {
		var test = ZU.xpathText(doc, '//link/@type');
		if(test && test.indexOf("application/x-endnote-refer")!=-1)
			return "book";
	}
},
};
transIds["dc024bfc-2252-4257-b10e-cb95a0f213aa"] = "Library Catalog (Talis Prism 2).js";


splittedTrans["Library Catalog (TLCYouSeeMore).js"] = {
    "stamp": {"translatorID":"0f9fc2fc-306e-5204-1117-25bca009dffc","label":"Library Catalog (TLC/YouSeeMore)","creator":"Simon Kornblith","target":"TLCScripts/interpac\\.dll\\?(?:.*LabelDisplay.*RecordNumber=[0-9]|Search|ItemTitles)","minVersion":"1.0.0b3.r1","maxVersion":"","priority":260,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-08-26 04:11:42"},
    "detectWeb": function detectWeb(doc, url) {
	var detailRe = new RegExp("TLCScripts/interpac\.dll\?.*LabelDisplay.*RecordNumber=[0-9]");
	if (detailRe.test(doc.location.href)) {
		return "book";
	} else {
		return "multiple";
	}
},
};
transIds["0f9fc2fc-306e-5204-1117-25bca009dffc"] = "Library Catalog (TLCYouSeeMore).js";


splittedTrans["Library Catalog (Voyager 7).js"] = {
    "stamp": {"translatorID":"a81243b5-a9fd-4921-8441-3142a518fdb7","label":"Library Catalog (Voyager 7)","creator":"Sean Takats","target":"/vwebv/(holdingsInfo|search)","minVersion":"1.0","maxVersion":"","priority":250,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-08-26 04:12:22"},
    "detectWeb": function detectWeb(doc, url) {
	var bibIdRe = new RegExp("bibId=[0-9]+");
	if (bibIdRe.test(url)) {
		return "book";
	}
	//for single search results such as
	//http://catalog.loc.gov/vwebv/search?searchArg=bynum+holy+feast+holy+fast&searchCode=GKEY^*&searchType=0&recCount=100&sk=en_US
	else if(ZU.xpathText(doc, '//div[@class="bibliographicData"]')) return "book";


	var titles = doc.evaluate('//div[@class="resultListTextCell"]//a', doc, null, XPathResult.ANY_TYPE, null);
	if (titles.iterateNext()) {
		return "multiple";
	}
},
};
transIds["a81243b5-a9fd-4921-8441-3142a518fdb7"] = "Library Catalog (Voyager 7).js";


splittedTrans["Library Catalog (Voyager).js"] = {
    "stamp": {"translatorID":"88915634-1af6-c134-0171-56fd198235ed","label":"Library Catalog (Voyager)","creator":"Simon Kornblith","target":"Pwebrecon\\.cgi","minVersion":"2.1.9","maxVersion":"","priority":250,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-08-26 04:12:55"},
    "detectWeb": function detectWeb(doc, url) {
	var export_options = ZU.xpath(doc, '//form[@name="frm"]//*[@name="RD"]|//td/select[@name="RD"]');
	if (!export_options.length) return false;
	export_options = export_options[0];
	var i = 0
	while (i< export_options.length) {
		if (export_options[i].text == 'Latin1 MARC' || export_options[i].text == 'Raw MARC' || export_options[i].text == 'MARC 21' || export_options[i].text == 'MARC 8' || export_options[i].text == 'MARC-8' || export_options[i].text == 'UTF-8' || export_options[i].text == 'MARC (Unicode/UTF-8)' || export_options[i].text == 'MARC UTF-8' || export_options[i].text == 'UTF-8 MARC (Unicode)' || export_options[i].text == 'UTF8-Unicode' || export_options[i].text == 'MARC (non-Unicode/MARC-8)' || export_options[i].text == 'MARC communication format' || export_options[i].text == 'MARC Record') {
			// We have an exportable single record
			if (ZU.xpath(doc, '//form[@name="frm"]//*[@name="RC"]').length) {
				return "multiple";
			} else {
				return "book";
			}
		}
		i++;
	}
},
};
transIds["88915634-1af6-c134-0171-56fd198235ed"] = "Library Catalog (Voyager).js";


splittedTrans["Library Catalog (VTLS).js"] = {
    "stamp": {"translatorID":"63a0a351-3131-18f4-21aa-f46b9ac51d87","label":"Library Catalog (VTLS)","creator":"Simon Kornblith","target":"/chameleon(?:\\?|$)","minVersion":"1.0.0b3.r1","maxVersion":"","priority":250,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-08-26 04:13:58"},
    "detectWeb": function detectWeb(doc, url) {
	var node = doc.evaluate('//tr[@class="intrRow"]/td/table/tbody/tr[th]', doc, null, XPathResult.ANY_TYPE, null).iterateNext();
	if (node) {
		return "multiple";
	}
	var node = doc.evaluate('//a[text()="marc" or text()="marc view" or contains(text(), "UNIMARC") or contains(text(), "مارك")]', doc, null, XPathResult.ANY_TYPE, null).iterateNext();
	if (node) {
		return "book";
	}
},
};
transIds["63a0a351-3131-18f4-21aa-f46b9ac51d87"] = "Library Catalog (VTLS).js";


splittedTrans["Library of Congress ISBN.js"] = {
    "stamp": {"translatorID":"c070e5a2-4bfd-44bb-9b3c-4be20c50d0d9","label":"Library of Congress ISBN","creator":"Sebastian Karcher","target":"","minVersion":"3.0.9","maxVersion":"","priority":98,"inRepository":true,"translatorType":8,"browserSupport":"gcsb","lastUpdated":"2015-04-14 20:56:41"},
};
transIds["c070e5a2-4bfd-44bb-9b3c-4be20c50d0d9"] = "Library of Congress ISBN.js";


splittedTrans["LiveJournal.js"] = {
    "stamp": {"translatorID":"d49e3a67-e2c1-4217-825c-2b22cffd332a","label":"LiveJournal","creator":"Avram Lyon","target":"^https?://.*\\.livejournal\\.com/(?:$|[0-9]+\\.html)","minVersion":"2.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-06-30 10:25:12"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["d49e3a67-e2c1-4217-825c-2b22cffd332a"] = "LiveJournal.js";


splittedTrans["London Review of Books.js"] = {
    "stamp": {"translatorID":"8a00461c-5b42-4632-8048-339b221ac3a2","label":"London Review of Books","creator":"Avram Lyon","target":"^https?://www\\.lrb\\.co\\.uk","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-04-03 17:45:48"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["8a00461c-5b42-4632-8048-339b221ac3a2"] = "London Review of Books.js";


splittedTrans["Lulu.js"] = {
    "stamp": {"translatorID":"9a0ecbda-c0e9-4a19-84a9-fc8e7c845afa","label":"Lulu","creator":"Aurimas Vinckevicius","target":"https?://www.lulu.com/shop/","minVersion":"3.0","maxVersion":"","priority":101,"inRepository":true,"translatorType":12,"browserSupport":"gcsibv","lastUpdated":"2013-10-11 03:33:45"},
    "detectWeb": function detectWeb(doc, url) {
	if(url.search(/\/product-\d+\.html/) != -1) {
		return 'book';
	}
	
	if(url.indexOf('/search.ep?') != -1
		&& getSearchResults(doc).length) {
		return 'multiple';
	}
},
};
transIds["9a0ecbda-c0e9-4a19-84a9-fc8e7c845afa"] = "Lulu.js";


splittedTrans["MAB2.js"] = {
    "stamp": {"translatorID":"91acf493-0de7-4473-8b62-89fd141e6c74","label":"MAB2","creator":"Simon Kornblith. Adaptions for MAB2: Leon Krauthausen (FUB)","target":"mab2","minVersion":"1.0.0b3.r1","maxVersion":"","priority":100,"inRepository":true,"translatorType":1,"browserSupport":"gcs","lastUpdated":"2014-05-20 17:57:47"},
"detectImport": function detectImport() {
	var mab2RecordRegexp = /^[0-9]{3}[a-z ]{2}[a-z ]{3}$/
	var read = Zotero.read(8);
	if(mab2RecordRegexp.test(read)) {
		return true;
	}
},};
transIds["91acf493-0de7-4473-8b62-89fd141e6c74"] = "MAB2.js";


splittedTrans["Mailman.js"] = {
    "stamp": {"translatorID":"6cb92652-6a2b-473e-b976-434f50b15069","label":"Mailman","creator":"Robin Paulson","target":"/(pipermail|archives)/[A-Za-z0-9_-]*/[0-9]{4}-(January|February|March|April|May|June|July|August|September|October|November|December)/[0-9]{6}.html","minVersion":"3.0","maxVersion":"","priority":260,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-08-26 04:15:58"},
    "detectWeb": function detectWeb(doc, url) {
	return "email";
},
};
transIds["6cb92652-6a2b-473e-b976-434f50b15069"] = "Mailman.js";


splittedTrans["Mainichi Daily News.js"] = {
    "stamp": {"translatorID":"b56f856e-934e-4b46-bc58-d61dccc9f32f","label":"Mainichi Daily News","creator":"Frank Bennett","target":"^https?://((?:search\\.)*mdn\\.)?mainichi\\.jp/(?:$|result\\?|mdnnews/|perspectives/|features?/|arts/|travel/|search/|english/)","minVersion":"2.0b7","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2014-04-03 17:46:23"},
    "detectWeb": function (doc, url) {
	if (itemRe.test(doc.location.href)) {
		return "newspaperArticle";
	} else {
		return "multiple";
	}
},
};
transIds["b56f856e-934e-4b46-bc58-d61dccc9f32f"] = "Mainichi Daily News.js";


splittedTrans["MARC.js"] = {
    "stamp": {"translatorID":"a6ee60df-1ddc-4aae-bb25-45e0537be973","label":"MARC","creator":"Simon Kornblith, Sylvain Machefert","target":"marc","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":1,"browserSupport":"gcsv","lastUpdated":"2015-04-16 18:18:06"},
"detectImport": function detectImport() {
	var marcRecordRegexp = /^[0-9]{5}[a-z ]{3}$/
	var read = Zotero.read(8);
	if(marcRecordRegexp.test(read)) {
		return true;
	}
},};
transIds["a6ee60df-1ddc-4aae-bb25-45e0537be973"] = "MARC.js";


splittedTrans["MARCXML.js"] = {
    "stamp": {"translatorID":"edd87d07-9194-42f8-b2ad-997c4c7deefd","label":"MARCXML","creator":"Sebastian Karcher","target":"xml","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":1,"browserSupport":"gcsv","lastUpdated":"2015-05-20 00:05:55"},
"detectImport": function detectImport() {
	var line;
	var i = 0;
	while ((line = Zotero.read()) !== false) {
		if (line != "") {
			if (line.match(/<(marc\:)?collection xmlns(\:marc)?=\"http:\/\/www\.loc\.gov\/MARC21\/slim\"/)) {
				return true;
			} else {
				if (i++ > 5) {
					return false;
				}
			}
		}
	}
},};
transIds["edd87d07-9194-42f8-b2ad-997c4c7deefd"] = "MARCXML.js";


splittedTrans["Matbugat.ru.js"] = {
    "stamp": {"translatorID":"4f7c1422-2eef-4d22-a4be-8e1a78ef7bd2","label":"Matbugat.ru","creator":"Avram Lyon","target":"^https?:\\/\\/(www\\.)?matbugat\\.ru\\/","minVersion":"2.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-04-15 18:04:37"},
    "detectWeb": function detectWeb(doc, url) { 
		return FW.detectWeb(doc, url);
},
};
transIds["4f7c1422-2eef-4d22-a4be-8e1a78ef7bd2"] = "Matbugat.ru.js";


splittedTrans["Max Planck Institute for the History of Science Virtual Laboratory Library.js"] = {
    "stamp": {"translatorID":"66928fe3-1e93-45a7-8e11-9df6de0a11b3","label":"Max Planck Institute for the History of Science: Virtual Laboratory Library","creator":"Sean Takats","target":"^https?://vlp\\.mpiwg-berlin\\.mpg\\.de/library/","minVersion":"1.0.0b3.r1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-01-30 22:46:42"},
    "detectWeb": function detectWeb(doc, url){
	var namespace = doc.documentElement.namespaceURI;
		var nsResolver = namespace ? function(prefix) {
				if (prefix == 'x') return namespace; else return null;
		} : null;
	var elmt = doc.evaluate('//base[contains(@href, "/library/data/lit")]', doc, nsResolver, XPathResult.ANY_TYPE, null).iterateNext();
	if (elmt){
			return "book";
	}
	elmt = doc.evaluate('//span[starts-with(@title, "lit")] | //a[starts-with(@title, "lit")] | //p[starts-with(@title, "lit")]', doc, nsResolver, XPathResult.ANY_TYPE, null).iterateNext();
	if (elmt){
		return "multiple";
	}
},
};
transIds["66928fe3-1e93-45a7-8e11-9df6de0a11b3"] = "Max Planck Institute for the History of Science Virtual Laboratory Library.js";


splittedTrans["MDPI Journals.js"] = {
    "stamp": {"translatorID":"acf93a17-a83b-482b-a45e-0c64cfd49bee","label":"MDPI Journals","creator":"Sebastian Karcher","target":"^https?://www\\.mdpi\\.com","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-11-19 17:39:27"},
    "detectWeb": function detectWeb(doc,url) {

	var xpath='//meta[@name="citation_journal_title"]';

	if (ZU.xpath(doc, xpath).length > 0) {
		return "journalArticle";
	}
			
	if (url.indexOf("/search?")!=-1 || url.search(/\d{4}-\d{3}.\/\d+/)!=-1) {
		multxpath = '//table[@id="articles"]//div[@class="title"]/a'
	
	if (ZU.xpath(doc, multxpath).length>0){
			return "multiple";
		}
	}
	return false;
},
};
transIds["acf93a17-a83b-482b-a45e-0c64cfd49bee"] = "MDPI Journals.js";


splittedTrans["medes.js"] = {
    "stamp": {"translatorID":"96a92909-f23c-4f16-ae93-1948c2459932","label":"medes","creator":"Philipp Zumstein","target":"^https?://(www\\.)?medes\\.com/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-03-14 16:21:49"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf('idmedes=')>-1 || url.indexOf('/publication/')>-1) {
		return "journalArticle";
	} else if (getSearchResults(doc, true)) {
		return "multiple";
	}
},
};
transIds["96a92909-f23c-4f16-ae93-1948c2459932"] = "medes.js";


splittedTrans["Medium.js"] = {
    "stamp": {"translatorID":"6c957d6b-a554-474f-81a9-91c178fef65d","label":"Medium","creator":"Sebastian Karcher","target":"^https?://medium\\.com","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-06-01 20:47:42"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["6c957d6b-a554-474f-81a9-91c178fef65d"] = "Medium.js";


splittedTrans["MEDLINEnbib.js"] = {
    "stamp": {"translatorID":"9ec64cfd-bea7-472a-9557-493c0c26b0fb","label":"MEDLINE/nbib","creator":"Sebastian Karcher","target":"txt","minVersion":"4.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":1,"browserSupport":"gcsv","lastUpdated":"2014-12-17 22:44:27"},
"detectImport": function detectImport() {
	var line;
	var i = 0;
	while ((line = Zotero.read()) !== false) {
		line = line.replace(/^\s+/, "");
		if (line != "") {
			//Actual MEDLINE format starts with PMID
			if (line.substr(0, 6).match(/^PMID( {1, 2})?- /)) {
				return true;
			} else {
				if (i++ > 3) {
					return false;
				}
			}
		}
	}
},};
transIds["9ec64cfd-bea7-472a-9557-493c0c26b0fb"] = "MEDLINEnbib.js";


splittedTrans["mEDRA.js"] = {
    "stamp": {"translatorID":"d9b57cd5-5a9c-4946-8616-3bdf8edfcbb5","label":"mEDRA","creator":"Aurimas Vinckevicius","target":"^https?://www\\.medra\\.org/servlet/view\\?","minVersion":"3.0","maxVersion":"","priority":105,"inRepository":true,"translatorType":12,"browserSupport":"g","lastUpdated":"2014-05-26 03:50:55"},
    "detectWeb": function detectWeb(doc, url) {
	var meta = scrapeMasterTable(doc);
	if(!meta) return;
	
	return mapItemType(meta);
},
};
transIds["d9b57cd5-5a9c-4946-8616-3bdf8edfcbb5"] = "mEDRA.js";


splittedTrans["MetaLib.js"] = {
    "stamp": {"translatorID":"b06d2609-ebca-4125-ac67-6d7a0dba274e","label":"MetaLib","creator":"Aurimas Vinckevicius","target":"https?://[^/]*/V/","minVersion":"3.0","maxVersion":"","priority":250,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2012-04-11 05:03:56"},
    "detectWeb": function detectWeb(doc, url) {
	if(!ZU.xpath(doc, 
		'//head/link[substring(@href,string-length(@href)-11)="/metalib.css"]')
		.length) {
		return;
	}

	var baskets = getBasketLinks(doc).length;
	if(baskets == 1) {
		return 'journalArticle';
	} else if(baskets == 0) {
		return;
	}

	if(getRecords(doc).length) {
		return 'multiple';
	}
},
};
transIds["b06d2609-ebca-4125-ac67-6d7a0dba274e"] = "MetaLib.js";


splittedTrans["MetaPress.js"] = {
    "stamp": {"translatorID":"62c0e36a-ee2f-4aa0-b111-5e2cbd7bb5ba","label":"MetaPress","creator":"Michael Berkowitz, Sebastian Karcher","target":"https?://(.*)metapress\\.com/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-08-05 03:26:18"},
    "detectWeb": function detectWeb(doc, url) {
	if (ZU.xpath(doc, '//div[@class="primitive article"]/h2/a[1]').length > 0) {
		return "multiple";
	} else if (url.match(/content\/[^?/]/)) {
		var headingLabel = doc.getElementById('ctl00_PageHeadingLabel');
		if(!headingLabel) {
			Z.debug('Heading not found. Defaulting to journalArticle');
			return 'journalArticle';
		};
		
		var type = ZU.trimInternal(headingLabel.textContent).toLowerCase()
		switch(type) {
			case 'book chapter':
				return 'bookSection';
			case 'journal article':
				return 'journalArticle';
			default:
				Z.debug('Unrecognized heading: ' + type);
				return "journalArticle";
		}
	}
},
};
transIds["62c0e36a-ee2f-4aa0-b111-5e2cbd7bb5ba"] = "MetaPress.js";


splittedTrans["Microsoft Academic Search.js"] = {
    "stamp": {"translatorID":"91c7b393-af05-476c-ae72-ae244d2347f4","label":"Microsoft Academic Search","creator":"Aurimas Vinckevicius","target":"https?://[^/]*academic\\.research\\.microsoft\\.com","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-03-23 11:12:39"},
    "detectWeb": function detectWeb(doc, url) {
	if(url.indexOf('/Search?') != -1 &&
		url.match(/[&?]query=[^&]+/) &&
		getSearchResults(doc).length) {
		return 'multiple';
	}

	if(url.match(/\/Publication\/(\d+)/)) {
		return 'journalArticle';
	}
},
};
transIds["91c7b393-af05-476c-ae72-ae244d2347f4"] = "Microsoft Academic Search.js";


splittedTrans["MIT Press Journals.js"] = {
    "stamp": {"translatorID":"2e43f4a9-d2e2-4112-a6ef-b3528b39b4d2","label":"MIT Press Journals","creator":"Michael Berkowitz","target":"^https?://www\\.mitpressjournals\\.org/(action|toc|doi)/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-06-02 00:32:10"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/action\/doSearch/) || url.match(/toc\//)) {
		return "multiple";
	} else if (url.match(/doi\/abs\//)) {
		return "journalArticle";
	}
},
};
transIds["2e43f4a9-d2e2-4112-a6ef-b3528b39b4d2"] = "MIT Press Journals.js";


splittedTrans["MODS.js"] = {
    "stamp": {"translatorID":"0e2235e7-babf-413c-9acf-f27cce5f059c","label":"MODS","creator":"Simon Kornblith and Richard Karnesky","target":"xml","minVersion":"2.1.9","maxVersion":"","priority":50,"configOptions":{"dataMode":"xml/dom"},"displayOptions":{"exportNotes":true},"inRepository":true,"translatorType":3,"browserSupport":"gcsv","lastUpdated":"2015-02-11 01:24:19"},
"detectImport": function detectImport() {
	var doc = Zotero.getXML().documentElement;
	if (!doc) {
		return false;
	}
	return doc.namespaceURI === "http://www.loc.gov/mods/v3" && (doc.tagName === "modsCollection" || doc.tagName === "mods");
},};
transIds["0e2235e7-babf-413c-9acf-f27cce5f059c"] = "MODS.js";


splittedTrans["Musee du Louvre.js"] = {
    "stamp": {"translatorID":"22d17fb9-ae32-412e-bcc4-7650ed3359bc","label":"Musee du Louvre","creator":"Adam Crymble","target":"^https?://www\\.louvre\\.fr/llv","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"g","lastUpdated":"2011-11-09 00:13:03"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.location.href.match("recherche")) {
		return "multiple";
	} else if (doc.evaluate('//div[@class="alignRight"]/a/img', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "artwork";
	}
	
},
};
transIds["22d17fb9-ae32-412e-bcc4-7650ed3359bc"] = "Musee du Louvre.js";


splittedTrans["Nagoya University OPAC.js"] = {
    "stamp": {"translatorID":"b56d756e-814e-4b46-bc58-d61dccc9f32f","label":"Nagoya University OPAC","creator":"Frank Bennett","target":"^https?://opac\\.nul\\.nagoya-u\\.ac\\.jp/webopac/(catdbl.do|ctlsrh\\.do)","minVersion":"2.0b7","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-07-13 07:33:49"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/.*\/webopac\/catdbl.do/)) {
		var journal_test = doc.evaluate( '//th[div[contains(text(),"Frequency of publication") or contains(text(),"刊行頻度") or contains(text(),"巻号") or contains(text(),"Volumes")]]',  doc, null, XPathResult.ANY_TYPE, null).iterateNext();
		if (!journal_test) {
			return "book";
		}
	} else if (url.match(/.*\/webopac\/ctlsrh.do/)){
		if (sniffIndexPage(doc)){
			return "multiple";
		}
	}
	return false;
},
};
transIds["b56d756e-814e-4b46-bc58-d61dccc9f32f"] = "Nagoya University OPAC.js";


splittedTrans["NASA ADS.js"] = {
    "stamp": {"translatorID":"7987b420-e8cb-4bea-8ef7-61c2377cd686","label":"NASA ADS","creator":"Asa Kusuma and Ramesh Srigiriraju","target":"^https?://(ukads|cdsads|ads|adsabs|esoads|adswww|www\\.ads)\\.(inasan|iucaa\\.ernet|nottingham\\.ac|harvard|eso|u-strasbg|nao\\.ac|astro\\.puc|bao\\.ac|on|kasi\\.re|grangenet|lipi\\.go|mao\\.kiev)\\.(edu|org|net|fr|jp|cl|id|uk|cn|ua|in|ru|br|kr)/(?:cgi-bin|abs)/","minVersion":"1.0.0b4.r1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-02-07 23:22:18"},
    "detectWeb": function detectWeb(doc, url) {
	var singXpath = '//input[@name="bibcode"][@type="hidden"]';
	var multXpath = '//input[@name="bibcode"][@type="checkbox"]';

	if (doc.evaluate(multXpath, doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	} else if (doc.evaluate(singXpath, doc, null, XPathResult.ANY_TYPE, null).iterateNext()){
		return "journalArticle";
	}
},
};
transIds["7987b420-e8cb-4bea-8ef7-61c2377cd686"] = "NASA ADS.js";


splittedTrans["NASA NTRS.js"] = {
    "stamp": {"translatorID":"5a697ab5-913a-478a-b4ec-98d019aa5dc6","label":"NASA NTRS","creator":"Andrew Bergan","target":"^https?://ntrs\\.nasa\\.gov/(search\\.jsp)?\\?","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-04-03 17:46:53"},
    "detectWeb": function detectWeb(doc, url) {
	// Make sure that we are on a record page or details page
	var contentLabel = ZU.xpathText(doc, '//p[@class="sectiontitle"]');

	if (!contentLabel) return;
	
	if (contentLabel.indexOf("Search Results") != -1) {
		return "multiple";
	}
	else if (contentLabel.indexOf("Record Details") != -1) {
		
		var docType = "";
		
		// Look in the document type field
		var docType = ZU.xpathText(doc, '//td[contains(text(), "Document Type:")]/following-sibling::td/text()')
		
		// remove leading and trailing whitespace
		//var docType = docType.replace(/^\s*|\s*$/g, '');
		
		// Check against implemented document types
		if (docType.indexOf("Conference Paper") != -1) {
			return "conferencePaper"
			
		} else if (docType.indexOf("Bibliographic Database") != -1 || 
		docType.indexOf("Congressional Report") != -1 ||
		docType.indexOf("Bibliography") != -1 ||
		docType.indexOf("Collected Works") != -1 ||
		docType.indexOf("Technical Report") != -1) {
			return "report"
			
		} else if (docType.indexOf("Journal Article") != -1 ||
		docType.indexOf("Journal Issue") != -1) {
			return "journalArticle";
			
		} else if (docType.indexOf("Presentation") != -1) {
			return "presentation";
		
		} else if (docType.indexOf("Thesis") != -1 || 
		docType.indexOf("PhD Dissertation") != -1) {
			return "thesis"
			
		} else if (docType.indexOf("Book Chapter") != -1) {
			return "bookSection"
			
		} else if (docType.indexOf("Book/Monograph") != -1 ||
		docType.indexOf("Conference Proceedings") != -1) {
			return "book"
			
		} else if (docType.indexOf("Patent") != -1) {
			return "patent"
			
		} else if (docType.indexOf("Brief Communication/Note") != -1 ||
		docType.indexOf("NASA Tech Brief") != -1) {
			return "note"
			
		} else if (docType.indexOf("Computer Program") != -1) {
			return "computerProgram"
			
		} else if (docType.indexOf("Motion Picture") != -1) {
			return "videoRecording"
			
		} else if (docType.indexOf("Preprint") != -1) {
			return "manuscript"
		
		} else if (docType.indexOf("Data Set") != -1 || 
		docType.indexOf("Dictionary") != -1 ||
		docType.indexOf("Extended Abstract") != -1 ||
		docType.indexOf("Full Text Database") != -1 ||
		docType.indexOf("Multimedia Database") != -1 ||
		docType.indexOf("Numeric Database") != -1 ||
		docType.indexOf("News Release/Speech") != -1 ||
		docType.indexOf("Other") != -1 ||
		docType.indexOf("Photograph") != -1) {
			return "document"
			
		} else {
			// No match
			return null;
		}
	}
},
};
transIds["5a697ab5-913a-478a-b4ec-98d019aa5dc6"] = "NASA NTRS.js";


splittedTrans["National Archive of the UK.js"] = {
    "stamp": {"translatorID":"229d4678-4fa0-44f8-95c4-f4cfdb9b254c","label":"National Archive of the UK","creator":"Sebastian Karcher","target":"^https?://discovery\\.nationalarchives\\.gov\\.uk/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcb","lastUpdated":"2014-09-11 06:28:15"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.search(/details\/r\//i) != -1) return "manuscript";
	else if (url.search(/results\/r\/?\?.+hb=tna/i) != -1) return "multiple";
},
};
transIds["229d4678-4fa0-44f8-95c4-f4cfdb9b254c"] = "National Archive of the UK.js";


splittedTrans["National Archives of Australia.js"] = {
    "stamp": {"translatorID":"50a4cf3f-92ef-4e9f-ab15-815229159b16","label":"National Archives of Australia","creator":"Tim Sherratt, Aurimas Vinckevicius","target":"^https?://recordsearch\\.naa\\.gov\\.au/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-25 06:51:40"},
    "detectWeb": function detectWeb(doc, url) {
	//RecordSearch - items and series - or Photosearch results
	if (multiplesRE.test(url)) {
			return getSearchResults(doc, url, true) ? "multiple" : false;
	} else if (singleItemRE.test(url)) {
			return "manuscript";
	}
},
};
transIds["50a4cf3f-92ef-4e9f-ab15-815229159b16"] = "National Archives of Australia.js";


splittedTrans["National Archives of South Africa.js"] = {
    "stamp": {"translatorID":"5b02e8d4-d8fb-4143-af3d-3576d4c1b49c","label":"National Archives of South Africa","creator":"Adam Crymble","target":"^https?://www\\.national\\.archsrch\\.gov\\.za","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2014-03-12 22:00:51"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.title.match("Results Summary")) {
		return "multiple";
	} else if (doc.title.match("Results Detail")) {
		return "book";
	}
},
};
transIds["5b02e8d4-d8fb-4143-af3d-3576d4c1b49c"] = "National Archives of South Africa.js";


splittedTrans["National Archives of the United States.js"] = {
    "stamp": {"translatorID":"edfa5803-e331-47db-84d1-db3cf8d6f460","label":"National Archives of the United States","creator":"Adam Powers","target":"^https?://research\\.archives\\.gov","minVersion":"2.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-01-05 11:42:13"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["edfa5803-e331-47db-84d1-db3cf8d6f460"] = "National Archives of the United States.js";


splittedTrans["National Bureau of Economic Research.js"] = {
    "stamp": {"translatorID":"99f958ab-0732-483d-833f-6bd8e42f6277","label":"National Bureau of Economic Research","creator":"Michael Berkowitz","target":"^https?://(?:papers\\.|www\\.)?nber\\.org/(papers|s|new|custom)","minVersion":"1.0.0b4.r1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-02-05 08:04:04"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.evaluate('//a[contains(text(), "RIS")]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "report";
	} else if (doc.evaluate('//tbody/tr/td[1]//a[contains(@href, "papers/w")]|//li/a[contains(@href, "papers/w")]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	}
},
};
transIds["99f958ab-0732-483d-833f-6bd8e42f6277"] = "National Bureau of Economic Research.js";


splittedTrans["National Gallery of Art - U.S.A..js"] = {
    "stamp": {"translatorID":"ed28758b-9c39-4e1c-af89-ce1c9202b70f","label":"National Gallery of Art - U.S.A.","creator":"Adam Crymble","target":"^https?://www\\.nga\\.gov/content\\/ngaweb","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-06-08 13:57:52"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("art-object-page")!=-1) {
		return "artwork";
	}
	
	if (url.indexOf("artist-info")!=-1 || url.indexOf("search-result.html")!=-1) {
		return "multiple";
	} 	
},
};
transIds["ed28758b-9c39-4e1c-af89-ce1c9202b70f"] = "National Gallery of Art - U.S.A..js";


splittedTrans["National Library of Australia - Australian Newspapers.js"] = {
    "stamp": {"translatorID":"fcfcfe9c-f6dd-48c6-aef9-61adbba31a4e","label":"National Library of Australia - Australian Newspapers","creator":"Tim Sherratt","target":"^https?://trove\\.nla\\.gov\\.au/(?:newspaper|ndp)/","minVersion":"2.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2015-02-28 22:38:27"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/\/newspaper\/result/i) || url.match(/\/ndp\/del\/page/)) {
		return "multiple";
	} else if (url.match(/\/ndp\/del\/article\//i)) {
		return "newspaperArticle";
	}
},
};
transIds["fcfcfe9c-f6dd-48c6-aef9-61adbba31a4e"] = "National Library of Australia - Australian Newspapers.js";


splittedTrans["National Library of Australia.js"] = {
    "stamp": {"translatorID":"fc410e64-0252-4cd3-acb1-25e584775fa2","label":"National Library of Australia","creator":"Michael Berkowitz","target":"^https?://librariesaustralia\\.nla\\.gov\\.au/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"g","lastUpdated":"2015-06-02 20:55:32"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match("action=Search")) {
		return "multiple";
	} else if (url.match("action=Display")) {
		return "book";
	}
},
};
transIds["fc410e64-0252-4cd3-acb1-25e584775fa2"] = "National Library of Australia.js";


splittedTrans["National Library of Belarus.js"] = {
    "stamp": {"translatorID":"89592f50-6ae8-491e-8988-969002012b1b","label":"National Library of Belarus","creator":"Philipp Zumstein","target":"https?://www\\.nlb\\.by/portal/page/portal/index/resources/(basicsearch|expandedsearch|anothersearch|authoritet|newdoc|top100)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-09-25 20:54:14"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf('strutsAction=biblinfoaction.do') != -1 && getMarcNode(doc).length>0 ) {//single item
		return "book";
	} else if (getSearchResults(doc, true)) {
		return "multiple";
	}
},
};
transIds["89592f50-6ae8-491e-8988-969002012b1b"] = "National Library of Belarus.js";


splittedTrans["National Post.js"] = {
    "stamp": {"translatorID":"1c5b122c-7e58-4cd5-932b-93f5ca0b7e1a","translatorType":4,"label":"National Post","creator":"Adam Crymble","target":"http://www.(national|financial)post.com/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"lastUpdated":"2008-08-11 20:40:00"},
    "detectWeb": function detectWeb(doc, url) {
	
	if (doc.title.match("Search Results")) {
		return "multiple";
	} else if (doc.location.href.match("story")) {
		return "newspaperArticle";
	} else if (doc.location.href.match("blog")) {
		return "blogPost";
	}
	
},
};
transIds["1c5b122c-7e58-4cd5-932b-93f5ca0b7e1a"] = "National Post.js";


splittedTrans["Nature Publishing Group.js"] = {
    "stamp": {"translatorID":"6614a99-479a-4524-8e30-686e4d66663e","label":"Nature Publishing Group","creator":"Aurimas Vinckevicius","target":"^https?://(?:[^/]+\\.)?(?:nature\\.com|palgrave-journals\\.com)(?::[\\d]+)?(?=/)[^?]*(?:/(?:journal|archive|research|topten|search|full|abs)/|/current_issue\\.htm|/most\\.htm)","minVersion":"3.0","maxVersion":"","priority":200,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-01-11 14:00:00"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.search(/\/(full|abs)\/[^\/]+($|\?|#)|\/fp\/.+?[?&]lang=ja(?:&|$)/) != -1) {

		return 'journalArticle';

	} else if (doc.title.toLowerCase().indexOf('table of contents') != -1 //single issue ToC. e.g. http://www.nature.com/emboj/journal/v30/n1/index.html or http://www.nature.com/nature/journal/v481/n7381/index.html
		|| doc.title.toLowerCase().indexOf('current issue') != -1
		|| url.indexOf('/research/') != -1 || url.indexOf('/topten/') != -1
		|| url.indexOf('/most.htm') != -1
		|| (url.indexOf('/vaop/') != -1 && url.indexOf('index.html') != -1) //advanced online publication
		|| url.indexOf('sp-q=') != -1 //search query
		|| url.search(/journal\/v\d+\/n\d+\/index\.html/i) != -1) { //more ToC
		return getMultipleNodes(doc, url)[0].length ? 'multiple' : null;

	} else if (url.indexOf('/archive/') != -1) {
		if (url.indexOf('index.htm') != -1) return false; //list of issues
		if (url.indexOf('subject.htm') != -1) return false; //list of subjects
		if (url.indexOf('category.htm') != -1 && url.indexOf('code=') == -1) return false; //list of categories
		return getMultipleNodes(doc, url)[0].length ? 'multiple' : null; //all else should be ok
	}
},
};
transIds["6614a99-479a-4524-8e30-686e4d66663e"] = "Nature Publishing Group.js";


splittedTrans["NCBI Nucleotide.js"] = {
    "stamp": {"translatorID":"5e385e77-2f51-41b4-a29b-908e23d5d3e8","label":"NCBI Nucleotide","creator":"Martin Fenner","target":"^https?://(www\\.)?ncbi\\.nlm\\.nih\\.gov/nuccore/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcs","lastUpdated":"2014-11-15 11:25:19"},
    "detectWeb": function detectWeb(doc, url) {
	// use item type journalArticle until item type dataset is supported in Zotero
	if (getIds(doc)) return "journalArticle";

	// search results
	if (url.indexOf("/?term=") != -1 && getSearchResults(doc, true)) return "multiple";
},
};
transIds["5e385e77-2f51-41b4-a29b-908e23d5d3e8"] = "NCBI Nucleotide.js";


splittedTrans["Neural Information Processing Systems.js"] = {
    "stamp": {"translatorID":"c816f8ad-4c73-4f6d-914e-a6e7212746cf","label":"Neural Information Processing Systems","creator":"Fei Qi, Sebastian Karcher","target":"^https?://(?:books|papers)\\.nips\\.cc/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-03-11 19:45:28"},
    "detectWeb": function detectWeb(doc, url) {
	var contRe = /\/book\//;
	var m = contRe.exec( url );
	if (m && ZU.xpathText(doc, '//ul/li/a[contains(@href, "paper")]')) return "multiple";
	else if (url.indexOf("/paper/") && ZU.xpathText(doc, '//meta[@name="citation_title"]/@content')) return "bookSection";
	return false;
},
};
transIds["c816f8ad-4c73-4f6d-914e-a6e7212746cf"] = "Neural Information Processing Systems.js";


splittedTrans["New Zealand Herald.js"] = {
    "stamp": {"translatorID":"c7830593-807e-48cb-99f2-c3bed2b148c2","label":"New Zealand Herald","creator":"Sopheak Hean, Michael Berkowitz","target":"^https?://www\\.nzherald\\.co\\.nz","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-03 17:49:28"},
    "detectWeb": function detectWeb(doc, url) {
/* If the address bar has /news in it then its a newspaper article*/

	if (doc.location.href.indexOf("/search/results.cfm") !=-1){
		return "multiple";
	} else if (doc.location.href.indexOf("/news/article.cfm") !=-1){
		return "newspaperArticle";
	}
},
};
transIds["c7830593-807e-48cb-99f2-c3bed2b148c2"] = "New Zealand Herald.js";


splittedTrans["Newsnet.js"] = {
    "stamp": {"translatorID":"caecaea0-5d06-11df-a08a-0800200c9a66","label":"Newsnet/Tamedia","creator":"ibex","target":"^https?://((www\\.)?(tagesanzeiger|(bo\\.)?bernerzeitung|bazonline|derbund|thurgauerzeitung|24heures)\\.ch/.)","minVersion":"2.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-03 17:48:45"},
    "detectWeb": function detectWeb(doc, url) {
	//Zotero.debug("ibex detectWeb URL= "+ url);
	if (doc.location.href.indexOf("suche.html?") != -1 && doc.getElementById("panelArticleItems")) {
		return "multiple";
	} else if (doc.location.href.indexOf("/story/") != -1
			&& getXPath('//div[@id = "singlePage"]/div[@id = "singleLeft"]/h2', doc)) {
		return "newspaperArticle";
	}
},
};
transIds["caecaea0-5d06-11df-a08a-0800200c9a66"] = "Newsnet.js";


splittedTrans["NRC Research Press.js"] = {
    "stamp": {"translatorID":"fc08c878-ac92-40dc-9105-ca36ca20665d","label":"NRC Research Press","creator":"Sebastian Karcher","target":"^https?://www\\.nrcresearchpress\\.com","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcbv","lastUpdated":"2014-06-01 23:00:28"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/\/doi\/abs\/10\.|\/doi\/full\/10\./)) return "journalArticle";
	else if (url.match(/\/action\/doSearch|\/toc\//) && getSearchResults(doc).length) return "multiple";
},
};
transIds["fc08c878-ac92-40dc-9105-ca36ca20665d"] = "NRC Research Press.js";


splittedTrans["Nuclear Receptor Signaling.js"] = {
    "stamp": {"translatorID":"ba10b5bc-562f-11e1-b20d-a3084924019b","label":"Nuclear Receptor Signaling","creator":"Aurimas Vinckevicius","target":"^https?://[^/]*nursa.org/(article|nrs|abstract)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-03-03 22:02:54"},
    "detectWeb": function detectWeb(doc, url) {
	if( url.match('nrs.cfm') &&
		url.match(/detail=(perspectives|reviews|most%20viewed|methods)(&|$)/i) ) {
		return 'multiple';
	} else if( !doc.title.match(/^Error/i) &&
		   doc.title.trim().toLowerCase() != 'nursa |' ) {
		return 'journalArticle';
	}
},
};
transIds["ba10b5bc-562f-11e1-b20d-a3084924019b"] = "Nuclear Receptor Signaling.js";


splittedTrans["NYTimes.com.js"] = {
    "stamp": {"translatorID":"ce7a3727-d184-407f-ac12-52837f3361ff","label":"NYTimes.com","creator":"Simon Kornblith","target":"^https?://(query\\.nytimes\\.com/(search|gst)/(alternate/)?|(select\\.|www\\.|\\.blogs\\.)?nytimes\\.com/)","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsv","lastUpdated":"2015-06-02 20:52:10"},
    "detectWeb": function detectWeb(doc, url) {
	// Check for search results
	var searchResults = doc.evaluate('//div[@id="search_results"] |//div[@id="searchResults"] |//div[@id="srchContent"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext();
	if (searchResults) return "multiple";

	// Check for article meta tags
	var metaTags = doc.getElementsByTagName("meta");
	var haveHdl = false;
	var haveByl = false;
	var blogPost = false;
	for (var i in metaTags) {
		if (metaTags[i].name === "hdl") {
			haveHdl = true;
		} else if (metaTags[i].name == "byl") {
			haveByl = true;
		}
		else if (metaTags[i].name == "PST") {
			blogPost = true;
		}
		if (haveHdl && haveByl) return "newspaperArticle";
		else if (haveByl && blogPost) return "blogPost"
	}
	return false;
},
};
transIds["ce7a3727-d184-407f-ac12-52837f3361ff"] = "NYTimes.com.js";


splittedTrans["NZZ.ch.js"] = {
    "stamp": {"translatorID":"61ffe600-55e0-11df-bed9-0002a5d5c51b","label":"NZZ","creator":"ibex, Sebastian Karcher","target":"^https?://(www\\.)?nzz\\.ch/.","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-06-01 23:06:06"},
    "detectWeb": function detectWeb(doc, url) {
	//Zotero.debug("ibex detectWeb URL= " + url);
	if (url.match(/search\?form/)) {
		return "multiple";
	} else if (getXPath('//article[@class = "article-full"]', doc)) {
		return "newspaperArticle";
	}
},
};
transIds["61ffe600-55e0-11df-bed9-0002a5d5c51b"] = "NZZ.ch.js";


splittedTrans["OCLC WorldCat FirstSearch.js"] = {
    "stamp": {"translatorID":"838d8849-4ffb-9f44-3d0d-aa8a0a079afe","label":"OCLC WorldCat FirstSearch","creator":"Simon Kornblith","target":"https?://[^/]*firstsearch\\.oclc\\.org[^/]*/WebZ/","minVersion":"1.0.0b3.r1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"g","lastUpdated":"2013-02-25 18:54:22"},
    "detectWeb": function detectWeb(doc, url) {
	var detailRe = /FirstSearch: [\w ]+ Detailed Record/;
	var searchRe = /FirstSearch: [\w ]+ List of Records/;

	if(detailRe.test(doc.title)) {
		return "book";
	} else if(searchRe.test(doc.title)) {
		return "multiple";
	}
},
};
transIds["838d8849-4ffb-9f44-3d0d-aa8a0a079afe"] = "OCLC WorldCat FirstSearch.js";


splittedTrans["OECD.js"] = {
    "stamp": {"translatorID":"8cf74360-e772-4818-8cf1-eda0481c7dfb","label":"OECD","creator":"Sebastian Karcher","target":"^https?://(www\\.)?oecd-ilibrary\\.org","minVersion":"2.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcs","lastUpdated":"2014-01-05 11:58:51"},
    "detectWeb": function detectWeb(doc, url) {
	var menuitem = ZU.xpathText(doc, '//li[@class="menuitem"]/a[@class="on"]');
	if (ZU.xpathText(doc, '//ul[@class="sidebar-list"]//a[contains(@title, "Cite this")]')){		
		if (ZU.xpathText(doc, '//li[@class="editorial-board"]')){
			return "journalArticle";
		}
		else if (menuitem && menuitem.indexOf("BOOK")!=-1) {
			return "book";
		}
		else return "report"
	}
	if (ZU.xpath(doc, '//table[contains (@class, "search-results")]').length>0){
		return "multiple";
	}
},
};
transIds["8cf74360-e772-4818-8cf1-eda0481c7dfb"] = "OECD.js";


splittedTrans["OhioLINK.js"] = {
    "stamp": {"translatorID":"17c974e6-7c4f-4ac8-93af-8d74debca110","label":"OhioLINK","creator":"Aurimas Vinckevicius","target":"https?://journals\\.ohiolink\\.edu/ejc/article\\.cgi\\?","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcs","lastUpdated":"2014-09-22 19:04:42"},
    "detectWeb": function detectWeb(doc, url) {
	if (getRISLink(doc)) return "journalArticle";
},
};
transIds["17c974e6-7c4f-4ac8-93af-8d74debca110"] = "OhioLINK.js";


splittedTrans["Old Bailey Online.js"] = {
    "stamp": {"translatorID":"b10bf941-12e9-4188-be04-f6357fa594a0","label":"Old Bailey Online","creator":"Adam Crymble","target":"^https?://www\\.oldbaileyonline\\.org/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-03 17:51:06"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.location.href.match("search")) {
		return "multiple";
	} else if (doc.location.href.match("browse")) {
		return "case";
	}
},
};
transIds["b10bf941-12e9-4188-be04-f6357fa594a0"] = "Old Bailey Online.js";


splittedTrans["Open Journal Systems.js"] = {
    "stamp": {"translatorID":"99b62ba4-065c-4e83-a5c0-d8cc0c75d388","label":"Open Journal Systems","creator":"Aurimas Vinckevicius","target":"/article/view/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-02-23 00:53:05"},
    "detectWeb": function detectWeb(doc, url) {
	if(ZU.xpathText(doc, '//a[@id="developedBy"]/@href') == 'http://pkp.sfu.ca/ojs/') {	//some sites remove this
		return 'journalArticle';
	}
},
};
transIds["99b62ba4-065c-4e83-a5c0-d8cc0c75d388"] = "Open Journal Systems.js";


splittedTrans["Open WorldCat.js"] = {
    "stamp": {"translatorID":"c73a4a8c-3ef1-4ec8-8229-7531ee384cc4","label":"Open WorldCat","creator":"Simon Kornblith, Sebastian Karcher","target":"^https?://[^/]+\\.worldcat\\.org/","minVersion":"3.0.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":12,"browserSupport":"gcsbv","lastUpdated":"2015-06-07 17:46:05"},
    "detectWeb": function detectWeb(doc, url) {
	//distinguish from Worldcat Discovery
	if (doc.body.id == "worldcat"){
	    var results = getSearchResults(doc);

	    //single result
	    if(results.length) {
		return "multiple";
	    }

	    var co = getFirstContextObj(doc);
	    if(!co) return false;

	    // generate item and return type
	    return generateItem(doc, co).itemType;
	}
},
};
transIds["c73a4a8c-3ef1-4ec8-8229-7531ee384cc4"] = "Open WorldCat.js";


splittedTrans["OpenEdition Books.js"] = {
    "stamp": {"translatorID":"4c6b4c5f-7286-45bb-8e99-0c518d177fa7","label":"OpenEdition Books","creator":"Cédric Chatelain","target":"^http://books\\.openedition\\.org/","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsi","lastUpdated":"2014-05-14 23:17:46"},
    "detectWeb": function detectWeb(doc, url){
	//testing if a link to a rdf file exist
	if(doc.getElementById('zotero_rdf')){
		//testing to know if we have a book or a chapter
		var met = doc.getElementsByName('DC.type')[0];
		var cont = met.content
		Zotero.debug(cont);
		if(cont == 'Book' || cont == 'book'){
			return 'book';
		}else{
			return 'bookSection';
		}
	}else{
		return false;
	}
},
};
transIds["4c6b4c5f-7286-45bb-8e99-0c518d177fa7"] = "OpenEdition Books.js";


splittedTrans["OpenJudis - Indian Supreme Court cases.js"] = {
    "stamp": {"translatorID":"fe39e97d-7397-4f3f-a5f3-396a1a79213c","label":"OpenJudis - Indian Supreme Court cases","creator":"Prashant Iyengar and Michael Berkowitz","target":"^https?://(www\\.)?openarchive\\.in/(judis|newcases)","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2015-06-02 21:03:02"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.evaluate('//div[@id="footer"]/dl/dt/a', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	} else if (url.match(/\d+\.htm/)) {
		return "case";
	}
},
};
transIds["fe39e97d-7397-4f3f-a5f3-396a1a79213c"] = "OpenJudis - Indian Supreme Court cases.js";


splittedTrans["Optical Society of America.js"] = {
    "stamp": {"translatorID":"a1a97ad4-493a-45f2-bd46-016069de4162","label":"Optical Society of America","creator":"Michael Berkowitz, Eli Osherovich, and Sebastian Karcher","target":"^https?://[^.]+\\.(opticsinfobase|osa)\\.org","minVersion":"1.0.0b4.r1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gbv","lastUpdated":"2013-12-13 13:27:23"},
    "detectWeb": function detectWeb(doc, url) {
	// Prevent inner frames from getting detected
	try {
		if(doc.defaultView !== doc.defaultView.top) return;
	} catch(e) {
		return;
	};
	
	if (url.indexOf("search2.cfm") != -1) {
		return "multiple";
	} else if (url.indexOf("abstract.cfm") != -1) {
		return getArticleType(doc, url, null);
	}
},
};
transIds["a1a97ad4-493a-45f2-bd46-016069de4162"] = "Optical Society of America.js";


splittedTrans["OSTI Energy Citations.js"] = {
    "stamp": {"translatorID":"0cdc6a07-38cf-4ec1-b9d5-7a3c0cc89b15","label":"OSTI Energy Citations","creator":"Michael Berkowitz","target":"^https?://www\\.osti\\.gov/(energycitations|scitech)","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-03-31 22:43:59"},
    "detectWeb": function detectWeb(doc,url) {
	var xpathreport='//meta[@name="citation_technical_report_number"]';
	var xpath='//meta[@name="citation_journal_title"]'; 
	if (ZU.xpath(doc, xpath).length > 0) {
		return "journalArticle";
	}
	if (ZU.xpath(doc, xpathreport).length > 0) {
		return "report";
	}
			
	if (url.indexOf("search.jsp")!=-1){
		return "multiple";
	}

	return false;
},
};
transIds["0cdc6a07-38cf-4ec1-b9d5-7a3c0cc89b15"] = "OSTI Energy Citations.js";


splittedTrans["OVID Tagged.js"] = {
    "stamp": {"translatorID":"59e7e93e-4ef0-4777-8388-d6eddb3261bf","label":"OVID Tagged","creator":"Sebastian Karcher","target":"txt","minVersion":"4.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":1,"browserSupport":"gcs","lastUpdated":"2014-12-17 22:33:06"},
"detectImport": function detectImport() {
	var line;
	var i = 0;
	while ((line = Zotero.read()) !== false) {
		line = line.replace(/^\s+/, "");
		if (line != "") {
			//All Ovid databases have this at the top:
			if (line.match(/^VN\s{1,2}- Ovid Technologies/)) {
				return true;
			} else {
				if (i++ > 3) {
					return false;
				}
			}
		}
	}
},};
transIds["59e7e93e-4ef0-4777-8388-d6eddb3261bf"] = "OVID Tagged.js";


splittedTrans["Ovid.js"] = {
    "stamp": {"translatorID":"cde4428-5434-437f-9cd9-2281d14dbf9","label":"Ovid","creator":"Simon Kornblith, Michael Berkowitz, and Ovid Technologies","target":"(gw2|asinghal|sp)[^\\/]+/ovidweb\\.cgi","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcs","lastUpdated":"2014-11-27 11:19:01"},
    "detectWeb": function detectWeb(doc, url) {
	if (getSearchResults(doc, true) && getMetadataPost(doc, url, [0])) {
		return 'multiple';
	}
	
	var id = getIDFromPage(doc) || getIDFromUrl(url);
	Zotero.debug("Found ID: " + id);
	if (id && getMetadataPost(doc, url, [id])) {
		return 'journalArticle';
	}
	
	return false;
},
};
transIds["cde4428-5434-437f-9cd9-2281d14dbf9"] = "Ovid.js";


splittedTrans["Oxford English Dictionary.js"] = {
    "stamp": {"translatorID":"d3ee2368-04d7-4b4d-a8f3-c20c3f5234a9","label":"Oxford English Dictionary","creator":"Sebastian Karcher","target":"^https?://www\\.oed\\.com","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-06-20 15:30:21"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["d3ee2368-04d7-4b4d-a8f3-c20c3f5234a9"] = "Oxford English Dictionary.js";


splittedTrans["Oxford Music and Art Online.js"] = {
    "stamp": {"translatorID":"f203db7f-7b7b-4dc4-b018-115b7885fe3b","label":"Oxford Music and Art Online","creator":"Michael Berkowitz","target":"^https?://([^/]+\\.)?www\\.oxford(music|art)online\\.com/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-02 21:05:15"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/search_results/)) {
		return "multiple";
	} else if (url.match(/\/article\//)) {
		return "journalArticle";
	}
},
};
transIds["f203db7f-7b7b-4dc4-b018-115b7885fe3b"] = "Oxford Music and Art Online.js";


splittedTrans["Oxford University Press.js"] = {
    "stamp": {"translatorID":"e9989043-fcdf-4f33-93b6-0381828aeb41","label":"Oxford University Press","creator":"Jingjing Yin and Qiang Fang","target":"^https?://ukcatalogue\\.oup\\.com/product/\\d+\\.do","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2014-07-26 02:11:51"},
    "detectWeb": function detectWeb(doc, url) {
	return 'book';
},
};
transIds["e9989043-fcdf-4f33-93b6-0381828aeb41"] = "Oxford University Press.js";


splittedTrans["OZON.ru.js"] = {
    "stamp": {"translatorID":"73be930f-5773-41b2-a7a1-37c0eeade92f","label":"OZON.ru","creator":"Victor Rybynok","target":"^https?://www\\.ozon\\.ru","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-03 18:47:00"},
    "detectWeb": function detectWeb(doc, url) {
	var itemTypeXPath = '//ul[@class="navLine"]/li[1]/a';
	var itemTypeDOMNode =
	doc.evaluate(itemTypeXPath, doc, null,
	XPathResult.ANY_TYPE, null).iterateNext();
	var itemType;
	if (itemTypeDOMNode) itemType = itemTypeDOMNode.textContent;
	else return "";
	if (itemType == "Книги") {
		var nameXPath = '//div[@class="techDescription"]/div/div[2]/span';
		var valueXPath = '//div[@class="techDescription"]/div/div[3]/span';
		var nameXPathRes = doc.evaluate(
		nameXPath, doc, null, XPathResult.ANY_TYPE, null);
		var valueXPathRes = doc.evaluate(
		valueXPath, doc, null, XPathResult.ANY_TYPE, null);
		if (!IsAudioBook(nameXPathRes, valueXPathRes)) return "book";
	} else {
		itemTypeXPath = '//ul[@class="navLine"]/li[2]/a';
		itemTypeDOMNode =
		doc.evaluate(itemTypeXPath, doc, null,
		XPathResult.ANY_TYPE, null).iterateNext();
		if (itemTypeDOMNode) itemType = itemTypeDOMNode.textContent;
		else return "";
		if (itemType == "Цифровые книги") return "book";
	}
},
};
transIds["73be930f-5773-41b2-a7a1-37c0eeade92f"] = "OZON.ru.js";


splittedTrans["Papers Past.js"] = {
    "stamp": {"translatorID":"1b052690-16dd-431d-9828-9dc675eb55f6","label":"Papers Past","creator":"staplegun","target":"^https?://(www\\.)?paperspast\\.natlib\\.govt\\.nz","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2012-08-18 14:13:34"},
    "detectWeb": function detectWeb(doc, url) {

  // a results parameter in URL means search hitlist
  if (url.match(/results=/) ) {
	return "multiple";
  } else {
	// init variables
	var myXPath;
	var myXPathObject;

	// publication title in meta tags means have an article
	myXPath          = '//meta[@name="newsarticle_publication"]/@content';
	myXPathObject    = doc.evaluate(myXPath, doc, null, XPathResult.ANY_TYPE, null);
	var meta = myXPathObject.iterateNext().textContent;
	if (meta.length > 0) {
	  return "newspaperArticle";
	}
  }
},
};
transIds["1b052690-16dd-431d-9828-9dc675eb55f6"] = "Papers Past.js";


splittedTrans["Paris Review.js"] = {
    "stamp": {"translatorID":"b24ee183-58a6-443d-b8f9-c5cd5a3a0f73","label":"Paris Review","creator":"Avram Lyon","target":"^https?://www\\.theparisreview\\.org/","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-03 18:50:53"},
    "detectWeb": function detectWeb(doc, url){
	if (url.match(/\/(interviews|poetry|fiction|letters-essays)\/\d+\//)) {
		return "magazineArticle";
	} else if (url.match(/\/blog\/\d+\//)) {
		return "blogPost";
	} else if (url.match(/\/(blog|interviews|current-issue|letters-essays|poetry|fiction)($|\/)/)|| url.match(/\/search\?/) ){
		return "multiple";
	} else return false;
},
};
transIds["b24ee183-58a6-443d-b8f9-c5cd5a3a0f73"] = "Paris Review.js";


splittedTrans["Patents - USPTO.js"] = {
    "stamp": {"translatorID":"232e24fe-2f68-44fc-9366-ecd45720ee9e","label":"Patents - USPTO","creator":"Bill McKinney","target":"^https?://(patft|appft1)\\.uspto\\.gov/netacgi/nph-Parser.+","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-04-04 10:11:27"},
    "detectWeb": function detectWeb(doc, url) {
	var re = new RegExp("^https?://(patft|appft1)\.uspto\.gov/netacgi/nph-Parser");
	if (doc.title.match(/Search Results:/)){
		return "multiple"
	}
	else if(re.test(doc.location.href)) {
		return "patent";
	} else {
		return "multiple";
	}
},
};
transIds["232e24fe-2f68-44fc-9366-ecd45720ee9e"] = "Patents - USPTO.js";


splittedTrans["PEI Archival Information Network.js"] = {
    "stamp": {"translatorID":"6871e8c5-f935-4ba1-8305-0ba563ce3941","label":"PEI Archival Information Network","creator":"Adam Crymble, Sebastian Karcher","target":"^https?://www\\.archives\\.pe\\.ca","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-07-02 23:13:31"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/dosearch\.php/)) {
		return "multiple";
	} else if (url.match(/fondsdetail\.php/)){
		return "book";
	} 
},
};
transIds["6871e8c5-f935-4ba1-8305-0ba563ce3941"] = "PEI Archival Information Network.js";


splittedTrans["PEP Web.js"] = {
    "stamp": {"translatorID":"32ad4782-b106-4ccb-8ae1-ff102ba93eef","label":"PEP Web","creator":"Akilesh Ayyar","target":"^https?://www\\.pep-web\\.org","minVersion":"1.0.0b3.r1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-03-20 06:07:35"},
    "detectWeb": function detectWeb(doc, url) {

	if (url.indexOf("/document.php")!=-1)
		return "journalArticle";
},
};
transIds["32ad4782-b106-4ccb-8ae1-ff102ba93eef"] = "PEP Web.js";


splittedTrans["Philosopher's Imprint.js"] = {
    "stamp": {"translatorID":"b0abb562-218c-4bf6-af66-c320fdb8ddd3","label":"Philosopher's Imprint","creator":"Michael Berkowitz","target":"^https?://quod\\.lib\\.umich\\.edu/p/phimp","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-02 21:09:41"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.evaluate('//div/span[text() = "Search Results"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	} else if (url.match(/\d+\.\d+\.\d+/)) {
		return "journalArticle";
	}
},
};
transIds["b0abb562-218c-4bf6-af66-c320fdb8ddd3"] = "Philosopher's Imprint.js";


splittedTrans["PhilPapers.js"] = {
    "stamp": {"translatorID":"8df4f61b-0881-4c85-9186-05f457edb4d3","label":"PhilPapers","creator":"Sebastian Karcher","target":"^https?://philpapers\\.org","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-09-24 13:06:01"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/\/s|pub\//)) return "multiple";
	if (url.match(/\/browse\//) && ZU.xpathText(doc, '//ol[@class="entryList"]/li/@id')!= null) return "multiple";
	if (url.match(/\/rec\//)) return "journalArticle";
},
};
transIds["8df4f61b-0881-4c85-9186-05f457edb4d3"] = "PhilPapers.js";


splittedTrans["Pion Journals.js"] = {
    "stamp": {"translatorID":"291934d5-36ec-4b81-ac9c-c5ad5313dba4","label":"Pion Journals","creator":"Michael Berkowitz","target":"^https?://(www\\.)?(hthpweb|envplan|perceptionweb)\\.com/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-02 21:11:22"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/search\.cgi/) || url.match(/ranking/) || url.match(/volume=/)) {
		return "multiple";
	} else if (url.match(/abstract\.cgi/)) {
		return "journalArticle";
	}
},
};
transIds["291934d5-36ec-4b81-ac9c-c5ad5313dba4"] = "Pion Journals.js";


splittedTrans["Pleade.js"] = {
    "stamp": {"translatorID":"ce68b0ed-3137-4e38-b691-f3bc49bc1497","label":"Pleade","creator":"DIA Modou","target":"(?:list-results|results|ead)\\.html\\?.*(?:base=ead|mode=|id=)","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2015-01-30 15:32:05"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match("id=") && url.match("ead.html")) {
		return "book";
	}
	else if (url.match("base=ead") && url.match("results.html")) {
		return "multiple";
	}
/** //The original method this used to work with - by getting a qId from the search page - doesn't work anymore. 
 //It's probably possible to fix this otherwise, but I'm not sure if that'd work across pleade implementations
	else if (url.match("list-results.html") && url.match("mode=")) {
		return "multiple";	
	} */
},
};
transIds["ce68b0ed-3137-4e38-b691-f3bc49bc1497"] = "Pleade.js";


splittedTrans["PLoS Journals.js"] = {
    "stamp": {"translatorID":"9575e804-219e-4cd6-813d-9b690cbfc0fc","label":"PLoS Journals","creator":"Michael Berkowitz And Rintze Zelle","target":"^https?://(www\\.plos(one|ntds|compbiol|pathogens|genetics|medicine|biology)\\.org|journals\\.plos\\.org)/(search/|\\w+/article)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-01-15 03:50:06"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("Search.action") != -1
		|| url.indexOf("browse.action") != -1
		|| url.indexOf("browseIssue.action") != -1
		|| url.indexOf("/search/") != -1) {
		return getSearchResults(doc, url, true) ? "multiple" : false;
	}
	
	var host = getHost(doc);
	if (url.indexOf("/article?") != -1 && getID(url) && host) {
		// For individual articles we have to fetch data from different host,
		// so we have to defer to server translation
		return Zotero.isBookmarklet && url.indexOf(host) == -1 ? "server" : "journalArticle";
	}
},
};
transIds["9575e804-219e-4cd6-813d-9b690cbfc0fc"] = "PLoS Journals.js";


splittedTrans["Potsdamer Neueste Nachrichten.js"] = {
    "stamp": {"translatorID":"9405db4b-be7f-42ab-86ca-430226be9b35","label":"Potsdamer Neueste Nachrichten","creator":"Martin Meyerhoff","target":"^https?://www\\.pnn\\.de","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-06 16:15:15"},
    "detectWeb": function detectWeb(doc, url) {	
	var PNN_Article_XPath = ".//div[contains (@class, 'um-article')]/h1"; //only articles have a print button.
	var PNN_Multiple_XPath = "//div[contains(@class, 'um-teaser')]/h2/a"
	
	if (doc.evaluate(PNN_Article_XPath, doc, null, XPathResult.ANY_TYPE, null).iterateNext()  ){ 
		Zotero.debug("newspaperArticle");
		return "newspaperArticle";
	} else if (doc.evaluate(PNN_Multiple_XPath, doc, null, XPathResult.ANY_TYPE, null).iterateNext()  ){ 
		Zotero.debug("multiple");
		return "multiple";
	} 
},
};
transIds["9405db4b-be7f-42ab-86ca-430226be9b35"] = "Potsdamer Neueste Nachrichten.js";


splittedTrans["Primo.js"] = {
    "stamp": {"translatorID":"1300cd65-d23a-4bbf-93e5-a3c9e00d1066","label":"Primo","creator":"Matt Burton, Avram Lyon, Etienne Cavalié, Rintze Zelle, Philipp Zumstein, Sebastian Karcher, Aurimas Vinckevicius","target":"/primo_library/|/nebis/|^https?://www\\.recherche-portal\\.ch/zbz/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2015-04-02 18:40:40"},
    "detectWeb": function detectWeb(doc, url) {
	if(getSearchResults(doc).length) {
		return 'multiple';
	}
	
	var contentDiv = doc.getElementsByClassName('EXLFullResultsHeader');
	if(!contentDiv.length) contentDiv = doc.getElementsByClassName('EXLFullDisplay');
	if(!contentDiv.length) contentDiv = doc.getElementsByClassName('EXLFullView');
	if(contentDiv.length) return 'book';
},
};
transIds["1300cd65-d23a-4bbf-93e5-a3c9e00d1066"] = "Primo.js";


splittedTrans["Probing the Past.js"] = {
    "stamp": {"translatorID":"095239e7-c18c-4f45-a932-bcf4a9e48c08","label":"Probing the Past","creator":"Adam Crymble","target":"^https?://chnm\\.gmu\\.edu/probateinventory/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-01-30 22:43:59"},
    "detectWeb": function detectWeb(doc, url) {
	
	if (doc.evaluate('//td/a', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	} else if (doc.location.href.match("document")) {
		return "book";
	}
	
},
};
transIds["095239e7-c18c-4f45-a932-bcf4a9e48c08"] = "Probing the Past.js";


splittedTrans["Project Gutenberg.js"] = {
    "stamp": {"translatorID":"d770e7d2-106c-4396-8c32-b35cdc46376c","label":"Project Gutenberg","creator":"Adam Crymble, Avram Lyon","target":"^https?://www\\.gutenberg\\.org","minVersion":"2.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-03 18:55:01"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/ebooks\/search\/\?/)) {
		return "multiple";
	} else if (doc.location.href.match("etext") || doc.location.href.match("ebooks")){
		return "book";	
	}
},
};
transIds["d770e7d2-106c-4396-8c32-b35cdc46376c"] = "Project Gutenberg.js";


splittedTrans["Project MUSE.js"] = {
    "stamp": {"translatorID":"c54d1932-73ce-dfd4-a943-109380e06574","label":"Project MUSE","creator":"Simon Kornblith, Avram Lyon, Sean Takats","target":"^https?://[^/]*muse\\.jhu\\.edu[^/]*/(login\\?.+ur[il]=/)?(?:journals/[^/]+/(summary/)?[^/]+/[^/]+\\.html|search/results|results|books/\\d+)","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-04-12 16:54:33"},
    "detectWeb": function detectWeb(doc, url) {
	var searchRe = new RegExp("(^https?://[^/]+/search/results|/search/save|/toc/|/results(#.+)?$)");
	if(searchRe.test(url)) {
	//some old TOCs just display links to pdfs - don't detect those
	if(ZU.xpath(doc, '//div[@class="article"]/h4/a|//div[@class="result_info"]/h1/a|//ul/li/a[text() = "[Access article in HTML]"]').length != 0){
		return "multiple";}
	} else if (url.match(/\/books\//)){
		return "book";
	}
	else {
		return "journalArticle";
	}
},
};
transIds["c54d1932-73ce-dfd4-a943-109380e06574"] = "Project MUSE.js";


splittedTrans["ProMED.js"] = {
    "stamp": {"translatorID":"3e9dbe21-10f2-40be-a921-f6ec82760927","label":"ProMED","creator":"Brandon Minich","target":"^https?://www\\.promedmail\\.org","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-11-19 00:12:31"},
    "detectWeb": function detectWeb(doc, url)  {
	if (url.toLowerCase().indexOf("direct.php?id=") != -1)  {
		return "email";
	}
},
};
transIds["3e9dbe21-10f2-40be-a921-f6ec82760927"] = "ProMED.js";


splittedTrans["ProQuest Legacy.js"] = {
    "stamp": {"translatorID":"a77690cf-c5d1-8fc4-110f-d1fc765dcf88","label":"ProQuest Legacy","creator":"Simon Kornblith","target":"^https?://[^/]+/pqdweb\\?((.*\\&)?did=.*&Fmt=[0-9]|(.*\\&)Fmt=[0-9].*&did=|(.*\\&)searchInterface=|(.*\\&)TS=[0-9])","minVersion":"1.0.0b3.r1","maxVersion":"","priority":250,"inRepository":true,"translatorType":4,"browserSupport":"g","lastUpdated":"2015-06-02 21:47:36"},
    "detectWeb": function detectWeb(doc, url) {
	var namespace = doc.documentElement.namespaceURI;
	var nsResolver = namespace ? function(prefix) {
		if (prefix == 'x') return namespace; else return null;
	} : null;
	
	if(doc.evaluate('//img[substring(@src, string-length(@src)-32) = "/images/common/logo_proquest.gif" or substring(@src, string-length(@src)-38) = "/images/common/logo_proquest_small.gif"]',
	                doc, nsResolver, XPathResult.ANY_TYPE, null)) {    
		
		
		var xpath = '//table[@id="tableIndexTerms"]/tbody/tr/td[@class="textSmall"]';
		var data= doc.evaluate(xpath, doc, nsResolver, XPathResult.ANY_TYPE, null);
		var aitem;
		var source;
		while(aitem = data.iterateNext()) {
			source=aitem.textContent;
			if(source=="Source type:") {
				source=data.iterateNext().textContent;
				Zotero.debug("Item Source Type: "+source);
				break;
			}
		}
		
		if(doc.title.match("Results")) {
			return "multiple";
		} else if(doc.title.match("Document View")) {
			switch (source) {
				case 'Dissertation':
					return "thesis";
				
				case 'Historical Newspaper':
				case 'Newspaper':
					return "newspaperArticle";
				
				default:
					return "journalArticle";
			}
			
		}
	}
},
};
transIds["a77690cf-c5d1-8fc4-110f-d1fc765dcf88"] = "ProQuest Legacy.js";


splittedTrans["ProQuest PolicyFile.js"] = {
    "stamp": {"translatorID":"948df957-439a-4ac3-bc48-2c6edb069521","label":"ProQuest PolicyFile","creator":"Sebastian Karcher","target":"https?://www\\.policyfile\\.com","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gc","lastUpdated":"2013-12-12 03:22:14"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["948df957-439a-4ac3-bc48-2c6edb069521"] = "ProQuest PolicyFile.js";


splittedTrans["ProQuest.js"] = {
    "stamp": {"translatorID":"fce388a6-a847-4777-87fb-6595e710b7e7","label":"ProQuest","creator":"Avram Lyon","target":"^https?://search\\.proquest\\.com/(.*/)?(docview|pagepdf|results|publicationissue|browseterms|browsetitles|browseresults|myresearch\\/(figtables|documents))","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-11-18 10:31:47"},
    "detectWeb": function detectWeb(doc, url) {
	initLang(doc, url);

	followLink = false;

	//Check for multiple first
	if (url.indexOf('docview') == -1 &&
		url.indexOf('pagepdf') == -1) {
		if (getSearchResults(doc, true))
			return "multiple";
	}

	var types = getTextValue(doc, ["Source type", "Document type", "Record type"]);
	var zoteroType = getItemType(types);
	if(zoteroType) return zoteroType;

	//hack for NYTs, which misses crucial data.
	var db = getTextValue(doc, "Database")[0];
	if (db && db.indexOf("The New York Times") !== -1) {
		return "newspaperArticle";
	}

	// Fall back on journalArticle-- even if we couldn't guess the type
	if(types.length) return "journalArticle";

	if (url.indexOf("/results/") === -1) {
		//we might be on a page with a link to the abstract/metadata
		//e.g. pdf view
		var abstract_link = ZU.xpath(doc, '//a[@class="formats_base_sprite format_abstract"]');
		if (abstract_link.length == 1) {
			//let the tranlator know that, instead of scraping this page,
			//we need to follow the link
			followLink = true;
			return (url.indexOf('/dissertations/') != -1)? "thesis" : "journalArticle";
		}
	}

	return false;
},
};
transIds["fce388a6-a847-4777-87fb-6595e710b7e7"] = "ProQuest.js";


splittedTrans["Protein Data Bank.js"] = {
    "stamp": {"translatorID":"e16095ae-986c-4117-9cb6-20f3b7a52f64","label":"Protein Data Bank","creator":"Michael Berkowitz, Sebastian Karcher","target":"^https?://www\\.(pdb|rcsb)\\.org/pdb/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-11-24 00:25:43"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.title.indexOf("Query Results") != -1) {
		return "multiple";
	} else if (url.indexOf("structureId") != -1) {
		return "journalArticle";
	}
},
};
transIds["e16095ae-986c-4117-9cb6-20f3b7a52f64"] = "Protein Data Bank.js";


splittedTrans["Pubget.js"] = {
    "stamp": {"translatorID":"f520b141-9ce8-42f4-93ec-a39e375a9516","label":"Pubget","creator":"Sebastian Karcher","target":"https?://pubget\\.com/(search|journals|paper|mesh_browser)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2013-06-08 14:05:46"},
    "detectWeb": function detectWeb(doc,url) {
	var xpath='//meta[@name="citation_journal_title"]';
				
	if (url.match(/\/search\?.*\&q=|\/mesh_browser\/./)) {
		return "multiple";
	}
	
	else if (ZU.xpath(doc, xpath).length > 0) {
		return "journalArticle";
	}
	return false;
},
};
transIds["f520b141-9ce8-42f4-93ec-a39e375a9516"] = "Pubget.js";


splittedTrans["Publications du Quebec.js"] = {
    "stamp": {"translatorID":"22d0bede-8db5-4656-9b9a-7d682ec1335d","label":"Publications du Québec","creator":"Marc Lajoie","target":"^https?://(?:www2\\.)?publicationsduquebec\\.gouv\\.qc\\.ca\\/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2014-07-01 19:40:02"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf('/dynamicSearch/telecharge.php?') != -1) {
		return "statute";
	} else if (getMultiple(doc, true)) {
		return "multiple";
	}

},
};
transIds["22d0bede-8db5-4656-9b9a-7d682ec1335d"] = "Publications du Quebec.js";


splittedTrans["PubMed Central.js"] = {
    "stamp": {"translatorID":"27ee5b2c-2a5a-4afc-a0aa-d386642d4eed","label":"PubMed Central","creator":"Michael Berkowitz and Rintze Zelle","target":"^https?://(www\\.)?ncbi\\.nlm\\.nih\\.gov/pmc","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-01-16 05:50:52"},
    "detectWeb": function detectWeb(doc, url) {
	if (getPMCID(url)) {
		return "journalArticle";
	}
	
	if(getSearchResults(doc, true)) {
		return "multiple";
	}
},
};
transIds["27ee5b2c-2a5a-4afc-a0aa-d386642d4eed"] = "PubMed Central.js";


splittedTrans["PubMed XML.js"] = {
    "stamp": {"translatorID":"fcf41bed-0cbc-3704-85c7-8062a0068a7a","label":"PubMed XML","creator":"Simon Kornblith, Michael Berkowitz, Avram Lyon, and Rintze Zelle","target":"xml","minVersion":"2.1.9","maxVersion":"","priority":100,"configOptions":{"dataMode":"xml/dom"},"inRepository":true,"translatorType":1,"browserSupport":"gcsibv","lastUpdated":"2015-03-21 14:39:07"},
"detectImport": function detectImport() {
	var text = Zotero.read(1000);
	return text.indexOf("<PubmedArticleSet>") != -1;
},};
transIds["fcf41bed-0cbc-3704-85c7-8062a0068a7a"] = "PubMed XML.js";


splittedTrans["PubMed.js"] = {
    "stamp": {"translatorID":"3d0231ce-fd4b-478c-b1d3-840389e5b68c","label":"PubMed","creator":"Philipp Zumstein","target":"^https?://([^/]+[-.])?(www|preview)[-.]ncbi[-.]nlm[-.]nih[-.]gov[^/]*/(m/)?(books|pubmed|sites/pubmed|sites/entrez|entrez/query\\.fcgi\\?.*db=PubMed|myncbi/browse/collection/?|myncbi/collections/)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":12,"browserSupport":"gcsibv","lastUpdated":"2015-06-10 10:50:04"},
    "detectWeb": function detectWeb(doc, url) {
	var items = getResultList(doc);
	if (items.length > 0 && url.indexOf("/books/") == -1) {
		return "multiple";
	}
	
	if(!getUID(doc)) {
		if(getBookProps(doc)) return 'book';
		
		return;
	}
	
	//try to determine if this is a book
	//"Sections" heading only seems to show up for books
	var maincontent = doc.getElementById('maincontent');
	if(maincontent && ZU.xpath(maincontent, './/div[@class="sections"]').length)
	{
		var inBook = ZU.xpath(maincontent, './/div[contains(@class, "aff_inline_book")]').length;
		return inBook ? "bookSection" : "book";
	}
	
	
	//from bookshelf page
	var pdid = ZU.xpathText(doc, 'html/head/meta[@name="ncbi_pdid"]/@content');
	if(pdid == "book-part") return 'bookSection';
	if(pdid == "book-toc") return 'book';
	
	return "journalArticle";
},
};
transIds["3d0231ce-fd4b-478c-b1d3-840389e5b68c"] = "PubMed.js";


splittedTrans["R-Packages.js"] = {
    "stamp": {"translatorID":"24a10ebf-ada1-4b8d-8f76-5a29e24d3e78","label":"R-Packages","creator":"Sebastian Karcher","target":"r-project\\.org/web/packages/(.+/index\\.html|available_packages_by_(name|date)\\.html)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-06-09 16:04:13"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["24a10ebf-ada1-4b8d-8f76-5a29e24d3e78"] = "R-Packages.js";


splittedTrans["Radio Liberty.js"] = {
    "stamp": {"translatorID":"b1c90b99-2e1a-4374-a03b-92e45f1afc55","label":"Radio Free Europe / Radio Liberty","creator":"Avram Lyon","target":"^https?://(www\\.rferl\\.org/|www\\.azatliq\\.org/|www\\.azattyq\\.org/|rus\\.azattyq\\.org/|da\\.azadiradio\\.org/|pa\\.azadiradio\\.org/|www\\.azattyk\\.org/|www\\.ozodi\\.org/|www\\.ozodlik\\.org/|www\\.evropaelire\\.org/|www\\.slobodnaevropa\\.org/|www\\.makdenes\\.org/|www\\.iraqhurr\\.org/|www\\.radiofarda\\.com/|www\\.azatutyun\\.am/|www\\.azadliq\\.org/|www\\.svaboda\\.org/|www\\.svoboda\\.org/|www\\.tavisupleba\\.org/|www\\.azathabar\\.com/|www\\.svobodanews\\.ru/|www\\.europalibera\\.org/|www\\.radiosvoboda\\.org/)","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-04-04 10:15:37"},
    "detectWeb": function detectWeb(doc, url){
	if (url.match(/\/content\/|\/archive\/news|\/archive\/ru_news_zone/)) {
		// The translator uses this type because RFE/RL generally has a place of publication
		// and a Section; both are specific to newspaperArticle.
		return "newspaperArticle";
	} else if (url.match(/\/search\/\?k=.+/)){
		return "multiple";
	}
},
};
transIds["b1c90b99-2e1a-4374-a03b-92e45f1afc55"] = "Radio Liberty.js";


splittedTrans["RDF.js"] = {
    "stamp": {"translatorID":"5e3ad958-ac79-463d-812b-a86a9235c28f","label":"RDF","creator":"Simon Kornblith","target":"rdf","minVersion":"2.1.9","maxVersion":"","priority":100,"configOptions":{"dataMode":"rdf/xml"},"inRepository":true,"translatorType":1,"browserSupport":"gcs","lastUpdated":"2015-06-28 16:42:37"},
"detectImport": function detectImport() {
	// Make sure there are actually nodes
	
	var nodes = Zotero.RDF.getAllResources();
	if(nodes) {
		return true;
	}
},};
transIds["5e3ad958-ac79-463d-812b-a86a9235c28f"] = "RDF.js";


splittedTrans["Readability.js"] = {
    "stamp": {"translatorID":"cd77f1e5-507f-4c41-a6d2-bda5fa6f8694","label":"Readability","creator":"Avram Lyon","target":"^https?://www\\.readability\\.com/articles","minVersion":"2.1.3","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-01-05 12:14:58"},
    "detectWeb": function detectWeb(doc, url){

	var title = doc.evaluate('//h1[@id="article-entry-title"]', doc, null, XPathResult.ANY_TYPE, null);
	if (title) return "webpage";
	else return false;
},
};
transIds["cd77f1e5-507f-4c41-a6d2-bda5fa6f8694"] = "Readability.js";


splittedTrans["REDALYC.js"] = {
    "stamp": {"translatorID":"d1ac3b4f-1aa7-4a76-a97e-cf3580a41c37","label":"REDALYC","creator":"Sebastian Karcher","target":"^https?://(www.)?redalyc\\.(uaemex\\.mx|org)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-03-31 00:24:41"},
    "detectWeb": function detectWeb(doc,url) {
	var xpath='//meta[@name="citation_journal_title"]';
		
	if (ZU.xpath(doc, xpath).length > 0) {
		return "journalArticle";
	}
	if (url.indexOf("/home.oa")!=-1) {
		var searchxpath = "//a[contains(@href, 'articulo.oa?id=') and span[@class='titulo-resultado']]|//span[@class='resultado-articulo']/a[contains(@href, 'articulo.oa?id=')]"
		if (ZU.xpath(doc, searchxpath).length>0) {
			return "multiple";
		}
	}
	if (url.indexOf("/toc.oa?")!=-1) {
		var tocxpath = "//a[contains(@href, 'articulo.oa?id=') and span[@class='articulo-fasciculo']]";
		if (ZU.xpath(doc, tocxpath).length>0) {
			return "multiple";
		}	
	}
	return false;
},
};
transIds["d1ac3b4f-1aa7-4a76-a97e-cf3580a41c37"] = "REDALYC.js";


splittedTrans["ReferBibIX.js"] = {
    "stamp": {"translatorID":"881f60f2-0802-411a-9228-ce5f47b64c7d","label":"Refer/BibIX","creator":"Simon Kornblith","target":"txt","minVersion":"2.1","maxVersion":"","priority":100,"displayOptions":{"exportCharset":"UTF-8"},"inRepository":true,"translatorType":3,"browserSupport":"gcs","lastUpdated":"2015-06-10 10:48:54"},
"detectImport": function detectImport() {
	var lineRe = /%[A-Z0-9\*\$] .+/;
	var line;
	var matched = 0;
	while((line = Zotero.read()) !== false) {
		line = line.replace(/^\s+/, "");
		if(line != "") {
			if(lineRe.test(line)) {
				matched++;
				if(matched == 2) {
					// threshold is two lines
					return true;
				}
			} else {
				return false;
			}
		}
	}
},};
transIds["881f60f2-0802-411a-9228-ce5f47b64c7d"] = "ReferBibIX.js";


splittedTrans["RefWorks Tagged.js"] = {
    "stamp": {"translatorID":"1a3506da-a303-4b0a-a1cd-f216e6138d86","label":"RefWorks Tagged","creator":"Simon Kornblith, Aurimas Vinckevicius, and Sebastian Karcher","target":"txt","minVersion":"3.0.4","maxVersion":"","priority":100,"displayOptions":{"exportCharset":"UTF-8","exportNotes":true,"exportFileData":true},"inRepository":true,"translatorType":3,"browserSupport":"gcsv","lastUpdated":"2015-03-24 02:55:12"},
"detectImport": function detectImport() {
	var line;
	var i = 0;
	while((line = Zotero.read()) !== false) {
		line = line.replace(/^\s+/, "");
		if(line != "") {
			if(line.search(/^RT\s+./) != -1) {
				return true;
			} else {
				if(i++ > 150) { //skip preamble
					return false;
				}
			}
		}
	}
},};
transIds["1a3506da-a303-4b0a-a1cd-f216e6138d86"] = "RefWorks Tagged.js";


splittedTrans["Regeringskansliet.js"] = {
    "stamp": {"translatorID":"f7262c7d-a11c-4679-899c-bab8c21a19c6","label":"Regeringskansliet","creator":"Isak Bergdahl","target":"^https?://(www\\.)?regeringen\\.se/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-04-15 18:04:37"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["f7262c7d-a11c-4679-899c-bab8c21a19c6"] = "Regeringskansliet.js";


splittedTrans["ReliefWeb.js"] = {
    "stamp": {"translatorID":"6f5f1b24-7519-4314-880f-d7004fbcfe7e","label":"ReliefWeb","creator":"Michael Berkowitz","target":"^https?://(www\\.)?reliefweb\\.int/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"g","lastUpdated":"2015-06-02 21:13:59"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/(S|s)earch(R|r)esults/)) {
		return "multiple";
	} else if (url.match(/(O|o)pen(D|d)ocument/)) {
		return "journalArticle";
	}
},
};
transIds["6f5f1b24-7519-4314-880f-d7004fbcfe7e"] = "ReliefWeb.js";


splittedTrans["RePEc - Econpapers.js"] = {
    "stamp": {"translatorID":"411f9a8b-64f3-4465-b7df-a3c988b602f3","label":"RePEc - Econpapers","creator":"Sebastian Karcher","target":"^https?://econpapers\\.repec\\.org/","minVersion":"1.0.0b4.r1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-03-26 16:37:41"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["411f9a8b-64f3-4465-b7df-a3c988b602f3"] = "RePEc - Econpapers.js";


splittedTrans["RePEc - IDEAS.js"] = {
    "stamp": {"translatorID":"bd2e6136-d8e5-4f76-906b-0fbcd888dd63","label":"RePEc - IDEAS","creator":"Sebastian Karcher","target":"^https?://ideas\\.repec\\.org/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-11-17 16:34:33"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["bd2e6136-d8e5-4f76-906b-0fbcd888dd63"] = "RePEc - IDEAS.js";


splittedTrans["Reuters.js"] = {
    "stamp": {"translatorID":"83979786-44af-494a-9ddb-46654e0486ef","label":"Reuters","creator":"Avram Lyon, Michael Berkowitz, Sebastian Karcher","target":"^https?://(www|blogs)?\\.reuters\\.com/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-02 21:16:57"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/^https?:\/\/(www\.)?reuters\.com\/article/)) {
		return "newspaperArticle";
	} else if (url.match(/^https?:\/\/blogs\.reuters\.com/)) {
	  return "blogPost";
	} else if (url.match(/search\?/)) {
	  return "multiple";
	}
},
};
transIds["83979786-44af-494a-9ddb-46654e0486ef"] = "Reuters.js";


splittedTrans["Revues.org.js"] = {
    "stamp": {"translatorID":"87766765-919e-4d3b-9071-3dd7efe984c8","label":"Revues.org","creator":"Aurimas Vinckevicius, Pierre-Alain Mignot, and Michael Berkowitz","target":"^https?://.*\\.revues\\.org","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-03 18:55:44"},
    "detectWeb": function detectWeb(doc, url) {
	// don't do anything on main domain, because there's nothing to fetch there
	if(url.match(/http:\/\/(www\.)?revues\.org/)) return false;

	var types = ZU.xpath(doc, '//meta[@name="DC.type"]/@content');
	for(var i=0, n=types.length; i<n; i++) {
		switch(types[i].textContent.toLowerCase()) {
			case 'journalarticle':
				return 'journalArticle';
			case 'collection':
				return 'multiple';
			case 'booksection':
				return 'bookSection';
		}
	}

	if (ZU.xpath(doc, '//div[@id="inside"]/div[@class="sommaire"] /dl[@class="documents"]/dd[@class="titre"]/a').length ||
		ZU.xpath(doc, '//ul[@class="summary"]//div[@class="title"]/a').length) {
		return "multiple";
	} else if (ZU.xpath(doc, '//h1[@id="docTitle"]/span[@class="text"]').length ||
		url.match(/document\d+/)) {
		return "journalArticle";
	}
},
};
transIds["87766765-919e-4d3b-9071-3dd7efe984c8"] = "Revues.org.js";


splittedTrans["RIS.js"] = {
    "stamp": {"translatorID":"32d59d2d-b65a-4da4-b0a3-bdd3cfb979e7","label":"RIS","creator":"Simon Kornblith and Aurimas Vinckevicius","target":"ris","minVersion":"3.0.4","maxVersion":"","priority":100,"configOptions":{"getCollections":"true"},"displayOptions":{"exportCharset":"UTF-8","exportNotes":true,"exportFileData":false},"inRepository":true,"translatorType":3,"browserSupport":"gcsv","lastUpdated":"2015-06-19 19:24:24"},
"detectImport": function detectImport() {
	var line;
	var i = 0;
	while((line = Zotero.read()) !== false) {
		line = line.replace(/^\s+/, "");
		if(line != "") {
			if(line.substr(0, 6).match(/^TY {1,2}- /)) {
				return true;
			} else {
				if(i++ > 3) {
					return false;
				}
			}
		}
	}
},};
transIds["32d59d2d-b65a-4da4-b0a3-bdd3cfb979e7"] = "RIS.js";


splittedTrans["Roll Call.js"] = {
    "stamp": {"translatorID":"d522149f-b776-413f-8aa4-ced13f59c759","label":"Roll Call","creator":"Sebastian Karcher","target":"^https?://(www\\.|blogs\\.)?rollcall\\.com","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-11-19 00:17:52"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["d522149f-b776-413f-8aa4-ced13f59c759"] = "Roll Call.js";


splittedTrans["RSC Publishing.js"] = {
    "stamp": {"translatorID":"ca0e7488-ef20-4485-8499-9c47e60dcfa7","label":"RSC Publishing","creator":"Sebastian Karcher","target":"^https?://(:?www\\.|google\\.)?pubs\\.rsc\\.org/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2014-06-01 22:04:46"},
    "detectWeb": function detectWeb(doc, url) {
	if(url.search(/\/results[?\/]/i) != -1 || url.indexOf('/ebook/') != -1  &&
		getResults(doc).length) {
		return 'multiple';
	}
	//apparently URLs sometimes have upper case as in /Content/ArticleLanding/
	if(url.search(/\/content\/articlelanding\//i) != -1 && ZU.xpathText(doc, '//meta[@name="citation_title"]/@content')) {
		return 'journalArticle';
	}

	if(url.search(/\/content\/chapter\//i) != -1) {
		return 'bookSection';
	}
},
};
transIds["ca0e7488-ef20-4485-8499-9c47e60dcfa7"] = "RSC Publishing.js";


splittedTrans["SAE Papers.js"] = {
    "stamp": {"translatorID":"2c98b8e6-6138-4b60-a999-15e3a7c8cb4b","label":"SAE Papers","creator":"Sebastian Karcher","target":"^https?://(www\\.)?papers\\.sae\\.org","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-11-19 00:45:29"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["2c98b8e6-6138-4b60-a999-15e3a7c8cb4b"] = "SAE Papers.js";


splittedTrans["Safari Books Online.js"] = {
    "stamp": {"translatorID":"ec491fc2-10b1-11e3-99d7-1bd4dc830245","label":"Safari Books Online","creator":"Jeffrey Jones","target":"^https?://([^/]+\\.)?safaribooksonline\\.[a-zA-Z]+/","minVersion":"3.0","maxVersion":"","priority":150,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2014-12-08 05:03:12"},
    "detectWeb": function detectWeb(doc, url) {
	var nav = doc.getElementById("lefttoc");
	if (nav && ZU.xpathText(nav,".//a[@class='current']")) {
		return "bookSection";
	}
	else if (url.indexOf("/book/") > -1 || /\/[0-9]{10}/.test(url)) {
		return "book";
	}
	else if (getSearchResults(doc,true)) {
		return "multiple";
	}
},
};
transIds["ec491fc2-10b1-11e3-99d7-1bd4dc830245"] = "Safari Books Online.js";


splittedTrans["SAGE Knowledge.js"] = {
    "stamp": {"translatorID":"d21dcd90-c997-4e14-8fe0-353b8e19a47a","label":"SAGE Knowledge","creator":"ProQuest","target":"^https?://knowledge\\.sagepub\\.com/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcs","lastUpdated":"2014-12-04 23:40:48"},
    "detectWeb": function detectWeb(doc, url) {
	if (getSearchResults(doc)) {
		return "multiple";
	}
	
	return getItemType(doc);
},
};
transIds["d21dcd90-c997-4e14-8fe0-353b8e19a47a"] = "SAGE Knowledge.js";


splittedTrans["Schweizer Radio und Fernsehen SRF.js"] = {
    "stamp": {"translatorID":"a8e51f4e-0372-42ad-81a8-bc3dcea6dc03","label":"Schweizer Radio und Fernsehen SRF","creator":"ibex, Sebastian Karcher","target":"^https?://(www\\.)?srf\\.ch/.","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-02-25 21:02:50"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.location.href.match(/.*\/sendungen\/.*/i) && (ZU.xpath(doc, '//h1[@class="article-heading"]').length > 0)) {
		return "radioBroadcast";
	// Archive pages
	} else if (doc.location.href.match(/.*\/sendungen\/.*/i) && ZU.xpath(doc, '//div[contains(@class, "container_episodes")]').length > 0) {
		return "multiple";
	}
},
};
transIds["a8e51f4e-0372-42ad-81a8-bc3dcea6dc03"] = "Schweizer Radio und Fernsehen SRF.js";


splittedTrans["SciELO.js"] = {
    "stamp": {"translatorID":"3eabecf9-663a-4774-a3e6-0790d2732eed","label":"SciELO","creator":"Sebastian Karcher","target":"^https?://(www\\.)?(socialscience\\.|proceedings\\.|biodiversidade\\.|caribbean\\.|comciencia\\.|inovacao\\.|search\\.)?(scielo|scielosp)\\.","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-12-15 23:58:19"},
    "detectWeb": function detectWeb(doc,url) {

	var xpath='//meta[@name="citation_journal_title"]';

	if (ZU.xpath(doc, xpath).length > 0) {
		return "journalArticle";
	}
			
	if (url.indexOf("search.")!=-1) {
		multxpath = '//div[@class="data"]/h3/a'
	
	if (ZU.xpath(doc, multxpath).length>0){
			return "multiple";
		}
	}
	return false;
},
};
transIds["3eabecf9-663a-4774-a3e6-0790d2732eed"] = "SciELO.js";


splittedTrans["Science Links Japan.js"] = {
    "stamp": {"translatorID":"c0d7d260-d795-4782-9446-f6c403a7922c","label":"Science Links Japan","creator":"Michael Berkowitz","target":"^https?://sciencelinks\\.jp/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2015-06-02 21:28:10"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/result/) || url.match(/journal/)) {
		return "multiple";
	} else if (url.match(/article/)) {
		return "journalArticle";
	}
	else if (url.match(/display\.php/)){
		return "journalArticle"
	}
	
},
};
transIds["c0d7d260-d795-4782-9446-f6c403a7922c"] = "Science Links Japan.js";


splittedTrans["ScienceDirect.js"] = {
    "stamp": {"translatorID":"b6d0a7a-d076-48ae-b2f0-b6de28b194e","label":"ScienceDirect","creator":"Michael Berkowitz and Aurimas Vinckevicius","target":"^https?://[^/]*science-?direct\\.com[^/]*/science(?:/article/|\\?.*\\b_ob=ArticleListURL|/(?:journal|bookseries|book|handbooks|referenceworks)/\\d)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2014-12-04 23:08:27"},
    "detectWeb": function detectWeb(doc, url) {
  	if ((url.indexOf("_ob=DownloadURL") !== -1) 
		|| doc.title == "ScienceDirect Login" 
		|| doc.title == "ScienceDirect - Dummy"
		|| (url.indexOf("/science/advertisement/") !== -1)) { 
		return false;
	}

	if((url.indexOf("pdf") !== -1
			&& url.indexOf("_ob=ArticleURL") === -1
			&& url.indexOf("/article/") === -1)
		|| url.search(/\/(?:journal|bookseries|book|handbooks|referenceworks)\//) !== -1
		|| url.indexOf("_ob=ArticleListURL") !== -1) {
		if (getArticleList(doc).length > 0) {
			return "multiple";
		} else {
			return false;
		}
	} else if(url.indexOf("pdf") === -1) {
		// Book sections have the ISBN in the URL
		if (url.indexOf("/B978") !== -1) {
			return "bookSection";
		} else if(getISBN(doc)) {
			if(getArticleList(doc).length) {
				return "multiple";
			} else {
				return "book";
			}
		} else {
			return "journalArticle";
		}
	} 
},
};
transIds["b6d0a7a-d076-48ae-b2f0-b6de28b194e"] = "ScienceDirect.js";


splittedTrans["Scopus.js"] = {
    "stamp": {"translatorID":"a14ac3eb-64a0-4179-970c-92ecc2fec992","label":"Scopus","creator":"Michael Berkowitz, Rintze Zelle and Avram Lyon","target":"^https?://www\\.scopus\\.com[^/]*","minVersion":"2.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2014-04-14 16:54:39"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("/results/") !== -1 &&
		getBoxes(doc).iterateNext()) {
		return "multiple";
	} else if (url.indexOf("/record/") !== -1) {
		return "journalArticle";
	}
},
};
transIds["a14ac3eb-64a0-4179-970c-92ecc2fec992"] = "Scopus.js";


splittedTrans["semantics Visual Library.js"] = {
    "stamp": {"translatorID":"fe85e97b-5e2a-4d9e-976e-c336c5350ce9","label":"semantics Visual Library","creator":"Philipp Zumstein","target":"^https?://www\\.(blldb-online\\.de/blldb|bdsl-online\\.de/BDSL-DB)/suche/","minVersion":"3.0","maxVersion":"","priority":150,"inRepository":true,"translatorType":4,"browserSupport":"gcsv","lastUpdated":"2014-12-29 11:56:09"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.toLowerCase().indexOf('/titelaufnahme.xml?') != -1 ) {//single item
		var type = doc.getElementsByClassName('karteilegende')[0];
		if (type && mappingTypes[type.textContent]) {
			return mappingTypes[type.textContent];
		} else {
			Z.debug('not recognized: ' + type);
		}
	} else if (getSearchResults(doc, true)) {
		return "multiple";
	}
},
};
transIds["fe85e97b-5e2a-4d9e-976e-c336c5350ce9"] = "semantics Visual Library.js";


splittedTrans["SFU IPinCH.js"] = {
    "stamp": {"translatorID":"7448d1d7-57e4-4685-b6e4-d4d9f7046fc2","label":"SFU IPinCH","creator":"Aurimas Vinckevicius","target":"^https?://[^/]*sfu\\.ca/kbipinch/(records|browse|search)/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-06-19 10:30:31"},
    "detectWeb": function detectWeb(doc, url) {
	if(url.indexOf('/browse/') != -1 || url.indexOf('/search/') != -1) {
		if(ZU.xpath(doc, '//div[@class="citation"]').length) {
			return 'multiple';
		}
	} else if (url.indexOf('/records/') != -1) {
		var type = ZU.xpathText(doc, '//meta[@name="itemType"]/@content');
		if(type && ZU.itemTypeExists(type)) {
			return type;
		}
	}
},
};
transIds["7448d1d7-57e4-4685-b6e4-d4d9f7046fc2"] = "SFU IPinCH.js";


splittedTrans["Silverchair.js"] = {
    "stamp": {"translatorID":"3bae3a55-f021-4b59-8a14-43701f336adf","label":"Silverchair","creator":"Sebastian Karcher","target":"\\/(article|volume|proceeding|searchresults|issue)\\.aspx","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-11-12 10:02:49"},
    "detectWeb": function detectWeb(doc, url) {
	//concerned about false positives - make sure this is actualy Silverchair.
	var scm6 = ZU.xpathText(doc, '//body/@class|//script/@src');
	var multxpath = '//div[contains(@class, "resultBlock")]/a|//div[contains(@class, "articleTitle") or contains(@class, "articleSection")]/a[contains(@href, "articleid")  or contains(@href, "articleID")]';
	if (scm6){
		if (scm6.indexOf("SCM6")!=-1){
			if (url.search(/\/(article|proceeding)\.aspx\?articleid=\d+/i)!=-1) return "journalArticle";
			else if(url.indexOf("/searchresults.aspx?q=")!=-1 || url.indexOf("/issue.aspx")!=1  && ZU.xpathText(doc, multxpath)!=null) return "multiple";
	}
	}
	return false;
	},
};
transIds["3bae3a55-f021-4b59-8a14-43701f336adf"] = "Silverchair.js";


splittedTrans["SIRS Knowledge Source.js"] = {
    "stamp": {"translatorID":"d4cccbd1-a92f-4dd8-b636-74eb9e344441","label":"SIRS Knowledge Source","creator":"ProQuest PME Team","target":"^https?://([^/]+\\.)?sks\\.sirs\\.com/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2015-02-02 23:47:53"},
    "detectWeb": function detectWeb(doc, url) {
	var results = ZU.xpath(doc, './/div[@class="result-icon"]//img/@src');

	if (results.length > 1) {
		return "multiple";
	}
	else if (results.length == 1) {
		var typeImage = results[0].value;
		
		if (typeImage.indexOf("magazines") > -1) {
			return "magazineArticle";
		}
		else if (typeImage.indexOf("newspapers") > -1) {
			return "newspaperArticle";
		}
		else if (typeImage.indexOf("books") > -1) {
			return "encyclopediaArticle";
		}
		else {
			// "websites", "govt_docs", "primary_srcs"
			return "document";
		}
	}

	return false;
},
};
transIds["d4cccbd1-a92f-4dd8-b636-74eb9e344441"] = "SIRS Knowledge Source.js";


splittedTrans["Slate.js"] = {
    "stamp": {"translatorID":"a667ae9e-186f-46d2-b824-d70064614668","label":"Slate","creator":"Sebastian Karcher","target":"^https?://(.*)slate\\.com","minVersion":"2.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-09-27 23:25:07"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["a667ae9e-186f-46d2-b824-d70064614668"] = "Slate.js";


splittedTrans["SlideShare.js"] = {
    "stamp": {"translatorID":"0cc8e259-106e-4793-8c26-6ec8114a9160","label":"SlideShare","creator":"Michael Berkowitz","target":"https?://[^/]*slideshare\\.net/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-12-12 13:47:36"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("/search/") != -1 &&
		ZU.xpath(doc, '//ol[contains(@class, "searchResults")] //div[./a[@class="slideshow-title"]]').length) {
		return "multiple";
	} else if ((ZU.xpathText(doc, '//meta[@name="og_type"]/@content') && ZU.xpathText(doc, '//meta[@name="og_type"]/@content') == 'article') || (ZU.xpathText(doc, '//meta[@name="og_type"]/@content') && ZU.xpathText(doc, '//meta[@name="og_type"]/@content').search(/presentation/)!=-1)) {
		return "presentation";
	}
},
};
transIds["0cc8e259-106e-4793-8c26-6ec8114a9160"] = "SlideShare.js";


splittedTrans["SORA.js"] = {
    "stamp": {"translatorID":"83d2ed27-40a5-4dc7-bd87-baddc8fb35da","label":"SORA","creator":"Philipp Zumstein","target":"^https?://sora\\.unm\\.edu/(node/|search/node/|advancedsearch\\?)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2015-01-02 22:03:36"},
    "detectWeb": function detectWeb(doc, url) {
	if ( ZU.xpath(doc, '//div[contains(@class, "content")]/fieldset/legend').length ) { // Publication Information
		if (getSearchResults(doc, true)) {
			return "multiple";
		} else {
			return "journalArticle";
		}
	}
	if (url.indexOf('search')>-1 && getSearchResults(doc, true)) {
		return "multiple";
	}
},
};
transIds["83d2ed27-40a5-4dc7-bd87-baddc8fb35da"] = "SORA.js";


splittedTrans["Spiegel Online.js"] = {
    "stamp": {"translatorID":"eef50507-c756-4081-86fd-700ae4ebf22e","label":"Spiegel Online","creator":"Martin Meyerhoff","target":"^https?://www\\.spiegel\\.de/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-03-06 09:02:26"},
    "detectWeb": function detectWeb(doc, url) {
	var spiegel_article_XPath = '//h2[@class="article-title"]';
	if ( url.indexOf('/thema/')>-1 || url.indexOf('/suche/')>-1 || url.indexOf('/international/search/')>-1 || url.indexOf('/international/topic/')>-1 ) { 
		return "multiple";
	} else if (ZU.xpathText(doc, spiegel_article_XPath)) {
		//the print edition is a magazine. Since the online edition is updated constantly it
		//makes sense to treat it like a newspaper.
		if (url.indexOf('/print/')>-1) {
			return "magazineArticle";
		} else { 
			return "newspaperArticle";
		}
	}
},
};
transIds["eef50507-c756-4081-86fd-700ae4ebf22e"] = "Spiegel Online.js";


splittedTrans["Springer Link.js"] = {
    "stamp": {"translatorID":"d6c6210a-297c-4b2c-8c43-48cb503cc49e","label":"Springer Link","creator":"Aurimas Vinckevicius","target":"https?://link\\.springer\\.com/(search(?:/page/\\d+)?\\?|(article|chapter|book|referenceworkentry|protocol|journal|referencework)/.+)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2013-08-13 20:03:26"},
    "detectWeb": function detectWeb(doc, url) {
	var action = url.match(/^https?:\/\/[^\/]+\/([^\/?#]+)/);
	if(!action) return;
	
	if(!doc.head || !doc.head.getElementsByTagName('meta').length) {
		Z.debug("Springer Link: No head or meta tags");
		return;
	}
	
	switch(action[1]) {
		case "search":
		case "journal":
		case "book":
		case "referencework":
			if(getResultList(doc).length > 0) {
				return "multiple";
			} else {
				return false;
			}
		break;
		case "article":
			return "journalArticle";
		break;
		case "chapter":
		case "referenceworkentry":
		case "protocol":
			return "bookSection";
		break;
	}
},
};
transIds["d6c6210a-297c-4b2c-8c43-48cb503cc49e"] = "Springer Link.js";


splittedTrans["Springer Science+Business Media.js"] = {
    "stamp": {"translatorID":"dfec8317-9b59-4cc5-8771-cdcef719d171","label":"Springer Science+Business Media","creator":"Aurimas Vinckevicius","target":"^https?://[^/]+/(((content|\\d+)/)?[-\\d]+/[A-Z]?\\d+/[A-Z]?\\d+|search/results|inst/\\d+\\?)","minVersion":"3.0","maxVersion":"","priority":250,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-04-03 19:53:34"},
    "detectWeb": function detectWeb(doc, url) {
	var hostDB = ZU.xpathText(doc,'(//li[@id="SPR" or @id="BMC" or @id="CC"])[1] /a/@href');
	if(hostDB) hostDB = hostDB.toLowerCase().replace(/^\s*https?:\/\//,'')
						.replace(/[^a-z]*$/,'');

	switch(hostDB) {
		case 'www.springeropen.com':
		case 'www.biomedcentral.com':
		case 'www.chemistrycentral.com':
			break;
		default:
			return;
	}

	//This should only include journals
	var title = ZU.xpathText(doc, '//meta[@name="citation_title"]/@content');
	if(title && title.trim()) {
		return 'journalArticle';
	}

	if(getItems(doc, url).length) {
		return 'multiple';
	}
},
};
transIds["dfec8317-9b59-4cc5-8771-cdcef719d171"] = "Springer Science+Business Media.js";


splittedTrans["SSOAR.js"] = {
    "stamp": {"translatorID":"d2959995-d0a2-4fb7-990f-16b671690e99","label":"SSOAR","creator":"Philipp Zumstein","target":"^https?://www\\.ssoar\\.info/","minVersion":"3","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsv","lastUpdated":"2015-02-18 16:51:35"},
    "detectWeb": function detectWeb(doc, url) {
	var type = ZU.xpath(doc, '//meta[contains(@name, "DC.type")]/@content');
	if (type.length>0) {
		//Z.debug(type[0].textContent);
		if (mappingTable[type[0].textContent]) {
			return mappingTable[type[0].textContent];
		} else {//generic fallback
			return "journalArticle";
		}
	}
	
	if ( getSearchResults(doc).length>0 ) {
		return "multiple";
	}
},
};
transIds["d2959995-d0a2-4fb7-990f-16b671690e99"] = "SSOAR.js";


splittedTrans["SSRN.js"] = {
    "stamp": {"translatorID":"b61c224b-34b6-4bfd-8a76-a476e7092d43","label":"SSRN","creator":"Sebastian Karcher","target":"^https?://papers\\.ssrn\\.com/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2013-09-25 15:23:47"},
    "detectWeb": function detectWeb(doc,url) {
	var xpath='//meta[@name="citation_title"]';		
	if (ZU.xpath(doc, xpath).length > 0) {
		return "report";
	}
	if (url.search(/AbsByAuth\.cfm\?|results\.cfm\?/i)!=-1) {
		return "multiple";
	}

	return false;
},
};
transIds["b61c224b-34b6-4bfd-8a76-a476e7092d43"] = "SSRN.js";


splittedTrans["Stanford Encyclopedia of Philosophy.js"] = {
    "stamp": {"translatorID":"5aabfa6e-79e6-4791-a9d2-46c9cb137561","label":"Stanford Encyclopedia of Philosophy","creator":"Sebastian Karcher","target":"^https?://plato\\.stanford\\.edu/(?:entries|search)","minVersion":"2.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-07-05 10:41:59"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/\/search\//)) return "multiple";
	if (url.match(/\entries\//)) return "bookSection";
},
};
transIds["5aabfa6e-79e6-4791-a9d2-46c9cb137561"] = "Stanford Encyclopedia of Philosophy.js";


splittedTrans["Store norske leksikon.js"] = {
    "stamp": {"translatorID":"439c869c-c605-47b4-b330-157a23a4b4f3","label":"Store norske leksikon","creator":"Håkon Malmedal","target":"^https?://(?:(?:sml|nbl|nkl)\\.)?snl\\.no/[^.]","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2014-07-26 01:22:54"},
    "detectWeb": function detectWeb(doc, url) {
	return "encyclopediaArticle";
},
};
transIds["439c869c-c605-47b4-b330-157a23a4b4f3"] = "Store norske leksikon.js";


splittedTrans["Stuff.co.nz.js"] = {
    "stamp": {"translatorID":"631ff0c7-2e64-4279-a9c9-ad9518d40f2b","label":"Stuff.co.nz","creator":"Sopheak Hean (University of Waikato, Faculty of Education)","target":"^https?://(www\\.)?stuff\\.co\\.nz/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-08-23 05:56:33"},
    "detectWeb": function detectWeb(doc, url) {
	var definePath = '//div[@class="blog_content"]';
	var XpathObject = doc.evaluate(definePath, doc, null, XPathResult.ANY_TYPE, null).iterateNext();
	if(XpathObject){
		return "blogPost";
	} else {
		var definePath = '//div[@class="story_landing"]';
		var XpathObject = doc.evaluate(definePath, doc, null, XPathResult.ANY_TYPE, null).iterateNext();
		if  (XpathObject){
			return "newspaperArticle";
		}
	}
},
};
transIds["631ff0c7-2e64-4279-a9c9-ad9518d40f2b"] = "Stuff.co.nz.js";


splittedTrans["Sueddeutsche.de.js"] = {
    "stamp": {"translatorID":"2e4ebd19-83ab-4a56-8fa6-bcd52b576470","label":"Sueddeutsche.de","creator":"Martin Meyerhoff","target":"^https?://www\\.sueddeutsche\\.de","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-03 19:57:18"},
    "detectWeb": function detectWeb(doc, url) {
	if (ZU.xpathText(doc, '//h2/strong')) {
		return "newspaperArticle";
	} else if (ZU.xpath(doc, '//div[@id="topthemen" or @class="panoramateaser" or contains(@class,"maincolumn") or contains(@class, "teaser")] //a[starts-with(@class,"entry-title") and starts-with(@href,"http://www.sueddeutsche.de") and not(contains(@href,"/app/"))]').length){
		return "multiple";
	}
},
};
transIds["2e4ebd19-83ab-4a56-8fa6-bcd52b576470"] = "Sueddeutsche.de.js";


splittedTrans["Summon 2.js"] = {
    "stamp": {"translatorID":"6c61897b-ca44-4ce6-87c1-2da68b44e6f7","label":"Summon 2","creator":"Caistarrin Mystical and Aurimas Vinckevicius","target":"^https?://([^/]+\\.)?summon\\.serialssolutions\\.com/","minVersion":"4.0","maxVersion":"","priority":150,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2014-12-08 15:45:09"},
    "detectWeb": function detectWeb(doc, url) {
	var results = doc.getElementById('results');
	var displayMultiple = false;
	if (results) {
		var ul = results.firstElementChild.firstElementChild;
		if (ul) {
			// This is currently broken in Zotero.
			// Scrolling down one page ends up triggering Page Modified event
			// 111 times and makes the page unusable after a while.
			//Zotero.monitorDOMChanges(ul, {childList: true});
			
			// temporary hack to display multiples
			displayMultiple = true;
		}
	}
	
	var detailPage = doc.getElementsByClassName('detailPage')[0];
	if (detailPage) {
		// Changes from visible to not by adding class ng-hide
		Zotero.monitorDOMChanges(detailPage, {attributes: true, attributeFiler: ['class']});
		if (detailPage.offsetHeight) {
			// Visible details page
			var id = getIDFromUrl(url);
			if (id) return 'book';
		}
	}
	
	if (getSearchResults(doc, true) || displayMultiple) {
		return "multiple";
	}
},
};
transIds["6c61897b-ca44-4ce6-87c1-2da68b44e6f7"] = "Summon 2.js";


splittedTrans["Sydney Morning Herald.js"] = {
    "stamp": {"translatorID":"19120a71-17a8-4629-936a-ccdf899b9861","label":"Sydney Morning Herald","creator":"Michael Berkowitz","target":"^https?://(www|search).smh.com.au/(news|siteSearch|articles)","minVersion":"1.0.0b4.r5","maxVersion":"","priority":99,"inRepository":true,"translatorType":4,"browserSupport":"g","lastUpdated":"2014-04-03 19:57:56"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.location.href.indexOf("news") != -1 || doc.location.href.indexOf("articles") != -1) {
		return "newspaperArticle";
	} else if (doc.location.href.indexOf("siteSearch") != -1) {
		return "multiple";
	}
},
};
transIds["19120a71-17a8-4629-936a-ccdf899b9861"] = "Sydney Morning Herald.js";


splittedTrans["Tagesspiegel.js"] = {
    "stamp": {"translatorID":"374ac2a5-dd45-461e-bf1f-bf90c2eb7085","label":"Tagesspiegel","creator":"Martin Meyerhoff, Sebastian Karcher","target":"^https?://www\\.tagesspiegel\\.de","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2012-10-06 13:16:15"},
    "detectWeb": function detectWeb(doc, url) {
	var tspiegel_ArticleTools_XPath = ".//div[@class='hcf-article']";
	var tspiegel_Multiple_XPath = "//*[@id='hcf-wrapper']/div[2]/div[contains(@class, 'hcf-main-col')]/div/ul/li/h2/a|//*[@id='hcf-wrapper']/div[@class='hcf-lower-hp']/div/ul/li/ul/li/a|//ul/li[contains(@class, 'hcf-teaser')]/h2/a";
	
	if (doc.evaluate(tspiegel_ArticleTools_XPath, doc, null, XPathResult.ANY_TYPE, null).iterateNext() ){ 
		Zotero.debug("newspaperArticle");
		return "newspaperArticle";
	} else if (doc.location.href.match(/http\:\/\/www\.tagesspiegel\.de\/suchergebnis\//)){ 
		Zotero.debug("multiple");
		return "multiple";
	} else if (doc.evaluate(tspiegel_Multiple_XPath, doc, null, XPathResult.ANY_TYPE, null).iterateNext() ) {
		Zotero.debug("multiple");
		return "multiple";
	}
},
};
transIds["374ac2a5-dd45-461e-bf1f-bf90c2eb7085"] = "Tagesspiegel.js";


splittedTrans["Talis Aspire.js"] = {
    "stamp": {"translatorID":"f16931f0-372e-4197-8927-05d2ba7599d8","label":"Talis Aspire","creator":"Sebastian Karcher","target":"^https?://([^/]+\\.)?(((my)?reading|resource|lib|cyprus|)lists|aspire\\.surrey)\\..+/(lists|items)/","minVersion":"3.0","maxVersion":"","priority":270,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-09-25 15:51:45"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf('/lists/') != -1 && getSearchResults(doc, true)) return "multiple";
	
	if (url.indexOf('/items/') != -1) {
		var type = ZU.xpathText(doc, '//dd/span[@class="label"]');
		if (type == "Book")	return "book";
		if (type =="Webpage" || type =="Website") return "webpage";
		return "journalArticle";
	}
},
};
transIds["f16931f0-372e-4197-8927-05d2ba7599d8"] = "Talis Aspire.js";


splittedTrans["TalisPrism.js"] = {
    "stamp": {"translatorID":"53f8d182-4edc-4eab-b5a1-141698a20202","label":"TalisPrism","creator":"William Smith and Emma Reisz","target":"/TalisPrism/(browseResults|doSearch|doOpenURLSearch)","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-02-27 23:48:15"},
    "detectWeb": function detectWeb(doc, url){

	/* Can't differentiate multiple from single results by URL 
	as single search results have a search URL but display as browse.
	Can't scrape the titles to differentiate between single and multiple as the display format 
	is too different to be scraped consistently.
	Instead we differentiate by URL but make an exception for a solo result.
	*/
	var search=searchTest(doc, url);
		
	if (search==1) {
		var doctype = 'multiple'; 
	} else {doctype=docType(doc, url);
	}
	return doctype;
},
};
transIds["53f8d182-4edc-4eab-b5a1-141698a20202"] = "TalisPrism.js";


splittedTrans["Tatar zamani.js"] = {
    "stamp": {"translatorID":"eb4cb148-b050-470c-9686-77d722efdbd7","label":"Tatar zamanı","creator":"Avram Lyon","target":"https?://(www\\.)?tatartime.com","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-04-17 03:09:28"},
    "detectWeb": function detectWeb(doc, url) {
		return FW.detectWeb(doc, url);
},
};
transIds["eb4cb148-b050-470c-9686-77d722efdbd7"] = "Tatar zamani.js";


splittedTrans["Tatknigafund.js"] = {
    "stamp": {"translatorID":"f909cbda-2fac-4700-965f-6c0783b77eeb","label":"Tatknigafund","creator":"Avram Lyon","target":"^https?://www\\.tatknigafund\\.ru/books/","minVersion":"1.0.0b4.r1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-08-06 19:23:07"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match("books/search?")) {
		return "multiple";
	} else
	if (url.match("books") && !url.match("read")) {
		return "book";
	}
},
};
transIds["f909cbda-2fac-4700-965f-6c0783b77eeb"] = "Tatknigafund.js";


splittedTrans["Tatpressa.ru.js"] = {
    "stamp": {"translatorID":"d76d3c94-ad87-4698-9433-6e31d6b3bf68","label":"Tatpressa.ru","creator":"Avram Lyon","target":"^https?:\\/\\/(www\\.)?tatpressa\\.ru\\/","minVersion":"2.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-04-15 18:04:37"},
    "detectWeb": function detectWeb(doc, url) { 
		return FW.detectWeb(doc, url);
},
};
transIds["d76d3c94-ad87-4698-9433-6e31d6b3bf68"] = "Tatpressa.ru.js";


splittedTrans["Taylor and Francis+NEJM.js"] = {
    "stamp": {"translatorID":"dac476e4-401d-430a-8571-a97c31c3b65e","label":"Taylor and Francis+NEJM","creator":"Sebastian Karcher","target":"^https?://(www\\.)?(tandfonline\\.com|nejm\\.org)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-02-12 22:42:23"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/\/doi\/abs\/10\.|\/doi\/full\/10\./)) {
		return "journalArticle";
	} else if(url.match(/\/action\/doSearch\?|\/toc\//) &&
		getTitles(doc).length) {
		return "multiple";
	}
},
};
transIds["dac476e4-401d-430a-8571-a97c31c3b65e"] = "Taylor and Francis+NEJM.js";


splittedTrans["taz.de.js"] = {
    "stamp": {"translatorID":"d84574f1-e4d6-4337-934f-bf9d01173bf0","label":"taz.de","creator":"Martin Meyerhoff","target":"^https?://(?:www\\.)?taz\\.de","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-06-11 22:07:16"},
    "detectWeb": function detectWeb(doc, url) {

	var taz_ArticleTitle_XPath = ".//div[@class='sectbody']//h1";
	var taz_Multiple_XPath = '//div[contains(@class, "first_page")]//a[h4]';
	var taz_Search_XPath = '//div[contains(@class, "searchresults")]//a[h4]'   	
	if (doc.evaluate(taz_ArticleTitle_XPath, doc, null, XPathResult.ANY_TYPE, null).iterateNext() ){ 
		//Zotero.debug("newspaperArticle");
		return "newspaperArticle";
	} else if (doc.evaluate(taz_Multiple_XPath, doc, null, XPathResult.ANY_TYPE, null).iterateNext() ){ 
		//Zotero.debug("multiple");
		return "multiple";
	}  else if (doc.evaluate(taz_Search_XPath, doc, null, XPathResult.ANY_TYPE, null).iterateNext() ){ 
		//Zotero.debug("multiple");
		return "multiple";
	}
},
};
transIds["d84574f1-e4d6-4337-934f-bf9d01173bf0"] = "taz.de.js";


splittedTrans["TEI.js"] = {
    "stamp": {"translatorID":"032ae9b7-ab90-9205-a479-baf81f49184a","translatorType":2,"label":"TEI","creator":"Stefan Majewski","target":"xml","minVersion":"2.1b3","maxVersion":null,"priority":25,"inRepository":true,"configOptions":{"dataMode":"xml/dom","getCollections":"true"},"displayOptions":{"exportNotes":false,"Export Tags":false,"Generate XML IDs":true,"Full TEI Document":false,"Export Collections":false},"lastUpdated":"2015-06-27 15:00:00"},
};
transIds["032ae9b7-ab90-9205-a479-baf81f49184a"] = "TEI.js";


splittedTrans["The Age.js"] = {
    "stamp": {"translatorID":"f94bad2d-0c76-4e8f-a0d3-970810093c6c","label":"The Age","creator":"Justin Warren","target":"^https?://www\\.theage\\.com\\.au/","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-04-15 18:04:37"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["f94bad2d-0c76-4e8f-a0d3-970810093c6c"] = "The Age.js";


splittedTrans["The Atlantic.js"] = {
    "stamp": {"translatorID":"575ba37f-c871-4ee8-8bdb-3e7f954e4e6a","label":"The Atlantic","creator":"Sebastian Karcher","target":"^https?://www\\.theatlantic\\.com","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2015-05-30 21:16:15"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["575ba37f-c871-4ee8-8bdb-3e7f954e4e6a"] = "The Atlantic.js";


splittedTrans["The Australian.js"] = {
    "stamp": {"translatorID":"393afc28-212d-47dd-be87-ec51bc7a58a4","label":"The Australian","creator":"Michael Berkowitz","target":"^https?://(searchresults|www.theaustralian)\\.news\\.com\\.au/","minVersion":"1.0.0b3.r1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"g","lastUpdated":"2014-04-04 10:17:34"},
    "detectWeb": function detectWeb(doc, url) {
	if (url == "http://searchresults.news.com.au/servlet/Search" || url.indexOf("siteSearch") != -1) {
		return "multiple";
	} else if (url.indexOf("story") != -1) {
		return "newspaperArticle";
	}
},
};
transIds["393afc28-212d-47dd-be87-ec51bc7a58a4"] = "The Australian.js";


splittedTrans["The Boston Globe.js"] = {
    "stamp": {"translatorID":"1f245496-4c1b-406a-8641-d286b3888231","label":"The Boston Globe","creator":"Adam Crymble, Frank Bennett, Sebastian Karcher","target":"^https?://(www|search|articles)\\.boston\\.com/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-04 09:54:41"},
    "detectWeb": function detectWeb(doc, url) {

	if (url.match("search.boston.com")) {
		// Search disabled until cross-domain can be dealt with
		return false;
		var results =  doc.evaluate('//div[@class="resultsMain"]//div[@class="regTZ"]/a[@class="titleLink"]', doc, null, XPathResult.ANY_TYPE, null);
		if (results.iterateNext()) {
			return "multiple";
		} else {
			return false;
		}
	} else if (url.match(/(\/[0-9]{4}\/[0-9]{2}\/|[0-9]{4}-[0-9]{2}-[0-9]{2})/)) {
		return "newspaperArticle";
	} 
},
};
transIds["1f245496-4c1b-406a-8641-d286b3888231"] = "The Boston Globe.js";


splittedTrans["The Chronicle of Higher Education.js"] = {
    "stamp": {"translatorID":"1e6d1529-246f-4429-84e2-1f1b180b250d","label":"The Chronicle of Higher Education","creator":"Simon Kornblith, Avram Lyon","target":"^https?://chronicle\\.com/","minVersion":"2.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2013-12-09 23:24:00"},
    "detectWeb": function detectWeb(doc, url) {
	/* The /daily/ and /weekly/ sections are leftover from the previous version
	   of the translator; they don't appear to still be on the Chronicle site, but
	   they might persist in older URLs. */
	var articleRegexp = /\/(daily|weekly|article|blogPost|blogs\/\w+)\/[^/]+\// ;
	if(articleRegexp.test(url) && ZU.xpathText(doc, '//h1')) {
		var section = url.match(articleRegexp);
		switch (section[1]) {
			case "weekly":
			case "daily":
			case "article":
				return "magazineArticle";
			case "blogPost":    
				return "blogPost";
			default:
				if (section[1].indexOf("blogs") !== -1)
					return "blogPost";
				return false;
		}
	} else {
		// This approach, used again below, is pretty crude.
		var aTags = doc.getElementsByTagName("a");
		for(var i=0; i<aTags.length; i++) {
			if(articleRegexp.test(aTags[i].href)) {
				return "multiple";
			}
		}
	}
},
};
transIds["1e6d1529-246f-4429-84e2-1f1b180b250d"] = "The Chronicle of Higher Education.js";


splittedTrans["The Daily Beast.js"] = {
    "stamp": {"translatorID":"3bdaeab1-2200-4e18-a68a-430d1cd50d21","label":"The Daily Beast","creator":"Sebastian Karcher","target":"^https?://(.*)thedailybeast\\.com","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-06-01 22:43:56"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["3bdaeab1-2200-4e18-a68a-430d1cd50d21"] = "The Daily Beast.js";


splittedTrans["The Economist.js"] = {
    "stamp": {"translatorID":"6ec8008d-b206-4a4c-8d0a-8ef33807703b","label":"The Economist","creator":"Michael Berkowitz","target":"^https?://(www\\.)?economist\\.com/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-04 09:55:12"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.location.href.indexOf("/search/") != -1) {
		return "multiple";
	} else if (ZU.xpathText(doc, '//h3[@class="headline"]')) {
		return "magazineArticle";
	} else if (ZU.xpathText(doc, '//div[@class="view-content"]//div[@class="article"]') || ZU.xpathText(doc, '//div[@id="column-content"]//section[contains(@class, "news-package")]')){
		return "multiple";
	} 

},
};
transIds["6ec8008d-b206-4a4c-8d0a-8ef33807703b"] = "The Economist.js";


splittedTrans["The Free Dictionary.js"] = {
    "stamp": {"translatorID":"0c661209-5ec8-402b-8f18-7dec6ae37d95","label":"The Free Dictionary","creator":"Michael Berkowitz","target":"http://(.*\\.)?thefreedictionary.com/\\w+$","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2012-03-05 03:44:25"},
    "detectWeb": function detectWeb(doc, url) {
	return "dictionaryEntry";
},
};
transIds["0c661209-5ec8-402b-8f18-7dec6ae37d95"] = "The Free Dictionary.js";


splittedTrans["The Globe and Mail.js"] = {
    "stamp": {"translatorID":"e0234bcf-bc56-4577-aa94-fe86a27f6fd6","label":"The Globe and Mail","creator":"Adam Crymble","target":"^https?://www\\.theglobeandmail\\.com/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"g","lastUpdated":"2015-06-02 21:28:35"},
    "detectWeb": function detectWeb(doc, url) {
	var namespace = doc.documentElement.namespaceURI;
	var nsResolver = namespace ? function(prefix) {
		if (prefix == 'x') return namespace; else return null;
	} : null;
	
	var metaTags = new Object();
	var metaTagHTML = doc.getElementsByTagName("meta");
	for (var i = 0 ; i < metaTagHTML.length ; i++) {
		metaTags[metaTagHTML[i].getAttribute("name")] = Zotero.Utilities.cleanTags(metaTagHTML[i].getAttribute("content"));
		
	}
		
	if (doc.evaluate('//div[@id="header"]/h2/a/img', doc, nsResolver, XPathResult.ANY_TYPE, null).iterateNext()) {	
		var printEdition1 = doc.evaluate('//div[@id="header"]/h2/a/img', doc, nsResolver, XPathResult.ANY_TYPE, null).iterateNext().src;
		if (printEdition1.match("printedition")) {
			return "newspaperArticle";
		}
	}
		
	if (doc.evaluate('//p[@id="continueReading"]/strong', doc, nsResolver, XPathResult.ANY_TYPE, null).iterateNext()) {
		var payPerView = doc.evaluate('//p[@id="continueReading"]/strong', doc, nsResolver, XPathResult.ANY_TYPE, null).iterateNext().textContent;
		if (payPerView == "purchase this article") {
			return "newspaperArticle";
		}
	}
	
	if (metaTags["article_id"]) {
		return "newspaperArticle";
		
	} else if (doc.title.match('globeandmail.com: Search')) {
		return "multiple";
	} 
	
	if (doc.evaluate('//ul[@id="utility"]/li[@class="email"]/a', doc, nsResolver, XPathResult.ANY_TYPE, null).iterateNext()) {
		var blogCheck = doc.evaluate('//ul[@id="utility"]/li[@class="email"]/a', doc, nsResolver, XPathResult.ANY_TYPE, null);
		var blogCheck1 = blogCheck.iterateNext().textContent;
		if (blogCheck1.match("blog")) { 
			if (doc.location.href.match("story")) {
			return "blogPost";
			}
		}
	}
},
};
transIds["e0234bcf-bc56-4577-aa94-fe86a27f6fd6"] = "The Globe and Mail.js";


splittedTrans["The Guardian.js"] = {
    "stamp": {"translatorID":"8e11559d-60f0-4a7f-bb91-99ac0c5a2d63","label":"The Guardian","creator":"Sebastian Karcher","target":"^https?://(www\\.)?(guardian\\.co\\.uk|theguardian\\.com)","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-02-24 20:04:08"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["8e11559d-60f0-4a7f-bb91-99ac0c5a2d63"] = "The Guardian.js";


splittedTrans["The Hamilton Spectator.js"] = {
    "stamp": {"translatorID":"c9338ed5-b512-4967-8ffe-ab9c973559ef","label":"The Hamilton Spectator","creator":"Adam Crymble","target":"^https?://www\\.thespec\\.com","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-12-12 13:55:59"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("/search/") != -1) {
		return "multiple";
	} else if (ZU.xpathText(doc, '//h1[@class="printable-title"]')) {
		return "newspaperArticle";
	}
},
};
transIds["c9338ed5-b512-4967-8ffe-ab9c973559ef"] = "The Hamilton Spectator.js";


splittedTrans["The Hindu (old).js"] = {
    "stamp": {"translatorID":"9499c586-d672-42d6-9ec4-ee9594dcc571","label":"The Hindu (old)","creator":"Prashant Iyengar and Michael Berkowitz","target":"^https?://(www\\.)?hindu\\.com/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-02 21:30:30"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.evaluate('//h2[@class="r"]/a[@class="l"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
	  		return "multiple";
	  	} else {
		  	return "newspaperArticle";
	}
},
};
transIds["9499c586-d672-42d6-9ec4-ee9594dcc571"] = "The Hindu (old).js";


splittedTrans["The Hindu.js"] = {
    "stamp": {"translatorID":"06142d59-fa9c-48c3-982b-6e7c67d3d6b8","label":"The Hindu","creator":"Piyush Srivastava","target":"https?://www\\.thehindu\\.com/.*ece","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcv","lastUpdated":"2013-11-19 08:23:18"},
    "detectWeb": function detectWeb(doc, url) {
    return "newspaperArticle";
},
};
transIds["06142d59-fa9c-48c3-982b-6e7c67d3d6b8"] = "The Hindu.js";


splittedTrans["The Met.js"] = {
    "stamp": {"translatorID":"72dbad15-cd1a-4d52-b2ed-7d67f909cada","label":"The Met","creator":"Aurimas Vinckevicius","target":"^https?://metmuseum\\.org/collection/the-collection-online/search","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2014-07-09 01:41:36"},
    "detectWeb": function detectWeb(doc, url) {
	if(doc.getElementsByClassName('tombstone')[0]) return 'artwork';
	
	if(getSearchResults(doc)) return 'multiple';
},
};
transIds["72dbad15-cd1a-4d52-b2ed-7d67f909cada"] = "The Met.js";


splittedTrans["The Microfinance Gateway.js"] = {
    "stamp": {"translatorID":"2cd7d362-5fba-423a-887f-579ed343e751","label":"The Microfinance Gateway","creator":"Sebastian Karcher","target":"http://(www\\.)?microfinancegateway\\.org/p/site/m/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-03-31 00:27:45"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["2cd7d362-5fba-423a-887f-579ed343e751"] = "The Microfinance Gateway.js";


splittedTrans["The Nation.js"] = {
    "stamp": {"translatorID":"0d6f8450-72e8-4d8f-bdc2-b7fa03e6f2c5","label":"The Nation","creator":"odie5533","target":"^https?://www\\.thenation\\.com/","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-06-02 21:32:54"},
    "detectWeb": function detectWeb(doc, url) {
	if (!xpath_string(doc, doc, XPATH_TITLE))
		return;
	if (url.match(RE_ARTICLE_URL))
		return "magazineArticle";
	else
		return "multiple";
},
};
transIds["0d6f8450-72e8-4d8f-bdc2-b7fa03e6f2c5"] = "The Nation.js";


splittedTrans["The New Republic.js"] = {
    "stamp": {"translatorID":"1bfb4748-3925-4de6-bcb4-5de2967f6d3f","label":"The New Republic","creator":"Sebastian Karcher","target":"^https?://(www\\.)?newrepublic\\.com","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-06-11 22:48:38"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["1bfb4748-3925-4de6-bcb4-5de2967f6d3f"] = "The New Republic.js";


splittedTrans["The New York Review of Books.js"] = {
    "stamp": {"translatorID":"4c164cc8-be7b-4d02-bfbf-37a5622dfd56","label":"The New York Review of Books","creator":"Simon Kornblith, Avram Lyon","target":"^https?://www\\.nybooks\\.com/","minVersion":"1.0.0b3.r1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-03-12 21:39:50"},
    "detectWeb": function detectWeb(doc, url) {
	//don't stick to Google adsense pages
	if ( !Zotero.Utilities.xpathText(doc,
			'//body/*[not(self::iframe) and not(self::script) and not(self::style)]//*[normalize-space(text())]',
			null, '').trim() ) return null;
	return FW.detectWeb(doc, url);
},
};
transIds["4c164cc8-be7b-4d02-bfbf-37a5622dfd56"] = "The New York Review of Books.js";


splittedTrans["The New Yorker.js"] = {
    "stamp": {"translatorID":"0fba73bf-f113-4d36-810f-2c654fa985fb","label":"The New Yorker","creator":"Sebastian Karcher","target":"^https?://www\\.newyorker\\.com","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2012-09-24 18:13:02"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["0fba73bf-f113-4d36-810f-2c654fa985fb"] = "The New Yorker.js";


splittedTrans["The Open Library.js"] = {
    "stamp": {"translatorID":"96b54986-16c7-45ea-b296-fde962d658b2","label":"The Open Library","creator":"Sebastian Karcher","target":"^https?://openlibrary\\.org","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2013-04-17 03:10:37"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.match(/\/search\?/)) {
		return "multiple";
	} else if (url.search(/\/works\/OL\d+W\//)!=-1){
		if (ZU.xpathText(doc, '//h1/span/a[@title="View this edition"]')) return "book";
		else if (ZU.xpathText(doc, '//table[@id="editions"]/tbody/tr[1]/td/div[@class="title"]')); return "multiple"
	} else  if (url.search(/\/books\/OL\d+M\//)!=-1){
		return "book";
	}
},
};
transIds["96b54986-16c7-45ea-b296-fde962d658b2"] = "The Open Library.js";


splittedTrans["The Telegraph.js"] = {
    "stamp": {"translatorID":"40b9ca22-8df4-4f3b-9cb6-8f9b55486d30","label":"The Telegraph","creator":"Reino Ruusu","target":"^https?://[^/]*telegraph\\.co\\.uk/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2013-12-12 13:59:44"},
    "detectWeb": function detectWeb(doc, url) {
	if (ZU.xpath(doc, '//meta[@name = "tmgads.articleid"]').length) {
		if(ZU.xpathText(doc, '//meta[@name="tmgads.channel"]/@content') == 'blogs'){
			return 'blogPost';
		} else {
			return 'newspaperArticle';
		}
	} else if (url.indexOf('queryText') != -1) {
		if(getLinks(doc, url).length) {
			return 'multiple';
		}
	} else if(getLinks(doc, url).length) {
		return "multiple";
	}
},
};
transIds["40b9ca22-8df4-4f3b-9cb6-8f9b55486d30"] = "The Telegraph.js";


splittedTrans["The Times UK.js"] = {
    "stamp": {"translatorID":"53f8d182-4edc-4eab-b5a1-141698a10101","label":"The Times and Sunday Times","creator":"Andrew Brown","target":"^https?://www\\.thetimes\\.co\\.uk/.+ece$","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"g","lastUpdated":"2014-04-04 10:00:38"},
    "detectWeb": function detectWeb(doc, url) {
	return "newspaperArticle" ;
},
};
transIds["53f8d182-4edc-4eab-b5a1-141698a10101"] = "The Times UK.js";


splittedTrans["Theory of Computing.js"] = {
    "stamp": {"translatorID":"558babe7-5fca-47ea-af0f-2d9bb5bc5e53","label":"Theory of Computing","creator":"Piyush Srivastava","target":"^https?://(theoryofcomputing\\.org|toc\\.cse\\.iitk\\.ac\\.in|cs\\.anu\\.edu\\.au/publications/toc|toc\\.ilab\\.sztaki\\.hu|toc\\.nada\\.kth\\.se|tocmirror\\.cs\\.tau\\.ac\\.il)/articles/[vg].*(/|html?)$","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcv","lastUpdated":"2013-11-19 08:23:18"},
    "detectWeb": function detectWeb(doc, url){
	if (surveyRegexp.test(url))
		return "book";
	else
		return "journalArticle";
},
};
transIds["558babe7-5fca-47ea-af0f-2d9bb5bc5e53"] = "Theory of Computing.js";


splittedTrans["Time.com.js"] = {
    "stamp": {"translatorID":"d9be934c-edb9-490c-a88d-34e2ee106cd7","label":"Time.com","creator":"Michael Berkowitz","target":"^https?://([^/]*\\.)?time.com/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsv","lastUpdated":"2014-10-25 07:16:36"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf('results.html') != -1) {
		return "multiple";
	} else if (url.search(/\/article\/|\d{4}\/\d{2}\/\d{2}\/./) != -1
		|| ZU.xpath(doc, '//section[@class="article-body"]/div[@class="issue-date"]').length
		|| doc.getElementsByClassName('active').length
	) {
		return "magazineArticle";
	}
	// TODO: detect new content on scroll, beacause we should not detect on
	// ads and ToC content
},
};
transIds["d9be934c-edb9-490c-a88d-34e2ee106cd7"] = "Time.com.js";


splittedTrans["Toronto Star.js"] = {
    "stamp": {"translatorID":"6b0b11a6-9b77-4b49-b768-6b715792aa37","label":"Toronto Star","creator":"Adam Crymble, Avram Lyon","target":"^https?://www\\.thestar\\.com","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-04 10:01:02"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("search") != -1 && url.indexOf("classifieds") == -1) {
		return "multiple";
	} else if (ZU.xpathText(doc, '//div[@class="article-headline"]/h2|//div[@class="article-headline"]/h1')) {
		return "newspaperArticle";
	} else if (ZU.xpathText(doc, '//div[@class="blog-headline"]/strong', doc)){
		return "blogPost"
	}
},
};
transIds["6b0b11a6-9b77-4b49-b768-6b715792aa37"] = "Toronto Star.js";


splittedTrans["Treesearch.js"] = {
    "stamp": {"translatorID":"4ee9dc8f-66d3-4c18-984b-6335408a24af","label":"Treesearch","creator":"Aurimas Vinckevicius","target":"^https?://([^/]+\\.)?treesearch\\.fs\\.fed\\.us/(pubs/\\d+$|search.php)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-11-04 04:02:47"},
    "detectWeb": function detectWeb(doc, url) {
	if(url.match(/\/pubs\/\d+$/)) {
		var entry = doc.getElementById('publicationLayoutLeftSide');
		if (!entry) return;
		
		var source = parseSource(getFieldValue(entry, 'Source'));
		return source ? source.type : null;
	} else if(url.indexOf('search.php') != -1 && getSearchResults(doc, true)) {
		return 'multiple';
	}
},
};
transIds["4ee9dc8f-66d3-4c18-984b-6335408a24af"] = "Treesearch.js";


splittedTrans["TV by the Numbers.js"] = {
    "stamp": {"translatorID":"180a62bf-efdd-4d38-8d85-8971af04dd85","label":"TV by the Numbers","creator":"odie5533","target":"^https?://tvbythenumbers\\.com/","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"g","lastUpdated":"2015-06-10 10:48:25"},
    "detectWeb": function detectWeb(doc, url) {
	/* site has lots of garbage, check we're on the right doc */
	if (!xpath_string(doc, doc, XPATH_TITLE))
		return;
	var posts = doc.evaluate("count(//div[@class='post-alt blog'])", doc, null,
		XPathResult.NUMBER_TYPE, null).numberValue;
	if (posts  == 1)
		return "webpage";
	else if (posts > 1)
		return "multiple";
},
};
transIds["180a62bf-efdd-4d38-8d85-8971af04dd85"] = "TV by the Numbers.js";


splittedTrans["TVNZ.js"] = {
    "stamp": {"translatorID":"649c2836-a94d-4bbe-8e28-6771f283702f","label":"TVNZ","creator":"Sopheak Hean","target":"^https?://tvnz\\.co\\.nz","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-04 10:01:57"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf("/search/") !=-1){
		return "multiple";
	} 
	else if ((url.indexOf("politics-news/") !=-1) && (url.indexOf("-video") !=-1) 
	|| (url.indexOf("politics-news/") !=-1) && (url.indexOf("/video") !=-1)
	|| (url.indexOf("business-news/") !=-1) && (url.indexOf("-video") !=-1)
	|| (url.indexOf("national-news/") !=-1) && (url.indexOf("-video") !=-1)
	|| (url.indexOf("breakfast-news/") !=-1) && (url.indexOf("-video") !=-1)
	|| (url.indexOf("breakfast-news/") !=-1) && (url.indexOf("/video") !=-1)
	|| (url.indexOf("world-news/") !=-1) && (url.indexOf("-video") !=-1)
	|| (url.indexOf("all-blacks/") !=-1) && (url.indexOf("-video") !=-1)
	|| (url.indexOf("weather/") !=-1) && (url.indexOf("-video") !=-1)
	|| (url.indexOf("-news/") !=-1) && (url.indexOf("-video") !=-1)
	|| (url.indexOf("-news/") !=-1) && (url.indexOf("/video") !=-1)
	|| (url.indexOf("on/") !=-1) && (url.indexOf("-video") !=-1)
	|| (url.indexOf("up/") !=-1) &&  (url.indexOf("/video") !=-1)){
		return "tvBroadcast";
	} 
	else if ((url.indexOf("news/") !=-1) || (url.indexOf("all-blacks/") !=-1) || (url.indexOf("up/")!=-1)){
		return "newspaperArticle";
	} 
},
};
transIds["649c2836-a94d-4bbe-8e28-6771f283702f"] = "TVNZ.js";


splittedTrans["Twitter.js"] = {
    "stamp": {"translatorID":"31659710-d04e-45d0-84ba-8e3f5afc4a54","label":"Twitter","creator":"Avram Lyon","target":"^https?://(?:[^/]+\\.)?twitter\\.com\\/","minVersion":"4.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsb","lastUpdated":"2014-04-05 23:54:59"},
    "detectWeb": function detectWeb(doc, url) {
	if(doc.getElementById('page-container')) {
		Z.monitorDOMChanges(doc.getElementById('page-container'), {childList: true});
	}
	return FW.detectWeb(doc, url);
},
};
transIds["31659710-d04e-45d0-84ba-8e3f5afc4a54"] = "Twitter.js";


splittedTrans["unAPI.js"] = {
    "stamp": {"translatorID":"e7e01cac-1e37-4da6-b078-a0e8343b0e98","label":"unAPI","creator":"Simon Kornblith","target":"","minVersion":"2.1","maxVersion":"","priority":300,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2015-06-04 03:25:27"},
    "detectWeb": function detectWeb(doc, url) {
	// get unAPI IDs
	var ids = getUnAPIIDs(doc);
	if(!ids.length) return false;
	
	// now we need to see if the server actually gives us bibliographic metadata, and determine the
	// type
	Zotero.wait();
	
	if(!ids.length === 1) {
		// Only one item, so we will just get its item type
		ids[0].getItemType(Zotero.done);
	} else {
		// Several items. We will need to call determineDetectItemType
		determineDetectItemType(ids);
	}
},
};
transIds["e7e01cac-1e37-4da6-b078-a0e8343b0e98"] = "unAPI.js";


splittedTrans["Unqualified Dublin Core RDF.js"] = {
    "stamp": {"translatorID":"6e372642-ed9d-4934-b5d1-c11ac758ebb7","translatorType":2,"label":"Unqualified Dublin Core RDF","creator":"Simon Kornblith","target":"rdf","minVersion":"1.0.0b3.r1","maxVersion":"","priority":100,"browserSupport":"gcsn","configOptions":{"dataMode":"rdf/xml"},"inRepository":true,"lastUpdated":"2011-07-08 04:51:41"},
};
transIds["6e372642-ed9d-4934-b5d1-c11ac758ebb7"] = "Unqualified Dublin Core RDF.js";


splittedTrans["UPCommons.js"] = {
    "stamp": {"translatorID":"0abd577b-ec45-4e9f-9081-448737e2fd34","label":"UPCommons","creator":"Sebastian Karcher","target":"^https?://upcommons\\.upc\\.edu","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-02-08 12:01:01"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.evaluate('//table[@class="itemDisplayTable"]', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		var type = ZU.xpathText(doc, '//meta[@name="DC.type"]/@content');
		if(itemTypes[type]!=null) return itemTypes[type];
		else return "document";
	} else if (doc.evaluate('//table[@class="miscTable"]//td[2]', doc, null, XPathResult.ANY_TYPE, null).iterateNext() || doc.evaluate('//div[@id="main"]/ul[@class="browselist"]/li/a', doc, null, XPathResult.ANY_TYPE, null).iterateNext()) {
		return "multiple";
	}
},
};
transIds["0abd577b-ec45-4e9f-9081-448737e2fd34"] = "UPCommons.js";


splittedTrans["UpToDate References.js"] = {
    "stamp": {"translatorID":"70dc2609-d6fd-415a-822c-a2c04293cb5a","label":"UpToDate References","creator":"Sebastian Karcher","target":"^https?://www\\.uptodate\\.com/contents/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcv","lastUpdated":"2014-06-12 18:56:25"},
    "detectWeb": function detectWeb(doc, url) {
	if (ZU.xpathText(doc, '//ol[@id="reference"]//a')) return "multiple";
	else if (ZU.xpathText(doc, '//div[@class="abstractRow"]/div[@class="label" and contains(text(), "TI")]')) return "journalArticle";
},
};
transIds["70dc2609-d6fd-415a-822c-a2c04293cb5a"] = "UpToDate References.js";


splittedTrans["US National Archives Research Catalog.js"] = {
    "stamp": {"translatorID":"f8b5501a-1acc-4ffa-a0a5-594add5e6bd3","label":"US National Archives Research Catalog","creator":"Adam Crymble","target":"^https?://arcweb\\.archives\\.gov","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcs","lastUpdated":"2012-03-02 00:20:49"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.location.href.match("ShowArchivalDescriptions") || doc.location.href.match("ShowDODescriptions")) {
		return "multiple";
	} else if (doc.location.href.match("ShowFullRecord") && doc.location.href.match("showFullDescriptionTabs/details")) {
		return "book";
	}
},
};
transIds["f8b5501a-1acc-4ffa-a0a5-594add5e6bd3"] = "US National Archives Research Catalog.js";


splittedTrans["Vanderbilt eJournals.js"] = {
    "stamp": {"translatorID":"882f70a8-b8ad-403e-bd76-cb160224999d","label":"Vanderbilt eJournals","creator":"Michael Berkowitz and Aurimas Vinckevicius","target":"http://ejournals.library.vanderbilt.edu/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-02-08 12:00:11"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.indexOf('/article/view/') != -1) {
		return "journalArticle";
	} else if ( url.indexOf('/issue/view') != -1 ||
				( ( url.indexOf('/search/advancedResults') != -1 ||
					url.indexOf('/search/results') != -1 ) &&
					!ZU.xpath(doc, '//td[text()="No Results"]').length ) ) {
		return "multiple";
	}
},
};
transIds["882f70a8-b8ad-403e-bd76-cb160224999d"] = "Vanderbilt eJournals.js";


splittedTrans["Vanity Fair.js"] = {
    "stamp": {"translatorID":"62f46e1a-4c40-4dbb-82aa-71cdeb14f1bc","label":"Vanity Fair","creator":"Sebastian Karcher","target":"^https?://www\\.vanityfair\\.com","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-12-13 20:24:18"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["62f46e1a-4c40-4dbb-82aa-71cdeb14f1bc"] = "Vanity Fair.js";


splittedTrans["Verniana-Jules Verne Studies.js"] = {
    "stamp": {"translatorID":"cdf8269c-86b9-4039-9bc4-9d998c67740e","label":"Verniana-Jules Verne Studies","creator":"Aurimas Vinckevicius","target":"https?://[^/]*verniana.org(:\\d+)?/volumes/\\d+/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-03-01 01:22:04"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["cdf8269c-86b9-4039-9bc4-9d998c67740e"] = "Verniana-Jules Verne Studies.js";


splittedTrans["Vimeo.js"] = {
    "stamp": {"translatorID":"1b0ffe71-1c2f-4a79-b894-40b990b3e491","label":"Vimeo","creator":"Sebastian Karcher","target":"^https?://(www\\.)?vimeo\\.com","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2013-07-25 23:57:48"},
    "detectWeb": function detectWeb(doc, url) {
	//the meta properties are missing once you're logged in
	var xpath = '//meta[@property="og:video:type"]|//div[@class="video_meta"]';
	if (ZU.xpath(doc, xpath).length > 0) {
		return "videoRecording";
	}

	if (url.match(/vimeo\.com\/search\?q=/)) {
		return "multiple";
	}
	return false;
},
};
transIds["1b0ffe71-1c2f-4a79-b894-40b990b3e491"] = "Vimeo.js";


splittedTrans["VoxEU.js"] = {
    "stamp": {"translatorID":"508e8fb9-8a33-4095-844f-133cba7e7b54","label":"VoxEU","creator":"Sebastian Karcher","target":"^https?://(www\\.)?voxeu\\.org","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-09-24 18:36:06"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["508e8fb9-8a33-4095-844f-133cba7e7b54"] = "VoxEU.js";


splittedTrans["Wanfang Data.js"] = {
    "stamp": {"translatorID":"eb876bd2-644c-458e-8d05-bf54b10176f3","label":"Wanfang Data","creator":"Ace Strong <acestrong@gmail.com>","target":"^https?://[ds]\\.(?:g\\.)?wanfangdata\\.com\\.cn","minVersion":"2.0rc1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcs","lastUpdated":"2014-07-24 01:37:16"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.toLowerCase().indexOf('paper.aspx') != -1
		&& getSearchResults(doc, true)
	) {
		return "multiple";
	}
	
	pattern = /[ds]\.(?:g\.)?wanfangdata\.com\.cn/;
	if (pattern.test(url) && getItemId(doc)) {
		var code = detectCode(url);
		return detectType(code);
	}

	return false;
},
};
transIds["eb876bd2-644c-458e-8d05-bf54b10176f3"] = "Wanfang Data.js";


splittedTrans["Washington Monthly.js"] = {
    "stamp": {"translatorID":"e623eec7-ad54-4201-b709-654bf3fd7f70","label":"Washington Monthly","creator":"Sebastian Karcher","target":"^https?://www\\.washingtonmonthly\\.com","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2012-10-15 21:45:56"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["e623eec7-ad54-4201-b709-654bf3fd7f70"] = "Washington Monthly.js";


splittedTrans["washingtonpost.com.js"] = {
    "stamp": {"translatorID":"d1bf1c29-4432-4ada-8893-2e29fc88fd9e","label":"washingtonpost.com","creator":"Sebastian Karcher","target":"^https?://www\\.washingtonpost\\.com/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-09-15 21:03:03"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["d1bf1c29-4432-4ada-8893-2e29fc88fd9e"] = "washingtonpost.com.js";


splittedTrans["Web of Science Tagged.js"] = {
    "stamp": {"translatorID":"594ebe3c-90a0-4830-83bc-9502825a6810","label":"Web of Science Tagged","creator":"Michael Berkowitz, Avram Lyon","target":"txt","minVersion":"2.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":1,"browserSupport":"gcsibv","lastUpdated":"2015-06-02 21:33:13"},
"detectImport": function detectImport() {
	var line;
	var i = 0;
	while((line = Zotero.read()) !== false) {
		line = line.replace(/^\s+/, "");
		if(line != "") {
			if(line.substr(0, 4).match(/^PT [A-Z]/)) {
				return true;
			} else {
				if(i++ > 3) {
					return false;
				}
			}
		}
	}
},};
transIds["594ebe3c-90a0-4830-83bc-9502825a6810"] = "Web of Science Tagged.js";


splittedTrans["Web of Science.js"] = {
    "stamp": {"translatorID":"88e11bcb-464d-4b6d-a446-8994e3b865c9","label":"Web of Science","creator":"Philipp Zumstein","target":"^https?://([^/]+\\.)?webofknowledge\\.com/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2015-06-04 04:20:22"},
    "detectWeb": function detectWeb(doc, url) {
	if ( (url.indexOf("full_record.do") !== -1
		|| url.indexOf("CitedFullRecord.do") !== -1
		|| url.indexOf("InboundService.do") != -1)
		&& getSingleItemId(doc)
	) {
		return "journalArticle";
	} else if (((doc.title.indexOf(" Results") !== -1) 
		|| url.indexOf("search_mode=") !== -1)
		&& getRecords(doc).length) {
		return "multiple";
	}
},
};
transIds["88e11bcb-464d-4b6d-a446-8994e3b865c9"] = "Web of Science.js";


splittedTrans["Welt Online.js"] = {
    "stamp": {"translatorID":"f61beec2-1431-4218-a9d3-68063ede6ecd","label":"Welt Online","creator":"Martin Meyerhoff","target":"^https?://www\\.welt\\.de","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-04 10:02:57"},
    "detectWeb": function detectWeb(doc, url) {
	var welt_article_XPath = '//div[@id="main"]//h1';
	var welt_multiple_XPath = "//h4[contains(@class, 'headline')]/a";
	//Z.debug(ZU.xpathText(doc, welt_multiple_XPath))
	if (ZU.xpathText(doc, welt_article_XPath) ){ 
		Zotero.debug("newspaperArticle");
		return "newspaperArticle";
	} 	else if (ZU.xpathText(doc, welt_multiple_XPath)){ 
		Zotero.debug("multiple");
		return "multiple"; 
	} 
},
};
transIds["f61beec2-1431-4218-a9d3-68063ede6ecd"] = "Welt Online.js";


splittedTrans["Wikimedia Commons.js"] = {
    "stamp": {"translatorID":"c70055c3-a525-45db-8e37-726c6c2ad034","label":"Wikimedia Commons","creator":"Sebastian Karcher","target":"^https?://commons\\.wikimedia\\.org","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-01-05 12:45:00"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["c70055c3-a525-45db-8e37-726c6c2ad034"] = "Wikimedia Commons.js";


splittedTrans["Wikipedia Citation Templates.js"] = {
    "stamp": {"translatorID":"3f50aaac-7acc-4350-acd0-59cb77faf620","translatorType":2,"label":"Wikipedia Citation Templates","creator":"Simon Kornblith","target":"txt","minVersion":"1.0.0b4.r1","maxVersion":"","priority":100,"displayOptions":{"exportCharset":"UTF-8"},"browserSupport":"gcs","inRepository":true,"lastUpdated":"2015-02-21 07:16:26"},
};
transIds["3f50aaac-7acc-4350-acd0-59cb77faf620"] = "Wikipedia Citation Templates.js";


splittedTrans["Wikipedia.js"] = {
    "stamp": {"translatorID":"e5dc9733-f8fc-4c00-8c40-e53e0bb14664","label":"Wikipedia","creator":"Aurimas Vinckevicius","target":"https?://[^/]*wikipedia\\.org/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2015-02-16 04:51:10"},
    "detectWeb": function detectWeb(doc, url) {
	if(doc.getElementById('firstHeading')) {
		return 'encyclopediaArticle';
	}
},
};
transIds["e5dc9733-f8fc-4c00-8c40-e53e0bb14664"] = "Wikipedia.js";


splittedTrans["Wikisource.js"] = {
    "stamp": {"translatorID":"076bd26a-1517-469d-85e9-31316a6f6cb0","label":"Wikisource","creator":"Sebastian Karcher","target":"^https?://en\\.wikisource\\.org/w","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-11-27 01:46:02"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["076bd26a-1517-469d-85e9-31316a6f6cb0"] = "Wikisource.js";


splittedTrans["Wildlife Biology in Practice.js"] = {
    "stamp": {"translatorID":"b33af0e1-d122-45b2-b144-4b4eedd12d5d","label":"Wildlife Biology in Practice","creator":"Michael Berkowitz and Aurimas Vinckevicius","target":"http://[^/]*socpvs\\.org/journals/index\\.php/wbp","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2012-07-27 22:28:21"},
    "detectWeb": function detectWeb(doc, url) {
	//Google adsense first loads an empty page, and then reloads the page properly
	//discard the empty page
	if ( !Zotero.Utilities.xpath(doc,'//body/*[not(self::iframe) and not(self::script)]').length ) return null;

	if (url.indexOf('/showToc') != -1 || 
		( url.indexOf('/search/results') != -1 && Zotero.Utilities.xpath(doc, '//tr[td/a[2]]').length ) ) {
		return "multiple";
	} else if (url.indexOf('/article/viewArticle/') != -1) {
		return "journalArticle";
	}
},
};
transIds["b33af0e1-d122-45b2-b144-4b4eedd12d5d"] = "Wildlife Biology in Practice.js";


splittedTrans["Wiley Online Library.js"] = {
    "stamp": {"translatorID":"fe728bc9-595a-4f03-98fc-766f1d8d0936","label":"Wiley Online Library","creator":"Sean Takats, Michael Berkowitz, Avram Lyon and Aurimas Vinckevicius","target":"^https?://onlinelibrary\\.wiley\\.com[^\\/]*/(?:book|doi|advanced/search|search-web/cochrane|cochranelibrary/search|o/cochrane/(clcentral|cldare|clcmr|clhta|cleed|clabout)/articles/.+/sect0.html)","minVersion":"3.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsib","lastUpdated":"2015-06-04 16:47:36"},
    "detectWeb": function detectWeb(doc, url) {
	//monitor for site changes on Cochrane
	if(doc.getElementsByClassName('cochraneSearchForm').length && doc.getElementById('searchResultOuter')) {
		Zotero.monitorDOMChanges(doc.getElementById('searchResultOuter'));
	}
	
	if (url.indexOf('/issuetoc') != -1 ||
		url.indexOf('/results') != -1 ||
		url.indexOf('/search') != -1 ||
		url.indexOf('/mainSearch?') != -1
	) {
		if(getSearchResults(doc, url).length) return 'multiple';
	} else if (url.indexOf('/book/') != -1 ) {
		//if the book has more than one chapter, scrape chapters
		if(getSearchResults(doc, url).length > 1) return 'multiple';
		//otherwise, import book
		return 'book'; //does this exist?
	} else if ( ZU.xpath(doc, '//meta[@name="citation_book_title"]').length ) {
		return 'bookSection';
	} else {
		return 'journalArticle';
	}
},
};
transIds["fe728bc9-595a-4f03-98fc-766f1d8d0936"] = "Wiley Online Library.js";


splittedTrans["Winnipeg Free Press.js"] = {
    "stamp": {"translatorID":"1d82cbdf-703d-4f96-9ae2-246af21bb96e","translatorType":4,"label":"Winnipeg Free Press","creator":"Adam Crymble","target":"http://www.winnipegfreepress","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"lastUpdated":"2008-08-06 17:00:00"},
    "detectWeb": function detectWeb(doc, url) {
	if (doc.location.href.match("articles") || doc.location.href.match("story")) {
		return "newspaperArticle";
	}
},
};
transIds["1d82cbdf-703d-4f96-9ae2-246af21bb96e"] = "Winnipeg Free Press.js";


splittedTrans["WIPO.js"] = {
    "stamp": {"translatorID":"039338fc-d84f-44bf-99e4-693cc91b569f","label":"WIPO","creator":"Sebastian Karcher","target":"^https?://patentscope\\.wipo\\.int","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2013-04-15 18:04:37"},
    "detectWeb": function detectWeb(doc,url) {
	var xpath='//meta[@content="Patent Application"]';
		
	if (ZU.xpath(doc, xpath).length > 0) {
		return "patent";
	}
			
	if (url.match(/\/search\/.+&filter=PCT&/)) {
		return "multiple";
	}

	return false;
},
};
transIds["039338fc-d84f-44bf-99e4-693cc91b569f"] = "WIPO.js";


splittedTrans["wiso.js"] = {
    "stamp": {"translatorID":"136d5c30-d8b1-476f-9564-702a41b6126e","label":"wiso","creator":"Philipp Zumstein","target":"^https?://www\\.wiso-net\\.de/webcgi\\?","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsv","lastUpdated":"2014-11-03 23:58:44"},
    "detectWeb": function detectWeb(doc, url) {
	if (url.search(/START=A[246]0/) !== -1) {
		if( ZU.xpath(doc, '//a[contains(@class, "boxExport")]').length>0 ) {
			//single item --> generic fallback = journalArticle
			return "journalArticle";
		}
	} else if ( ZU.xpath(doc, '//a/span[contains(@class, "boxHeader")]').length>0 ) {
		return "multiple";
	}
},
};
transIds["136d5c30-d8b1-476f-9564-702a41b6126e"] = "wiso.js";


splittedTrans["World History Connected.js"] = {
    "stamp": {"translatorID":"0507797c-9bc4-4374-92ca-9e3763b6922b","label":"World History Connected","creator":"Frederick Gibbs","target":"worldhistoryconnected\\.press|historycooperative.*/whc/","minVersion":"1.0.0b4.r5","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-02-27 23:05:02"},
    "detectWeb": function detectWeb(doc, url) {
	if(doc.title.indexOf("Contents") != -1 ) {
		return 'multiple';
	} else if( doc.title.indexOf("Search results") != -1 &&
		Zotero.Utilities.xpath(doc, '/html/body/dl/dt/strong/a[starts-with(text(),"World History Connected | Vol.")]').length ) {
		return 'multiple';
	} else if( url.match(/\/\d+\.\d+\/[^\/]+/) ) {
		return 'journalArticle';
	}
},
};
transIds["0507797c-9bc4-4374-92ca-9e3763b6922b"] = "World History Connected.js";


splittedTrans["World Shakespeare Bibliography Online.js"] = {
    "stamp": {"translatorID":"bf6b49e3-9198-4fbc-a559-a81fcfcce908","label":"World Shakespeare Bibliography Online","creator":"Matthias Heim","target":"^https?://(?:www\\.)?worldshakesbib\\.org","minVersion":"1.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcs","lastUpdated":"2014-06-11 22:48:03"},
    "detectWeb": function detectWeb(doc, url) {
	// records are always contained within a div with the id 'records'
	if (doc.getElementById("records")!= null) {
		var records_content=doc.getElementById("records").innerHTML;
		// each entry is always presented in a table beginning in the same string
 	   var first_entry=records_content.indexOf("<tbody><tr><td><b>Index Location</b></td>"); // at least one entry present
		if (first_entry != -1) { // at least one entry is present
			// a note on "multiple"
			// This only works on the "View Saved Entries" (http://www.worldshakesbib.org/export) page, not in the search!
			// Completely different code would be necessary for browse or search pages
			// Since this page always already represents a selection made by the user, the handler will indiscriminately save all items, and not offer an Item Selection Dialogue
			// TODO: either behaviour may of course be changed in subsequent versions
			
			if (records_content.indexOf("<tbody><tr><td><b>Index Location</b></td>",first_entry+1)!=-1)	return "multiple"; // several entries present
		
			// if only one entry is present, its type can be retrieved from the 'Document type' entry in the table
			// e.g. <tr><td><b>Document Type</b></td><td>Article</td></tr>
			// Note that Article can also mean bookSection, a distinction that only the doWeb function will test, as it involves a GET command
			document_type=records_content.substring(startindex=(records_content.indexOf("<tr><td><b>Document Type</b></td><td>")+37),records_content.indexOf("</td>",startindex));
			switch (document_type) {
				case "Article":
					return "journalArticle"; // but could equally be "bookSection", see above
					break;
				case "Book monograph":
				case "Book collection": // Zotero does not distinguish the two
					return "book"
					break;
				case "Dissertation":
					return "thesis"
					break;
				case "Production":
					// this is most likely a theatre production, but videoRecording offers the closest alternative in Zotero
					return "videoRecording";
					break;
				case "Audio Recording":
					return "audioRecording";
					break;
				case "Film":
					return "film";
					break;
				default:
					// unrecognized item? return empty, as no entry present
			}
		} // else no entry present
	}
},
};
transIds["bf6b49e3-9198-4fbc-a559-a81fcfcce908"] = "World Shakespeare Bibliography Online.js";


splittedTrans["WorldCat Discovery Service.js"] = {
    "stamp": {"translatorID":"fd8dc5f6-a6dd-42b2-948f-600f5da844ea","label":"WorldCat Discovery Service","creator":"Sebastian Karcher","target":"^https?://[^/]+\\.worldcat\\.org/","minVersion":"3.0.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2015-06-27 03:23:48"},
    "detectWeb": function detectWeb(doc, url) {

	var results = getSearchResults(doc);
	if (results.length) {
		return "multiple";
	}


	//single result
	// generate item and return type
	var co = getFirstContextObj(doc);
	if (!co | url.indexOf("?databaseList") == -1) return false;

	return generateItem(doc, co).itemType;
},
};
transIds["fd8dc5f6-a6dd-42b2-948f-600f5da844ea"] = "WorldCat Discovery Service.js";


splittedTrans["wsj.js"] = {
    "stamp": {"translatorID":"53f8d182-4edc-4eab-b5a1-141698a1303b","label":"Wall Street Journal","creator":"Sebastian Karcher","target":"^https?://(online|blogs|www)?\\.wsj\\.com/","minVersion":"2.1","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2014-12-14 16:21:10"},
    "detectWeb": function detectWeb(doc, url) { return FW.detectWeb(doc, url); },
};
transIds["53f8d182-4edc-4eab-b5a1-141698a1303b"] = "wsj.js";


splittedTrans["XML ContextObject.js"] = {
    "stamp": {"translatorID":"24d9f058-3eb3-4d70-b78f-1ba1aef2128d","label":"XML ContextObject","creator":"Avram Lyon and Simon Kornblith","target":"ctx","minVersion":"3.0","maxVersion":"","priority":100,"configOptions":{"dataMode":"xml/dom"},"inRepository":true,"translatorType":1,"browserSupport":"gcsv","lastUpdated":"2015-05-20 00:05:55"},
"detectImport": function detectImport() {
	// read at most 100 lines and checks for ctx-namespace
	var line, i=0;
	while ((line = Zotero.read()) !== false && i<100) {
		if ( line.indexOf("info:ofi/fmt:xml:xsd:ctx")>-1 ) {
			return true;
		}
		i++;
	}
	return false;
},};
transIds["24d9f058-3eb3-4d70-b78f-1ba1aef2128d"] = "XML ContextObject.js";


splittedTrans["YouTube.js"] = {
    "stamp": {"translatorID":"d3b1d34c-f8a1-43bb-9dd6-27aa6403b217","label":"YouTube","creator":"Sean Takats, Michael Berkowitz, Matt Burton and Rintze Zelle","target":"^https?://([^/]+\\.)?youtube\\.com\\/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsbv","lastUpdated":"2015-06-10 10:46:40"},
    "detectWeb": function detectWeb(doc, url) {
	if (getVideoId(url)) {
		return "videoRecording";
	}
	
	//Search results
	if ( getSearchResults(doc, true) ) {	
		return "multiple";
	}
},
};
transIds["d3b1d34c-f8a1-43bb-9dd6-27aa6403b217"] = "YouTube.js";


splittedTrans["zbMATH.js"] = {
    "stamp": {"translatorID":"1d84c107-9dbb-4b87-8208-e3632b87889f","label":"zbMATH","creator":"Philipp Zumstein","target":"^https?://(www\\.)?zbmath\\.org/","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsv","lastUpdated":"2014-06-05 08:12:07"},
    "detectWeb": function detectWeb(doc, url) {
	if( ZU.xpath(doc, '//div[@class="list"]/article').length>0 ) {
		return "multiple";
	} else if (ZU.xpath(doc, '//a[contains(@class, "bib")]').length>0 ) {//contains
		//it is a single entry --> generic fallback = journalArticle
		return "journalArticle";
	}
},
};
transIds["1d84c107-9dbb-4b87-8208-e3632b87889f"] = "zbMATH.js";


splittedTrans["Zhurnalnyi zal.js"] = {
    "stamp": {"translatorID":"0db1c2d0-eaae-4f3d-94ef-d4b3aa61de16","label":"Журнальный зал","creator":"Avram Lyon","target":"^https?://magazines\\.russ\\.ru/[a-zA-Z -_]+/[0-9]+/[0-9]+/","minVersion":"2.1.9","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsibv","lastUpdated":"2014-04-04 10:03:46"},
    "detectWeb": function detectWeb(doc, url) {
	var results = ZU.xpath(doc, '//div[@class="opub"]');
	if (results.length) {
		return "journalArticle";
	}
},
};
transIds["0db1c2d0-eaae-4f3d-94ef-d4b3aa61de16"] = "Zhurnalnyi zal.js";


splittedTrans["Zotero RDF.js"] = {
    "stamp": {"translatorID":"14763d24-8ba0-45df-8f52-b8d1108e7ac9","translatorType":2,"label":"Zotero RDF","creator":"Simon Kornblith","target":"rdf","minVersion":"1.0.0b4.r1","maxVersion":"","priority":25,"configOptions":{"getCollections":"true","dataMode":"rdf/xml"},"displayOptions":{"exportNotes":true,"exportFileData":false},"inRepository":true,"lastUpdated":"2015-06-22 22:09:17"},
};
transIds["14763d24-8ba0-45df-8f52-b8d1108e7ac9"] = "Zotero RDF.js";


splittedTrans["zotero.org.js"] = {
    "stamp": {"translatorID":"c82c574d-7fe8-49ca-a360-a05d6e34fec0","label":"zotero.org","creator":"Dan Stillman and Aurimas Vinckevicius","target":"^https?://[^/]*zotero\\.org(:\\d+)?/.+/items(/|$)","minVersion":"3.0","maxVersion":"","priority":100,"inRepository":true,"translatorType":4,"browserSupport":"gcsv","lastUpdated":"2013-12-18 22:57:58"},
    "detectWeb": function detectWeb(doc, url) {
	//disable for libraries where we can't get a library URI or an apiKey
	if(!getLibraryURI(doc)) return;
	
	//single item
	if( url.match(/\/itemKey\/\w+/) ) {
		return ZU.xpathText(doc, '//div[@id="item-details-div"]//td[preceding-sibling::th[text()="Item Type"]]/@class')
				|| false;
	}

	// Library and collections
	if ( ( url.match(/\/items\/?([?#].*)?$/)
		|| url.indexOf('/collectionKey/') != -1
		|| url.match(/\/collection\/\w+/)
		|| url.indexOf('/tag/') != -1 )	
		&& getListTitles(doc).length ) {
		return "multiple";
	}
},
};
transIds["c82c574d-7fe8-49ca-a360-a05d6e34fec0"] = "zotero.org.js";


