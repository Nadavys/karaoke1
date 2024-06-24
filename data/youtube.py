import os
from dotenv import load_dotenv
from googleapiclient.discovery import build
import json

youtube = None

def init():
    global youtube
    if youtube is not None:
        return
    
    load_dotenv()
    api_key = os.getenv("GOOGLE_API_KEY")

    youtube = build('youtube', 'v3', developerKey=api_key)
    print(youtube, api_key)

def format_data(row):
    if not isinstance(row, dict) or 'id' not in row or 'snippet' not in row:
        raise ValueError("Row is not in the expected format")
    
    if 'videoId' in row['id']:
        video_id = row['id']['videoId']
    else:
        video_id = row['id']
    
    # print(row)

    return {
            "id": video_id,
            "title": row['snippet']['title'],
            "description": row['snippet']['description'],
            "thumbnail": row['snippet']['thumbnails']['default']['url'],
            "channelTitle": row['snippet']['channelTitle'],
            "publishTime": row['snippet']['publishedAt']
        }
    
    
def get_video(video_id):
    if youtube is None:
        init()
    
    request = youtube.videos().list(
        part="snippet",
        id=video_id,
    )

    response = request.execute()
    
    if len(response['items']) == 0:
        return None
    
    # print(json.dumps(response, indent=4))
    return format_data(response['items'][0])
    
def youtube_search(s):
    if youtube is None:
        init()
    
    request = youtube.search().list(
        part="snippet",
        maxResults=10,
        q=s
    )

    response = request.execute()

    # print(json.dumps(response, indent=4))
    for item in response['items']:
        if item['id']['kind'] != 'youtube#video':
            continue
        
        print(format_data(item))
        # video_id = item['id']['videoId']
        # full_video_url = f"https://www.youtube.com/watch?v={video_id}"
        # print(full_video_url)
        # print(item['id']['videoId'])
        # print(item['snippet']['title'])
        # print(item['snippet']['description'])
        # print(item['snippet']['thumbnails']['default']['url'])
        # print(item['snippet']['channelTitle'])
        # print(item['snippet']['publishTime'])
        # print("=====================================")
    
    
    


        
