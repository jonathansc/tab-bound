console.log("background script started")

let requestURL = './conf.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = () => {
    browser.storage.sync.set({
        n_tabs_max: request.response.n_tabs_max,
        active: true // Default is active
    });
}

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