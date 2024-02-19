import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const SearchComponent = ({ handleSearch }) => {
  const [query, setQuery] = useState("");
  const [deviceValue, setDeviceValue] = useState(""); // State for the device dropdown
  const [albumCount, setAlbumCount] = useState(""); // State for the number of albums dropdown

  // const handleSubmit = (e) => {
  //   e.preventDefault(); // Prevent the default form submission behavior
  //   handleSearch({ query });
  // };

  const handleDeviceChange = (event) => {
    setDeviceValue(event.target.value);
  };

  const handleAlbumCountChange = (event) => {
    const newAlbumCount = event.target.value;
    setAlbumCount(newAlbumCount); // Update the album count state

    // Construct the search parameters
    const searchParams = {
      query,
      device: deviceValue,
      albumCount: newAlbumCount,
    };
    console.log("handle SEARCH BEING CALLED");
    // Execute handleSearch with the current query and the new album count
    handleSearch(searchParams);
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
            onChange={(e) => setQuery(e.target.value)}
            sx={{
              ".MuiInputBase-input": {
                color: "white",
                padding: "10px 14px", // Adjust padding for vertical centering
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
                height: "40px", // Reduced height
              },
              ".MuiInputLabel-outlined": {
                color: "white",
                top: "-6px", // Adjust label position
              },
              width: "100%",
              maxWidth: "250px",
            }}
          />
          <FormControl
            sx={{ m: 1, minWidth: 120, width: "100%", maxWidth: "250px" }}
          >
            <InputLabel
              id="device-select-label"
              sx={{
                color: "white",
                "&.Mui-focused": {
                  color: "white",
                },
                top: "-6px",
              }}
            >
              Device
            </InputLabel>
            <Select
              labelId="device-select-label"
              id="device-select"
              value={deviceValue}
              label="Device"
              onChange={handleDeviceChange}
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
                  padding: "8px", // Reduced padding
                },
                height: "40px", // Reduced height to match TextField
              }}
            >
              {/* The iphone 12 to 15 have the same screen resolution */}
              {/* iPhone Max's have the same screen resolution */}
              <MenuItem value={1}>iPhone 12 to 15</MenuItem> {/* 2532 × 1170 */}
              <MenuItem value={2}>iPhone Max/Plus</MenuItem> {/* 1284 × 2778 */}
              <MenuItem value={3}>Galaxy Regular</MenuItem> {/* 2340 x 1080 */}
              <MenuItem value={4}>Galaxy Ultra/Plus</MenuItem> {/* 3120 x 1440 */}
              <MenuItem value={5}>Google Pixel</MenuItem> {/* 2400 × 1080 */}
              <MenuItem value={6}>HD Phone Background</MenuItem> {/* 1080 x 1920 */}
            </Select>
          </FormControl>
          <FormControl
            sx={{ m: 0, minWidth: 120, width: "100%", maxWidth: "250px" }}
          >
            <InputLabel
              id="album-count-label"
              sx={{
                color: "white",
                "&.Mui-focused": {
                  color: "white",
                },
                top: "-6px",
              }}
            >
              # Songs to Include
            </InputLabel>
            <Select
              labelId="album-count-label"
              id="album-count-select"
              value={albumCount}
              label="Songs to Include"
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
                  padding: "8px", // Reduced padding
                },
                height: "40px", // Reduced height to match TextField
              }}
            >
              {/* We probably wanna do multiple's of 6 rather than 5 */}
              <MenuItem value={6}>6 Songs</MenuItem>
              <MenuItem value={12}>12 Songs</MenuItem>
              <MenuItem value={18}>18 Songs</MenuItem>
              <MenuItem value={24}>24 Songs</MenuItem>
              <MenuItem value={30}>30 Songs</MenuItem>
              <MenuItem value={36}>36 Songs</MenuItem>
              <MenuItem value={42}>42 Songs</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default SearchComponent;
