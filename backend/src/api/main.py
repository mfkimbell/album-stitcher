
# STL
import re
# PDM
import requests
from fastapi import FastAPI, Request, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from .spotify.ImageStitch import *
# from starlette.responses import FileResponse
# from api.spotify.SpotifyClient import SpotifyClient



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows all origins for localhost:3000
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

print("main.py running")

@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

@app.post("/api/spotify/playlist")
async def get_playlist(request: Request):
    DEVICE_RESOLUTIONS = {
        1: (2532, 1170),  # iPhone 12 to 15
        2: (1284, 2778),  # iPhone Max/Plus
        3: (2340, 1080),  # Galaxy Regular
        4: (3120, 1440),  # Galaxy Ultra/Plus
        5: (2400, 1080),  # Google Pixel
        6: (1080, 1920),  # HD Phone Background
    }

    res = await request.json()
    print("res", res)
    url = res['url']['query']
    device = res['url']['device']
    album_count = res['url']['albumCount']

    resolution = DEVICE_RESOLUTIONS.get(device, (1080, 1920))
    return execute(url, resolution, album_count)
    
    
    # assert res.get("url")

    # url = res.get("url")

    # ID = re.search(r"/playlist/([^?]+)", url.get("query"))
    # if ID:
    #     ID = ID.group(1)

    # bearer_token = f"Bearer {spotify.auth.access_token}"
    # headers = {"Authorization": bearer_token}

    # playlist = Endpoints.PLAYLIST.value
    # playlist = f"{playlist.PLAYLIST.value}/{ID}"

    # res = requests.get(playlist, headers=headers)

 