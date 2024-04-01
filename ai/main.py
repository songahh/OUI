import logging
import argparse

from fastapi import FastAPI
import uvicorn
from routers import analysis, recommendation
from db.mongodb import mongodb

logging.basicConfig(level=logging.INFO)

app = FastAPI()
app.include_router(analysis.router)
app.include_router(recommendation.router)

@app.get("/")
def root():
    return {"message": "OUI AI Server"}

@app.on_event("startup")
async def on_app_start():
	mongodb.connect()
 
@app.on_event("shutdown")
async def on_app_shutdown():
	mongodb.close()


if __name__ == '__main__':

    parser = argparse.ArgumentParser(description="oui ai server")

    parser.add_argument("--host", type=str, default="localhost")
    parser.add_argument("--port", type=int, default=8008)

    args = parser.parse_args()

    # uvicorn main:ai_server --reload --port=8008
    uvicorn.run(app, host=args.host, port=args.port)
