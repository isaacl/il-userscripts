// ==UserScript==
// @name         Always use Google Web mode (udm=14)
// @namespace    https://github.com/isaacl
// @version      0.1
// @description  Redirects general Google searches to web mode (udm=14), avoiding some nonsense.
// @author       Isaac Levy
// @license      MIT
// @match        *://www.google.com/search
// @match        *://www.google.com/search?*
// @run-at       document-start
// @homepageURL  https://github.com/isaacl/il-userscripts
// @supportURL   https://github.com/isaacl/il-userscripts/issues
// ==/UserScript==

(function() {
    'use strict';
    if (!window.location.search.includes('udm=14')) {
        const urlParams = new URLSearchParams(window.location.search)
        if (!urlParams.has('udm')) {
          urlParams.append('udm', '14');
          window.location.search = urlParams.toString();
        }
    }
})();