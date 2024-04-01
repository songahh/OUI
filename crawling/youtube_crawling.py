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
import ast
import re

class YoutubeCrawler:
    BASE_URL = "https://www.youtube.com/results?search_query="

    def __init__(self):        
        self.options = webdriver.ChromeOptions()
        self.options.add_argument("headless")
        self.options.add_experimental_option("excludeSwitches", ["enable-logging"])
        self.options.add_argument('--log-level=3')
            

    def do_crawling(self, query_path):
        uri_dict = dict()
        self.query_df = None
        self.query_path = query_path
        if os.path.exists(query_path):
            try:
                self.query_df = pd.read_csv(query_path)
            except:
                return

        for _, row in self.query_df.iterrows():
            try:
                #print(row)
                driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=self.options)
                query = "{} {}".format(row["song_name"], ast.literal_eval(row["artist_name_basket"])[0]).replace(" ", "+")
                curr_url = YoutubeCrawler.BASE_URL + query
                #print(f"{curr_url} \"{start_index}\"")
                driver.get(curr_url)
                #print(curr_url)
                WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "a#video-title"))
                )
                
                time.sleep(1)
                element = driver.find_element(By.CSS_SELECTOR, 'a#video-title')
                #print(element)          
                href = element.get_attribute("href")
                uri = href.split("?v=")[1].split("&")[0]
                print(f"{curr_url} {uri}")

                uri_dict[row["id"]] = uri
                driver.quit()
            except:
                print(f"error: {row["id"]}")
                continue
        print("크롤링 종료")
        self.query_df['uri'] = self.query_df['id'].map(uri_dict)
        self.export(self.query_path)

    def export(self, path):
        self.query_df.to_csv(path, index=False)
        print("****************uri 저장******************")
