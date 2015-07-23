
var z2cMap;
// var z2cCreator = {};
// var z2cFields = {};
var z2cType = {};
var z2cCslFieldMap = {};
var z2cCslCreatorMap = {};
var cslIdNum = 0;
function setupZotero2Csl(){
    if (z2cMap) return;
    z2cMap = z2csl["map"];
    
    // var z2cCreatorMap = z2cMap["cslCreatorMap"]["map"];
    // for (var i=0, rec; rec=z2cCreatorMap[i++];){
    //     z2cCreator[rec["-zField"]] = rec["-cslField"]; }
    // var z2cFieldMap = z2cMap["cslFieldMap"]["map"];
    // for (var i=0, rec; rec=z2cFieldMap[i++];){
    //     z2cField[rec["-zField"]] = rec["-cslField"]; }
    
    var zTypes = z2cMap["zTypes"];
    var z2cTypeMap = zTypes["typeMap"];
    for (var iType=0, typeRec; typeRec=z2cTypeMap[iType++];){
        var zType = typeRec["-zType"];
        var cslType = typeRec["-cslType"];
        if (!cslType) continue; // for "note" etc
        var fields = typeRec["field"];
        // console.log(iType, zType, cslType, fields, typeRec);
        var field = {};
        for (var i=0, fieldRec; fieldRec=fields[i++];){
            // field[fieldRec["-label"]] = fieldRec["-value"];
            // fix-me: "-value" is zotero and "-label" csl
            // field[fieldRec["-value"]] = fieldRec["-label"];
            var fieldRecValue = fieldRec["-value"];
            if (fieldRecValue === "creator") {
                // fix-me: This is not what we want, look in cslCreatorMap!
                // var creatorType = fieldRec["creatorType"];
                // console.log("creatorType", creatorType);
                // for (var iCreator=0, creatorRec; creatorRec=creatorType[iCreator++];){
                //     console.log("creatorRec", creatorRec);
                // }
            } else {
                var fieldRecLabel = fieldRec["-label"];
                field[fieldRecValue] = fieldRecLabel;
            }
        }
        z2cType[zType] = {"cslType":cslType, "fields":field };
                          
        // if (iType > 1) { console.log("z2cType", z2cType); return; }
    }
    console.log("z2cType", z2cType);

    var cslFieldMap = z2cMap["cslFieldMap"]["map"];
    console.log("cslFieldMap", cslFieldMap);
    for (var iField=0, fieldRec; fieldRec=cslFieldMap[iField++];){
        z2cCslFieldMap[fieldRec["-zField"]] = fieldRec["-cslField"];
    }
    console.log("z2cCslFieldMap", z2cCslFieldMap);
    
    var cslCreatorMap = z2cMap["cslCreatorMap"]["map"];
    console.log("cslCreatorMap", cslCreatorMap);
    for (var iField=0, fieldRec; fieldRec=cslCreatorMap[iField++];){
        z2cCslCreatorMap[fieldRec["-zField"]] = fieldRec["-cslField"];
    }
    console.log("z2cCslCreatorMap", z2cCslCreatorMap);
}

// fix-me: Some parts are missing from typeMap.xml.
//
// "creators" is not mentioned. => "author"
// "firstName" is not mentioned => "given"
// "lastName" is not mentioned => "family"
function item2Csl(zItem) {
    setupZotero2Csl();

    var cslItem = {};
    cslIdNum++;
    var cslId = "itemId"+cslIdNum;
    cslItem["id"] = cslId;

    var zType = zItem["itemType"];
    var z2c4type = z2cType[zType];
    // console.log("z2c4type", z2c4type);
    var cslType = z2c4type["cslType"];
    cslItem["type"] = cslType;

    // console.log("cslType", cslType);
    var z2cLabels = z2c4type["fields"];
    // console.log("z2cFields", z2cFields);
    var cslAuthors = {};
    for (var zk in zItem) {
        var zValue = zItem[zk];
        if (zk === "creators") {
            // console.log("creators", zValue);
            // z2cCslCreatorMap
            for (var iAuthor=0, authorRec; authorRec=zValue[iAuthor++];){
                // console.log("auhtorRec", authorRec);
                var cslAuthor = {};
                var zCreatorType = authorRec["creatorType"];
                var cslCreatorType = z2cCslCreatorMap[zCreatorType];
                // console.log("cslCreatorType", cslCreatorType);
                var zFirstName = authorRec["firstName"];
                // console.log("zFirstName", zFirstName);
                if (zFirstName) cslAuthor["given"] = zFirstName;
                var zLastName = authorRec["lastName"];
                // console.log("zLastName", zLastName);
                if (zLastName) cslAuthor["family"] = zLastName;
                // cslAuthors[] =
                var thisTypeAuthors = cslAuthors[cslCreatorType];
                if (!thisTypeAuthors) cslAuthors[cslCreatorType] = [];
                cslAuthors[cslCreatorType].push(cslAuthor);
            }
        } else {
            var ck = z2cCslFieldMap[zk];
            if (zk === "date") {
                // console.log("zk date", zValue, ck);
                // var d = new Date(zValue);
                // cslItem[ck] = d.toISOString();
                var cslDate = {"date-parts": toCiteprocDateParts(zValue)};
                // console.log("cslDate", cslDate);
                cslItem[ck] = cslDate;
            } else if (zk === "accessDate") {
                // console.log("zk date", zValue, ck);
                if (zValue === "CURRENT_TIMESTAMP") zValue = new Date();
                // console.log("zValue new Date", zValue);
                var cslDate = {"date-parts": toCiteprocDateParts(zValue)};
                // console.log("cslDate", cslDate);
                cslItem[ck] = cslDate;
            } else if (zk === "language") {
                if (zValue === "eng") { zValue = "en-US"; }
                cslItem[ck] = zValue;
            } else {
                // console.log("zk", zk, ck, zValue);
                if (ck && zValue) { cslItem[ck] = zValue; }
            }
        }
    }
    Object.keys(cslAuthors).forEach(function(key){
        cslItem[key] = cslAuthors[key];
    });
    // console.log("cslItem", cslItem);
    return cslItem;
}
function toCiteprocDateParts(date) {
    var d = new Date(date);
    var yy = d.getUTCFullYear();
    var mm = d.getUTCMonth();
    var dd = d.getUTCDate();
    return [[ yy.toString(), mm, dd ]];
}
// var cslTestItem = item2Csl(zTestItem);

