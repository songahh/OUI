from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from datetime import datetime, timedelta
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os
import time
import pandas as pd
from tqdm import tqdm

class PlylistCrawler:
    
    ID_BASE_URL = "https://www.melon.com/dj/chart/djchart_list.htm"
    PLY_BASE_URL = "https://www.melon.com/mymusic/dj/mymusicdjplaylistview_inform.htm"

    def __init__(self, id_path="id_test.csv", plylst_path="plylst_test.csv"):
        # plylst id
        self.plylist_id = set()
        self.plylist_id_df = None
        if os.path.exists(id_path):
            self.plylist_id_df = pd.read_csv(id_path)

        self.plylist_df = None
        if os.path.exists(plylst_path):
            self.plylst_df = pd.read_csv(plylst_path)
        
        self.plylist = dict()

        #plylst 데이터
        self.plylist_title = dict()
        self.tags = dict()
        self.songs = dict()
        self.like_cnt = dict()
        self.updt_date = dict()

        self.options = webdriver.ChromeOptions()
        self.options.add_argument("headless")
        self.startday = datetime(2020, 12, 21)
        self.id_path = id_path
        self.plylst_path = plylst_path

    def __make_id_next_url(start):
        nextday7 = PlylistCrawler.__add_day(start, 7)
        nextday13 = PlylistCrawler.__add_day(start, 13)

        startday = PlylistCrawler.__fit_id_dateformat_with_nospace(nextday7)
        endday = PlylistCrawler.__fit_id_dateformat_with_nospace(nextday13)

        # "2020.12.28 ~ 2021.01.03 "
        startday_dot =  PlylistCrawler.__fit_id_dateformat_with_dot(nextday7)
        endday_dot = PlylistCrawler.__fit_id_dateformat_with_dot(nextday13)
        return "{}#params%5BstartDay%5D={}&params%5BendDay%5D={}".format(PlylistCrawler.ID_BASE_URL,startday, endday), "{} ~ {}".format(startday_dot, endday_dot)

    def __make_ply_next_page(ply_id, start_index):
        return "{}?plylstSeq={}#params%5BplylstSeq%5D={}&po=pageObj&startIndex={}".format(PlylistCrawler.PLY_BASE_URL, ply_id, ply_id, start_index)

    def __make_ply_next_url(ply_id):
        return "{}?plylstSeq={}".format(PlylistCrawler.PLY_BASE_URL, ply_id)


    def __fit_id_dateformat_with_nospace(day):
        return str(day.year) + str(day.month).zfill(2) + str(day.day).zfill(2)

    def __fit_id_dateformat_with_dot(day):
        return str(day.year) + "." + str(day.month).zfill(2) + "." + str(day.day).zfill(2)
    
    def __add_day(start, day):
        if day < 0:
            return start-timedelta(days=-day)
        return start+timedelta(days=day)

    def do_crawling_ply_id(self):
        while self.startday < datetime.today():
            driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=self.options)
            curr_url, date_range = PlylistCrawler.__make_id_next_url(self.startday)
            print(f"{curr_url} \"{date_range}\"")
            self.startday = PlylistCrawler.__add_day(self.startday, 7)
            driver.get(curr_url)

            WebDriverWait(driver, 10).until(
                EC.text_to_be_present_in_element((By.CLASS_NAME, "yyyymmdd"), date_range)
            )
            time.sleep(1)
            boxes = driver.find_elements(By.CLASS_NAME, "btn_djplylst_like")
            for box in boxes:
                try:
                    self.plylist_id.add(box.get_attribute("data-djcol-no"))
                except:
                    self.startday = PlylistCrawler.__add_day(self.startday, -7)
                    break
            boxes.clear()
            driver.quit()
        self.__export_id_to_csv()

    def do_crawling_ply(self):
        if not os.path.exists(self.id_path):
            return
        
        self.plylist_id = set(self.plylist_id_df["plylist_id"].tolist())
        error_id = set()
        #plylist_id_list = ["511794885"]
        for ply_id in tqdm(self.plylist_id):
            try:
                driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=self.options)
                start_index = 1
                curr_url = PlylistCrawler.__make_ply_next_url(ply_id)
                #print(f"{curr_url} \"{start_index}\"")
                driver.get(curr_url)
                
                WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CLASS_NAME, "song_name"))
                )
            
                # 제목
                time.sleep(1)
                title = driver.find_element(By.CLASS_NAME, "song_name").text            
                self.plylist_title[ply_id] = title
                #print(title)

                # 좋아요 수
                like_cnt = driver.find_element(By.CLASS_NAME, "cnt").text
                self.like_cnt[ply_id] = like_cnt
                #print(like_cnt)

                # 업데이트 날짜
                updt_date = driver.find_element(By.CLASS_NAME, "date").text
                self.updt_date[ply_id] = updt_date.split(" ")[0]
                
                # 태그 리스트
                tag_list = [x.text[1:] for x in driver.find_elements(By.CLASS_NAME, "tag_item")]
                self.tags[ply_id] = tag_list
                
                song_cnt = int(driver.find_element(By.CLASS_NAME, "sum").text[1:-1])
                curr_song_list = []
                for idx in range(1, song_cnt+1, 50):
                    WebDriverWait(driver, 10).until(
                        EC.presence_of_element_located((By.TAG_NAME, "tbody"))
                    )
                    song_list_body = driver.find_element(By.TAG_NAME, "tbody")
                    song_list = song_list_body.find_elements(By.CLASS_NAME, "input_check")

                    for song in song_list:
                        curr_song_list.append(song.get_attribute("value"))
                    
                    if idx + 50 >= song_cnt+1:
                        break
                    
                    driver.quit()
                    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=self.options)
                    curr_url = PlylistCrawler.__make_ply_next_page(ply_id, idx+50)
                    #print(f"\"{idx+50}\"")
                    driver.get(curr_url)
                #print(len(curr_song_list))
                self.songs[ply_id] = curr_song_list
                driver.quit()
            except:
                error_id.add(ply_id)
                continue
        print("크롤링 종료")
        print(f"error_id: {error_id}")
        self.__export_plylst_to_csv()

    def __export_id_to_csv(self):
        plylist_id_df=pd.DataFrame(self.plylist_id).rename(columns={0: "plylist_id"})
        plylist_id_df.to_csv(self.id_path, index=False)
        print(f"{self.id_path} 저장완료")

    def __export_plylst_to_csv(self):

        data = []
        for ply_id in self.plylist_id:
            try:
                row = {"id": ply_id, "tags":self.tags[ply_id], "songs":self.songs[ply_id], "like_cnt":self.like_cnt[ply_id], "updt_date":self.updt_date[ply_id], "plylist_title":self.plylist_title[ply_id]}
                data.append(row)
            except:
                continue

        plylist_df=pd.DataFrame(data)
        plylist_df.to_csv(self.plylst_path, index=False)
        print(f"{self.plylst_path} 저장완료")