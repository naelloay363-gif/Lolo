const CACHE_NAME = "lolo-cache-v1";
const ASSETS = [
  "/Lolo/",
  "/Lolo/index.html",
  "/Lolo/manifest.webmanifest"
];

self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE_NAME);
    await c.addAll(ASSETS);
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k === CACHE_NAME ? null : caches.delete(k)));
    self.clients.claim();
  })());
});

self.addEventListener("fetch", (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request, { ignoreSearch: true });
    if (r) return r;
    try { return await fetch(e.request); }
    catch {
      // لو أوفلاين وطلب تنقّل، رجّع الصفحة الرئيسية
      if (e.request.mode === "navigate") return caches.match("/Lolo/index.html");
      return caches.match("/Lolo/");
    }
  })());
});
