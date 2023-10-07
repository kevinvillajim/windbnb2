import PropTypes from "prop-types";
import Modal from 'react-bootstrap/Modal';

function Nav({show, setShow, data, selectedPlace, handlePlaceSelection, adultHost, setAdultHost, childHost, setChildHost, generalCounter, setGeneralCounter,
    handleIncrement, handleDecrement, handleSearch, displaySection, setDisplaySection}){
     
      //Función para filtrar y mostrar las ciudades disponibles sin repetir
     
      const resultPlaces = {}
      const places = data.filter(e => {
        if (!resultPlaces[e.city]) { 
          resultPlaces[e.city] = true
          return true 
        }
        return false
      }).map(e => e.city)
  
     return(
       <>
          {/* Para este modal se utiliza ReactBotstrap */}
          <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-90w" aria-labelledby="modal-search-filter">
            <Modal.Header closeButton/>
              {/* Botones que permiten desplegar la información según se seleccione, a saber, Lugares y Huespedes, por medio de ternarias se agrega la seleccion en las clases
              como también muestra solo la interfaz de lugares o de huespedes.
              Por medio de ternaria se muestra "Guest" cuando es 1 y "Guests" si es mayor a 1, también si es 0 se muestre "Add guests"*/}
              <div id="modalButtonsContainer" className="btn-group group-modal w-100 d-flex" role="group" aria-label="Search">
                <button type="button" id="btn4" className={`btn btn-outline-secondary buttons-header text-start flex-fill ${displaySection === 'places' ? 'active' : ''}`} onClick={() => setDisplaySection('places')}><span className="tinny">LOCATION</span><div className="norml" id="selectedPlace">{selectedPlace}{selectedPlace === "Finland" ? "" : ", Finland" }</div></button>
                <button type="button" id="btn5" className={`btn btn-outline-secondary buttons-header text-start flex-fill ${displaySection === 'guests' ? 'active' : ''}`} onClick={() => setDisplaySection('guests')}><span className="tinny">{generalCounter == 1? "GUEST" : "GUESTS"}</span><div id="selectedNumHosts">{generalCounter === 0 ? <span className="guest">Add guests</span> : generalCounter}</div></button>
                <button type="button" id="btn6" className="btn btn-outline-secondary buttons-header flex-fill" onClick={() => {handleSearch(); setShow(false);}}>
                  <span className="material-symbols-outlined search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" color="">
                      <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" fill="#ffff"/>
                    </svg>
                  </span> 
                  Search
                </button>
              </div>
              {/* Por medio de ternarias muestra o esconde el contenido según el botón seleccionado, tambipen por medio de una funcion map sesplega todas las ciudades disponibles
              guardadas en places para poser seleccionarlas */}
              <div id="container-places" className="d-flex justify-content-between">
                <div id="places" className={`flex-fill ${displaySection === 'places' ? 'visible' : 'invisible'}`}>
                  {places.map((f, index) => {
                    return <button type="button" key={index} className="btn btn-light d-flex flex-column m-2 p-2 places" onClick={() => handlePlaceSelection(f)}><div><span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></span><span className="norml">{f}, Finland</span></div></button>
                  })}
                </div>
                {/* Contadores de Adultos y Niños */}
                <div id="container-guests" className={`flex-fill ${displaySection === 'guests' ? 'visible' : 'invisible'}`}>
                  <div id="guests-container-adults" className="mt-4 mb-4">
                    <div><span className="norml1">Adults</span></div>
                    <div><span className="guest">Ages 13 or abobe</span></div>
                    <div className="d-flex align-items-center">
                      <button type="button" id="rest1" className="btnTinny d-flex align-items-center justify-content-center me-2" onClick={() => handleDecrement(adultHost, setAdultHost, setGeneralCounter)}>-</button>
                      <span className="norml">{adultHost}</span>
                      <button type="button" id="add1" className="btnTinny d-flex align-items-center justify-content-center ms-2" onClick={() => handleIncrement(adultHost, setAdultHost, setGeneralCounter)}>+</button>
                    </div>
                  </div>
                  <div id="guests-container-children" className="mt-4 mb-4">
                    <div><span className="norml1">Children</span></div>
                    <div><span className="guest">Ages 2-12 </span></div>
                    <div className="d-flex align-items-center">
                      <button type="button" id="rest2" className="btnTinny d-flex align-items-center justify-content-center me-2" onClick={() => handleDecrement(childHost, setChildHost, setGeneralCounter)}>-</button>
                      <span className="norml">{childHost}</span>
                      <button type="button" id="add2" className="btnTinny d-flex align-items-center justify-content-center ms-2" onClick={() => handleIncrement(childHost, setChildHost, setGeneralCounter)}>+</button>
                    </div>
                  </div>
                </div>
                <div className="vacum flex-fill">   
                </div>
              </div>
              <button type="button" id="btn7" onClick={() => {handleSearch(); setShow(false);}}><span className="material-symbols-outlined search-icon norml">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" color="">
                      <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" fill="#ffff"/>
                    </svg>
                  </span> Search</button>
  
          </Modal>
       </>
    )}
  
   
  Nav.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({ city: PropTypes.string.isRequired, })).isRequired,
    selectedPlace: PropTypes.string.isRequired,
    handlePlaceSelection: PropTypes.func.isRequired,
    adultHost: PropTypes.number.isRequired,
    setAdultHost: PropTypes.func.isRequired,
    childHost: PropTypes.number.isRequired,
    setChildHost: PropTypes.func.isRequired,
    generalCounter: PropTypes.number.isRequired,
    setGeneralCounter: PropTypes.func.isRequired,
    handleIncrement: PropTypes.func.isRequired,
    handleDecrement: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    displaySection: PropTypes.string.isRequired,
    setDisplaySection: PropTypes.func.isRequired,
  }

  export default Nav