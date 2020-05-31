navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  handlerFunction(stream);
});

function handlerFunction(stream) {
  rec = new MediaRecorder(stream);
  rec.ondataavailable = (e) => {
    // pushes the audio chunks into an array
    audioChunks.push(e.data);
    // Get the audio data that is emitted every 1000 ms
    // Type can also be "audio/webm;codecs=opus"
    let blob = new Blob([e.data], { type: "audio/mpeg-3" });
    console.log("blob", blob);
    if (rec.state == "inactive") {
      // When the recording has stopped, the state is inactive
      // creates a blob with the entire recordings audio chunks for playback
      let blob = new Blob(audioChunks, { type: "audio/mpeg-3" });
      // sets the source of the audio element
      recordedAudio.src = URL.createObjectURL(blob);
      recordedAudio.controls = true;
      recordedAudio.autoplay = true;
    }
  };
}

// start recording
record.onclick = (e) => {
  console.log("I was clicked");
  record.disabled = true;
  record.style.backgroundColor = "blue";
  stopRecord.disabled = false;
  audioChunks = [];
  // Start recording and pass in time interval of 100 ms
  // The interval determines how often data is emitted
  rec.start(1000);
};

// stop recording
stopRecord.onclick = (e) => {
  console.log("I was clicked");
  record.disabled = false;
  stop.disabled = true;
  record.style.backgroundColor = "red";
  rec.stop();
};