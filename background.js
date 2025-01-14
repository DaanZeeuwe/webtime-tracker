"use strict";
var domains = {},
    dates = {
        today: getDateString(),
        start: ""
    },
    seconds = {
        today: 0,
        alltime: 0
    },
    timeIntervals = {
        update: 0,
        save: 0
    },
    settings = {
        idleTime: IDLE_TIME_DEFAULT,
        graphGap: GRAPH_GAP_DEFAULT,
        badgeDisplay: BADGE_DISPLAY_DEFAULT,
        screenshotInstructionsRead: SCREENSHOT_INSTRUCTIONS_READ_DEFAULT
    },
    domainsChanged = !1,
    STORAGE_DOMAINS = "domains",
    STORAGE_DATE_START = "date-start",
    STORAGE_SECONDS_ALLTIME = "seconds-alltime",
    STORAGE_IDLE_TIME = "idle-time",
    STORAGE_GRAPH_GAP = "graph-gap",
    STORAGE_BADGE_DISPLAY = "badge-display",
    STORAGE_SCREENSHOT_INSTRUCTIONS_READ = "storage-instructions-read",
    loadDomains = function (e) {
        return storageLocal.load(STORAGE_DOMAINS, {}, function (a) {
            e(a), dcl("Domains loaded: " + Object.keys(domains).length + " domains")
        }), !0
    },
    saveDomains = function () {
        return storageLocal.save(STORAGE_DOMAINS, domains, function () {
            domainsChanged = !1, dcl("Domains saved: " + Object.keys(domains).length + " domains")
        }), !0
    },
    clearAllGeneratedData = function () {
        return domains = {}, saveDomains(), seconds.today = 0, seconds.alltime = 0, saveSecondsAlltime(), dates.start = dates.today, saveDateStart(), dcl("Clear all generated data: done"), !0
    },
    loadDateStart = function (e) {
        return storageLocal.load(STORAGE_DATE_START, e, function (e) {
            dates.start = e[STORAGE_DATE_START], saveDateStart(), dcl("Start date loaded: " + e[STORAGE_DATE_START])
        }), !0
    },
    saveDateStart = function () {
        return storageLocal.save(STORAGE_DATE_START, dates.start, function () {
            dcl("Start date saved: " + dates.start)
        }), !0
    },
    loadSecondsAlltime = function () {
        return storageLocal.load(STORAGE_SECONDS_ALLTIME, 0, function (e) {
            seconds.alltime = e[STORAGE_SECONDS_ALLTIME], saveSecondsAlltime(), dcl("Seconds alltime loaded: " + e[STORAGE_SECONDS_ALLTIME])
        }), !0
    },
    saveSecondsAlltime = function () {
        return storageLocal.save(STORAGE_SECONDS_ALLTIME, seconds.alltime, function () {
            dcl("Seconds alltime saved: " + seconds.alltime)
        }), !0
    },
    loadIdleTime = function () {
        return storageLocal.load(STORAGE_IDLE_TIME, IDLE_TIME_DEFAULT, function (e) {
            settings.idleTime = e[STORAGE_IDLE_TIME], saveIdleTime(), dcl("Idle time loaded: " + e[STORAGE_IDLE_TIME])
        }), !0
    },
    saveIdleTime = function () {
        return storageLocal.save(STORAGE_IDLE_TIME, settings.idleTime, function () {
            dcl("Idle time saved: " + settings.idleTime)
        }), !0
    },
    setIdleTime = function (e) {
        return settings.idleTime = parseInt(e) || IDLE_TIME_DEFAULT, !0
    },
    loadGraphGap = function () {
        return storageLocal.load(STORAGE_GRAPH_GAP, GRAPH_GAP_DEFAULT, function (e) {
            settings.graphGap = e[STORAGE_GRAPH_GAP], saveGraphGap(), dcl("Graph gap loaded: " + e[STORAGE_GRAPH_GAP])
        }), !0
    },
    saveGraphGap = function () {
        return storageLocal.save(STORAGE_GRAPH_GAP, settings.graphGap, function () {
            dcl("Graph gap saved: " + settings.graphGap)
        }), !0
    },
    setGraphGap = function (e) {
        var a = parseFloat(e);
        return settings.graphGap = isFinite(a) ? a : GRAPH_GAP_DEFAULT, !0
    },
    loadBadgeDisplay = function () {
        return storageLocal.load(STORAGE_BADGE_DISPLAY, BADGE_DISPLAY_DEFAULT, function (e) {
            settings.badgeDisplay = e[STORAGE_BADGE_DISPLAY], saveBadgeDisplay(), dcl("Badge display loaded: " + e[STORAGE_BADGE_DISPLAY])
        }), !0
    },
    saveBadgeDisplay = function () {
        return storageLocal.save(STORAGE_BADGE_DISPLAY, settings.badgeDisplay, function () {
            dcl("Badge display saved: " + settings.badgeDisplay)
        }), !0
    },
    setBadgeDisplay = function (e) {
        return settings.badgeDisplay = "boolean" == typeof e ? e : BADGE_DISPLAY_DEFAULT, !0
    },
    loadScreenshotInstructionsRead = function () {
        return storageLocal.load(STORAGE_SCREENSHOT_INSTRUCTIONS_READ, SCREENSHOT_INSTRUCTIONS_READ_DEFAULT, function (e) {
            settings.screenshotInstructionsRead = e[STORAGE_SCREENSHOT_INSTRUCTIONS_READ], saveScreenshotInstructionsRead(), dcl("Storage instructions set loaded: " + e[STORAGE_SCREENSHOT_INSTRUCTIONS_READ])
        }), !0
    },
    saveScreenshotInstructionsRead = function () {
        return storageLocal.save(STORAGE_SCREENSHOT_INSTRUCTIONS_READ, settings.screenshotInstructionsRead, function () {
            dcl("Storage instructions set saved: " + settings.screenshotInstructionsRead)
        }), !0
    },
    setScreenshotInstructionsRead = function (e) {
        return settings.screenshotInstructionsRead = "boolean" == typeof e ? e : SCREENSHOT_INSTRUCTIONS_READ_DEFAULT, !0
    },
    setBadge = function (e, a) {
        return settings.badgeDisplay || (a = ""), chrome.browserAction.setBadgeText({
            tabId: e,
            text: a
        }), !0
    },
    updateDomains = function (e) {
        var a, t, s, n = getDateString();
        dates.today !== n && (dates.today = n, seconds.today = 0), chrome.windows.getLastFocused({
            populate: !0
        }, function (n) {
            if (n) {
                if (n.tabs) {
                    for (var o in n.tabs) {
                        if (n.tabs.hasOwnProperty(o) && n.tabs[o].active === !0) {
                            s = n.tabs[o];
                            break
                        } chrome.idle.queryState(settings.idleTime, function (o) {
                            var d = (n.id, n.focused, s.id);
                            s.url;
                            if (a = parseDomainFromUrl(s.url), t = parseProtocolFromUrl(s.url), (n.focused && "active" === o || e) && -1 === BLACKLIST_DOMAIN.indexOf(a) && -1 === BLACKLIST_PROTOCOL.indexOf(t) && "" !== a) {
                                dcl("LOG (" + dates.today + "): " + a), domains.hasOwnProperty(a) || (domains[a] = getDomainObj(), domains[a].name = a);
                                var i = domains[a];
                                i.days[dates.today] = i.days[dates.today] || getDayObj(), e || (i.alltime.seconds += INTERVAL_UPDATE_S, i.days[dates.today].seconds += INTERVAL_UPDATE_S, seconds.today += INTERVAL_UPDATE_S, seconds.alltime += INTERVAL_UPDATE_S, domainsChanged = !0), setBadge(d, getBadgeTimeString(i.alltime.seconds))
                            }
                        })
                    }
                }
            }
        })
    };
