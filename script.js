const player = document.getElementById('player');
const playPauseBtn = document.getElementById('play-pause-btn');
const seekBar = document.getElementById('seek-bar');
const stationsList = document.getElementById('stations-list');
const stations = [
  { name: 'Station 1', url: 'https://example.com/station1.mp3' },
  { name: 'Station 2', url: 'https://example.com/station2.mp3' },
  { name: 'Station 3', url: 'https://example.com/station3.mp3' },
];

let currentStationIndex = 0;
let isPlaying = false;

function playStation(index) {
  currentStationIndex = index;
  const station = stations[index];
  player.src = station.url;
}

function playPause() {
  if (isPlaying) {
    player.pause();
    isPlaying = false;
    playPauseBtn.textContent = 'Play';
  } else {
    player.play();
    isPlaying = true;
    playPauseBtn.textContent = 'Pause';
  }
}

function updateSeekBar() {
  seekBar.value = (player.currentTime / player.duration) * seekBar.max;
}

function seek() {
  const seekingTime = (seekBar.value / seekBar.max) * player.duration;
  player.currentTime = seekingTime;
}

playPauseBtn.addEventListener('click', playPause);
stationsList.addEventListener('click', (e) => {
  const target = e.target.closest('a');
  if (target) {
    const index = parseInt(target.dataset.station, 10);
    playStation(index);
    playPause();
    updateSeekBar();
    setInterval(updateSeekBar, 1000);
    seekBar.addEventListener('input', seek);
    document.body.style.cursor = 'progress';
    setTimeout(() => {
      document.body.style.cursor = 'auto';
    }, player.duration * (1000 / seekBar.max));
}});

playStation(currentStationIndex);