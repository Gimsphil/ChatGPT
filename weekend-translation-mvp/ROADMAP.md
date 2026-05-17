# Real-time Translation App Roadmap

## Stage 0 — Workspace setup

Goal: create a stable workspace and project direction.

Status:
- [x] Create project folder plan
- [x] Add bootstrap script
- [x] Add backend skeleton
- [x] Add client notes

Exit condition:
- Project files exist in one place.

---

## Stage 1 — Text-only translation MVP

Goal: prove the translation flow without audio complexity.

Scope:
- Input text
- Manually provided detected language
- Target-language decision
- Translation placeholder response

Backend tasks:
- [ ] Add `/session/decide-language`
- [ ] Add `/translate/text`
- [ ] Add Pydantic request/response models
- [ ] Add unit tests for language decision

Exit condition:
- User can send text and receive target-language decision plus placeholder translation.

---

## Stage 2 — Speech-to-text MVP

Goal: add microphone/audio input path.

Scope:
- Receive uploaded audio file or audio chunk
- Convert speech to text using fallback STT
- Feed text into Stage 1 pipeline

Backend tasks:
- [ ] Add `/speech/transcribe`
- [ ] Add audio file validation
- [ ] Add Whisper fallback integration placeholder

Client tasks:
- [ ] Add microphone permission
- [ ] Add record button
- [ ] Send recorded audio to backend

Exit condition:
- User speaks and receives transcribed text.

---

## Stage 3 — Realtime session MVP

Goal: reduce delay and make conversation usable.

Scope:
- WebSocket or WebRTC session
- Maintain session language state
- Stream partial text or translation updates

Backend tasks:
- [ ] Add WebSocket session endpoint
- [ ] Add Redis session store
- [ ] Track `last_detected_foreign_language`
- [ ] Return partial results

Client tasks:
- [ ] Add live status indicator
- [ ] Display detected language
- [ ] Display translated output incrementally

Exit condition:
- Basic near-realtime conversation loop works.

---

## Stage 4 — Realtime model integration

Goal: connect the realtime translation model.

Scope:
- GPT realtime integration
- Session instructions
- Audio/text streaming bridge

Tasks:
- [ ] Add OpenAI API key environment handling
- [ ] Add realtime client module
- [ ] Add model session instructions
- [ ] Add fallback path when realtime API fails

Exit condition:
- Translation no longer uses a placeholder path.

---

## Stage 5 — Field-use Alpha

Goal: make it usable in real conversations.

Scope:
- Better UI
- Better error handling
- Basic logging
- Language confidence display

Tasks:
- [ ] Add conversation history
- [ ] Add retry behavior
- [ ] Add offline/error messages
- [ ] Add language confidence display
- [ ] Add export/share conversation notes

Exit condition:
- App can be tested in a real short conversation.

---

## Stage 6 — Beta hardening

Goal: improve reliability.

Tasks:
- [ ] Latency optimization
- [ ] Noise handling
- [ ] Better language switching behavior
- [ ] Integration tests
- [ ] Deployment notes
- [ ] Security review

Exit condition:
- App can be shared with a small tester group.
