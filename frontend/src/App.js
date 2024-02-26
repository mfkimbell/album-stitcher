import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import SearchPlaylist from "./components/SearchPlaylist/SearchPlaylist";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import "./App.css";
import placeholder from "./logo2.png";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [loadMessage, setLoadMessage] = useState("");
  const [albumCount, setAlbumCount] = useState(0);
  const [device, setDevice] = useState("");
  const [imageData, setImageData] = useState({
    base64Image: "empty",
    imageFormat: "img",
  });
  const [imageDataPrev, setImageDataPrev] = useState({
    base64Image: "empty",
    imageFormat: "img",
  });

  const resetAlbumCount = () => {
    setAlbumCount(0);
  };

  useEffect(() => {
    console.log("Updated message:", message);
    if (message !== "") {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [message]);

  const handleSearch = async (spotifyLink, albumCount, device) => {
    setIsError(false);
    setIsLoading(true);
    setDevice(device);

    // Define the mappings from albumCount to time in seconds
    const timeMappings = {
      3: 5,
      10: 5,
      21: 7,
      36: 15,
      55: 18,
      78: 31,
      112: 45,
      144: 53,
      180: 64,
    };

    // Get the time from the mappings based on the albumCount
    const time = timeMappings[albumCount]
      ? `${timeMappings[albumCount]} seconds`
      : "a variable amount of time";

    // Set the message with the appropriate time
    setLoadMessage(
      `Album counts of size ${albumCount} will take around ${time}`
    );

    const postData = { url: spotifyLink, albumCount: albumCount, device: device };

    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      };

      const response = await fetch(
        "http://localhost:8000/api/spotify/playlist",
        options
      );

      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const json = await response.json();
          setImageData({ base64Image: json.image, imageFormat: "png" });
          setMessage(json.message);
        } else {
          console.error("Response was not JSON.");
        }
      } else {
        console.error("Response was not ok.", response);
        setIsLoading(false);
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
      <SearchPlaylist
        handleSearch={handleSearch}
        isLoading={isLoading}
        onSpotifyLinkChange={resetAlbumCount}
      />

      <div className="center-container">
        <div
          className="smartphone"
          style={{ position: "relative", marginTop: "-1em" }}
        >
          {imageData.base64Image !== "empty" ? (
            <img
              src={`data:image/${imageData.imageFormat};base64,${imageData.base64Image}`}
              alt="Spotify Playlist"
              className="phone_screen"
              style={{ width: "16em" }}
            />
          ) : (
            <img
              src={placeholder}
              alt="Placeholder"
              className="phone_screen"
              style={{ width: "16em" }}
            />
          )}
          {isLoading && (
            <CircularProgress
              style={{
                position: "absolute",
                top: "47%",
                left: "42%",
                transform: "translate(-50%, -50%)",
                color: "white",
              }}
            />
          )}
        </div>
      </div>

      {imageData.base64Image !== imageDataPrev.base64Image && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <a
            href={`data:image/${imageData.imageFormat};base64,${imageData.base64Image}`}
            download="playlist_image.png"
            style={{ textDecoration: "none", marginBottom: "10px" }}
          >
            {!isLoading && (
              <Button variant="contained" color="primary">
                Download Image
              </Button>
            )}
          </a>
          {isError && (
            <div
              id="message"
              style={{ fontWeight: "bold", color: "white", fontSize: "small" }}
            >
              {message}
            </div>
          )}
        </div>
      )}

      {isLoading && <b style={{ paddingTop: "1em" }}>{loadMessage}</b>}
    </div>
  );
}

export default App;
