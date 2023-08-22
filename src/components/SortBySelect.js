import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import { BiNoEntry } from "react-icons/bi";
import HorizontalStack from "./util/HorizontalStack";
import CreatePost from "./CreatePost";

const SortBySelect = ({ onSortBy, sortBy, sorts }) => {
  return (
    <HorizontalStack spacing={1}>
      <Select
        size="small"
        value={sorts[sortBy]}
        sx={{ width: 'auto',
         boxShadow: '0px 0px 3px 0px black',
          borderRadius: '4px',
          backgroundColor: '#19A4F6',
          color: 'white',
        fontWeight: "bold"}}
        onChange={onSortBy}
      >
        {Object.keys(sorts).map((sortName, i) => (
          
          <MenuItem value={sorts[sortName]} style={{
            display: 'flex',
            flexDirection :"column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#19A4F6",
            height: '100%',
            padding: "10px",
            color: 'white',
            fontWeight: "normal"
          }} key={i}>
            {sorts[sortName]}
            
          </MenuItem>
        ))}
      </Select>

    </HorizontalStack>
  );
};

export default SortBySelect;
