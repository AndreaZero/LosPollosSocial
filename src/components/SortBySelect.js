import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import { BiNoEntry } from "react-icons/bi";
import HorizontalStack from "./util/HorizontalStack";

const SortBySelect = ({ onSortBy, sortBy, sorts }) => {
  return (
    <HorizontalStack spacing={1}>
      <Typography
        color="text.secondary"
        variant="subtitle2"
        sx={{
          display: {
            xs: "none",
            sm: "block",
            color: 'yellow'
          },
        }}
      >
        Filtra per:
      </Typography>
      <Select
        size="small"
        value={sorts[sortBy]}
        sx={{ minWidth: 150,
          border: '1px solid yellow',
          borderRadius: '4px',
          color: 'yellow'}}
        onChange={onSortBy}
      >
        {Object.keys(sorts).map((sortName, i) => (
          <MenuItem value={sorts[sortName]} style={{
            backgroundColor: "#202029",
            color: 'yellow'
          }} key={i}>
            {sorts[sortName]}
          </MenuItem>
        ))}
      </Select>
    </HorizontalStack>
  );
};

export default SortBySelect;
