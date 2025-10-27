// sw.js — قوي ومرن لمجلدات GitHub Pages الفرعية
const VERSION = "v4"; // زِد الرقم كل ما تحدث ملفاتك
const BASE = new URL(self.registration.scope).pathname; // مثال: "/Lolo/"
const CACHE_NAME = `lolo-cache-${VERSION}`;

const ASSETS = [
  BASE,
  BASE + "index.html",
  BASE + "manifest.webmanifest",
  BASE + "sw.js",
  // أضف هنا أيقوناتك إن وُجدت:
  // BASE + "icon-192.png",
  // BASE + "icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(ASSETS);
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k === CACHE_NAME ? null : caches.delete(k)));
    self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  event.respondWith((
