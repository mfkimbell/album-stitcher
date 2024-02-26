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
  const [device, setDevice] = useState("");

  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setAlbumCount(""); // Reset albumCount to default value when query changes
  };

  const handleAlbumCountChange = (e) => {
    const newAlbumCount = e.target.value;
    setAlbumCount(newAlbumCount);
    if (query) {
      handleSearch(query, newAlbumCount);
    }
  };

  return (
    <>
      <Box
        sx={{
          marginBottom: "0.5rem", // Slightly increased for spacing below the component
          backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: "1.2rem",
          bgcolor: "transparent",
          marginTop: ".5em"
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.3rem", // Reduced gap to bring elements closer
            width: "100%",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Enter Playlist"
            variant="outlined"
            value={query}
            onChange={handleQueryChange}
            sx={{
              ".MuiInputBase-input": {
                color: "white",
                padding: "8px 14px", // Adjusted padding for centered text and shorter height
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
                top: "-6px", // Adjusted for vertical centering of label
              },
              width: "100%",
              maxWidth: "250px",
            }}
          />

{/* <FormControl
            sx={{ 
              minWidth: 100, 
              width: "100%", 
              maxWidth: "250px",
              ".MuiInputBase-root": {
                margin: "0px", // Reduced margin to bring elements closer
              },
              ".MuiInputLabel-outlined": {
                top: "-6px", // Adjusted for vertical centering of label
              },
            }}
          >
            <InputLabel id="album-count-label" sx={{ color: "white" }}>
              Device Type
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
                ".MuiSelect-select": {
                  padding: "8px 14px", // Adjusted padding for centered text and shorter height
                },
              }}
            >
              <MenuItem value={3}> iPhone 12-15</MenuItem>
              <MenuItem value={10}>iPhone Max</MenuItem>
              
            </Select>
          </FormControl> */}

          <FormControl
            sx={{ 
              minWidth: 100, 
              width: "100%", 
              maxWidth: "250px",
              ".MuiInputBase-root": {
                margin: "0px", // Reduced margin to bring elements closer
              },
              ".MuiInputLabel-outlined": {
                top: "-6px", // Adjusted for vertical centering of label
              },
            }}
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
                ".MuiSelect-select": {
                  padding: "8px 14px", // Adjusted padding for centered text and shorter height
                },
              }}
            >
              <MenuItem value={3}>3 Albums (1 x 3)</MenuItem>
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
