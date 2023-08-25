import React, { useState } from "react";
import { Button } from "@mui/material";
import CreatePost from "./PostEditor";
import MessangerHome from "./views/MessangerHome"; // Assicurati che l'import sia corretto
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faPenToSquare, faTimes } from "@fortawesome/free-solid-svg-icons"; // Importa l'icona di chiusura

const FixedComponent = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupPostOpen, setIsPopupPostOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const togglePopupPost = () => {
    setIsPopupPostOpen(!isPopupPostOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const closePopupPost = () => {
    setIsPopupPostOpen(false);
  };

  return (
<div
      style={{
        position: "fixed",
        bottom: "20px",
        display: "flex",
        justifyContent: "space-between", // Distribuzione spaziale tra i bottoni
        width: "100%", // Occupa l'intera larghezza
        padding: "0 50px", // Aggiungi spazio ai lati
      }}
    >
      {/* Bottone Messenger a sinistra */}
      <Button
        style={{
          backgroundColor: "yellow",
          boxShadow: "0px 0px 5px 0px black",
          color: "black",
          padding: "10px",
          borderRadius: "0.4rem",
          fontSize: "20px",
        }}
        onClick={togglePopup}
      >
        Messenger
        <FontAwesomeIcon
          icon={faCommentDots}
          style={{ marginLeft: "10px" }}
        />
      </Button>

              
      {isPopupOpen && (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999  // Aggiunta di z-index
      }}
    >
          <div
            style={{
              position: "relative",
              width: '1300px',
              borderRadius: "8px",
            }}
          >
            <button
              style={{
                position: "fixed",
                left: "20px",
                backgroundColor: "yellow",
                borderRadius: '0.3rem',
                cursor: "pointer",
                width: '60px',
                height: "50px"

              }}
              onClick={closePopup}
            >
              <FontAwesomeIcon
                icon={faTimes}
                style={{ fontSize: "20px" }}
              />
            </button>
            <MessangerHome />
          </div>
        </div>
      )}

      {/* Bottone per creare un nuovo post a destra */}
        <Button
          style={{
            backgroundColor: "green",
            boxShadow: "0px 0px 5px 0px black",
            color: "white",
            padding: "10px",
            borderRadius: "0.4rem",
            fontSize: "20px",
          }}
          onClick={togglePopupPost} 
        >
          Create Post         <FontAwesomeIcon
          icon={faPenToSquare}
          style={{ marginLeft: "10px" }}
        />
        </Button>


       {isPopupPostOpen && (
        <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          alignItems: "center",
          zIndex: 9999, 
          justifyContent: "center",
        }}
      >
          <div
            style={{
              position: "relative",
              width: '500px',
              borderRadius: "8px",
            }}
          >
            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "-162px",
                backgroundColor: "yellow",
                borderRadius: '0.3rem',
                cursor: "pointer",
                width: '60px',
                height: "50px"

              }}
              onClick={closePopupPost}
            >
              <FontAwesomeIcon
                icon={faTimes}
                style={{ fontSize: "20px" }}
              />
            </button>
            <CreatePost />
          </div>
        </div>
      )}
    </div>
  );
};

export default FixedComponent;
