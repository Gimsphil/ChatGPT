from fastapi import FastAPI

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
            return last_detected_foreign_language
        return user_language

    return user_language
