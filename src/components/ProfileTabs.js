import { Card, Tab, Tabs } from "@mui/material";
import React from "react";

const ProfileTabs = (props) => {
  const handleChange = (e, newValue) => {
    props.setTab(newValue);
  };

  return (
    <Card sx={{ padding: 0 }}>
      <Tabs style={{
        backgroundColor: ""
      }} value={props.tab} onChange={handleChange} variant="scrollable">
        <Tab style={{color: 'yellow'}} label="Post" value="posts" />
        <Tab style={{color: 'yellow'}} label="Piaciuti" value="liked" />
        <Tab style={{color: 'yellow'}} label="Commenti" value="comments" />
      </Tabs>
    </Card>
  );
};

export default ProfileTabs;
