const cacheName = 'Flux-v008';
const resources = [
    '/',
    '/index.html',
    '/privacy.html',
    '/css/flux.css',

    '/images/connections/garmin-connect.png',
    '/images/connections/powered-by-strava-logo.svg',
    '/images/logo/logo-512.png',
    '/images/logo/logo.svg',
    '/images/logo/logo-192.png',
    '/images/logo/logo-1024.png',
    '/favicon-16.png',
    '/favicon-32.png',
    '/favicon-64.png',
    '/favicon-180.png',

    '/db.js',
    '/index.js',
    '/workouts/zwo.js',
    '/workouts/workouts.js',
    '/views/ant-device-scan.js',
    '/views/views.js',
    '/views/connection-switch.js',
    '/views/data-views.js',
    '/views/workout-graph-svg.js',
    '/views/activity-list.js',
    '/views/moxy-graph.js',
    '/views/planned-list.js',
    '/views/watch.js',
    '/views/graph.js',
    '/views/workout-graph.js',
    '/views/workout-list.js',
    '/views/auth-forms.js',
    '/views/editor.js',
    '/views/tabs.js',
    '/views/effect-views.js',
    '/views/keyboard.js',
    '/views/active-list-item.js',

    '/storage/uuid.js',
    '/storage/idb.js',
    '/storage/local-storage.js',
    '/ble/enums.js',
    '/ble/ct/core-body-temperature.js',
    '/ble/wcps/control-point.js',
    '/ble/wcps/wcps.js',
    '/ble/hrs/hrs.js',
    '/ble/hrs/heart-rate-measurement.js',
    '/ble/dis/dis.js',
    '/ble/cps/cps.js',
    '/ble/cps/control-point.js',
    '/ble/cps/cycling-power-feature.js',
    '/ble/cps/cycling-power-measurement.js',
    '/ble/web-ble.js',
    '/ble/connectable.js',
    '/ble/service.js',
    '/ble/userData.js',
    '/ble/common.js',
    '/ble/cscs/cscs.js',
    '/ble/cscs/revs-over-time.js',
    '/ble/cscs/cycling-speed-cadence-measurement.js',
    '/ble/ftms/supported-ranges.js',
    '/ble/ftms/fitness-machine-status.js',
    '/ble/ftms/control-point.js',
    '/ble/ftms/fitness-machine-feature.js',
    '/ble/ftms/ftms.js',
    '/ble/ftms/indoor-bike-data.js',
    '/ble/devices.js',
    '/ble/reactive-connectable.js',
    '/ble/moxy/moxy.js',
    '/ble/moxy/smo2.js',
    '/ble/fec/message.js',
    '/ble/fec/messages.js',
    '/ble/fec/fec.js',
    '/ble/characteristic.js',
    '/ble/rcs/race-controller-measurement.js',
    '/ble/rcs/rcs.js',
    '/ble/bas/battery-level.js',
    '/ble/bas/bas.js',
    '/activity/enums.js',
    '/physics.js',
    '/ant/web-serial.js',
    '/ant/constants.js',
    '/ant/web-usb.js',
    '/ant/web-serial-polyfill.js',
    '/ant/q.js',
    '/ant/message.js',
    '/ant/driver.js',
    '/ant/common.js',
    '/ant/devices.js',
    '/ant/fec.js',
    '/ant/hr.js',
    '/fit/common.js',
    '/fit/crc.js',
    '/fit/data-record.js',
    '/fit/definition-record.js',
    '/fit/field-definition.js',
    '/fit/file-header.js',
    '/fit/fit.js',
    '/fit/fitjs.js',
    '/fit/local-activity.js',
    '/fit/local-course.js',
    '/fit/record-header.js',
    '/fit/profiles/base-types.js',
    '/fit/profiles/global-field-definitions.js',
    '/fit/profiles/global-message-definitions.js',
    '/fit/profiles/global-type-definitions.js',
    '/fit/profiles/product-message-definitions.js',
    '/fit/profiles/profiles.js',

    '/models/api.js',
    '/models/auth.js',
    '/models/config.js',
    '/models/enums.js',
    '/models/intervals.js',
    '/models/models.js',
    '/models/strava.js',
    '/models/training-peaks.js',
    '/sw.js',
    '/utils.js',
    '/watch.js',
    '/course.js',
    '/lock.js',
    '/file.js',
    '/functions.js',
    '/sound.js',
    '/timer.js',
    '/manifest.webmanifest',
];

self.addEventListener('install', e => {
    console.log('SW: Install.');

    e.waitUntil(
        caches.open(cacheName)
        .then((cache) => {
            console.log('SW: Caching files.');
            return cache.addAll(resources);
        })
    );
});

self.addEventListener('activate', e => {
    console.log('SW: Activate.');

    e.waitUntil(
        caches.keys().then((keyList) => {
                Promise.all(keyList.map((key) => {
                    console.log(key);
                    if (key === cacheName) { return; }
                    console.log(`deleting cache ${key}.`);
                    caches.delete(key);
                }));
            }));
});

self.addEventListener('fetch', e => {
    console.log(`SW: fetch: `, e.request.url);

    // Cache falling back to the Network
    e.respondWith(
        caches.match(e.request)
            .then(cachedResource => {
                if(cachedResource) {
                    return cachedResource;
                }
                return fetch(e.request);
            }));

    // Network falling back to the Cache
    // e.respondWith(
    //     fetch(e.request).catch(function() {
    //         return caches.match(e.request);
    //     }));
});