chrome.tabs.onActivated.addListener(function (e) {
    var a, t = e.tabId;
    return chrome.tabs.get(t, function (e) {
        a = parseDomainFromUrl(e.url), setBadge(t, ""), domains[a] && domains[a].alltime && setBadge(t, getBadgeTimeString(domains[a].alltime.seconds))
    }), !0
}), 
dcl("Webtime Tracker - background.js loaded"), 
loadDateStart(dates.today), 
loadSecondsAlltime(), 
loadIdleTime(), 
loadGraphGap(), 
loadBadgeDisplay(), 
loadScreenshotInstructionsRead(), 
loadDomains(function (e) {
    return domains = e[STORAGE_DOMAINS] || [], seconds.today = getTotalSecondsForDate(domains, getDateString()), !0
}), 
timeIntervals.update = window.setInterval(function () {
    updateDomains()
}, INTERVAL_UPDATE_MS),

timeIntervals.save = window.setInterval(function () {
    domainsChanged && (saveDomains(), saveSecondsAlltime(), chrome.storage.local.getBytesInUse(null, function (e) {
        dcl("Total storage used: " + e + " B")
    }))
}, INTERVAL_SAVE_MS),
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("runtime received message")
    if (request.color) {
      chrome.browserAction.setBadgeBackgroundColor({color: request.color})
    }
})