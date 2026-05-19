from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, status

from backend.db.mongo import get_appointments_collection
from backend.models.appointment import AppointmentCreate, AppointmentResponse

router = APIRouter(prefix="/appointments", tags=["appointments"])


@router.post("", response_model=AppointmentResponse, status_code=status.HTTP_201_CREATED)
async def create_appointment(payload: AppointmentCreate) -> AppointmentResponse:
    document = payload.model_dump(by_alias=True)
    document["createdAt"] = datetime.now(timezone.utc)

    try:
        result = await get_appointments_collection().insert_one(document)
    except Exception as exc:  # pragma: no cover - backend safety net
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to save appointment.") from exc

    return AppointmentResponse(
        message="Appointment request received successfully.",
        appointment_id=str(result.inserted_id),
    )

