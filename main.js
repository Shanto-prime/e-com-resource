/* =====================================================================
   ECOBAZAR — main.js
   Shared client-side behaviour for every page:
   mobile menu drawer, submenu accordions, cart drawer, quick-view modal,
   quantity steppers, and product-details tabs.
   ===================================================================== */

(function () {
  'use strict';

  /* ---------- helpers ---------- */
  function lock()   { document.body.classList.add('no-scroll'); }
  function unlock() {
    if (!document.querySelector('.is-open-overlay')) {
      document.body.classList.remove('no-scroll');
    }
  }

  /* ---------- mobile menu drawer ---------- */
  var menuBackdrop = document.getElementById('mobileBackdrop');
  var menuDrawer   = document.getElementById('mobileMenu');

  function openMenu() {
    if (!menuDrawer || !menuBackdrop) return;
    menuDrawer.classList.remove('-translate-x-full');
    menuDrawer.classList.add('is-open-overlay');
    menuBackdrop.classList.remove('opacity-0', 'invisible');
    lock();
  }
  function closeMenu() {
    if (!menuDrawer || !menuBackdrop) return;
    menuDrawer.classList.add('-translate-x-full');
    menuDrawer.classList.remove('is-open-overlay');
    menuBackdrop.classList.add('opacity-0', 'invisible');
    unlock();
  }

  document.querySelectorAll('[data-menu-open]').forEach(function (b) { b.addEventListener('click', openMenu); });
  document.querySelectorAll('[data-menu-close]').forEach(function (b) { b.addEventListener('click', closeMenu); });
  if (menuBackdrop) menuBackdrop.addEventListener('click', closeMenu);

  /* ---------- mobile submenu accordions ---------- */
  document.querySelectorAll('[data-accordion]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = btn.nextElementSibling;
      if (!panel) return;
      panel.classList.toggle('hidden');
      btn.classList.toggle('is-open');
    });
  });

  /* ---------- cart drawer ---------- */
  var cartBackdrop = document.getElementById('cartBackdrop');
  var cartDrawer   = document.getElementById('cartDrawer');

  function openCart() {
    if (!cartDrawer || !cartBackdrop) return;
    cartDrawer.classList.remove('translate-x-full');
    cartDrawer.classList.add('is-open-overlay');
    cartBackdrop.classList.remove('opacity-0', 'invisible');
    lock();
  }
  function closeCart() {
    if (!cartDrawer || !cartBackdrop) return;
    cartDrawer.classList.add('translate-x-full');
    cartDrawer.classList.remove('is-open-overlay');
    cartBackdrop.classList.add('opacity-0', 'invisible');
    unlock();
  }

  document.querySelectorAll('[data-cart-open]').forEach(function (b) { b.addEventListener('click', openCart); });
  document.querySelectorAll('[data-cart-close]').forEach(function (b) { b.addEventListener('click', closeCart); });
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

  /* ---------- quick-view modal ---------- */
  var quickBackdrop = document.getElementById('quickBackdrop');
  var quickModal    = document.getElementById('quickModal');

  function openQuick() {
    if (!quickBackdrop || !quickModal) return;
    quickBackdrop.classList.remove('opacity-0', 'invisible');
    quickBackdrop.classList.add('is-open-overlay');
    quickModal.classList.remove('scale-95');
    lock();
  }
  function closeQuick() {
    if (!quickBackdrop || !quickModal) return;
    quickBackdrop.classList.add('opacity-0', 'invisible');
    quickBackdrop.classList.remove('is-open-overlay');
    quickModal.classList.add('scale-95');
    unlock();
  }

  document.querySelectorAll('[data-quickview]').forEach(function (b) {
    b.addEventListener('click', function (e) { e.preventDefault(); openQuick(); });
  });
  document.querySelectorAll('[data-quick-close]').forEach(function (b) { b.addEventListener('click', closeQuick); });
  if (quickBackdrop) {
    quickBackdrop.addEventListener('click', function (e) {
      if (e.target === quickBackdrop) closeQuick();
    });
  }

  /* ---------- escape closes any open overlay ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeMenu();
    closeCart();
    closeQuick();
  });

  /* ---------- quantity steppers ---------- */
  document.querySelectorAll('[data-qty]').forEach(function (box) {
    var val = box.querySelector('[data-qty-val]');
    var dec = box.querySelector('[data-qty-dec]');
    var inc = box.querySelector('[data-qty-inc]');
    if (!val) return;
    if (dec) dec.addEventListener('click', function () {
      var n = parseInt(val.textContent, 10) || 1;
      if (n > 1) val.textContent = n - 1;
    });
    if (inc) inc.addEventListener('click', function () {
      var n = parseInt(val.textContent, 10) || 1;
      val.textContent = n + 1;
    });
  });

  /* ---------- product-details tabs ---------- */
  var tabBtns = document.querySelectorAll('[data-tab]');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var name = btn.getAttribute('data-tab');
      tabBtns.forEach(function (b) {
        var on = b.getAttribute('data-tab') === name;
        b.classList.toggle('text-primary', on);
        b.classList.toggle('border-primary', on);
        b.classList.toggle('text-gray-500', !on);
        b.classList.toggle('border-transparent', !on);
      });
      document.querySelectorAll('[data-tab-panel]').forEach(function (p) {
        p.classList.toggle('hidden', p.getAttribute('data-tab-panel') !== name);
      });
    });
  });

})();
