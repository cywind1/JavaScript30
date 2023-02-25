let countdown;
const timeDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
  // clear any existing timers, avoid crashing
  // otherwise, clicked timers always run
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  // call function immediately without waiting
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if should stop
    if (secondsLeft <= 0) {
      // only return != stop, clearInterval = stop
      clearInterval(countdown);
      return;
    }
    // show on html
    displayTimeLeft(secondsLeft);
    displayEndTime(then);
    // show in console
    // console.log(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const reminderSeconds = seconds % 60;
  const display = `${minutes} : ${
    reminderSeconds < 10 ? "0" : ""
  } ${reminderSeconds}`;
  // tab title
  document.title = display;
  timeDisplay.textContent = display;
  //   console.log(minutes, reminderSeconds);
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back at ${adjustedHour}: ${
    minutes < 10 ? "0" : ""
  } ${minutes} ${hour > 12 ? "PM" : "AM"} `;
}

function startTimer() {
  //.dataset = object with time on it
  const seconds = parseInt(this.dataset.time);
  // call the function
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));

// customForm = name
document.customForm.addEventListener("submit", function (e) {
  // https://www.w3schools.com/jsref/event_preventdefault.asp
  // default action that belongs to the event will not occur
  // default = reload the page after submit
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});
