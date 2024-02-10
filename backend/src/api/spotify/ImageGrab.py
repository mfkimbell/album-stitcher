import requests
import math
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


def get_image_urls(playlist_link):
    # Spotify credentials from environment variables
    client_id = os.getenv("SPOTIFY_CLIENT_ID")
    print("Client ID:", client_id)

    client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")
    print("Client Secret:", client_secret)

    # Spotify playlist link (you can replace this with your desired playlist link)
    playlist_id = playlist_link.split("/")[-1].split("?")[0]

    # Main program
    access_token = get_access_token(client_id, client_secret)
    playlist_data = get_playlist_data(playlist_id, access_token)
    image_urls = extract_image_urls(playlist_data)

    # Floor the length of image_urls to one of the given values
    image_count = len(image_urls)
    image_count_floor = max(
        [21, 36, 55, 78, 112, 144, 180],
        key=lambda x: x if x <= image_count else -math.inf,
    )
    image_urls = image_urls[:image_count_floor]

    return image_urls


# Function to get access token
def get_access_token(client_id, client_secret):
    auth_url = "https://accounts.spotify.com/api/token"
    auth_response = requests.post(
        auth_url,
        {
            "grant_type": "client_credentials",
            "client_id": client_id,
            "client_secret": client_secret,
        },
    )
    auth_response_data = auth_response.json()
    return auth_response_data["access_token"]


def get_playlist_data(playlist_id, access_token):
    playlist_url = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }

    all_tracks = []
    next_url = playlist_url  # Start with the initial URL
    while next_url:
        response = requests.get(next_url, headers=headers)
        response_data = response.json()

        # Add the tracks from the current response to the list
        all_tracks.extend(response_data.get("items", []))

        # Check if there is a next page of results
        next_url = response_data.get("next")

    return {"tracks": {"items": all_tracks}}


def extract_image_urls(playlist_data):
    image_urls = set()  # Use a set to store unique image URLs
    for item in playlist_data["tracks"]["items"]:
        # Each item represents a track
        track = item["track"]
        if track and "album" in track and "images" in track["album"]:
            # Extracting the first image (usually the largest)
            album_images = track["album"]["images"]
            if album_images:
                # Adding the URL of the first image to the set
                image_urls.add(album_images[0]["url"])
    return list(image_urls)  # Convert set back to a list before returning
