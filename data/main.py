import os
from dotenv import load_dotenv
from googleapiclient.discovery import build
import json
from youtube import youtube_search, get_video
from db import insert_data, db_close, make_json_file

def main():
    load_dotenv()
    
    
    # print(os.getenv("GOOGLE_API_KEY"))
    # youtube_search('Ryan McBeth')
    # db.read_data()
    # db.create_table()
    

    make_json_file()
    # collect()   
        
    db_close()
    
    
def collect():
    while True:
        video_id = input("Enter a video ID (q to quit): ")  
            
        if video_id.lower() == 'q':
            print("Exiting program...")
            break
        data = get_video(video_id)
        insert_data(data['id'], data['title'], data['description'], data['thumbnail'], data['channelTitle'], data['publishTime'])

    
if __name__ == "__main__":
    main()