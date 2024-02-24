import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const SearchComponent = ({ handleSearch }) => {
  const [query, setQuery] = useState("");
  const [albumCount, setAlbumCount] = useState(""); // State for the number of albums dropdown

  // Function to handle changes in the text field for Spotify link
  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery); // Update local state with the new query
    setAlbumCount(""); // Reset albumCount to default value when query changes
  };

  // Function to handle changes in the album count dropdown
  const handleAlbumCountChange = (e) => {
    const newAlbumCount = e.target.value;
    setAlbumCount(newAlbumCount); // Update local state with the new album count
    if (query) {
      // Make sure there is a query to search with
      handleSearch(query, newAlbumCount); // Call handleSearch with the query and the new album count
    }
  };

  return (
    <>
      <Box
        sx={{
          marginBottom: "0rem",
          backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: "1rem",
          bgcolor: "transparent",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: ".3rem",
            width: "100%",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Enter Playlist"
            variant="outlined"
            value={query}
            onChange={handleQueryChange} // Updated to use handleQueryChange
            sx={{
              ".MuiInputBase-input": {
                color: "white",
              },
              ".MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              ".MuiInputLabel-outlined": {
                color: "white",
              },
              width: "100%",
              maxWidth: "250px",
            }}
          />

          <FormControl
            sx={{ mt: 1, minWidth: 120, width: "100%", maxWidth: "250px" }}
          >
            <InputLabel id="album-count-label" sx={{ color: "white" }}>
              # of Albums to include
            </InputLabel>
            <Select
              labelId="album-count-label"
              id="album-count-select"
              value={albumCount}
              label="# of Albums to include"
              onChange={handleAlbumCountChange}
              sx={{
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
                color: "white",
                backgroundColor: "transparent",
              }}
            >
              <MenuItem value={10}>10 Albums (2 x 5)</MenuItem>
              <MenuItem value={21}>21 Albums (3 x 7)</MenuItem>
              <MenuItem value={36}>36 Albums (4 x 9)</MenuItem>
              <MenuItem value={55}>55 Albums (5 x 11)</MenuItem>
              <MenuItem value={78}>78 Albums (6 x 13)</MenuItem>
              <MenuItem value={112}>112 Albums (7 x 16)</MenuItem>
              <MenuItem value={144}>144 Albums (8 x 18)</MenuItem>
              <MenuItem value={180}>180 Albums (9 x 20)</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default SearchComponent;
