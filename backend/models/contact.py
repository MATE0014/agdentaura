from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class ContactCreate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    full_name: str = Field(alias="fullName", min_length=2, max_length=120)
    email: EmailStr = Field(alias="email")
    phone: str = Field(alias="phone", min_length=8, max_length=32)
    subject: str = Field(alias="subject", min_length=3, max_length=140)
    message: str = Field(alias="message", min_length=10, max_length=1000)


class ContactResponse(BaseModel):
    success: bool = True
    message: str
    inquiry_id: str | None = Field(default=None, alias="inquiryId")
