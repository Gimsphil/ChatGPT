import http from 'http';

const PORT = process.env.PORT || 3000;

const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Realtime Translation App</title>

  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #0f172a;
      color: white;
    }

    .container {
      padding: 24px;
      max-width: 1000px;
      margin: auto;
    }

    h1 {
      font-size: 32px;
    }

    .controls {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    button, select {
      padding: 12px 16px;
      font-size: 16px;
      border-radius: 8px;
      border: none;
    }

    .panel {
      background: #1e293b;
      border-radius: 12px;
      padding: 16px;
      margin-top: 16px;
    }

    .title {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .text {
      min-height: 120px;
      white-space: pre-wrap;
      line-height: 1.5;
    }

    .status {
      margin-top: 12px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Realtime Translation App</h1>

    <div class="controls">
      <select id="language">
        <option value="ko">Korean</option>
        <option value="en">English</option>
        <option value="ja">Japanese</option>
        <option value="id">Indonesian</option>
      </select>

      <button id="start">Start</button>
      <button id="stop">Stop</button>
    </div>

    <div class="panel">
      <div class="title">Original Transcript</div>
      <div id="source" class="text"></div>
    </div>

    <div class="panel">
      <div class="title">Translated Transcript</div>
      <div id="translated" class="text"></div>
    </div>

    <div class="panel">
      <div class="title">Session Status</div>
      <div id="status" class="status">Idle</div>
    </div>
  </div>

  <script>
    const sourceBox = document.getElementById('source');
    const translatedBox = document.getElementById('translated');
    const statusBox = document.getElementById('status');

    let peerConnection = null;
    let dataChannel = null;
    let localStream = null;
    let translatedAudio = null;

    function setStatus(message) {
      statusBox.textContent = message;
      console.log(message);
    }

    async function startTranslation() {
      try {
        setStatus('Requesting microphone...');

        localStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          }
        });

        setStatus('Microphone connected');

        peerConnection = new RTCPeerConnection();

        localStream.getTracks().forEach(track => {
          peerConnection.addTrack(track, localStream);
        });

        translatedAudio = new Audio();
        translatedAudio.autoplay = true;

        peerConnection.ontrack = (event) => {
          translatedAudio.srcObject = event.streams[0];
          setStatus('Receiving translated audio stream');
        };

        dataChannel = peerConnection.createDataChannel('oai-events');

        dataChannel.onopen = () => {
          setStatus('Realtime event channel connected');
        };

        dataChannel.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            if (data.type === 'session.input_transcript.delta') {
              sourceBox.textContent += data.delta;
            }

            if (data.type === 'session.output_transcript.delta') {
              translatedBox.textContent += data.delta;
            }

            if (data.type === 'error') {
              setStatus('ERROR: ' + JSON.stringify(data));
            }
          } catch (err) {
            console.log(event.data);
          }
        };

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        setStatus('SDP offer created');

        setStatus('Realtime translation pipeline ready');
        setStatus('Waiting for realtime translation backend connection');

      } catch (err) {
        setStatus('ERROR: ' + err.message);
      }
    }

    function stopTranslation() {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }

      if (peerConnection) {
        peerConnection.close();
      }

      setStatus('Stopped');
    }

    document.getElementById('start').onclick = startTranslation;
    document.getElementById('stop').onclick = stopTranslation;
  </script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });

  res.end(html);
});

server.listen(PORT, () => {
  console.log(`Realtime Translation App running at http://localhost:${PORT}`);
});
