// ==UserScript==
// @name         Autofill RX inform dob
// @namespace    https://github.com/isaacl
// @version      0.1
// @description  Adds dob to RX page.
// @author       Isaac Levy
// @license      MIT
// @match        *://rxinform.org/m/*
// @run-at       document-end
// @grant        none
// @homepageURL  https://github.com/isaacl/il-userscripts
// @supportURL   https://github.com/isaacl/il-userscripts/issues
// ==/UserScript==

"use strict";
(function () {
  // Only run on /m/[id] pages.
  if (window.location.pathname.split("/", 4).length !== 3) return;

  function parseDob(dobStr) {
    // Be smarter about parsing dob
    let parts = dobStr.split(/\D+/).filter(Boolean);
    if (parts.length === 1) {
      const raw = parts[0];
      parts = [raw.slice(0, 2), raw.slice(2, 4), raw.slice(4)];
    }
    if (parts.length !== 3) return;
    let [m, d, y] = parts.map(Number);
    if (y && y < 100) y += y > 25 ? 1900 : 2000;
    if (m && d && y && m <= 12 && d <= 31 && y < 2050) {
      return [("0" + m).slice(-2), ("0" + d).slice(-2), y].join("/");
    }
  }

  const dobKey = "DOB";
  let dob = localStorage.getItem(dobKey);
  while (!dob) {
    const resp = prompt("Enter dob (saved locally)");
    if (!resp) break;
    dob = parseDob(resp);
    localStorage.setItem(dobKey, dob);
  }
  if (!dob) return;
  const dobInterval = setInterval(() => {
    const bd = document.querySelector("input#birthdate");
    const submitBtn = document.querySelector("button#submitButton");
    if (!bd || !submitBtn) return;
    clearInterval(dobInterval);
    const submitValid = () => !submitBtn.classList.contains("is-invalid");
    const obs = new MutationObserver(() => {
      if (submitValid()) {
        obs.disconnect();
        submitBtn.click();
      }
    });
    obs.observe(submitBtn, { attributeFilter: ["class"] });
    if (bd.value || submitValid()) return obs.disconnect();
    bd.value = dob;
    bd.dispatchEvent(new Event("input", { bubbles: true }));
    bd.dispatchEvent(new Event("change", { bubbles: true }));
  }, 100);
  setTimeout(clearInterval, 3e4, dobInterval);
})();
