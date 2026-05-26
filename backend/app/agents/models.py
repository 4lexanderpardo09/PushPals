from pydantic import BaseModel


class AgentResult(BaseModel):
    key: str
    name: str
    response: str
    success: bool
