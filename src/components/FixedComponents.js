import React, { useState } from "react";
import { Button } from "@mui/material";
import MessangerHome from "./views/MessangerHome"; // Assicurati che l'import sia corretto
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faTimes } from "@fortawesome/free-solid-svg-icons"; // Importa l'icona di chiusura

const FixedComponent = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px"}}>
      <Button
        style={{
          backgroundColor: "yellow",
          color: "black",
          padding: "10px",
          borderRadius: "0.4rem",
          fontSize: "20px",
        }}
        onClick={togglePopup}
      >
        Apri Messenger
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
