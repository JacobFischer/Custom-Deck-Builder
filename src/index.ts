// This is the entry point (file file) invoked by this application

// css reset
import "normalize.css";
// the main style sheet
import "src/styles/style.scss";

import { UI } from "src/gui/ui";
import { initialize } from "src/initialize";

const unloadedMessage = document.createElement("p");
document.body.appendChild(unloadedMessage);
unloadedMessage.classList.add("unloaded-message");
unloadedMessage.innerText = "Loading...";

// initialize everything, then create the UI
initialize(() => {
    unloadedMessage.remove();

    new UI(document.body);
});
