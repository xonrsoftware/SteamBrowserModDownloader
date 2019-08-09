// ==UserScript==
// @name         Download Mod From Its Steam Page
// @version      1.1.0
// @author       НИНРИ (https://discord.gg/PSTM5gh)
// @match        https://steamcommunity.com/sharedfiles/filedetails/*
// @updateURL    https://github.com/xonrsoftware/SteamBrowserModDownloader/raw/master/script.user.js
// @downloadURL  https://github.com/xonrsoftware/SteamBrowserModDownloader/raw/master/script.user.js
// @grant        GM.xmlHttpRequest
// @grant        GM_addStyle
// @require      https://github.com/xonrsoftware/SteamBrowserModDownloader/raw/master/libs/bson.bundle.js
// @require      https://github.com/xonrsoftware/SteamBrowserModDownloader/raw/master/libs/buffer.js
// ==/UserScript==

function downloadObjectAsJson(data, filename) {
    if (typeof data === "object") {
        data = JSON.stringify(data, null, 2)
    }

    var blob = new Blob([data], {
            encoding: "UTF-8",
            type: 'text/json;charset=UTF-8'
        }),
        a = document.createElement('a');

    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
    a.dispatchEvent(new MouseEvent("click", {
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
    GM.xmlHttpRequest({
        method: "POST",
        url: "https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/",
        data: "itemcount=1&publishedfileids[0]=" + workshopid,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        onload: function (response) {
            let steamObject = JSON.parse(response.responseText);
            if (appid == "286160") {
                GM.xmlHttpRequest({
                    method: "GET",
                    responseType: "arraybuffer",
                    url: steamObject["response"]["publishedfiledetails"][0]["file_url"],
                    onload: function (response) {
                        let BufferVar = new buffer.Buffer(this.response);
                        downloadObjectAsJson(BSON.deserialize(BufferVar), workshopid + ".json");
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

GM_addStyle(`
#downloadModButtonContainer {
    width: 100%;
    height: 36px;
    display: inline-block;
}

#downloadModButton {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: 16px;
    margin-bottom: 16px;
}
`);