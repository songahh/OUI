from fastapi import APIRouter, HTTPException
from ai.model import oui
from db.mongodb import mongodb
import faiss
import numpy as np
from models.recommendation import Song, SongScore

import os
os.environ['KMP_DUPLICATE_LIB_OK']='True'

router = APIRouter()
faiss_index = None
dim = 6
k = 3

uri = []
scores = []

async def init_faiss():
    global faiss_index
    result = mongodb.database["song_meta"].find({}, {"_id":0, "uri":1, "score":1})
    
    faiss_index = faiss.IndexFlatL2(dim)

    vectors = await result.to_list(length=None)
    # print(vectors[0], type(vectors[0]))
    
    nparr = np.zeros((len(vectors), 6))
    for i in range(len(vectors)):
        uri.append(vectors[i]["uri"])
        nparr[i, 0] = vectors[i]['score']['happy']
        nparr[i, 1] = vectors[i]['score']['embarrassed']
        nparr[i, 2] = vectors[i]['score']['sad']
        nparr[i, 3] = vectors[i]['score']['angry']
        nparr[i, 4] = vectors[i]['score']['doubtful']
        nparr[i, 5] = vectors[i]['score']['comfortable']
    
    # print(nparr)
    # print(uri)
    faiss_index.add(nparr)
    print(faiss_index)

@router.post("/song/upload")
async def upload_song_meta(body: Song):
    body_dict = body.dict()
    lyrics = body_dict["lyrics"]
    score = oui.predict_openvino(lyrics)
    entity = body_dict

    entity["score"] = score
    await mongodb.database["song_meta"].insert_one(entity)
    return "OK"

@router.get("/song")
async def get_all_song():
    pass

@router.post("/recommendation")
async def recommendation(body: SongScore):
    global faiss_index
    if faiss_index is None:
        await init_faiss()
        
    nparr = np.zeros((1, dim))
    body_dict = body.dict()

    nparr[0, 0] = body_dict['happy']
    nparr[0, 1] = body_dict['embarrassed']
    nparr[0, 2] = body_dict['sad']
    nparr[0, 3] = body_dict['angry']
    nparr[0, 4] = body_dict['doubtful']
    nparr[0, 5] = body_dict['comfortable']
    
    _, indexes = faiss_index.search(nparr, 3)
    return [uri[i] for i in indexes[0]]


