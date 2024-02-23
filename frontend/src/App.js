import React, { useState } from "react";
import Header from "./components/Header/Header";
import SearchPlaylist from "./components/SearchPlaylist/SearchPlaylist";
import "./App.css"; // Ensure this points to the correct path of your CSS file
import placeholder from "./logo2.png";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState({
    base64Image: "empty",
    imageFormat: "img",
  });

  const handleSearch = async (spotifyLink) => {
    setIsLoading(true);
    const postData = { url: spotifyLink };

    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      };

      const response = await fetch(
        "http://localhost:8000/api/spotify/playlist",
        options,
      );

      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const json = await response.json();
          setImageData({ base64Image: json.image, imageFormat: "png" });
        } else {
          console.error("Response was not JSON.");
        }
      } else {
        console.error("Response was not ok.", response);
      }
    } catch (error) {
      console.error(`Error occurred: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <Header className="header" />
      <SearchPlaylist handleSearch={handleSearch} isLoading={isLoading} />
      {/* New div that will serve as a container to center the smartphone div */}

      <div className="center-container">
        <div className="smartphone">
          {/* Conditionally render image or placeholder based on imageData */}
          {imageData.base64Image !== "empty" ? (
            <img
              src={`data:image/${imageData.imageFormat};base64,${imageData.base64Image}`}
              alt="Spotify Playlist"
              className="phone_screen"
              style={{
                width: "16em",
                height: "34em",
              }}
            />
          ) : (
            <img
              src={placeholder}
              alt="Spotify Playlist"
              className="phone_screen"
              style={{
                width: "16em",
                height: "34em",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
