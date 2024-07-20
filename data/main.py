import os
from dotenv import load_dotenv
from googleapiclient.discovery import build
import json
from youtube import youtube_search, get_video
from db import insert_data, db_close, make_json_file, conn
from psycopg2 import errors
# import psycopg2.errors.UniqueViolation
def main():
    load_dotenv()
    
    
    # print(os.getenv("GOOGLE_API_KEY"))
    # youtube_search('Ryan McBeth')
    # db.read_data()
    # db.create_table()
    

    # make_json_file()
    collect()   
        
    db_close()
    
    
def collect():
    while True:
        video_id = input("Enter a video ID (q to quit, m to make data file): ")  
            
        if video_id.lower() == 'q':
            print("Exiting program...")
            break
        
        if video_id.lower() == 'm':
            make_json_file()   
            print("New Data file created. Exiting program.")
            break
        
        data = get_video(video_id)
        try:
            insert_data(data['id'], data['title'], data['description'], data['thumbnail'], data['channelTitle'], data['publishTime'])
        except errors.UniqueViolation as e:
            # end last transaction from the data insert
            conn.rollback()
            print(f"*******************************************")
            print(f"** This video is already in the database. {data['title']}**")
            print(f"*******************************************")

    
if __name__ == "__main__":
    main()