from fastapi import FastAPI

from models import (
    LanguageDecisionRequest,
    LanguageDecisionResponse,
)

app = FastAPI(title='Weekend Translation MVP')


@app.get('/health')
def health_check():
    return {
        'status': 'ok',
        'service': 'weekend-translation-mvp'
    }


def decide_target_language(
    detected_language: str,
    user_language: str,
    last_detected_foreign_language: str | None,
):
    if detected_language == user_language:
        if last_detected_foreign_language:
            return (
                last_detected_foreign_language,
                last_detected_foreign_language,
            )

        return (
            user_language,
            last_detected_foreign_language,
        )

    return (
        user_language,
        detected_language,
    )


@app.post('/session/decide-language')
def session_decide_language(
    request: LanguageDecisionRequest,
):
    target_language, updated_foreign_language = decide_target_language(
        detected_language=request.detected_language,
        user_language=request.user_language,
        last_detected_foreign_language=request.last_detected_foreign_language,
    )

    return LanguageDecisionResponse(
        target_language=target_language,
        updated_last_detected_foreign_language=updated_foreign_language,
    )
