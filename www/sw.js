/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/require-await, @typescript-eslint/no-unsafe-assignment */

/* global self, caches, fetch, URL */

/* ::
type ServiceWorkerEvent = {
    ...Event,
    waitUntil: (waitFor: Promise<mixed>) => mixed,
    respondWith: (respondFor: Promise<mixed>) => mixed,
    request: Request,
};
*/

const cacheName = "my-pwa-cache-v.0001";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function updateCache(evt /* :: : ServiceWorkerEvent */) {
    const {request} = evt;
    const cache = await caches.open(cacheName);
    const response = await fetch(request);

    console.log("[PWA]: add page to offline:", response.url);

    await cache.put(request, response);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function fetchRespondWith(evt /* :: : ServiceWorkerEvent */) {
    return fetch(evt.request).catch(async (error /* :: : Error */) /* :: : Promise<mixed> */ => {
        console.log("[PWA]: network request Failed. Get content from cache:", error.message);
        const cache = await caches.open(cacheName);
        const matching = await cache.match(evt.request);

        if (!matching || String(matching.status) === "404") {
            console.log("---> matching is wrong", matching);
            throw new Error("no-match");
        }

        return matching;
    });
}

const urlStartWithList = ["/static/", "/manifest.json"];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function isUrlStartWithListContainPathname(pathname /* :: : string */) /* :: : boolean */ {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return urlStartWithList.some((url /* :: : string */) /* :: : boolean */ => {
        return pathname.startsWith(url);
    });
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function fetchCallBack(evt /* :: : ServiceWorkerEvent */) /* :: : Promise<undefined> */ {
    const {request} = evt;
    const {method, url} = request;

    if (method.toLowerCase() !== "get") {
        return;
    }

    const urlData = new URL(url);
    const {pathname} = urlData;

    if (isUrlStartWithListContainPathname(pathname) || pathname === "/") {
        evt.waitUntil(updateCache(evt));
        evt.respondWith(fetchRespondWith(evt));
    }
}

// eslint-disable-next-line jest/require-hook, @typescript-eslint/no-misused-promises
self.addEventListener("fetch", fetchCallBack);
