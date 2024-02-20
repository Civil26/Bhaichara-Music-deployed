let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlayButtons = Array.from(document.getElementsByClassName('songItemPlay'));
let songItemPlays = Array.from(document.getElementsByClassName('songItemPlay'));
let playingGif = document.getElementById('playingGif');
 
 let songs = [
  {songName: "Mere Dil Vich", filePath: "Mere_Dil_Vich.mp3", coverPath: "dil.jpg"},
  {songName: "Pyar", filePath: "Pyar_Na_Kar_1.mp3", coverPath: "pyar.jpg"},
  {songName: "Mitraan Di Chatri", filePath: "Mittran_Di_Chhatri_4.mp3", coverPath: "mitraan.jpg"},
  {songName: "Saaun Di Jhadi", filePath: "Saun_Di_Jhadi.mp3", coverPath: "Saaun.jpg"},
  {songName: "Awwaj", filePath: "Awaaz_1.mp3", coverPath: "awwaj.jpg"},
  {songName: "Pakki Kanak", filePath: "Pakki_Kanak_8.mp3", coverPath: "pyar.jpg"},
  {songName: "Mehfil Mitraan Di", filePath: "Mehfil_Mitraan_Di_3.mp3", coverPath: "mitraan.jpg"},
  {songName: "Pagal Shayar", filePath: "Pagal_Shayar_1.mp3", coverPath: "pagal.jpg"},
  {songName: "Pehli Vaari Peeti Hai", filePath: "Pehli_Vaari_Peeti_A_1.mp3", coverPath: "pehli.jpg"},
 ]

 // Function to initialize the audio element with the first song
function initializeAudio() {
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
}

// Function to update UI with song details
function updateSongUI() {
  masterSongName.innerText = songs[songIndex].songName;
  gif.style.opacity = 1;
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
}

// Function to handle play/pause functionality
function togglePlay() {
  if (audioElement.paused || audioElement.currentTime <= 0) {
      audioElement.play();
      masterPlay.classList.remove('fa-play-circle');
      masterPlay.classList.add('fa-pause-circle');
      gif.style.opacity = 1;
  } else {
      audioElement.pause();
      masterPlay.classList.remove('fa-pause-circle');
      masterPlay.classList.add('fa-play-circle');
      gif.style.opacity = 0;
  }
}

// Function to handle 'Next' button click
function playNextSong() {
  songIndex = (songIndex + 1) % songs.length;
  initializeAudio();
  togglePlay();
}

// Function to handle 'Previous' button click
function playPreviousSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  initializeAudio();
  togglePlay();
}

// Function to handle progress bar change
function handleProgressBarChange() {
  audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
}

// Event listener for master play button
masterPlay.addEventListener('click', togglePlay);

// Event listeners for song item play buttons
songItemPlayButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (songIndex !== index) {
        songIndex = index;
        initializeAudio();
        togglePlay();
        songItemPlayButtons.classList.remove('fa-play-circle');
        songItemPlayButtons.classList.add('fa-pause-circle');
        updateSongItemPlayButtonClass(index);
    } else {
        togglePlay();
        songItemPlayButtons.classList.remove('fa-pause-circle');
        songItemPlayButtons.classList.add('fa-play-circle');
    }
    });
});


// Function to play song when songItemPlay is clicked
function playSongFromIndex(index) {
  songIndex = index;
  initializeAudio();
  togglePlay();
}

// Event listeners
masterPlay.addEventListener('click', togglePlay);
document.getElementById('next').addEventListener('click', playNextSong);
document.getElementById('previous').addEventListener('click', playPreviousSong);
myProgressBar.addEventListener('input', handleProgressBarChange); // Listen for input event instead of 'change'

// Initializations
initializeAudio();

// Populate song list UI
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Update progress bar during audio playback
audioElement.addEventListener('timeupdate', () => {
  let progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = progress;
});


// Function to format time in mm:ss format
function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
}

// Update current time and total duration elements
function updateProgressInfo() {
  const currentTimeElement = document.getElementById('currentTime');
  const totalDurationElement = document.getElementById('totalDuration');

  // Update current time
  currentTimeElement.textContent = formatTime(audioElement.currentTime);

  // Update total duration
  totalDurationElement.textContent = formatTime(audioElement.duration);
}

// Update progress bar and progress info during audio playback
audioElement.addEventListener('timeupdate', () => {
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = progress;
  updateProgressInfo(); // Update progress info
});


