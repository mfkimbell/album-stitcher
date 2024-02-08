import React from "react";
import "./Submit.css"; // Ensure the CSS file is correctly imported
import SearchPlaylist from "../SearchPlaylist/SearchPlaylist";

const Submit = ({ spotifyBoolean, handleSearch }) => {
  if (spotifyBoolean === true) {
    return <div className=""></div>;
  } else {
    return <SearchPlaylist handleSearch={handleSearch} className=""></SearchPlaylist>;
  }
};

export default Submit;
