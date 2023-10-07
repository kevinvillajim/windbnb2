import React from "react";
import PropTypes from "prop-types";

const Card = React.memo(function Card(props) {

    const { superHost, content, rating, type, beds, photo } = props;
    return (
      <>
        <div id="cards" className="cards">
          <div id="img-container" className="img-container">
            <img id="img-host" className="img-host img-fluid" src={photo}></img>
          </div>
          {/* Operaciones ternarias que permiten renderizar si es "SuperHost", y camas disponibles, en el caso de no tener, no renderiza*/}
          <div id="info-card" className="info-card d-flex justify-content-between mt-3">
            {superHost === true ? <button id="super-host" className="super-host"><strong className="but-text">SUPER HOST</strong></button> : ""}
            {beds !== null ? <span id="title-card" className="title-card">{type}. {beds} beds</span> : <span id="title-card" className="title-card">{type}</span>}
            <div id="stars" className="stars">
              <span className="material-symbols-outlined icon">star</span>
              <span className="estrellas">
              {rating}
              </span>
            </div>
          </div>
          <div id="content-card" className="content-card">
            <span>
            {content}
            </span>
          </div>
        </div>
      </>
    )
  })
  
  Card.propTypes = {
    superHost: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    beds: PropTypes.number,
    photo: PropTypes.string.isRequired,
  };

  export default Card