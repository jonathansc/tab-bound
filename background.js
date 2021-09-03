console.log("background script started")

const DEF_N_TABS_MAX = 10;
const DEF_ACTIVE = true;

browser.storage.sync.get().then((result) => {
    browser.storage.sync.set({
        n_tabs_max: result.n_tabs_max || DEF_N_TABS_MAX,
        active: result.active || DEF_ACTIVE
    });
});

// Tab num change listeners
browser.tabs.onCreated.addListener((t) => {
    browser.tabs.query({ currentWindow: true }).then((tabs) => {
        browser.storage.sync.get().then((result) => {
            if (tabs.length > result.n_tabs_max && result.active) {
                console.log(`removing tab ${t.id} (${t.url}) since this would be tab number ${tabs.length} (> ${result.n_tabs_max})`);
                browser.tabs.remove(t.id);
            }
        });
    });
});