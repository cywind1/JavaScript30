// querySelector -> [.] -> class
// link the class with variable
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
// [] = data attribute
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

function togglePlay() {
  // only works with click event listener
  const method = video.paused ? "play" : "pause";
  video[method]();

  // if (video.paused) {
  //     video.play();
  // } else {
  //     video.pause();
  // }
}

function updateButton() {
  // this = variable video
  const icon = this.paused ? "►" : "❚ ❚";
  console.log(icon);
  // change the text according to event
  toggle.textContent = icon;
}

function skip() {
  console.log(this.dataset.skip);
  // parseFloat = string -> float
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  // name = playbackRate / volume
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// drag the progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  console.log(scrubTime);
  video.currentTime = scrubTime;
}

// clicking video
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

// clicking toggle button
toggle.addEventListener("click", togglePlay);
// loop though button list
skipButtons.forEach((button) => button.addEventListener("click", skip));

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));

ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

// mousedown = flag variable, when click = true
let mousedown = false;
progress.addEventListener("click", scrub);
// check mousedown first, then run scrub function
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
// action of dragging
progress.addEventListener("mousedown", (mousedown = true));
progress.addEventListener("mouseup", (mousedown = false));
