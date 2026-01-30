// ==UserScript==
// @name         Always use Google Web mode (udm=14)
// @namespace    https://github.com/isaacl
// @version      0.2.2
// @description  Redirects browser search to web mode (udm=14), avoiding AI and other distractions.
// @author       Isaac Levy
// @license      MIT
// @match        *://*.google.com/search?*
// @match        *://*.google.co.uk/search?*
// @match        *://*.google.ca/search?*
// @match        *://*.google.com.au/search?*
// @match        *://*.google.co.in/search?*
// @match        *://*.google.de/search?*
// @match        *://*.google.fr/search?*
// @match        *://*.google.it/search?*
// @match        *://*.google.es/search?*
// @match        *://*.google.com.br/search?*
// @match        *://*.google.com.mx/search?*
// @match        *://*.google.co.jp/search?*
// @match        *://*.google.co.kr/search?*
// @match        *://*.google.com.sg/search?*
// @match        *://*.google.com.hk/search?*
// @match        *://*.google.com.tw/search?*
// @match        *://*.google.nl/search?*
// @match        *://*.google.be/search?*
// @match        *://*.google.ch/search?*
// @match        *://*.google.at/search?*
// @match        *://*.google.se/search?*
// @match        *://*.google.pl/search?*
// @match        *://*.google.pt/search?*
// @match        *://*.google.ie/search?*
// @match        *://*.google.com.tr/search?*
// @match        *://*.google.co.id/search?*
// @match        *://*.google.co.th/search?*
// @match        *://*.google.com.vn/search?*
// @match        *://*.google.com.ph/search?*
// @match        *://*.google.com.my/search?*
// @match        *://*.google.ru/search?*
// @match        *://*.google.gr/search?*
// @match        *://*.google.cz/search?*
// @match        *://*.google.hu/search?*
// @match        *://*.google.ro/search?*
// @match        *://*.google.co.za/search?*
// @match        *://*.google.com.ar/search?*
// @match        *://*.google.com.co/search?*
// @match        *://*.google.cl/search?*
// @match        *://*.google.com.pe/search?*
// @match        *://*.google.com.pk/search?*
// @match        *://*.google.com.eg/search?*
// @match        *://*.google.com.sa/search?*
// @match        *://*.google.ae/search?*
// @match        *://*.google.co.il/search?*
// @run-at       document-start
// @grant        none
// @homepageURL  https://github.com/isaacl/il-userscripts
// @supportURL   https://github.com/isaacl/il-userscripts/issues
// ==/UserScript==

"use strict";

// Note: udm param means a search engine mode, tbm is used for some legacy searches.
// Quick check to avoid unnecessary work.  Not for correctness.
const rawSearch = window.location.search;
if (rawSearch.includes("udm=") || rawSearch.includes("tbm="))
  return;

let fromGoogleSearch = false;
if (document.referrer) {
  try {
    const { hostname, pathname } = new URL(document.referrer);
    // Matches google.com, google.co.uk, google.com.au, etc.
    const googleHost = /^(www\.)?google(\.[a-z]{2,3}){1,2}$/.test(hostname);
    fromGoogleSearch = googleHost && pathname === "/search";
  } catch {}
}

// Don't redirect if user may have explicitly clicked 'All' for a search.
if (!fromGoogleSearch) {
  const url = new URL(window.location.href);
  // Don't set if already has a search choice param.
  if (!url.searchParams.has("udm") && !url.searchParams.has("tbm")) {
    url.searchParams.set("udm", "14");
    window.location.replace(url);
  }
}
