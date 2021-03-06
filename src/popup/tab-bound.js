function get_tabs() {
    return browser.tabs.query({ currentWindow: true });
}

function update_n_tabs() {
    get_tabs().then((tabs) => {
        document.getElementById("n_tabs").appendChild(document.createTextNode(tabs.length));

        browser.storage.local.get("n_tabs_max").then((result) => {
            if (tabs.length >= result.n_tabs_max) {
                document.getElementById("status").style.color = color_red;
            } else if (tabs.length < result.n_tabs_max) {
                document.getElementById("status").style.color = color_green;
            }
        });
    });
}

let color_green = "greenyellow";
let color_red = "red";

browser.storage.local.get("n_tabs_max").then((result) => {
    document.getElementById("n_tabs_max").appendChild(document.createTextNode(result.n_tabs_max));
});
document.getElementById("status").style.color = color_green;
document.addEventListener("DOMContentLoaded", update_n_tabs);

browser.storage.local.get("active").then((result) => {
    document.getElementById("activation-cb").checked = result.active;
});

document.getElementById("activation-cb").addEventListener("change", (el) => {
    browser.storage.local.set({
        active: document.getElementById("activation-cb").checked
    });
});


