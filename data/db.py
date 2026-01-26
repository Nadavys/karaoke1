
from datetime import datetime
import psycopg2
import json
from dotenv import load_dotenv
import os
import requests
# Connect to your postgres DB using the connection string

load_dotenv()
# conn = None

#todo: might need to fix db config data
conn = psycopg2.connect(os.environ.get('DB_URL'))
print(conn)
# Open a cursor to perform database operations
cur = conn.cursor()

# Example operation: Print PostgreSQL version
cur.execute('SELECT version();')
db_version = cur.fetchone()
# print(db_version)

def read_data():
    cur.execute('SELECT * FROM "Test";')
    rows = cur.fetchall()
    print(rows)
    # for row in rows:
    #     print(row)
    # cur.execute("""
    #     SELECT table_name
    #     FROM information_schema.tables
    #     WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
    #     AND table_type = 'BASE TABLE';
    # """)
    
    # tables = cur.fetchall()
    # for table in tables:
    #     print(table[0])  # Print each table name

# Don't forget to close the cursor and connection when you're done

def db_close():
    cur.close()
    conn.close()
    
    
def create_table():
    cur.execute("""
        CREATE TABLE youtube_videos (
            id varchar(256) PRIMARY KEY NOT NULL,
            title text,
            description text,
            thumbnail text,
            channelTitle text,
            publishTime timestamp
        );
    """)
    conn.commit()
    
def insert_data(video_id, title, description, thumbnail, channelTitle, publishTime):
    # do not allow empty values
    if not video_id or not title or not description or not thumbnail or not channelTitle or not publishTime:
        raise ValueError("All fields must have a value")
    
    cur.execute("""
        INSERT INTO youtube_videos (id, title, description, thumbnail, channelTitle, publishTime)
        VALUES (%s, %s, %s, %s, %s, %s);
    """, (video_id, title, description, thumbnail, channelTitle, publishTime))
    conn.commit()
    
    #if no error is raised, the data was inserted successfully. print a message
    print(f"Data for video {video_id, title} inserted successfully.")
    
def make_json_file():
        """get all rows and write to a json file"""
        cur.execute('SELECT * FROM youtube_videos;')
        rows = cur.fetchall()
        data = []
        
        for row in rows:
            print(row)
            data.append({
                "id": row[0],
                "title": row[1],
                "thumbnail": row[3],
                "channelTitle": row[4],
                "publishTime": row[5].isoformat() if isinstance(row[5], datetime) else row[5]
            })
        
        
        with open('data.json', 'w') as f:
            json.dump(data, f, indent=4)
        
        print("Data written to data.json")
        
        
def cleanup():
    """
    goes over every row in the database youtube_videos table.
    make http call out to thumbnail url
    see if returns 400 or 200.
    400 means this video is removed
    """
    cur.execute('SELECT id, title, thumbnail FROM youtube_videos;')
    rows = cur.fetchall()
    removed_videos = []

    for row in rows:
        video_id, title, thumbnail = row
        try:
            response = requests.head(thumbnail, timeout=5)
            if response.status_code >= 400:
                removed_videos.append((video_id, title))
                print(f"Video removed: {video_id} - {title}")
        except requests.RequestException as e:
            print(f"Error checking {video_id}: {e}")

    if removed_videos:
        print(f"\nFound {len(removed_videos)} removed videos:")
        for video_id, title in removed_videos:
            print(f"  - {video_id}: {title}")

        # Delete removed videos from database
        for video_id, _ in removed_videos:
            cur.execute('DELETE FROM youtube_videos WHERE id = %s;', (video_id,))
        conn.commit()
        print(f">>> Deleted {len(removed_videos)} videos from database.")
    else:
        print("All videos are still available.")
