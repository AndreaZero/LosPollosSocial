import React, { useState } from "react";
import { Button } from "@mui/material";
import MessangerHome from "./views/MessangerHome"; // Assicurati che l'import sia corretto
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faPenToSquare, faTimes } from "@fortawesome/free-solid-svg-icons"; // Importa l'icona di chiusura
import { Link } from "react-router-dom"; // Importa il componente Link

const FixedComponent = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
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

      {/* Bottone per creare un nuovo post a destra */}
      <Link to="/posts/create" style={{ textDecoration: "none" }}>
        <Button
          style={{
            backgroundColor: "green",
            boxShadow: "0px 0px 5px 0px black",
            color: "white",
            padding: "10px",
            borderRadius: "0.4rem",
            fontSize: "20px",
          }}
        >
          Create Post         <FontAwesomeIcon
          icon={faPenToSquare}
          style={{ marginLeft: "10px" }}
        />
        </Button>
      </Link>
      {isPopupOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
                position: "absolute",
                top: "10px",
                right: "-162px",
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
    </div>
  );
};

export default FixedComponent;
