document.addEventListener('DOMContentLoaded', () => {
    let desktopMediaStream = null;
    let recordedChunks = [];
  
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const downloadButton = document.getElementById('downloadButton');
  
    startButton.addEventListener('click', startRecording);
    stopButton.addEventListener('click', stopRecording);
    downloadButton.addEventListener('click', downloadVideo);
  
    async function startRecording() {
        desktopMediaStream = await navigator.mediaDevices.getDisplayMedia({
          video: { mediaSource: 'screen' },
          audio: true
        });
      
        const options = { mimeType: 'video/webm; codecs=vp9' };
        const mediaRecorder = new MediaRecorder(desktopMediaStream, options);
      
        mediaRecorder.addEventListener('dataavailable', (event) => {
          if (event.data.size > 0) {
            recordedChunks.push(event.data);
          }
        });
      
        // Increase the size of the popup window
        chrome.windows.getCurrent((currentWindow) => {
          const width = currentWindow.width;
          const height = currentWindow.height;
          const newWidth = Math.ceil(width * 1.5); // Increase width by 50%
          const newHeight = Math.ceil(height * 1.5); // Increase height by 50%
          const updateInfo = {
            width: newWidth,
            height: newHeight
          };
          chrome.windows.update(currentWindow.id, updateInfo);
        });
      
        mediaRecorder.start();
      }
      
  
    function stopRecording() {
      if (desktopMediaStream) {
        desktopMediaStream.getTracks().forEach((track) => track.stop());
      }
    }
  
    function downloadVideo() {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'recorded_video.webm';
      a.click();
    }
  });
  