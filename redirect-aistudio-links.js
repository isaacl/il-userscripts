// ==UserScript==
// @name         Auto redirect Google aistudio links
// @namespace    https://github.com/isaacl
// @version      0.2.5
// @description  Skip the redirect warning page for aistudio urls.
// @author       Isaac Levy
// @license      MIT
// @match        *://www.google.com/url?*
// @run-at       document-start
// @grant        none
// @homepageURL  https://github.com/isaacl/il-userscripts
// @supportURL   https://github.com/isaacl/il-userscripts/issues
// ==/UserScript==

(function () {
  "use strict";
  let fromGoogle = false;
  if (document.referrer) {
    try {
      const { hostname } = new URL(document.referrer);
      fromGoogle = /^([a-z]*\.)?google\.com$/.test(hostname);
    } catch {}
  }

  if (fromGoogle) {
    const url = new URL(window.location.href);
    if (url.host === "www.google.com" && url.pathname === "/url") {
      try {
        const newURL = new URL(url.searchParams.get("q"));
        if (
          newURL.hostname === "vertexaisearch.cloud.google.com" &&
          newURL.pathname.startsWith("/grounding-api-redirect/")
        ) {
          window.location.replace(newURL.href);
        }
      } catch {}
    }
  }
})();
