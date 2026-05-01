// Cache-first PWA service worker
const CACHE_VERSION = "shoot-planner-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./app.jsx",
  "./manifest.webmanifest",
  "./icons/icon-120.png",
  "./icons/icon-152.png",
  "./icons/icon-167.png",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png",
  // External CDN assets — cached on first hit
  "https://unpkg.com/react@18.3.1/umd/react.production.min.js",
  "https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js",
  "https://unpkg.com/@babel/standalone@7.29.0/babel.min.js",
  "https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;600;700;900&family=Noto+Sans+TC:wght@300;400;500;700&display=swap"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_VERSION).then((cache) =>
      // Use addAll but tolerate failures (cross-origin opaque etc.)
      Promise.all(
        ASSETS.map((url) =>
          cache.add(new Request(url, { cache: "reload" })).catch(() => null)
        )
      )
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  e.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          // Cache successful same-origin and opaque responses
          if (res && (res.status === 200 || res.type === "opaque")) {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => cached || new Response("", { status: 504 }));
    })
  );
});
