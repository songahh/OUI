from motor.motor_asyncio import AsyncIOMotorClient

from db.config import MONGODB_URL, MONGODB_DBNAME

class MongoDB:
    def __init__(self):
        self.client = None

    def connect(self):
        self.client = AsyncIOMotorClient(MONGODB_URL)
        self.database = self.client[MONGODB_DBNAME]

    def close(self):
        self.client.close()

mongodb = MongoDB()