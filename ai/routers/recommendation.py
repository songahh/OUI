from fastapi import Depends, APIRouter
from ai.model import OuiInference
from db.mongodb import MongoDB
import faiss
import numpy as np
import logging
from models.recommendation import Song, SongScore
from fastapi import HTTPException

router = APIRouter()
faiss_index = None
id = []
scores = []

negatives_etc = {"angry", "doubtful", "embarrassed"}
negatives_sad = {"sad"}
dim = 6
k = 3
inc = 0.5
dsc = 0.3

@router.on_event("startup")
async def init_faiss():
    global faiss_index
    mongodb = MongoDB()
    
    values = mongodb.database["song_meta"].find({}, {"_id":0, "id":1, "score":1})
    faiss_index = faiss.IndexFlatIP(dim)
    vectors = await values.to_list(length=None)
    
    nparr = np.zeros((len(vectors), 6), dtype=np.float32)
    for i in range(len(vectors)):
        id.append(vectors[i]["id"])
        nparr[i, 0] = vectors[i]['score']['happy']
        nparr[i, 1] = vectors[i]['score']['embarrassed']
        nparr[i, 2] = vectors[i]['score']['sad']
        nparr[i, 3] = vectors[i]['score']['angry']
        nparr[i, 4] = vectors[i]['score']['doubtful']
        nparr[i, 5] = vectors[i]['score']['comfortable']
    print(nparr[i, 0].dtype)
    faiss.normalize_L2(nparr)
    faiss_index.add(nparr)
    logging.info("routers:recommendation.py:init_faiss") 


@router.post("/song/upload")
async def upload_song_meta(body: Song, oui: OuiInference=Depends(), mongodb: MongoDB=Depends()):
    body_dict = body.dict()
    lyrics = body_dict["lyrics"]
    score = oui.predict_openvino(lyrics)
    entity = body_dict

    entity["score"] = score
    
    result = await mongodb.database["song_meta"].find_one({"id": entity["id"]}, {"_id":0, "id":1})
    if result:
        raise HTTPException(status_code=400, detail="{} 존재하는 entity".format(entity["id"]))
    
    await mongodb.database["song_meta"].insert_one(entity)
    return "{} 저장완료".format(entity["id"])

@router.post("/recommendation")
async def recommendation(body: SongScore, mongodb: MongoDB=Depends()):
    global faiss_index
    
    nparr = np.zeros((1, dim), dtype=np.float32)
    body_dict = body.dict()
    user_type = body_dict["user_type"]
    del body_dict["user_type"]
    
    nparr[0, 0] = body_dict['happy']
    nparr[0, 1] = body_dict['embarrassed']
    nparr[0, 2] = body_dict['sad']
    nparr[0, 3] = body_dict['angry']
    nparr[0, 4] = body_dict['doubtful']
    nparr[0, 5] = body_dict['comfortable']

    faiss.normalize_L2(nparr)
    # 유저가 표현형일 때,
    if user_type == "COVT":
        max_emotion = max(body_dict, key=body_dict.get)
        
        if max_emotion in negatives_etc:
            nparr[0, 5] += inc
            nparr[0, 0] += inc//2
            
            nparr[0, 1] -= dsc
            nparr[0, 2] -= dsc
            nparr[0, 3] -= dsc
            nparr[0, 4] -= dsc
        elif max_emotion in negatives_sad:
            nparr[0, 0] += inc
            nparr[0, 5] += inc//2
            
            nparr[0, 1] -= dsc
            nparr[0, 2] -= dsc
            nparr[0, 3] -= dsc
            nparr[0, 4] -= dsc
    
    _, indexes = faiss_index.search(nparr, 3)
    
    response_ids = indexes[0]    
    song1 = await mongodb.database["song_meta"].find_one({"id": id[response_ids[0]]}, {"_id":0, "id":1, "uri":1, "song_name":1, "artist_name_basket": 1})
    song2 = await mongodb.database["song_meta"].find_one({"id": id[response_ids[1]]}, {"_id":0, "id":1, "uri":1, "song_name":1, "artist_name_basket": 1})
    song3 = await mongodb.database["song_meta"].find_one({"id": id[response_ids[2]]}, {"_id":0, "id":1, "uri":1, "song_name":1, "artist_name_basket": 1})
    
    response = [song1, song2, song3]
    return response


