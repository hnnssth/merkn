// Merkn – Offline-Unterstützung. App-Dateien: erst Netz, sonst Cache. Schriften: aus dem Cache.
const CACHE = "merkn-v5";
const SHELL = ["./", "index.html", "manifest.json", "icons/icon-192.png", "icons/icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Teilen an Merkn: Dateien und Text aus anderen Apps (z. B. Samsung Diktiergerät) in den Eingang legen
function idbPut(key, val){
  return new Promise((res, rej) => {
    const r = indexedDB.open("merkn", 1);
    r.onupgradeneeded = () => r.result.createObjectStore("kv");
    r.onerror = () => rej(r.error);
    r.onsuccess = () => {
      const db = r.result, t = db.transaction("kv", "readwrite"), st = t.objectStore("kv");
      const g = st.get(key);
      g.onsuccess = () => { const list = g.result || []; list.push(val); st.put(list, key); };
      t.oncomplete = () => { db.close(); res(); }; t.onerror = () => rej(t.error);
    };
  });
}
async function handleShare(req){
  const fd = await req.formData();
  const files = [];
  for (const f of fd.getAll("files")) if (f && f.size) files.push({name: f.name, type: f.type, blob: new Blob([await f.arrayBuffer()], {type: f.type})});
  await idbPut("shareInbox", {title: fd.get("title") || "", text: fd.get("text") || "", url: fd.get("url") || "", files});
  return Response.redirect("./?share=1", 303);
}

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method === "POST" && url.pathname.endsWith("/share")) { e.respondWith(handleShare(e.request)); return; }
  if (e.request.method !== "GET" || url.hostname === "api.github.com") return;
  if (url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com")) {
    e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
    })));
    return;
  }
  if (url.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match(e.request).then(hit => hit || caches.match("index.html"))));
});
