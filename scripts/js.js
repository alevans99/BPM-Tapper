let startTime = 0;
let currentBPM = 0.0;
let clickTimes = [];
let numberOfClicks = 0
let timeElapsed = 0
    //Allows us to access CSS variables
let root = document.documentElement;


/**
 * This gets the time and the number of clicks made by the user to work out
 *  the number of clicks that would be made in 60 seconds. It keeps a record
 * of 10 to keep an updated version of what the user inputs.
 */

function getBpm() {
    let userClickTime = new Date().getTime();

    //First time started
    if (numberOfClicks === 0) {
        numberOfClicks = 1;
        startTime = userClickTime;
        clickTimes.push(userClickTime);
        return;
    }

    //Any other time

    if (clickTimes.length < 10) {
        clickTimes.push(userClickTime);
    } else {
        //Once we reach 10 times stored, remove the first one so that we get a more up-to-date reading
        clickTimes.shift();
        startTime = clickTimes[0];
        clickTimes.push(userClickTime);
    }

    numberOfClicks = (clickTimes.length - 1);
    timeUsed = (userClickTime - startTime) / 1000;
    currentBPM = (numberOfClicks / timeUsed) * 60;

    document.getElementById("bpm-count").innerHTML = currentBPM.toFixed(0);
}

function resetBpm() {
    startTime = 0;
    currentBPM = 0.0;
    clickTimes = [];
    numberOfClicks = 0;
    document.getElementById("bpm-count").innerHTML = 0;
    root.style.setProperty('--circle-color', `hsla(277, 82%, 22%, 1.0)`);

}

//Adds the current BPM to the site and shows a single animation to highlight the user's click.
function setBpm() {
    getBpm();

    let colorToUse = 100 + currentBPM;
    if (currentBPM > 240) {
        colorToUse = 360;
    }

    root.style.setProperty('--circle-color', `hsla(${colorToUse}, 100%, 60%, 1.0)`);
    root.style.setProperty('--pulse-from', `hsla(${colorToUse}, 100%, 60%, 1.0)`);
    root.style.setProperty('--pulse-to', `hsla(${colorToUse}, 100%, 60%, 0.0)`);
    document.getElementById("bpm-container").classList.add("pulse");

}


//Listen for animations ending and remove class to allow for further animations
document.getElementById("bpm-container").addEventListener('animationend', () => {
    document.getElementById("bpm-container").classList.remove("pulse")
});



document.addEventListener("mousedown", (e) => {
    e.preventDefault();
    if (e.target.id !== "reset-button") {
        setBpm();
    }
});

document.getElementById("reset-button").addEventListener("mousedown", (e) => {

    e.preventDefault();
    resetBpm()

});


document.addEventListener("keydown", (key) => {

    if (key.code === "Space") {
        setBpm();
    }

});