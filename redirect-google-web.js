// ==UserScript==
// @name         Always use Google Web mode (udm=14)
// @namespace    https://github.com/isaacl
// @version      0.2.3
// @description  Redirects browser search to web mode (udm=14), avoiding AI and other distractions.
// @author       Isaac Levy
// @license      MIT
// @match        *://www.google.com/search?*
// @match        *://www.google.co.uk/search?*
// @match        *://www.google.ca/search?*
// @match        *://www.google.com.au/search?*
// @match        *://www.google.co.in/search?*
// @match        *://www.google.de/search?*
// @match        *://www.google.fr/search?*
// @match        *://www.google.it/search?*
// @match        *://www.google.es/search?*
// @match        *://www.google.com.br/search?*
// @match        *://www.google.com.mx/search?*
// @match        *://www.google.co.jp/search?*
// @match        *://www.google.co.kr/search?*
// @match        *://www.google.com.sg/search?*
// @match        *://www.google.com.hk/search?*
// @match        *://www.google.com.tw/search?*
// @match        *://www.google.nl/search?*
// @match        *://www.google.be/search?*
// @match        *://www.google.ch/search?*
// @match        *://www.google.at/search?*
// @match        *://www.google.se/search?*
// @match        *://www.google.pl/search?*
// @match        *://www.google.pt/search?*
// @match        *://www.google.ie/search?*
// @match        *://www.google.com.tr/search?*
// @match        *://www.google.co.id/search?*
// @match        *://www.google.co.th/search?*
// @match        *://www.google.com.vn/search?*
// @match        *://www.google.com.ph/search?*
// @match        *://www.google.com.my/search?*
// @match        *://www.google.ru/search?*
// @match        *://www.google.gr/search?*
// @match        *://www.google.cz/search?*
// @match        *://www.google.hu/search?*
// @match        *://www.google.ro/search?*
// @match        *://www.google.co.za/search?*
// @match        *://www.google.com.ar/search?*
// @match        *://www.google.com.co/search?*
// @match        *://www.google.cl/search?*
// @match        *://www.google.com.pe/search?*
// @match        *://www.google.com.pk/search?*
// @match        *://www.google.com.eg/search?*
// @match        *://www.google.com.sa/search?*
// @match        *://www.google.ae/search?*
// @match        *://www.google.co.il/search?*
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
