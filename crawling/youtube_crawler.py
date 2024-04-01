import concurrent.futures
from youtube_crawling import YoutubeCrawler
import argparse
import os

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="song cralwer program")

    parser.add_argument("--file_path", type=str, default="./crawling/data")
    parser.add_argument("--start", type=int, default=0)
    parser.add_argument("--size", type=int, default=20)
    parser.add_argument("--workers", type=int, default=4)
    args = parser.parse_args()

    PATH = './crawling/data'
    files = os.listdir(PATH)
    csv_files = [os.path.join(PATH, file) for file in files if file.endswith('.csv') and file.startswith("song_2024")]
    print(f"*****************총 길이: {len(csv_files)}*****************")
    
    start, end = args.start, args.start+args.size
    window_size = args.size // args.workers

    yc = YoutubeCrawler()

    process_pool = concurrent.futures.ProcessPoolExecutor(max_workers=args.workers)    
    with process_pool as executor:
        for i in enumerate(executor.map(yc.do_crawling, csv_files)):
            print(f"{i} start")