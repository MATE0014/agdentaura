from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers.appointments import router as appointments_router
from backend.routers.contact import router as contact_router

app = FastAPI(title="AG Dentaura API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(appointments_router, prefix="/api")
app.include_router(contact_router, prefix="/api")


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}
