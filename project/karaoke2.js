// Get the video and audio recording elements
const video = document.getElementById('video');
const startRecordingButton = document.getElementById('start-recording');
const stopRecordingButton = document.getElementById('stop-recording');
const playRecordButton = document.getElementById('play-record');
const audioContext = new AudioContext();
const microphoneStream = null;
const recordedAudio = null;

// Start recording button click event
startRecordingButton.addEventListener('click', () => {
  if (!microphoneStream) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        microphoneStream = stream;
        startRecordingButton.disabled = true;
        stopRecordingButton.disabled = false;
      })
      .catch(error => console.error('Error getting user media:', error));
  }
});

// Stop recording button click event
stopRecordingButton.addEventListener('click', () => {
  if (microphoneStream) {
    microphoneStream.getAudioTracks()[0].stop();
    microphoneStream = null;
    startRecordingButton.disabled = false;
    stopRecordingButton.disabled = true;
  }
});

// Play recorded audio button click event
playRecordButton.addEventListener('click', () => {
  if (recordedAudio) {
    const audioBufferSourceNode = audioContext.createBufferSource();
    audioBufferSourceNode.connect(audioContext.destination);
    audioBufferSourceNode.start(0, recordedAudio.getByteTimeOffset() / 1000);
  }
});

// Record audio and store it in the recordedAudio variable
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    microphoneStream = stream;
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = event => {
      recordedAudio = event.data;
    };
    mediaRecorder.onstop = () => {
      microphoneStream = null;
      startRecordingButton.disabled = false;
      stopRecordingButton.disabled = true;
      playRecordButton.disabled = false;
    };
    mediaRecorder.start();
  })
  .catch(error => console.error('Error getting user media:', error));