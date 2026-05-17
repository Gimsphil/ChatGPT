# Final Architecture

## Confirmed references

This project architecture is based on:

- OpenAI realtime translation cookbook
- LiveKit realtime discussion
- whisper_real_time
- whisper_real_time_translation

## Confirmed realtime translation flow

```text
Microphone audio
    ↓
WebRTC audio stream
    ↓
gpt-realtime-translate
    ↓
gpt-realtime-whisper transcription
    ↓
translated audio output
    ↓
browser playback
```

## Confirmed endpoint

```text
/v1/realtime/translations
```

## Confirmed realtime transport

- WebRTC for browser audio
- WebSocket for backend bridge

## Confirmed session model

```json
{
  "audio": {
    "input": {
      "transcription": {
        "model": "gpt-realtime-whisper"
      }
    },
    "output": {
      "language": "ko"
    }
  }
}
```

## Important compatibility warning

LiveKit agents currently do not fully support `gpt-realtime-2` preambles.

Reference:
- https://github.com/livekit/agents/issues/5684

Therefore the current MVP uses:

- direct browser WebRTC path
- direct realtime translation sessions
- no LiveKit orchestration dependency

## Local fallback mode

When realtime APIs are unavailable:

```text
Microphone
    ↓
whisper_real_time
    ↓
faster-whisper
    ↓
TranslatePy fallback
```

## Production roadmap

1. Browser translation
2. WebSocket backend bridge
3. Twilio call translation
4. LiveKit room translation
5. Redis session persistence
6. Multi-user scaling
