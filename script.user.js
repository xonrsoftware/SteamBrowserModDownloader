// ==UserScript==
// @name         Download Mod From Its Steam Page
// @version      1.1.4
// @author       НИНРИ (https://discord.gg/PSTM5gh)
// @match        https://steamcommunity.com/sharedfiles/filedetails/*
// @updateURL    https://github.com/xonrsoftware/SteamBrowserModDownloader/raw/master/script.user.js
// @downloadURL  https://github.com/xonrsoftware/SteamBrowserModDownloader/raw/master/script.user.js
// @grant        GM.xmlHttpRequest
// @require      https://github.com/xonrsoftware/SteamBrowserModDownloader/raw/master/libs/bson.bundle.js
// @require      https://github.com/xonrsoftware/SteamBrowserModDownloader/raw/master/libs/buffer.js
// ==/UserScript==

let modDownloaderLinkObject = undefined;
let modDownloaderLinkUrl = undefined;
const preventRepeatOfRequests = false;

const
    isNullish = x => [
        //v => v === '',
        v => v === null,
        v => v === undefined,
        //v => v && typeof v === 'object' && !Object.keys(v).length
    ].some(f => f(x)),
    getArray = array => {
        var temp = array.reduce((r, v) => {
                v = getNotNullish(v);
                if (v !== undefined) r.push(v);
                return r;
            }, []);

        return temp.length ? temp : undefined;
    },
    getObject = object => {
        var hasValues = false,
            temp = Object.entries(object).reduce((r, [k, v]) => {
                v = getNotNullish(v);
                if (v !== undefined) {
                    r[k] = v;
                    hasValues = true;
                }
                return r;
            }, {});

        return hasValues ? temp : undefined;
    },
    getNotNullish = value => {
        if (Array.isArray(value)) return getArray(value);
        if (value && typeof value === 'object') return getObject(value);
        return isNullish(value) ? undefined : value;
    };

function downloadObjectAsJson(data, filename) {
    if (typeof data === "object") {
        data = getNotNullish(data);
        data = JSON.stringify(data, null, 2)
    }
    data = data.replace(/function *null\(\)(.*?)end[\\r\\n\\r\\n]*/igm, ``);
    var blob = new Blob([data], {
        encoding: "UTF-8",
        type: 'text/json;charset=UTF-8'
    });

    if (modDownloaderLinkObject === undefined)
        modDownloaderLinkObject = document.createElement('a');

    modDownloaderLinkObject.download = filename;
    modDownloaderLinkObject.href = window.URL.createObjectURL(blob);
    modDownloaderLinkObject.dataset.downloadurl = ['text/json', modDownloaderLinkObject.download, modDownloaderLinkObject.href].join(':');
    modDownloaderLinkObject.dispatchEvent(new MouseEvent("click", {
        bubbles: true,
        cancelable: false
    }));
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function downloadMod(appid, workshopid) {
    document.getElementById('downloadModButton').style.display = "none";

    if (preventRepeatOfRequests) {
        if (modDownloaderLinkObject !== undefined) {
            modDownloaderLinkObject.dispatchEvent(new MouseEvent("click", {
                bubbles: true,
                cancelable: false
            }));
            document.getElementById('downloadModButton').style.display = "";
            return;
        } else if (modDownloaderLinkUrl !== undefined) {
            window.location.href = steamObject["response"]["publishedfiledetails"][0]["file_url"];
            document.getElementById('downloadModButton').style.display = "";
            return;
        }
    }

    GM.xmlHttpRequest({
        method: "POST",
        url: "https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/",
        data: "itemcount=1&publishedfileids[0]=" + workshopid,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        onload: function (response) {
            let steamObject = JSON.parse(response.responseText);
            modDownloaderLinkUrl = steamObject["response"]["publishedfiledetails"][0]["file_url"];
            if (appid == "286160") {
                GM.xmlHttpRequest({
                    method: "GET",
                    responseType: "arraybuffer",
                    url: steamObject["response"]["publishedfiledetails"][0]["file_url"],
                    onload: function (response) {
                        let BufferVar = new buffer.Buffer(this.response);
                        downloadObjectAsJson(JSON.parse(JSON.stringify(BSON.deserialize(BufferVar)), (key, value) => {
                            if (value !== null && value !== undefined) return value
                        }), workshopid + ".json");
                        document.getElementById('downloadModButton').style.display = "";
                    }
                });
            } else {
                window.location.href = steamObject["response"]["publishedfiledetails"][0]["file_url"];
                document.getElementById('downloadModButton').style.display = "";
            }
        }
    });
}
let modDownloaderAppId = undefined;
let modDownloaderWorkshopId = (new URLSearchParams((new URL(window.location.href)).search)).get("id");
window.addEventListener('load', function () {
    modDownloaderAppId = document.getElementsByClassName('apphub_OtherSiteInfo')[0].getElementsByTagName('a')[0].dataset.appid;

    let lang = "en";

    let flashvars;
    if (rgCommonFlashVars) {
        if (rgCommonFlashVars["clientLanguage"] !== undefined && rgCommonFlashVars["clientLanguage"] == "russian") lang = "ru";
    } else {
        let steamCountry;
        if (steamCountry = getCookie("steamCountry")) {
            if (steamCountry.substring(0, 2) == "RU") lang = "ru";
        }
    }

    let zNode = document.createElement('div');
    zNode.innerHTML = `<button id="downloadModButton" class="btn_green_white_innerfade btn_border_2px btn_medium" type="button"><span>${((lang == "ru") ? "Скачать" : "Download")}</span></button>`;
    zNode.setAttribute('id', 'downloadModButtonContainer');
    document.getElementsByClassName('game_area_purchase_game')[0].appendChild(zNode);

    document.getElementById("downloadModButton").addEventListener(
        "click", ButtonClickAction, false
    );

    function ButtonClickAction(zEvent) {
        downloadMod(modDownloaderAppId, modDownloaderWorkshopId);
    }
}, false);
