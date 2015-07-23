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
    along with Zotero.  If not, see <http://www.gnu.org/licenses/>.
    
    ***** END LICENSE BLOCK *****
*/

const ZOTERO1_BASE_URI = 'https://www.zotero.org/'; // Never change

// Change these to your bookmarklet URI
// const ZOTERO1_BOOKMARKLET_ORIGIN = 'https://www.zotero.org';
// const ZOTERO1_BOOKMARKLET_FOLDER = 'bookmarklet/';
// const ZOTERO1_BOOKMARKLET_ORIGIN = 'https://dl.dropboxusercontent.com/';
// const ZOTERO1_BOOKMARKLET_ORIGIN = 'http://localhost/';

// fix-me: The bookmarklet code is now run on the location where the code is. Nearly.
var ZOTERO1_BOOKMARKLET_ORIGIN = location.protocol+"//"+location.host;
// const ZOTERO1_BOOKMARKLET_FOLDER = 'u/848981/it/zotero-connectors/build/bookmarklet/';
var ZOTERO1_BOOKMARKLET_FOLDER = (function(z){return z.substr(0,z.lastIndexOf("/")+1);})(location.pathname);

var ZOTERO_CONFIG = {
    REPOSITORY_URL: ZOTERO1_BASE_URI+'repo',
    REPOSITORY_CHECK_INTERVAL: 86400, // 24 hours
    REPOSITORY_RETRY_INTERVAL: 3600, // 1 hour
    REPOSITORY_CHANNEL: 'trunk',

    // BASE_URI: 'http://zotero.org/',
    // WWW_BASE_URL: 'http://www.zotero.org/',

    API_URL: 'https://api.zotero.org/',

    LOGIN_URL: ZOTERO1_BASE_URI+'user/login/?bm=1',

    BOOKMARKLET_ORIGIN : ZOTERO1_BOOKMARKLET_ORIGIN,
    HTTP_BOOKMARKLET_ORIGIN : ZOTERO1_BOOKMARKLET_ORIGIN,
    BOOKMARKLET_URL: ZOTERO1_BOOKMARKLET_ORIGIN+ZOTERO1_BOOKMARKLET_FOLDER,
    HTTP_BOOKMARKLET_URL: ZOTERO1_BOOKMARKLET_ORIGIN+ZOTERO1_BOOKMARKLET_FOLDER,

    AUTH_COMPLETE_URL: ZOTERO1_BASE_URI+'bookmarklet/auth_complete.html',

    S3_URL: 'https://zoterofilestorage.s3.amazonaws.com/'
};
Zotero.isBookmarklet = true;
