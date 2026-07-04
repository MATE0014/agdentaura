from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, status

from db.mongo import get_contact_collection
from models.contact import ContactCreate, ContactResponse

router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def create_contact_message(payload: ContactCreate) -> ContactResponse:
    document = payload.model_dump(by_alias=True)
    document["createdAt"] = datetime.now(timezone.utc)

    try:
        result = await get_contact_collection().insert_one(document)
    except Exception as exc:  # pragma: no cover - backend safety net
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to save contact message.") from exc

    return ContactResponse(
        message="Your message was received successfully.",
        inquiry_id=str(result.inserted_id),
    )
