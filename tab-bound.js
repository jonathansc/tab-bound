function get_tabs() {
    return browser.tabs.query({ currentWindow: true });
}

function update_n_tabs() {
    get_tabs().then((tabs) => {
        // Tab num
        document.getElementById("n_tabs").innerHTML = tabs.length;

        // Status color
        browser.storage.sync.get("n_tabs_max").then((result) => {
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

// Init
browser.storage.sync.get("n_tabs_max").then((result) => {
    document.getElementById("n_tabs_max").innerHTML = result.n_tabs_max;
});
document.getElementById("status").style.color = color_green;
document.addEventListener("DOMContentLoaded", update_n_tabs);

browser.storage.sync.get("active").then((result) => {
    document.getElementById("activation-cb").checked = result.active;
});

document.getElementById("activation-cb").addEventListener("change", (el) => {
    browser.storage.sync.set({
        active: document.getElementById("activation-cb").checked
    });
});


