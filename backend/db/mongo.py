from functools import lru_cache
import os

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase


@lru_cache(maxsize=1)
def get_mongo_client() -> AsyncIOMotorClient:
    mongo_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    return AsyncIOMotorClient(mongo_uri)


def get_database() -> AsyncIOMotorDatabase:
    database_name = os.getenv("MONGODB_DB_NAME", "agdentaura")
    return get_mongo_client()[database_name]


def get_appointments_collection():
    return get_database()["appointments"]


def get_contact_collection():
    return get_database()["contact_messages"]
