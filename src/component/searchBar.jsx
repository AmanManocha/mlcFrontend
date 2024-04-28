import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchQuery);
    }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <TextField
        fullWidth
        placeholder="Search..."
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        InputProps={{
          endAdornment: (
            <IconButton
              edge="end"
              aria-label="search"
              onClick={() => onSearch(searchQuery)}
              style={{ color: "black" }}
            >
              <SearchIcon />
            </IconButton>
          ),
          style: { color: "black" },
        }}
      />
    </div>
  );
};

export default SearchBar;
