from fastapi import FastAPI
from melon_plylist_crawling import PlylistCrawler
import logging

crawling_server = FastAPI()
logging.basicConfig(level = logging.WARNING)


# 크롤러
ID_PATH = "./data/plylist_id.csv"
PLY_PATH = "./data/plylist.csv"
GNR_PATH = "./data/genre_cat1.csv"
SONG_ID_PATH = "./data/song_id.csv"
SONG_PATH = "./data/song.csv"
crawler = PlylistCrawler(id_path=ID_PATH,
                         plylst_path=PLY_PATH,
                         genre_path=GNR_PATH,
                         song_path=SONG_PATH,
                         song_id_path=SONG_ID_PATH)

@crawling_server.get("/")
async def root():
    return {"message": "Hello World"}

@crawling_server.post("/song")
async def crawlingMusic():
    crawler.do_crawling_song()
    return ""