// fix-me: Where did I get this from? Is the format correct, i e is that what zotero translators returns?
var zTestItem = {"itemType":"webpage",
                 "creators":[{"firstName":"National Center for Biotechnology",
                              "lastName":"Information",
                              "creatorType":"author"},
                             {"firstName":"U. S. National Library of Medicine 8600 Rockville",
                              "lastName":"Pike",
                              "creatorType":"author"},
                             {"firstName":"Bethesda",
                              "lastName":"MD",
                              "creatorType":"author"},
                             {"firstName":"20894",
                              "lastName":"Usa",
                              "creatorType":"author"}],
                 "notes":[],
                 "tags":[],
                 "seeAlso":[],
                 "date":null,
                 "url":"http://www.ncbi.nlm.nih.gov/pubmed/21495519",
                 "title":"Exercise for the treatment of depression and anxiety. - PubMed - NCBI",
                 "abstractNote":"Int J Psychiatry Med. 2011;41(1):15-28. Review",
                 "libraryCatalog":"www.ncbi.nlm.nih.gov",
                 "accessDate":"CURRENT_TIMESTAMP",
                 "itemID":""};
    
var z2csl = 
        ///////////////////////////////////////////////////////////////////////////////////
        /////// Below is the js version of typeMap.xml
        //
        // If anything changes just do this conversion again
        //
        // http://aurimasv.github.io/z2csl/typeMap.xml
        // http://www.utilities-online.info/xmltojson/
{
  "map": {
    "zoteroVersion": { "-value": "4.0.21.SOURCE" },
    "date": { "-value": "Tue, 17 Jun 2014 21:11:43 GMT" },
    "zTypes": {
      "typeMap": [
        { "-zType": "note" },
        {
          "-zType": "book",
          "-cslType": "book",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Series",
              "-value": "series"
            },
            {
              "-label": "Series Number",
              "-value": "seriesNumber"
            },
            {
              "-label": "Volume",
              "-value": "volume"
            },
            {
              "-label": "# of Volumes",
              "-value": "numberOfVolumes"
            },
            {
              "-label": "Edition",
              "-value": "edition"
            },
            {
              "-label": "Place",
              "-value": "place"
            },
            {
              "-label": "Publisher",
              "-value": "publisher"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "# of Pages",
              "-value": "numPages"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "ISBN",
              "-value": "ISBN"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Author",
                  "-value": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Editor",
                  "-value": "editor"
                },
                {
                  "-label": "Series Editor",
                  "-value": "seriesEditor"
                },
                {
                  "-label": "Translator",
                  "-value": "translator"
                }
              ]
            }
          ]
        },
        {
          "-zType": "bookSection",
          "-cslType": "chapter",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Book Title",
              "-value": "bookTitle",
              "-baseField": "publicationTitle"
            },
            {
              "-label": "Series",
              "-value": "series"
            },
            {
              "-label": "Series Number",
              "-value": "seriesNumber"
            },
            {
              "-label": "Volume",
              "-value": "volume"
            },
            {
              "-label": "# of Volumes",
              "-value": "numberOfVolumes"
            },
            {
              "-label": "Edition",
              "-value": "edition"
            },
            {
              "-label": "Place",
              "-value": "place"
            },
            {
              "-label": "Publisher",
              "-value": "publisher"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Pages",
              "-value": "pages"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "ISBN",
              "-value": "ISBN"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Author",
                  "-value": "author"
                },
                {
                  "-label": "Book Author",
                  "-value": "bookAuthor"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Editor",
                  "-value": "editor"
                },
                {
                  "-label": "Series Editor",
                  "-value": "seriesEditor"
                },
                {
                  "-label": "Translator",
                  "-value": "translator"
                }
              ]
            }
          ]
        },
        {
          "-zType": "journalArticle",
          "-cslType": "article-journal",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Publication",
              "-value": "publicationTitle"
            },
            {
              "-label": "Volume",
              "-value": "volume"
            },
            {
              "-label": "Issue",
              "-value": "issue"
            },
            {
              "-label": "Pages",
              "-value": "pages"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Series",
              "-value": "series"
            },
            {
              "-label": "Series Title",
              "-value": "seriesTitle"
            },
            {
              "-label": "Series Text",
              "-value": "seriesText"
            },
            {
              "-label": "Journal Abbr",
              "-value": "journalAbbreviation"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "DOI",
              "-value": "DOI"
            },
            {
              "-label": "ISSN",
              "-value": "ISSN"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Author",
                  "-value": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Editor",
                  "-value": "editor"
                },
                {
                  "-label": "Reviewed Author",
                  "-value": "reviewedAuthor"
                },
                {
                  "-label": "Translator",
                  "-value": "translator"
                }
              ]
            }
          ]
        },
        {
          "-zType": "magazineArticle",
          "-cslType": "article-magazine",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Publication",
              "-value": "publicationTitle"
            },
            {
              "-label": "Volume",
              "-value": "volume"
            },
            {
              "-label": "Issue",
              "-value": "issue"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Pages",
              "-value": "pages"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "ISSN",
              "-value": "ISSN"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Author",
                  "-value": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Reviewed Author",
                  "-value": "reviewedAuthor"
                },
                {
                  "-label": "Translator",
                  "-value": "translator"
                }
              ]
            }
          ]
        },
        {
          "-zType": "newspaperArticle",
          "-cslType": "article-newspaper",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Publication",
              "-value": "publicationTitle"
            },
            {
              "-label": "Place",
              "-value": "place"
            },
            {
              "-label": "Edition",
              "-value": "edition"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Section",
              "-value": "section"
            },
            {
              "-label": "Pages",
              "-value": "pages"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "ISSN",
              "-value": "ISSN"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Author",
                  "-value": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Reviewed Author",
                  "-value": "reviewedAuthor"
                },
                {
                  "-label": "Translator",
                  "-value": "translator"
                }
              ]
            }
          ]
        },
        {
          "-zType": "thesis",
          "-cslType": "thesis",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Type",
              "-value": "thesisType",
              "-baseField": "type"
            },
            {
              "-label": "University",
              "-value": "university",
              "-baseField": "publisher"
            },
            {
              "-label": "Place",
              "-value": "place"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "# of Pages",
              "-value": "numPages"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Author",
                  "-value": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                }
              ]
            }
          ]
        },
        {
          "-zType": "letter",
          "-cslType": "personal_communication",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Type",
              "-value": "letterType",
              "-baseField": "type"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Author",
                  "-value": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Recipient",
                  "-value": "recipient"
                }
              ]
            }
          ]
        },
        {
          "-zType": "manuscript",
          "-cslType": "manuscript",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Type",
              "-value": "manuscriptType",
              "-baseField": "type"
            },
            {
              "-label": "Place",
              "-value": "place"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "# of Pages",
              "-value": "numPages"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Author",
                  "-value": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Translator",
                  "-value": "translator"
                }
              ]
            }
          ]
        },
        {
          "-zType": "interview",
          "-cslType": "interview",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Medium",
              "-value": "interviewMedium",
              "-baseField": "medium"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Interview With",
                  "-value": "interviewee",
                  "-baseField": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Interviewer",
                  "-value": "interviewer"
                },
                {
                  "-label": "Translator",
                  "-value": "translator"
                }
              ]
            }
          ]
        },
        {
          "-zType": "film",
          "-cslType": "motion_picture",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Distributor",
              "-value": "distributor",
              "-baseField": "publisher"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Genre",
              "-value": "genre",
              "-baseField": "type"
            },
            {
              "-label": "Format",
              "-value": "videoRecordingFormat",
              "-baseField": "medium"
            },
            {
              "-label": "Running Time",
              "-value": "runningTime"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Director",
                  "-value": "director",
                  "-baseField": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Producer",
                  "-value": "producer"
                },
                {
                  "-label": "Scriptwriter",
                  "-value": "scriptwriter"
                }
              ]
            }
          ]
        },
        {
          "-zType": "artwork",
          "-cslType": "graphic",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Medium",
              "-value": "artworkMedium",
              "-baseField": "medium"
            },
            {
              "-label": "Artwork Size",
              "-value": "artworkSize"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Artist",
                  "-value": "artist",
                  "-baseField": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                }
              ]
            }
          ]
        },
        {
          "-zType": "webpage",
          "-cslType": "webpage",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Website Title",
              "-value": "websiteTitle",
              "-baseField": "publicationTitle"
            },
            {
              "-label": "Website Type",
              "-value": "websiteType",
              "-baseField": "type"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Author",
                  "-value": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Translator",
                  "-value": "translator"
                }
              ]
            }
          ]
        },
        {
          "-zType": "attachment",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "URL",
              "-value": "url"
            }
          ]
        },
        {
          "-zType": "report",
          "-cslType": "report",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Report Number",
              "-value": "reportNumber",
              "-baseField": "number"
            },
            {
              "-label": "Report Type",
              "-value": "reportType",
              "-baseField": "type"
            },
            {
              "-label": "Series Title",
              "-value": "seriesTitle"
            },
            {
              "-label": "Place",
              "-value": "place"
            },
            {
              "-label": "Institution",
              "-value": "institution",
              "-baseField": "publisher"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Pages",
              "-value": "pages"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Author",
                  "-value": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Series Editor",
                  "-value": "seriesEditor"
                },
                {
                  "-label": "Translator",
                  "-value": "translator"
                }
              ]
            }
          ]
        },
        {
          "-zType": "bill",
          "-cslType": "bill",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Bill Number",
              "-value": "billNumber",
              "-baseField": "number"
            },
            {
              "-label": "Code",
              "-value": "code"
            },
            {
              "-label": "Code Volume",
              "-value": "codeVolume",
              "-baseField": "volume"
            },
            {
              "-label": "Section",
              "-value": "section"
            },
            {
              "-label": "Code Pages",
              "-value": "codePages",
              "-baseField": "pages"
            },
            {
              "-label": "Legislative Body",
              "-value": "legislativeBody"
            },
            {
              "-label": "Session",
              "-value": "session"
            },
            {
              "-label": "History",
              "-value": "history"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Sponsor",
                  "-value": "sponsor",
                  "-baseField": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Cosponsor",
                  "-value": "cosponsor"
                }
              ]
            }
          ]
        },
        {
          "-zType": "case",
          "-cslType": "legal_case",
          "field": [
            {
              "-label": "Case Name",
              "-value": "caseName",
              "-baseField": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Reporter",
              "-value": "reporter"
            },
            {
              "-label": "Reporter Volume",
              "-value": "reporterVolume",
              "-baseField": "volume"
            },
            {
              "-label": "Court",
              "-value": "court"
            },
            {
              "-label": "Docket Number",
              "-value": "docketNumber",
              "-baseField": "number"
            },
            {
              "-label": "First Page",
              "-value": "firstPage",
              "-baseField": "pages"
            },
            {
              "-label": "History",
              "-value": "history"
            },
            {
              "-label": "Date Decided",
              "-value": "dateDecided",
              "-baseField": "date"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Author",
                  "-value": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Counsel",
                  "-value": "counsel"
                }
              ]
            }
          ]
        },
        {
          "-zType": "hearing",
          "-cslType": "bill",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Committee",
              "-value": "committee"
            },
            {
              "-label": "Place",
              "-value": "place"
            },
            {
              "-label": "Publisher",
              "-value": "publisher"
            },
            {
              "-label": "# of Volumes",
              "-value": "numberOfVolumes"
            },
            {
              "-label": "Document Number",
              "-value": "documentNumber",
              "-baseField": "number"
            },
            {
              "-label": "Pages",
              "-value": "pages"
            },
            {
              "-label": "Legislative Body",
              "-value": "legislativeBody"
            },
            {
              "-label": "Session",
              "-value": "session"
            },
            {
              "-label": "History",
              "-value": "history"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": {
                "-label": "Contributor",
                "-value": "contributor",
                "-baseField": "author"
              }
            }
          ]
        },
        {
          "-zType": "patent",
          "-cslType": "patent",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Place",
              "-value": "place"
            },
            {
              "-label": "Country",
              "-value": "country"
            },
            {
              "-label": "Assignee",
              "-value": "assignee"
            },
            {
              "-label": "Issuing Authority",
              "-value": "issuingAuthority"
            },
            {
              "-label": "Patent Number",
              "-value": "patentNumber",
              "-baseField": "number"
            },
            {
              "-label": "Filing Date",
              "-value": "filingDate"
            },
            {
              "-label": "Pages",
              "-value": "pages"
            },
            {
              "-label": "Application Number",
              "-value": "applicationNumber"
            },
            {
              "-label": "Priority Numbers",
              "-value": "priorityNumbers"
            },
            {
              "-label": "Issue Date",
              "-value": "issueDate",
              "-baseField": "date"
            },
            {
              "-label": "References",
              "-value": "references"
            },
            {
              "-label": "Legal Status",
              "-value": "legalStatus"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Inventor",
                  "-value": "inventor",
                  "-baseField": "author"
                },
                {
                  "-label": "Attorney/Agent",
                  "-value": "attorneyAgent"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                }
              ]
            }
          ]
        },
        {
          "-zType": "statute",
          "-cslType": "legislation",
          "field": [
            {
              "-label": "Name of Act",
              "-value": "nameOfAct",
              "-baseField": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Code",
              "-value": "code"
            },
            {
              "-label": "Code Number",
              "-value": "codeNumber"
            },
            {
              "-label": "Public Law Number",
              "-value": "publicLawNumber",
              "-baseField": "number"
            },
            {
              "-label": "Date Enacted",
              "-value": "dateEnacted",
              "-baseField": "date"
            },
            {
              "-label": "Pages",
              "-value": "pages"
            },
            {
              "-label": "Section",
              "-value": "section"
            },
            {
              "-label": "Session",
              "-value": "session"
            },
            {
              "-label": "History",
              "-value": "history"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Author",
                  "-value": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                }
              ]
            }
          ]
        },
        {
          "-zType": "email",
          "-cslType": "personal_communication",
          "field": [
            {
              "-label": "Subject",
              "-value": "subject",
              "-baseField": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Author",
                  "-value": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Recipient",
                  "-value": "recipient"
                }
              ]
            }
          ]
        },
        {
          "-zType": "map",
          "-cslType": "map",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Type",
              "-value": "mapType",
              "-baseField": "type"
            },
            {
              "-label": "Scale",
              "-value": "scale"
            },
            {
              "-label": "Series Title",
              "-value": "seriesTitle"
            },
            {
              "-label": "Edition",
              "-value": "edition"
            },
            {
              "-label": "Place",
              "-value": "place"
            },
            {
              "-label": "Publisher",
              "-value": "publisher"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "ISBN",
              "-value": "ISBN"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Cartographer",
                  "-value": "cartographer",
                  "-baseField": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Series Editor",
                  "-value": "seriesEditor"
                }
              ]
            }
          ]
        },
        {
          "-zType": "blogPost",
          "-cslType": "post-weblog",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Blog Title",
              "-value": "blogTitle",
              "-baseField": "publicationTitle"
            },
            {
              "-label": "Website Type",
              "-value": "websiteType",
              "-baseField": "type"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Author",
                  "-value": "author"
                },
                {
                  "-label": "Commenter",
                  "-value": "commenter"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                }
              ]
            }
          ]
        },
        {
          "-zType": "instantMessage",
          "-cslType": "personal_communication",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Author",
                  "-value": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Recipient",
                  "-value": "recipient"
                }
              ]
            }
          ]
        },
        {
          "-zType": "forumPost",
          "-cslType": "post",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Forum/Listserv Title",
              "-value": "forumTitle",
              "-baseField": "publicationTitle"
            },
            {
              "-label": "Post Type",
              "-value": "postType",
              "-baseField": "type"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Author",
                  "-value": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                }
              ]
            }
          ]
        },
        {
          "-zType": "audioRecording",
          "-cslType": "song",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Format",
              "-value": "audioRecordingFormat",
              "-baseField": "medium"
            },
            {
              "-label": "Series Title",
              "-value": "seriesTitle"
            },
            {
              "-label": "Volume",
              "-value": "volume"
            },
            {
              "-label": "# of Volumes",
              "-value": "numberOfVolumes"
            },
            {
              "-label": "Place",
              "-value": "place"
            },
            {
              "-label": "Label",
              "-value": "label",
              "-baseField": "publisher"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Running Time",
              "-value": "runningTime"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "ISBN",
              "-value": "ISBN"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Performer",
                  "-value": "performer",
                  "-baseField": "author"
                },
                {
                  "-label": "Composer",
                  "-value": "composer"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Words By",
                  "-value": "wordsBy"
                }
              ]
            }
          ]
        },
        {
          "-zType": "presentation",
          "-cslType": "speech",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Type",
              "-value": "presentationType",
              "-baseField": "type"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Place",
              "-value": "place"
            },
            {
              "-label": "Meeting Name",
              "-value": "meetingName"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Presenter",
                  "-value": "presenter",
                  "-baseField": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                }
              ]
            }
          ]
        },
        {
          "-zType": "videoRecording",
          "-cslType": "motion_picture",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Format",
              "-value": "videoRecordingFormat",
              "-baseField": "medium"
            },
            {
              "-label": "Series Title",
              "-value": "seriesTitle"
            },
            {
              "-label": "Volume",
              "-value": "volume"
            },
            {
              "-label": "# of Volumes",
              "-value": "numberOfVolumes"
            },
            {
              "-label": "Place",
              "-value": "place"
            },
            {
              "-label": "Studio",
              "-value": "studio",
              "-baseField": "publisher"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Running Time",
              "-value": "runningTime"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "ISBN",
              "-value": "ISBN"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Director",
                  "-value": "director",
                  "-baseField": "author"
                },
                {
                  "-label": "Cast Member",
                  "-value": "castMember"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Producer",
                  "-value": "producer"
                },
                {
                  "-label": "Scriptwriter",
                  "-value": "scriptwriter"
                }
              ]
            }
          ]
        },
        {
          "-zType": "tvBroadcast",
          "-cslType": "broadcast",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Program Title",
              "-value": "programTitle",
              "-baseField": "publicationTitle"
            },
            {
              "-label": "Episode Number",
              "-value": "episodeNumber",
              "-baseField": "number"
            },
            {
              "-label": "Format",
              "-value": "videoRecordingFormat",
              "-baseField": "medium"
            },
            {
              "-label": "Place",
              "-value": "place"
            },
            {
              "-label": "Network",
              "-value": "network",
              "-baseField": "publisher"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Running Time",
              "-value": "runningTime"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Director",
                  "-value": "director",
                  "-baseField": "author"
                },
                {
                  "-label": "Cast Member",
                  "-value": "castMember"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Guest",
                  "-value": "guest"
                },
                {
                  "-label": "Producer",
                  "-value": "producer"
                },
                {
                  "-label": "Scriptwriter",
                  "-value": "scriptwriter"
                }
              ]
            }
          ]
        },
        {
          "-zType": "radioBroadcast",
          "-cslType": "broadcast",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Program Title",
              "-value": "programTitle",
              "-baseField": "publicationTitle"
            },
            {
              "-label": "Episode Number",
              "-value": "episodeNumber",
              "-baseField": "number"
            },
            {
              "-label": "Format",
              "-value": "audioRecordingFormat",
              "-baseField": "medium"
            },
            {
              "-label": "Place",
              "-value": "place"
            },
            {
              "-label": "Network",
              "-value": "network",
              "-baseField": "publisher"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Running Time",
              "-value": "runningTime"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Director",
                  "-value": "director",
                  "-baseField": "author"
                },
                {
                  "-label": "Cast Member",
                  "-value": "castMember"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Guest",
                  "-value": "guest"
                },
                {
                  "-label": "Producer",
                  "-value": "producer"
                },
                {
                  "-label": "Scriptwriter",
                  "-value": "scriptwriter"
                }
              ]
            }
          ]
        },
        {
          "-zType": "podcast",
          "-cslType": "song",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Series Title",
              "-value": "seriesTitle"
            },
            {
              "-label": "Episode Number",
              "-value": "episodeNumber",
              "-baseField": "number"
            },
            {
              "-label": "File Type",
              "-value": "audioFileType",
              "-baseField": "medium"
            },
            {
              "-label": "Running Time",
              "-value": "runningTime"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Podcaster",
                  "-value": "podcaster",
                  "-baseField": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Guest",
                  "-value": "guest"
                }
              ]
            }
          ]
        },
        {
          "-zType": "computerProgram",
          "-cslType": "book",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Series Title",
              "-value": "seriesTitle"
            },
            {
              "-label": "Version",
              "-value": "version"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "System",
              "-value": "system"
            },
            {
              "-label": "Place",
              "-value": "place"
            },
            {
              "-label": "Company",
              "-value": "company",
              "-baseField": "publisher"
            },
            {
              "-label": "Language",
              "-value": "programmingLanguage"
            },
            {
              "-label": "ISBN",
              "-value": "ISBN"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Programmer",
                  "-value": "programmer",
                  "-baseField": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                }
              ]
            }
          ]
        },
        {
          "-zType": "conferencePaper",
          "-cslType": "paper-conference",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Proceedings Title",
              "-value": "proceedingsTitle",
              "-baseField": "publicationTitle"
            },
            {
              "-label": "Conference Name",
              "-value": "conferenceName"
            },
            {
              "-label": "Place",
              "-value": "place"
            },
            {
              "-label": "Publisher",
              "-value": "publisher"
            },
            {
              "-label": "Volume",
              "-value": "volume"
            },
            {
              "-label": "Pages",
              "-value": "pages"
            },
            {
              "-label": "Series",
              "-value": "series"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "DOI",
              "-value": "DOI"
            },
            {
              "-label": "ISBN",
              "-value": "ISBN"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Author",
                  "-value": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Editor",
                  "-value": "editor"
                },
                {
                  "-label": "Series Editor",
                  "-value": "seriesEditor"
                },
                {
                  "-label": "Translator",
                  "-value": "translator"
                }
              ]
            }
          ]
        },
        {
          "-zType": "document",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Publisher",
              "-value": "publisher"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Author",
                  "-value": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Editor",
                  "-value": "editor"
                },
                {
                  "-label": "Reviewed Author",
                  "-value": "reviewedAuthor"
                },
                {
                  "-label": "Translator",
                  "-value": "translator"
                }
              ]
            }
          ]
        },
        {
          "-zType": "encyclopediaArticle",
          "-cslType": "entry-encyclopedia",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Encyclopedia Title",
              "-value": "encyclopediaTitle",
              "-baseField": "publicationTitle"
            },
            {
              "-label": "Series",
              "-value": "series"
            },
            {
              "-label": "Series Number",
              "-value": "seriesNumber"
            },
            {
              "-label": "Volume",
              "-value": "volume"
            },
            {
              "-label": "# of Volumes",
              "-value": "numberOfVolumes"
            },
            {
              "-label": "Edition",
              "-value": "edition"
            },
            {
              "-label": "Place",
              "-value": "place"
            },
            {
              "-label": "Publisher",
              "-value": "publisher"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Pages",
              "-value": "pages"
            },
            {
              "-label": "ISBN",
              "-value": "ISBN"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Author",
                  "-value": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Editor",
                  "-value": "editor"
                },
                {
                  "-label": "Series Editor",
                  "-value": "seriesEditor"
                },
                {
                  "-label": "Translator",
                  "-value": "translator"
                }
              ]
            }
          ]
        },
        {
          "-zType": "dictionaryEntry",
          "-cslType": "entry-dictionary",
          "field": [
            {
              "-label": "Title",
              "-value": "title"
            },
            {
              "-label": "Abstract",
              "-value": "abstractNote"
            },
            {
              "-label": "Dictionary Title",
              "-value": "dictionaryTitle",
              "-baseField": "publicationTitle"
            },
            {
              "-label": "Series",
              "-value": "series"
            },
            {
              "-label": "Series Number",
              "-value": "seriesNumber"
            },
            {
              "-label": "Volume",
              "-value": "volume"
            },
            {
              "-label": "# of Volumes",
              "-value": "numberOfVolumes"
            },
            {
              "-label": "Edition",
              "-value": "edition"
            },
            {
              "-label": "Place",
              "-value": "place"
            },
            {
              "-label": "Publisher",
              "-value": "publisher"
            },
            {
              "-label": "Date",
              "-value": "date"
            },
            {
              "-label": "Pages",
              "-value": "pages"
            },
            {
              "-label": "Language",
              "-value": "language"
            },
            {
              "-label": "ISBN",
              "-value": "ISBN"
            },
            {
              "-label": "Short Title",
              "-value": "shortTitle"
            },
            {
              "-label": "URL",
              "-value": "url"
            },
            {
              "-label": "Accessed",
              "-value": "accessDate"
            },
            {
              "-label": "Archive",
              "-value": "archive"
            },
            {
              "-label": "Loc. in Archive",
              "-value": "archiveLocation"
            },
            {
              "-label": "Library Catalog",
              "-value": "libraryCatalog"
            },
            {
              "-label": "Call Number",
              "-value": "callNumber"
            },
            {
              "-label": "Rights",
              "-value": "rights"
            },
            {
              "-label": "Extra",
              "-value": "extra"
            },
            {
              "-value": "creator",
              "creatorType": [
                {
                  "-label": "Author",
                  "-value": "author"
                },
                {
                  "-label": "Contributor",
                  "-value": "contributor"
                },
                {
                  "-label": "Editor",
                  "-value": "editor"
                },
                {
                  "-label": "Series Editor",
                  "-value": "seriesEditor"
                },
                {
                  "-label": "Translator",
                  "-value": "translator"
                }
              ]
            }
          ]
        }
      ]
    },
    "cslFieldMap": {
      "map": [
        {
          "-zField": "title",
          "-cslField": "title"
        },
        {
          "-zField": "publicationTitle",
          "-cslField": "container-title"
        },
        {
          "-zField": "reporter",
          "-cslField": "container-title"
        },
        {
          "-zField": "code",
          "-cslField": "container-title"
        },
        {
          "-zField": "seriesTitle",
          "-cslField": "collection-title"
        },
        {
          "-zField": "series",
          "-cslField": "collection-title"
        },
        {
          "-zField": "seriesNumber",
          "-cslField": "collection-number"
        },
        {
          "-zField": "publisher",
          "-cslField": "publisher"
        },
        {
          "-zField": "distributor",
          "-cslField": "publisher"
        },
        {
          "-zField": "place",
          "-cslField": "publisher-place"
        },
        {
          "-zField": "court",
          "-cslField": "authority"
        },
        {
          "-zField": "legislativeBody",
          "-cslField": "authority"
        },
        {
          "-zField": "issuingAuthority",
          "-cslField": "authority"
        },
        {
          "-zField": "pages",
          "-cslField": "page"
        },
        {
          "-zField": "volume",
          "-cslField": "volume"
        },
        {
          "-zField": "codeNumber",
          "-cslField": "volume"
        },
        {
          "-zField": "issue",
          "-cslField": "issue"
        },
        {
          "-zField": "priorityNumbers",
          "-cslField": "issue"
        },
        {
          "-zField": "numberOfVolumes",
          "-cslField": "number-of-volumes"
        },
        {
          "-zField": "numPages",
          "-cslField": "number-of-pages"
        },
        {
          "-zField": "edition",
          "-cslField": "edition"
        },
        {
          "-zField": "version",
          "-cslField": "version"
        },
        {
          "-zField": "section",
          "-cslField": "section"
        },
        {
          "-zField": "committee",
          "-cslField": "section"
        },
        {
          "-zField": "type",
          "-cslField": "genre"
        },
        {
          "-zField": "programmingLanguage",
          "-cslField": "genre"
        },
        {
          "-zField": "libraryCatalog",
          "-cslField": "source"
        },
        {
          "-zField": "artworkSize",
          "-cslField": "dimensions"
        },
        {
          "-zField": "runningTime",
          "-cslField": "dimensions"
        },
        {
          "-zField": "medium",
          "-cslField": "medium"
        },
        {
          "-zField": "system",
          "-cslField": "medium"
        },
        {
          "-zField": "scale",
          "-cslField": "scale"
        },
        {
          "-zField": "archive",
          "-cslField": "archive"
        },
        {
          "-zField": "archiveLocation",
          "-cslField": "archive_location"
        },
        {
          "-zField": "meetingName",
          "-cslField": "event"
        },
        {
          "-zField": "conferenceName",
          "-cslField": "event"
        },
        {
          "-zField": "place",
          "-cslField": "event-place"
        },
        {
          "-zField": "abstractNote",
          "-cslField": "abstract"
        },
        {
          "-zField": "url",
          "-cslField": "URL"
        },
        {
          "-zField": "DOI",
          "-cslField": "DOI"
        },
        {
          "-zField": "ISBN",
          "-cslField": "ISBN"
        },
        {
          "-zField": "ISSN",
          "-cslField": "ISSN"
        },
        {
          "-zField": "callNumber",
          "-cslField": "call-number"
        },
        {
          "-zField": "applicationNumber",
          "-cslField": "call-number"
        },
        {
          "-zField": "extra",
          "-cslField": "note"
        },
        {
          "-zField": "number",
          "-cslField": "number"
        },
        {
          "-zField": "session",
          "-cslField": "chapter-number"
        },
        {
          "-zField": "history",
          "-cslField": "references"
        },
        {
          "-zField": "references",
          "-cslField": "references"
        },
        {
          "-zField": "shortTitle",
          "-cslField": "shortTitle"
        },
        {
          "-zField": "journalAbbreviation",
          "-cslField": "journalAbbreviation"
        },
        {
          "-zField": "legalStatus",
          "-cslField": "status"
        },
        {
          "-zField": "language",
          "-cslField": "language"
        },
        {
          "-zField": "date",
          "-cslField": "issued"
        },
        {
          "-zField": "accessDate",
          "-cslField": "accessed"
        },
        {
          "-zField": "filingDate",
          "-cslField": "submitted"
        }
      ]
    },
    "cslCreatorMap": {
      "map": [
        {
          "-zField": "author",
          "-cslField": "author"
        },
        {
          "-zField": "editor",
          "-cslField": "editor"
        },
        {
          "-zField": "bookAuthor",
          "-cslField": "container-author"
        },
        {
          "-zField": "composer",
          "-cslField": "composer"
        },
        {
          "-zField": "director",
          "-cslField": "director"
        },
        {
          "-zField": "interviewer",
          "-cslField": "interviewer"
        },
        {
          "-zField": "recipient",
          "-cslField": "recipient"
        },
        {
          "-zField": "reviewedAuthor",
          "-cslField": "reviewed-author"
        },
        {
          "-zField": "seriesEditor",
          "-cslField": "collection-editor"
        },
        {
          "-zField": "translator",
          "-cslField": "translator"
        }
      ]
    },
    "citeprocJStoCSLmap": {
      "remap": [
        {
          "-citeprocField": "shortTitle",
          "-cslUsage": "title-short or <text variable=\"title\" form=\"short\"/>",
          "-descKey": "title-short"
        },
        {
          "-citeprocField": "journalAbbreviation",
          "-cslUsage": "container-title-short or <text variable=\"container-title\" form=\"short\"/>",
          "-descKey": "container-title-short"
        }
      ]
    },
    "cslVars": {
      "itemTypes": {
        "type": [
          { "-name": "article" },
          { "-name": "article-magazine" },
          { "-name": "article-newspaper" },
          { "-name": "article-journal" },
          { "-name": "bill" },
          { "-name": "book" },
          { "-name": "broadcast" },
          { "-name": "chapter" },
          { "-name": "dataset" },
          { "-name": "entry" },
          { "-name": "entry-dictionary" },
          { "-name": "entry-encyclopedia" },
          { "-name": "figure" },
          { "-name": "graphic" },
          { "-name": "interview" },
          { "-name": "legislation" },
          { "-name": "legal_case" },
          { "-name": "manuscript" },
          { "-name": "map" },
          { "-name": "motion_picture" },
          { "-name": "musical_score" },
          { "-name": "pamphlet" },
          { "-name": "paper-conference" },
          { "-name": "patent" },
          { "-name": "post" },
          { "-name": "post-weblog" },
          { "-name": "personal_communication" },
          { "-name": "report" },
          { "-name": "review" },
          { "-name": "review-book" },
          { "-name": "song" },
          { "-name": "speech" },
          { "-name": "thesis" },
          { "-name": "treaty" },
          { "-name": "webpage" }
        ]
      },
      "vars": {
        "var": [
          {
            "-name": "abstract",
            "-type": "standard",
            "-description": "abstract of the item (e.g. the abstract of a journal article)"
          },
          {
            "-name": "annote",
            "-type": "standard",
            "-description": "reader's notes about the item content"
          },
          {
            "-name": "archive",
            "-type": "standard",
            "-description": "archive storing the item"
          },
          {
            "-name": "archive_location",
            "-type": "standard",
            "-description": "storage location within an archive (e.g. a box and folder number)"
          },
          {
            "-name": "archive-place",
            "-type": "standard",
            "-description": "geographic location of the archive"
          },
          {
            "-name": "authority",
            "-type": "standard",
            "-description": "issuing or judicial authority (e.g. \"USPTO\" for a patent, \"Fairfax Circuit Court\" for a legal case)"
          },
          {
            "-name": "call-number",
            "-type": "standard",
            "-description": "call number (to locate the item in a library)"
          },
          {
            "-name": "citation-label",
            "-type": "standard",
            "-description": "label identifying the item in in-text citations of label styles (e.g. \"Ferr78\"). May be assigned by the CSL processor based on item metadata."
          },
          {
            "-name": "citation-number",
            "-type": "standard",
            "-description": "index (starting at 1) of the cited reference in the bibliography (generated by the CSL processor)"
          },
          {
            "-name": "collection-title",
            "-type": "standard",
            "-description": "title of the collection holding the item (e.g. the series title for a book)"
          },
          {
            "-name": "container-title",
            "-type": "standard",
            "-description": "title of the container holding the item (e.g. the book title for a book chapter, the journal title for a journal article)"
          },
          {
            "-name": "container-title-short",
            "-type": "standard",
            "-description": "short/abbreviated form of \"container-title\" (also accessible through the \"short\" form of the \"container-title\" variable)"
          },
          {
            "-name": "dimensions",
            "-type": "standard",
            "-description": "physical (e.g. size) or temporal (e.g. running time) dimensions of the item"
          },
          {
            "-name": "DOI",
            "-type": "standard",
            "-description": "Digital Object Identifier (e.g. \"10.1128/AEM.02591-07\")"
          },
          {
            "-name": "event",
            "-type": "standard",
            "-description": "name of the related event (e.g. the conference name when citing a conference paper)"
          },
          {
            "-name": "event-place",
            "-type": "standard",
            "-description": "geographic location of the related event (e.g. \"Amsterdam, the Netherlands\")"
          },
          {
            "-name": "first-reference-note-number",
            "-type": "standard",
            "-description": "number of a preceding note containing the first reference to the item. Assigned by the CSL processor. The variable holds no value for non-note-based styles, or when the item hasn't been cited in any preceding notes."
          },
          {
            "-name": "genre",
            "-type": "standard",
            "-description": "class, type or genre of the item (e.g. \"adventure\" for an adventure movie, \"PhD dissertation\" for a PhD thesis)"
          },
          {
            "-name": "ISBN",
            "-type": "standard",
            "-description": "International Standard Book Number"
          },
          {
            "-name": "ISSN",
            "-type": "standard",
            "-description": "International Standard Serial Number"
          },
          {
            "-name": "jurisdiction",
            "-type": "standard",
            "-description": "geographic scope of relevance (e.g. \"US\" for a US patent)"
          },
          {
            "-name": "keyword",
            "-type": "standard",
            "-description": "keyword(s) or tag(s) attached to the item"
          },
          {
            "-name": "locator",
            "-type": "standard",
            "-description": "a cite-specific pinpointer within the item (e.g. a page number within a book, or a volume in a multi-volume work). Must be accompanied in the input data by a label indicating the locator type (see the Locators term list), which determines which term is rendered by cs:label when the \"locator\" variable is selected."
          },
          {
            "-name": "medium",
            "-type": "standard",
            "-description": "medium description (e.g. \"CD\", \"DVD\", etc.)"
          },
          {
            "-name": "note",
            "-type": "standard",
            "-description": "(short) inline note giving additional item details (e.g. a concise summary or commentary)"
          },
          {
            "-name": "original-publisher",
            "-type": "standard",
            "-description": "original publisher, for items that have been republished by a different publisher"
          },
          {
            "-name": "original-publisher-place",
            "-type": "standard",
            "-description": "geographic location of the original publisher (e.g. \"London, UK\")"
          },
          {
            "-name": "original-title",
            "-type": "standard",
            "-description": "title of the original version (e.g. \"Война и мир\", the untranslated Russian title of \"War and Peace\")"
          },
          {
            "-name": "page",
            "-type": "standard",
            "-description": "range of pages the item (e.g. a journal article) covers in a container (e.g. a journal issue)"
          },
          {
            "-name": "page-first",
            "-type": "standard",
            "-description": "first page of the range of pages the item (e.g. a journal article) covers in a container (e.g. a journal issue)"
          },
          {
            "-name": "PMCID",
            "-type": "standard",
            "-description": "PubMed Central reference number"
          },
          {
            "-name": "PMID",
            "-type": "standard",
            "-description": "PubMed reference number"
          },
          {
            "-name": "publisher",
            "-type": "standard",
            "-description": "publisher"
          },
          {
            "-name": "publisher-place",
            "-type": "standard",
            "-description": "geographic location of the publisher"
          },
          {
            "-name": "references",
            "-type": "standard",
            "-description": "resources related to the procedural history of a legal case"
          },
          {
            "-name": "reviewed-title",
            "-type": "standard",
            "-description": "title of the item reviewed by the current item"
          },
          {
            "-name": "scale",
            "-type": "standard",
            "-description": "scale of e.g. a map"
          },
          {
            "-name": "section",
            "-type": "standard",
            "-description": "container section holding the item (e.g. \"politics\" for a newspaper article)"
          },
          {
            "-name": "source",
            "-type": "standard",
            "-description": "from whence the item originates (e.g. a library catalog or database)"
          },
          {
            "-name": "status",
            "-type": "standard",
            "-description": "(publication) status of the item (e.g. \"forthcoming\")"
          },
          {
            "-name": "title",
            "-type": "standard",
            "-description": "primary title of the item"
          },
          {
            "-name": "title-short",
            "-type": "standard",
            "-description": "short/abbreviated form of \"title\" (also accessible through the \"short\" form of the \"title\" variable)"
          },
          {
            "-name": "URL",
            "-type": "standard",
            "-description": "Uniform Resource Locator (e.g. \"http://aem.asm.org/cgi/content/full/74/9/2766\")"
          },
          {
            "-name": "version",
            "-type": "standard",
            "-description": "version of the item (e.g. \"2.0.9\" for a software program)"
          },
          {
            "-name": "year-suffix",
            "-type": "standard",
            "-description": "disambiguating year suffix in author-date styles (e.g. \"a\" in \"Doe, 1999a\")"
          },
          {
            "-name": "chapter-number",
            "-type": "number",
            "-description": "chapter number"
          },
          {
            "-name": "collection-number",
            "-type": "number",
            "-description": "number identifying the collection holding the item (e.g. the series number for a book)"
          },
          {
            "-name": "edition",
            "-type": "number",
            "-description": "(container) edition holding the item (e.g. \"3\" when citing a chapter in the third edition of a book)"
          },
          {
            "-name": "issue",
            "-type": "number",
            "-description": "(container) issue holding the item (e.g. \"5\" when citing a journal article from journal volume 2, issue 5)"
          },
          {
            "-name": "number",
            "-type": "number",
            "-description": "number identifying the item (e.g. a report number)"
          },
          {
            "-name": "number-of-pages",
            "-type": "number",
            "-description": "total number of pages of the cited item"
          },
          {
            "-name": "number-of-volumes",
            "-type": "number",
            "-description": "total number of volumes, usable for citing multi-volume books and such"
          },
          {
            "-name": "volume",
            "-type": "number",
            "-description": "(container) volume holding the item (e.g. \"2\" when citing a chapter from book volume 2)"
          },
          {
            "-name": "accessed",
            "-type": "date",
            "-description": "date the item has been accessed"
          },
          {
            "-name": "container",
            "-type": "date",
            "-description": "?"
          },
          {
            "-name": "event-date",
            "-type": "date",
            "-description": "date the related event took place"
          },
          {
            "-name": "issued",
            "-type": "date",
            "-description": "date the item was issued/published"
          },
          {
            "-name": "original-date",
            "-type": "date",
            "-description": "(issue) date of the original version"
          },
          {
            "-name": "submitted",
            "-type": "date",
            "-description": "date the item (e.g. a manuscript) has been submitted for publication"
          },
          {
            "-name": "author",
            "-type": "name",
            "-description": "author"
          },
          {
            "-name": "collection-editor",
            "-type": "name",
            "-description": "editor of the collection holding the item (e.g. the series editor for a book)"
          },
          {
            "-name": "composer",
            "-type": "name",
            "-description": "composer (e.g. of a musical score)"
          },
          {
            "-name": "container-author",
            "-type": "name",
            "-description": "author of the container holding the item (e.g. the book author for a book chapter)"
          },
          {
            "-name": "director",
            "-type": "name",
            "-description": "director (e.g. of a film)"
          },
          {
            "-name": "editor",
            "-type": "name",
            "-description": "editor"
          },
          {
            "-name": "editorial-director",
            "-type": "name",
            "-description": "managing editor (\"Directeur de la Publication\" in French)"
          },
          {
            "-name": "illustrator",
            "-type": "name",
            "-description": "illustrator (e.g. of a children's book)"
          },
          {
            "-name": "interviewer",
            "-type": "name",
            "-description": "interviewer (e.g. of an interview)"
          },
          {
            "-name": "original-author",
            "-type": "name",
            "-description": "?"
          },
          {
            "-name": "recipient",
            "-type": "name",
            "-description": "recipient (e.g. of a letter)"
          },
          {
            "-name": "reviewed-author",
            "-type": "name",
            "-description": "author of the item reviewed by the current item"
          },
          {
            "-name": "translator",
            "-type": "name",
            "-description": "translator"
          },
          {
            "-name": "language",
            "-type": "standard",
            "-description": "Language code. Not intended for display purposes."
          }
        ]
      }
    }
  }
}

