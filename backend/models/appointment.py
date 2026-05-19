from datetime import datetime, timezone

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator, model_validator


class AppointmentCreate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    full_name: str = Field(alias="fullName", min_length=2, max_length=120)
    phone: str = Field(alias="phone", min_length=8, max_length=32)
    email: EmailStr = Field(alias="email")
    service: str = Field(alias="service", min_length=1, max_length=120)
    preferred_date: datetime = Field(alias="preferredDate")
    preferred_time_slot: str = Field(alias="preferredTimeSlot", pattern=r"^(0[9]|1[0-8]):00$")
    message: str = Field(alias="message", min_length=10, max_length=600)

    @field_validator("preferred_date")
    @classmethod
    def validate_preferred_date(cls, value: datetime) -> datetime:
        appointment_time = value if value.tzinfo else value.replace(tzinfo=timezone.utc)
        current_time = datetime.now(timezone.utc)

        if appointment_time <= current_time:
            raise ValueError("Please choose a future appointment date and time.")

        local_time = appointment_time.astimezone()

        if local_time.minute != 0 or local_time.second != 0 or local_time.microsecond != 0:
            raise ValueError("Appointments must start on the hour.")

        if local_time.hour < 9 or local_time.hour > 18:
            raise ValueError("Please choose an appointment during clinic hours.")

        return value

    @model_validator(mode="after")
    def validate_time_slot(self) -> "AppointmentCreate":
        local_time = self.preferred_date.astimezone()
        expected_time_slot = f"{local_time.hour:02d}:{local_time.minute:02d}"

        if self.preferred_time_slot != expected_time_slot:
            raise ValueError("Preferred time slot must match the selected appointment time.")

        return self


class AppointmentResponse(BaseModel):
    success: bool = True
    message: str
    appointment_id: str | None = Field(default=None, alias="appointmentId")
