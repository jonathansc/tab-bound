function save_options(e) {
    e.preventDefault();
    browser.storage.local.set({
        n_tabs_max: document.getElementById("n_tabs_max-input").value
    });
}

function restore_options() {
    function on_error(error) {
        console.log(`error in options.js: ${error}`);
    }

    browser.storage.local.get().then((result) => {
        document.getElementById("n_tabs_max-input").value = result.n_tabs_max;
    }, on_error);
}

document.addEventListener("DOMContentLoaded", restore_options);
document.querySelector("form").addEventListener("submit", save_options);
