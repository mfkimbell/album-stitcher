
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
    print("request",request)
  

    res = await request.json()
    print("res", res)
    url = res['url']['query']
    print(url)
    execute(url)
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

 