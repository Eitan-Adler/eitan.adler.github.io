var inputMinutes = document.querySelector(".input.minutes");
var inputSeconds = document.querySelector(".input.seconds");
var clockMinutes = document.querySelector(".clock.minutes");
var clockSeconds = document.querySelector(".clock.seconds");
var buttonStartCountdown = document.querySelector(".start-countdown");
var buttonStopCountdown = document.querySelector(".stop-countdown");
var clock = document.querySelector(".clock");
var img = document.querySelector("img");
var gong = new Audio("http://soundbible.com/mp3/chinese-gong-daniel_simon.mp3");
var spinner = document.querySelector(".lds-spinner");

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
inputMinutes.oninput = function () {
  var minutes = +inputMinutes.value;
  clockMinutes.textContent = addZiro(minutes);
};
inputSeconds.oninput = function () {
  var seconds = +inputSeconds.value;
  clockSeconds.textContent = addZiro(seconds);
};

buttonStartCountdown.addEventListener("click", startCD);
function startCD() {
  inputMinutes.disabled = true;
  inputSeconds.disabled = true;
  var seconds = +inputSeconds.value;
  var minutes = +inputMinutes.value;
  displayTime(minutes, seconds);
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
buttonStopCountdown.addEventListener("click", stopCD);
function stopCD() {
  clearInterval(secIntervalId);
  inputMinutes.disabled = false;
  inputSeconds.disabled = false;
}
