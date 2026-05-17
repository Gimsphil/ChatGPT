from pydantic import BaseModel


class LanguageDecisionRequest(BaseModel):
    detected_language: str
    user_language: str
    last_detected_foreign_language: str | None = None


class LanguageDecisionResponse(BaseModel):
    target_language: str
    updated_last_detected_foreign_language: str | None = None
