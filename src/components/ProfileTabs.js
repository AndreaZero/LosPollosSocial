import { Card, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

const ProfileTabs = (props) => {
  const [activeTab, setActiveTab] = useState("posts"); // Stato per il tab attivo

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    props.setTab(newValue);
  };

  return (
    <Card sx={{ padding: 0 }}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant="scrollable"
        indicatorColor="primary" // Colore dell'indicatore del tab attivo
        textColor="inherit" // Colore del testo del tab inattivo
      >
        <Tab
          style={{
            backgroundColor: activeTab === "posts" ? "black" : "transparent", // Sfondo nero quando il tab è attivo
            color: activeTab === "posts" ? "white" : "yellow", // Testo bianco quando il tab è attivo
          }}
          label="Post"
          value="posts"
        />
        <Tab
          style={{
            backgroundColor: activeTab === "liked" ? "black" : "transparent",
            color: activeTab === "liked" ? "white" : "yellow",
          }}
          label="Piaciuti"
          value="liked"
        />
        <Tab
          style={{
            backgroundColor: activeTab === "comments" ? "black" : "transparent",
            color: activeTab === "comments" ? "white" : "yellow",
          }}
          label="Commenti"
          value="comments"
        />
      </Tabs>
    </Card>
  );
};

export default ProfileTabs;
