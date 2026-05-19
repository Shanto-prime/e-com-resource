/* =====================================================================
   ECOBAZAR — main.js
   Shared client-side behaviour for every page.
   Currently: mobile menu drawer + mobile submenu accordions.
   ===================================================================== */

(function () {
  'use strict';

  /* ---------- mobile menu drawer ---------- */
  var backdrop  = document.getElementById('mobileBackdrop');
  var drawer    = document.getElementById('mobileMenu');
  var openBtns  = document.querySelectorAll('[data-menu-open]');
  var closeBtns = document.querySelectorAll('[data-menu-close]');

  function openMenu() {
    if (!drawer || !backdrop) return;
    drawer.classList.remove('-translate-x-full');
    backdrop.classList.remove('opacity-0', 'invisible');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    if (!drawer || !backdrop) return;
    drawer.classList.add('-translate-x-full');
    backdrop.classList.add('opacity-0', 'invisible');
    document.body.classList.remove('menu-open');
  }

  openBtns.forEach(function (btn) { btn.addEventListener('click', openMenu); });
  closeBtns.forEach(function (btn) { btn.addEventListener('click', closeMenu); });
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- mobile submenu accordions ---------- */
  var accordionBtns = document.querySelectorAll('[data-accordion]');

  accordionBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = btn.nextElementSibling;
      if (!panel) return;
      panel.classList.toggle('hidden');
      btn.classList.toggle('is-open');
    });
  });

})();
