import os
from dataclasses import dataclass


@dataclass(frozen=True)
class RealtimeModelConfig:
    orchestration_model: str
    translation_model: str
    transcription_model: str


@dataclass(frozen=True)
class AppConfig:
    openai_api_key: str | None
    realtime_models: RealtimeModelConfig


def get_config() -> AppConfig:
    return AppConfig(
        openai_api_key=os.getenv('OPENAI_API_KEY'),
        realtime_models=RealtimeModelConfig(
            orchestration_model=os.getenv(
                'OPENAI_REALTIME_ORCHESTRATION_MODEL',
                'GPT-Realtime-2',
            ),
            translation_model=os.getenv(
                'OPENAI_REALTIME_TRANSLATION_MODEL',
                'GPT-Realtime-Translate',
            ),
            transcription_model=os.getenv(
                'OPENAI_REALTIME_TRANSCRIPTION_MODEL',
                'GPT-Realtime-Whisper',
            ),
        ),
    )
