import React from "react";
import "./Header.css"; // Ensure the CSS file is correctly imported
import photo from "../../photos/logo.png";

const Header = () => {
  return (
    <div
      className="headerContainer"
      style={{ display: "flex", alignItems: "center", padding: "0px" }}
    >
      {/* Logo Image */}
      <img
        className="logo"
        src={photo}
        alt="SongStitch Logo"
        style={{ marginRight: "20px" }}
      />

      {/* Logo Text */}
      <div
        style={{
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // A more appealing, modern font
          fontSize: "24px", // Adjust the size as needed
          color: "#FFFFFF", // Choose a color that contrasts well with your header background for readability
          fontWeight: "bold", // Make the text bold
        }}
      >
        SongStitch
      </div>
    </div>
  );
};

export default Header;
