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


class PlylistCrawler:
    
    ID_BASE_URL = "https://www.melon.com/dj/chart/djchart_list.htm"
    PLY_BASE_URL = "https://www.melon.com/mymusic/dj/mymusicdjplaylistview_inform.htm"

    def __init__(self, id_path="id_test.csv", plylst_path="plylst_test.csv"):
        self.plylist_id = set()
        self.plylist_id_df = None
        if os.path.exists(id_path):
            self.plylist_id_df = pd.read_csv(id_path)

        self.plylist_df = None
        if os.path.exists(plylst_path):
            self.plylst_df = pd.read_csv(plylst_path)
        
        self.plylist = dict()
        self.options = webdriver.ChromeOptions()
        self.options.add_argument("headless")
        self.startday = datetime(2020, 12, 21)
        self.id_path = id_path
        self.plylst_path = plylst_path

    def __make_next_url(start):
        nextday7 = PlylistCrawler.__add_day(start, 7)
        nextday13 = PlylistCrawler.__add_day(start, 13)

        startday = PlylistCrawler.__fit_dateformat_with_nospace(nextday7)
        endday = PlylistCrawler.__fit_dateformat_with_nospace(nextday13)

        # "2020.12.28 ~ 2021.01.03 "
        startday_dot =  PlylistCrawler.__fit_dateformat_with_dot(nextday7)
        endday_dot = PlylistCrawler.__fit_dateformat_with_dot(nextday13)
        return "{}#params%5BstartDay%5D={}&params%5BendDay%5D={}".format(PlylistCrawler.ID_BASE_URL,startday, endday), "{} ~ {}".format(startday_dot, endday_dot)

    def __fit_dateformat_with_nospace(day):
        return str(day.year) + str(day.month).zfill(2) + str(day.day).zfill(2)

    def __fit_dateformat_with_dot(day):
        return str(day.year) + "." + str(day.month).zfill(2) + "." + str(day.day).zfill(2)
    
    def __add_day(start, day):
        if day < 0:
            return start-timedelta(days=-day)
        return start+timedelta(days=day)

    def do_crawling_ply_id(self):
        while self.startday < datetime.today():
            driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=self.options)
            curr_url, date_range = PlylistCrawler.__make_next_url(self.startday)
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

    def __export_id_to_csv(self):
        plylist_id_df=pd.DataFrame(self.plylist_id).rename(columns={0: "plylist_id"})
        plylist_id_df.to_csv(self.id_path, index=False)
        print(f"{self.id_path} 저장완료")

    def __export_plylst_to_csv(self):
        plylist_df=pd.DataFrame(self.plylist).rename(columns={0: "plylist_id"})
        plylist_df.to_csv(self.plylst_path, index=False)
        print(f"{self.plylst_path} 저장완료")