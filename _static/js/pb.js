// RuntimeVar
let progress = 0;
let deltaProgress = 0;

// EnvVar
let defaultDeltaProgress = 5;
let deltaInterval = 500;


main();



function calcLeftTime(curr, max, step, intr) {
    return Math.ceil( ( ( max - curr ) / ( step / intr ) / 1000 ) );
}

function setProperLable(progress) {
    const progressbarElem = document.getElementById('RTProgressBar');

    progressbarElem.style.width = progress+'%';

    let eta = calcLeftTime(progress, 100, defaultDeltaProgress, deltaInterval);
    if (eta > 1) {
        progressbarElem.innerHTML = eta + " seconds to redirect...";
    } else if (eta === 1) {
        progressbarElem.innerHTML = eta + " second to redirect...";
    } else {
        progressbarElem.innerHTML = "Redirecting...";
    }
}

function setDeltaProgress(n) {
    deltaProgress = n;
}

function updateProgress() {
    progress += deltaProgress;

    setProperLable(progress);

    if (progress >= 100) {
        clearInterval(updateProgressIntervalID);
        redirect_pri_sgbunlimiter_latest();
    }
}

function toggleProgress() {
    let toggleButton = document.getElementById("ProgressBarToggle");

    if ( deltaProgress === 0 ) {
        deltaProgress = defaultDeltaProgress;

        toggleButton.classList.remove("btn-success");
        toggleButton.classList.add("btn-warning");
        toggleButton.innerHTML = "Wait!";
    } else {
        deltaProgress = 0;

        toggleButton.classList.remove("btn-warning");
        toggleButton.classList.add("btn-success");
        toggleButton.innerHTML = "Resume";
    }
}

function main() {
    setDeltaProgress(defaultDeltaProgress);
    const updateProgressIntervalID = setInterval(updateProgress, deltaInterval);
}
