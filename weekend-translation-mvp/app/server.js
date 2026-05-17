import http from 'http';

const PORT = process.env.PORT || 3000;

const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Realtime Translation MVP</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #111;
      color: white;
      padding: 24px;
    }

    button, select {
      padding: 12px;
      margin: 8px;
      font-size: 16px;
    }

    #log {
      margin-top: 20px;
      white-space: pre-wrap;
      background: #222;
      padding: 16px;
      border-radius: 8px;
      min-height: 200px;
    }
  </style>
</head>
<body>
  <h1>Realtime Translation MVP</h1>

  <label>Target language:</label>
  <select id="language">
    <option value="ko">Korean</option>
    <option value="en">English</option>
    <option value="ja">Japanese</option>
    <option value="id">Indonesian</option>
  </select>

  <button id="start">Start Translation</button>

  <div id="log"></div>

  <script>
    const log = document.getElementById('log');

    function append(message) {
      log.textContent += message + '\n';
    }

    document.getElementById('start').onclick = async () => {
      append('Initializing realtime translation session...');

      const targetLanguage = document.getElementById('language').value;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        append('Microphone connected');

        const pc = new RTCPeerConnection();

        stream.getTracks().forEach(track => {
          pc.addTrack(track, stream);
        });

        const audioEl = new Audio();
        audioEl.autoplay = true;

        pc.ontrack = (event) => {
          audioEl.srcObject = event.streams[0];
          append('Translated audio stream received');
        };

        const channel = pc.createDataChannel('oai-events');

        channel.onmessage = (event) => {
          append(event.data);
        };

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        append('SDP offer created');
        append('Connect this SDP to realtime translation backend');
        append('Target language: ' + targetLanguage);

      } catch (err) {
        append('ERROR: ' + err.message);
      }
    };
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
  console.log(`Realtime Translation MVP running on port ${PORT}`);
});
