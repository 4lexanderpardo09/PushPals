from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Provider selection
    ai_provider: str = "deepseek"  # "deepseek" | "anthropic" | "openai"

    # DeepSeek (OpenAI-compatible)
    deepseek_api_key: str = ""
    deepseek_model: str = "deepseek-chat"
    deepseek_base_url: str = "https://api.deepseek.com"

    # Anthropic
    anthropic_api_key: str = ""
    anthropic_model: str = "claude-3-5-sonnet-20240620"

    # GitHub
    github_token: str
    webhook_secret: str

    # Global
    agent_timeout: int = 120

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
