console.log("background script started")

const DEF_N_TABS_MAX = 10;
const DEF_ACTIVE = true;

browser.storage.local.get().then((result) => {
    browser.storage.local.set({
        n_tabs_max: result.n_tabs_max || DEF_N_TABS_MAX,
        active: result.active || DEF_ACTIVE
    });
});

// Tab executioner function
function tab_executioner(t) {
    browser.tabs.query({ currentWindow: true }).then((tabs) => {
        browser.storage.local.get("n_tabs_max").then((result) => {
            if (tabs.length > result.n_tabs_max) {
                console.log(`removing tab ${t.id} (${t.url}) since this would be tab number ${tabs.length} (> ${result.n_tabs_max})`);
                browser.tabs.remove(t.id);
            }
        });
    });
}

// Tab num change listeners
browser.storage.onChanged.addListener((changes, area) => {
    let changed_items = Object.keys(changes);
    if (changed_items.includes("active") && area == "local") {
        if (changes["active"].newValue == true) {
            console.log("turn on tab-bound");
            browser.tabs.onCreated.addListener(tab_executioner);
        } else if (changes["active"].newValue == false) {
            console.log("turn off tab-bound");
            browser.tabs.onCreated.removeListener(tab_executioner);
        } else {
            console.log(`turn on/off error ${changes["active"].newValue}`);
        }
    }
});