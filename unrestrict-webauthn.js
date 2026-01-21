// ==UserScript==
// @name         Unrestrict WebAuthn
// @namespace    https://github.com/isaacl
// @version      0.1
// @description  Remove restrictions from webauth (avoids qr popups when you could use your own platform's passkeys)
// @author       Isaac Levy
// @license      MIT
// @match        https://*/*
// @run-at       document-start
// @homepageURL  https://github.com/isaacl/il-userscripts
// @supportURL   https://github.com/isaacl/il-userscripts/issues
// ==/UserScript==

if (navigator?.credentials) {
  ["create", "get"].forEach((m) => {
    const f = navigator.credentials[m];
    if (typeof f === "function") {
      navigator.credentials[m] = function () {
        const opts = arguments[0]?.publicKey;
        const authSelection = opts?.authenticatorSelection;
        if (
          authSelection?.residentKey === "required" ||
          authSelection?.requireResidentKey === true ||
          !opts?.allowCredentials?.length
        ) {
          delete authSelection?.authenticatorAttachment;
          delete opts?.hints;
        }
        return f.apply(this, arguments);
      };
    }
  });
}