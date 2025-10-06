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

"use strict";
// TODO: support other google domains. Needs both @match update and below.
let maybeFromGoogleSearch = false;
if (document.referrer) {
  try {
    const { hostname } = new URL(document.referrer);
    maybeFromGoogleSearch = /^(www\.)?google\.com$/.test(hostname);
  } catch (e) {}
}

// Quick check to avoid parsing URLParams, and exclude cases where
// a user may have explicitly clicked back to 'All' for a search.
// Could also use SessionStorage...
if (!window.location.search.includes("udm=14") && !maybeFromGoogleSearch) {
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has("udm")) {
    urlParams.append("udm", "14");
    window.location.search = urlParams.toString();
  }
}
