import concurrent.futures
from melon_plylist_crawling import PlylistCrawler
import argparse
import math
import os

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="song cralwer program")

    parser.add_argument("--start", type=int, default=0)
    parser.add_argument("--size", type=int, default=10000)
    parser.add_argument("--workers", type=int, default=4)
    args = parser.parse_args()

    pc = PlylistCrawler(id_path="./crawling/data/plylist_id.csv",
                    plylst_path="./crawling/data/plylist.csv",
                    genre_path="./crawling/data/genre_cat1.csv",
                    song_id_path="./crawling/data/song_id.csv")
    
    start, end = args.start, args.start+args.size
    window_size = args.size // args.workers

    start_idx_list = []
    end_idx_list = []
    for s in range(start, end, window_size):
        start_idx_list.append(s)
        end_idx_list.append(s+window_size)
    print(start_idx_list)
    print(end_idx_list)
    process_pool = concurrent.futures.ProcessPoolExecutor(max_workers=args.workers)    
    with process_pool as executor:
        for si, _ in zip(start_idx_list, executor.map(pc.do_crawling_song, start_idx_list, end_idx_list)):
            print(f"{si} start")