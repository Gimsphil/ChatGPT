from dataclasses import dataclass

from config import get_config


@dataclass
class TranslationSessionState:
    user_language: str
    detected_language: str | None = None
    last_detected_foreign_language: str | None = None
    target_language: str | None = None


class RealtimeTranslationPipeline:
    def __init__(self):
        self.config = get_config()

    def transcribe_audio(self, audio_reference: str) -> dict:
        return {
            'model': self.config.realtime_models.transcription_model,
            'audio_reference': audio_reference,
            'transcript': 'placeholder transcript',
            'detected_language': 'en',
        }

    def decide_target_language(
        self,
        state: TranslationSessionState,
    ) -> TranslationSessionState:
        if state.detected_language == state.user_language:
            state.target_language = (
                state.last_detected_foreign_language
                or state.user_language
            )
            return state

        state.last_detected_foreign_language = (
            state.detected_language
        )
        state.target_language = state.user_language
        return state

    def translate_text(
        self,
        text: str,
        target_language: str,
    ) -> dict:
        return {
            'model': self.config.realtime_models.translation_model,
            'input_text': text,
            'target_language': target_language,
            'translated_text': f'[placeholder translation to {target_language}] {text}',
        }

    def process_audio_session(
        self,
        audio_reference: str,
        user_language: str,
        last_detected_foreign_language: str | None = None,
    ):
        transcription = self.transcribe_audio(audio_reference)

        state = TranslationSessionState(
            user_language=user_language,
            detected_language=transcription['detected_language'],
            last_detected_foreign_language=last_detected_foreign_language,
        )

        state = self.decide_target_language(state)

        translation = self.translate_text(
            text=transcription['transcript'],
            target_language=state.target_language,
        )

        return {
            'orchestration_model': self.config.realtime_models.orchestration_model,
            'transcription': transcription,
            'translation': translation,
            'session_state': {
                'user_language': state.user_language,
                'detected_language': state.detected_language,
                'last_detected_foreign_language': state.last_detected_foreign_language,
                'target_language': state.target_language,
            },
        }
