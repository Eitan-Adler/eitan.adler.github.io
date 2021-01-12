var inputMinutes = document.querySelector(".input.minutes");
var inputSeconds = document.querySelector(".input.seconds");
var clockMinutes = document.querySelector(".clock.minutes");
var clockSeconds = document.querySelector(".clock.seconds");
var buttonStartCountdown = document.querySelector(".start-countdown");
var buttonStopCountdown = document.querySelector(".stop-countdown");
var buttonPauseCountdown = document.querySelector(".pause-countdown");
var clock = document.querySelector(".clock");
var img = document.querySelector("img");
var gong = new Audio("http://soundbible.com/mp3/chinese-gong-daniel_simon.mp3");
var spinner = document.querySelector(".lds-spinner");
var minutes;
var seconds;
var pause = false;
function addZiro(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}
function displayTime(min, sec) {
  clockMinutes.textContent = addZiro(min);
  clockSeconds.textContent = addZiro(sec);
}
function runClock() {
  secIntervalId = setInterval(secCountDown, 1000);
  function secCountDown() {
    if (seconds === 0 && minutes > 0) {
      seconds = 59;
      minutes--;
      displayTime(minutes, seconds);
    } else if (seconds > 0) {
      seconds--;
      displayTime(minutes, seconds);
    } else {
      gong.play();
      spinner.style.display = "block";
      fetch("https://aws.random.cat/meow")
        .then(function (res) {
          return res.json();
        })
        .then(function (json) {
          img.setAttribute("src", json.file);
          spinner.style.display = "none";
          img.style.display = "block";
        });
      clock.style.display = "none";
      clearInterval(secIntervalId);
    }
  }
}
inputMinutes.oninput = function () {
  minutes = +inputMinutes.value;
  seconds = +inputSeconds.value;
  displayTime(minutes, seconds);
};
inputSeconds.oninput = function () {
  minutes = +inputMinutes.value;
  seconds = +inputSeconds.value;
  displayTime(minutes, seconds);
};

buttonStartCountdown.addEventListener("click", startCD);
function startCD() {
  inputMinutes.disabled = true;
  inputSeconds.disabled = true;
  buttonStartCountdown.disabled = true;
  if (pause === false) {
    seconds = +inputSeconds.value;
    minutes = +inputMinutes.value;
    displayTime(minutes, seconds);
    runClock();
  } else {
    runClock();
  }
}

buttonStopCountdown.addEventListener("click", stopCD);
function stopCD() {
  clearInterval(secIntervalId);
  inputMinutes.disabled = false;
  inputSeconds.disabled = false;
  buttonStartCountdown.disabled = false;
  pause = false;
}
buttonPauseCountdown.addEventListener("click", pauseCD);
function pauseCD() {
  buttonStartCountdown.disabled = false;
  pause = true;
  clearInterval(secIntervalId);
}
var slider = document.querySelector(".my-slider");
console.log(slider);
