const openingText = "Call trans opt:  received.\n3-14-24  10:31:58  DSN:Log>";
const cursorSymbolTall = "&#x2588;";

let hackerIndex = 0;
/** @type {HTMLElement} */
let hackerIntro = null;
/** @type {HTMLElement} */
let hackerSpan = null;
/** @type {HTMLElement} */
let cursorSpan = null;
/** @type {HTMLElement} */
let failureScreen = null;
/** @type {HTMLElement} */
let mainElem = null;
/** @type {Plyr} */
let player = null;


function setupIntervals() {
    const hackerInterval = setInterval(() => {
        hackerSpan.innerHTML += openingText[hackerIndex++]
            .replace(">", "&gt;")
            .replace("\n", "<br/>")
        
        if(hackerIndex >= openingText.length) {
            clearInterval(hackerInterval);
            setTimeout(() => {
                clearInterval(cursorInterval);
                cursorSpan.innerHTML = cursorSymbolTall;
                failureScreen.classList.remove("nodisplay");
                setTimeout(switchToMainContent, 3000);
            }, 3000);
            return;
        }
    }, 75);
    let cursorTall = true;
    const cursorInterval = setInterval(() => {
        cursorSpan.innerHTML = cursorTall?cursorSymbolTall:"_";
        cursorTall = !cursorTall;
    }, 500);
}

function switchToMainContent() {
    hackerIntro.remove();
    mainElem.classList.remove("nodisplay");
    player = new Plyr("div#filmtrailer", {});
}

window.addEventListener("load", function(ev) {
    console.log("Hacking the mainframe");
    hackerIntro = document.querySelector("aside.hacker-intro");
    hackerSpan = document.querySelector("span#hackertext");
    cursorSpan = document.querySelector("span#cursor");
    failureScreen = document.querySelector("#system-failure-container");
    mainElem = document.querySelector("main");
    setupIntervals();
});

// Initialize Plyr
