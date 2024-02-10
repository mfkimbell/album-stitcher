import logo from "./logo.svg";
import "./App.css";
import React, { Suspense, useState, useEffect } from "react";
import Header from "./components/Header/Header";
import SearchPlaylist from "./components/SearchPlaylist/SearchPlaylist";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [planetData, setPlanetData] = useState("empty");

  const handleSearch = async (spotifyLink) => {
    console.log("handleSearch called");
    setIsLoading(true);
    const postData = {
      url: spotifyLink,
    };

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      };

      const res = await fetch(
        "http://localhost:8000/api/spotify/playlist",
        options
      );

      const json = await res.json();
      console.log("Result", json);
      // setPlanetData(json.items);
    } catch (error) {
      console.error(`Error occurred: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="App">
        <Header></Header> <div className="title">TrackStack</div>
      </div>
      <SearchPlaylist handleSearch={handleSearch}></SearchPlaylist>
    </div>
  );
}

export default App;
