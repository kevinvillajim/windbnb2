import {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Card from "./Card";
import Nav from "./Nav";
import "./App.css";

function App() {
  // La variable data es la que va a almacenar los datos de "stays.json" y setData nos ayudará a guardar esos datos en esa variable. 
  // Es necesario que inicialicemos esa variable como un array vacío para evitar errores.
 
  const [data, setData] = useState([]);
 
  // Variables para visibilidad del Modal
 
  const [show, setShow] = useState(false);
 
  // Variables para selección de lugar
 
  const [selectedPlace, setSelectedPlace] = useState("Finland");
  const handlePlaceSelection = (place) => {setSelectedPlace(place)};
 
  // Variables para selección de huepedes
 
  const [adultHost,setAdultHost] = useState(0)
  const [childHost, setChildHost] = useState(0)
  const [generalCounter, setGeneralCounter] = useState(0)

  //Funciones de incremento y decremento en Nav div huespedes

  const handleIncrement = (counter, setCounter, setGeneralCounter) => {
    setCounter(counter + 1)
    setGeneralCounter(generalCounter + 1)
  }

  const handleDecrement = (counter, setCounter, setGeneralCounter) => {
    // Condicional para no contar menos que 0
    if (counter > 0){
    setCounter(counter - 1)
    setGeneralCounter(generalCounter - 1)
    }
  }

  //variable para contar la selección de cartas disponibles (stays)

  const [filteredCardCount, setFilteredCardCount] = useState(14);

  // Función para traer los datos de "stays.json".
  const getData = async () => {
  
    // Esta sentencia try-catch sirve para manejar los errores que se podrían generar al importar los datos de "stays.json".
  
    try {
      const res = await fetch("stays.json");
      const resJson = await res.json();
  
      // Aquí guardamos los datos de "stays.json" en la variable data.
      // También inicializa la data filtrada para cuando recargue la pagina muestre todos los <Card/> disponibles
  
      setData(resJson);
      setFilteredData(resJson);
    } catch (error) {
      console.log(error);
    }
  };

  // Este Hook te va a ejecutar la función getData cada vez que la página se renderice.
  
  useEffect(() => {
     getData();
  }, []);

  // Variable para filtro de busqueda

  const [filteredData, setFilteredData] = useState(data);

  // Variable mostrar, ocultar lugares y huespedes en Nav

  const [displaySection, setDisplaySection] = useState('places');

  //Función para filtrar la busqueda según los campos seleccionados por el usuario

  const handleSearch = () => {
    let filteredResults = data;

  //condicionales si estan vacios los campos de busqueda desplieguen todos los elementos

    if (selectedPlace !== "Finland"){
      filteredResults = filteredResults.filter(item => item.city === selectedPlace);
    }

    if (generalCounter > 0) {
      filteredResults = filteredResults.filter(item => item.maxGuests >= generalCounter);
    }

    //Actualizar los datos filtrados

    setFilteredData(filteredResults)
    setFilteredCardCount(filteredResults.length)
  }

  return (
    <>
      <Nav show={show} setShow={setShow} data={data} selectedPlace={selectedPlace} handlePlaceSelection={handlePlaceSelection} adultHost={adultHost} setAdultHost={setAdultHost}
      childHost={childHost} setChildHost={setChildHost} generalCounter={generalCounter} setGeneralCounter={setGeneralCounter} handleIncrement={handleIncrement} handleDecrement={handleDecrement}
      filteredData={filteredData} setFilteredData={setFilteredData} handleSearch={handleSearch} displaySection={displaySection} setDisplaySection={setDisplaySection}/>
      <div id="total-container" className="total-container">
        <header id="header" className="d-flex justify-content-between mb-5">
          <div id="logo" className="logo">
          <svg width="126.32" height="25" viewBox="0 0 96 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39.082 10.188L36.968 18H34.322L33.09 12.932L31.816 18H29.184L27.056 10.188H29.45L30.556 15.774L31.872 10.188H34.406L35.736 15.746L36.828 10.188H39.082ZM41.199 9.376C40.779 9.376 40.4336 9.25467 40.163 9.012C39.9016 8.76 39.771 8.452 39.771 8.088C39.771 7.71467 39.9016 7.40667 40.163 7.164C40.4336 6.912 40.779 6.786 41.199 6.786C41.6096 6.786 41.9456 6.912 42.207 7.164C42.4776 7.40667 42.613 7.71467 42.613 8.088C42.613 8.452 42.4776 8.76 42.207 9.012C41.9456 9.25467 41.6096 9.376 41.199 9.376ZM42.389 10.188V18H39.995V10.188H42.389ZM48.8839 10.104C49.7985 10.104 50.5265 10.4027 51.0679 11C51.6185 11.588 51.8939 12.4 51.8939 13.436V18H49.5139V13.758C49.5139 13.2353 49.3785 12.8293 49.1079 12.54C48.8372 12.2507 48.4732 12.106 48.0159 12.106C47.5585 12.106 47.1945 12.2507 46.9239 12.54C46.6532 12.8293 46.5179 13.2353 46.5179 13.758V18H44.1239V10.188H46.5179V11.224C46.7605 10.8787 47.0872 10.608 47.4979 10.412C47.9085 10.2067 48.3705 10.104 48.8839 10.104ZM53.0815 14.08C53.0815 13.2773 53.2308 12.5727 53.5295 11.966C53.8375 11.3593 54.2528 10.8927 54.7755 10.566C55.2981 10.2393 55.8815 10.076 56.5255 10.076C57.0388 10.076 57.5055 10.1833 57.9255 10.398C58.3548 10.6127 58.6908 10.902 58.9335 11.266V7.64H61.3275V18H58.9335V16.88C58.7095 17.2533 58.3875 17.552 57.9675 17.776C57.5568 18 57.0761 18.112 56.5255 18.112C55.8815 18.112 55.2981 17.9487 54.7755 17.622C54.2528 17.286 53.8375 16.8147 53.5295 16.208C53.2308 15.592 53.0815 14.8827 53.0815 14.08ZM58.9335 14.094C58.9335 13.4967 58.7655 13.0253 58.4295 12.68C58.1028 12.3347 57.7015 12.162 57.2255 12.162C56.7495 12.162 56.3435 12.3347 56.0075 12.68C55.6808 13.016 55.5175 13.4827 55.5175 14.08C55.5175 14.6773 55.6808 15.1533 56.0075 15.508C56.3435 15.8533 56.7495 16.026 57.2255 16.026C57.7015 16.026 58.1028 15.8533 58.4295 15.508C58.7655 15.1627 58.9335 14.6913 58.9335 14.094ZM65.4534 11.294C65.6774 10.93 65.9994 10.636 66.4194 10.412C66.8394 10.188 67.3201 10.076 67.8614 10.076C68.5054 10.076 69.0887 10.2393 69.6114 10.566C70.1341 10.8927 70.5447 11.3593 70.8434 11.966C71.1514 12.5727 71.3054 13.2773 71.3054 14.08C71.3054 14.8827 71.1514 15.592 70.8434 16.208C70.5447 16.8147 70.1341 17.286 69.6114 17.622C69.0887 17.9487 68.5054 18.112 67.8614 18.112C67.3107 18.112 66.8301 18.0047 66.4194 17.79C66.0087 17.566 65.6867 17.272 65.4534 16.908V18H63.0594V7.64H65.4534V11.294ZM68.8694 14.08C68.8694 13.4827 68.7014 13.016 68.3654 12.68C68.0387 12.3347 67.6327 12.162 67.1474 12.162C66.6714 12.162 66.2654 12.3347 65.9294 12.68C65.6027 13.0253 65.4394 13.4967 65.4394 14.094C65.4394 14.6913 65.6027 15.1627 65.9294 15.508C66.2654 15.8533 66.6714 16.026 67.1474 16.026C67.6234 16.026 68.0294 15.8533 68.3654 15.508C68.7014 15.1533 68.8694 14.6773 68.8694 14.08ZM77.3214 10.104C78.236 10.104 78.964 10.4027 79.5054 11C80.056 11.588 80.3314 12.4 80.3314 13.436V18H77.9514V13.758C77.9514 13.2353 77.816 12.8293 77.5454 12.54C77.2747 12.2507 76.9107 12.106 76.4534 12.106C75.996 12.106 75.632 12.2507 75.3614 12.54C75.0907 12.8293 74.9554 13.2353 74.9554 13.758V18H72.5614V10.188H74.9554V11.224C75.198 10.8787 75.5247 10.608 75.9354 10.412C76.346 10.2067 76.808 10.104 77.3214 10.104ZM84.389 11.294C84.613 10.93 84.935 10.636 85.355 10.412C85.775 10.188 86.2556 10.076 86.797 10.076C87.441 10.076 88.0243 10.2393 88.547 10.566C89.0696 10.8927 89.4803 11.3593 89.779 11.966C90.087 12.5727 90.241 13.2773 90.241 14.08C90.241 14.8827 90.087 15.592 89.779 16.208C89.4803 16.8147 89.0696 17.286 88.547 17.622C88.0243 17.9487 87.441 18.112 86.797 18.112C86.2463 18.112 85.7656 18.0047 85.355 17.79C84.9443 17.566 84.6223 17.272 84.389 16.908V18H81.995V7.64H84.389V11.294ZM87.805 14.08C87.805 13.4827 87.637 13.016 87.301 12.68C86.9743 12.3347 86.5683 12.162 86.083 12.162C85.607 12.162 85.201 12.3347 84.865 12.68C84.5383 13.0253 84.375 13.4967 84.375 14.094C84.375 14.6913 84.5383 15.1627 84.865 15.508C85.201 15.8533 85.607 16.026 86.083 16.026C86.559 16.026 86.965 15.8533 87.301 15.508C87.637 15.1533 87.805 14.6773 87.805 14.08Z" fill="#EB5757"/>
            <path d="M8.22724 4.5C9.38194 2.5 12.2687 2.5 13.4234 4.5L19.0526 14.25C20.2073 16.25 18.7639 18.75 16.4545 18.75H5.19615C2.88675 18.75 1.44338 16.25 2.59808 14.25L8.22724 4.5Z" fill="#EB5757"/>
          </svg>
          </div>
          <div id="searchContainer" className="btn-group" role="group" aria-label="Search">
            {/* Botones que al dar click realizan 2 funciones, despliegan el modal para realizar busqueda y seleccionan la seccion que desea desplegarse según la
            selección, aparte tiene una condicional ternaria para que si está vacio (valor inicial) solo muestre el pais, si es un valor diferente que muestre el 
            pais Finlandia despues de la ciudad seleccionada*/}
            <Button id="city" variant="btn btn-outline-secondary buttons-header" onClick={() => {setShow(true); setDisplaySection('places');}}><div className="norml">{selectedPlace}{selectedPlace === "Finland" ? "" : ", Finland" }</div></Button>
            <Button id="hosts" variant="btn btn-outline-secondary buttons-header" onClick={() => {setShow(true); setDisplaySection('guests');}}>{generalCounter === 0 ? <span className="norml guest">Add guests</span> : <span className="norml">{generalCounter === 1 ? `${generalCounter} Guest` : `${generalCounter} Guests`}</span>}</Button>
            {/* Boton de busqueda, realiza la función sin que el modal esté desplegado */}
            <Button id="srch" variant="btn btn-outline-secondary buttons-header" onClick={() => {handleSearch()}}><span className="material-symbols-outlined search-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" color=""><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" fill="#EB5757"/></svg></span></Button>
          </div>
        </header>
        <div id="titleContainer" className="title">
            <span className="titulo">Stays in Finland</span>
            <span className="stays">{filteredCardCount > 12 ? "12+" : filteredCardCount} stays</span>
        </div>
        <div id="body-container" className="body-container">
          <div id="cards-container" className="cards-container d-flex flex-wrap justify-content-start">
            {/* Función map que renderiza los elementos <Card/>*/}
            {filteredData.map((el, i) => {
              return <Card key={i} superHost={el.superHost} content={el.title} rating={el.rating} type={el.type} beds={el.beds} photo={el.photo}/>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;


// const Card = React.memo(function Card(props) {

//   const { superHost, content, rating, type, beds, photo } = props;
//   return (
//     <>
//       <div id="cards" className="cards">
//         <div id="img-container" className="img-container">
//           <img id="img-host" className="img-host img-fluid" src={photo}></img>
//         </div>
//         {/* Operaciones ternarias que permiten renderizar si es "SuperHost", y camas disponibles, en el caso de no tener, no renderiza*/}
//         <div id="info-card" className="info-card d-flex justify-content-between mt-3">
//           {superHost === true ? <button id="super-host" className="super-host"><strong className="but-text">SUPER HOST</strong></button> : ""}
//           {beds !== null ? <span id="title-card" className="title-card">{type}. {beds} beds</span> : <span id="title-card" className="title-card">{type}</span>}
//           <div id="stars" className="stars">
//             <span className="material-symbols-outlined icon">star</span>
//             <span className="estrellas">
//             {rating}
//             </span>
//           </div>
//         </div>
//         <div id="content-card" className="content-card">
//           <span>
//           {content}
//           </span>
//         </div>
//       </div>
//     </>
//   )
// })

// Card.propTypes = {
//   superHost: PropTypes.bool.isRequired,
//   content: PropTypes.string.isRequired,
//   rating: PropTypes.number.isRequired,
//   type: PropTypes.string.isRequired,
//   beds: PropTypes.number,
//   photo: PropTypes.string.isRequired,
// };

// Nav

//   function Nav({show, setShow, data, selectedPlace, handlePlaceSelection, adultHost, setAdultHost, childHost, setChildHost, generalCounter, setGeneralCounter,
//   handleIncrement, handleDecrement, handleSearch, displaySection, setDisplaySection}){
   
//     //Función para filtrar y mostrar las ciudades disponibles sin repetir
   
//     const resultPlaces = {}
//     const places = data.filter(e => {
//       if (!resultPlaces[e.city]) { 
//         resultPlaces[e.city] = true
//         return true 
//       }
//       return false
//     }).map(e => e.city)

//    return(
//      <>
//         {/* Para este modal se utiliza ReactBotstrap */}
//         <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-90w" aria-labelledby="modal-search-filter">
//           <Modal.Header closeButton/>
//             {/* Botones que permiten desplegar la información según se seleccione, a saber, Lugares y Huespedes, por medio de ternarias se agrega la seleccion en las clases
//             como también muestra solo la interfaz de lugares o de huespedes.
//             Por medio de ternaria se muestra "Guest" cuando es 1 y "Guests" si es mayor a 1, también si es 0 se muestre "Add guests"*/}
//             <div id="modalButtonsContainer" className="btn-group group-modal w-100 d-flex" role="group" aria-label="Search">
//               <button type="button" id="btn4" className={`btn btn-outline-secondary buttons-header text-start flex-fill ${displaySection === 'places' ? 'active' : ''}`} onClick={() => setDisplaySection('places')}><span className="tinny">LOCATION</span><div className="norml" id="selectedPlace">{selectedPlace}{selectedPlace === "Finland" ? "" : ", Finland" }</div></button>
//               <button type="button" id="btn5" className={`btn btn-outline-secondary buttons-header text-start flex-fill ${displaySection === 'guests' ? 'active' : ''}`} onClick={() => setDisplaySection('guests')}><span className="tinny">{generalCounter == 1? "GUEST" : "GUESTS"}</span><div id="selectedNumHosts">{generalCounter === 0 ? <span className="guest">Add guests</span> : generalCounter}</div></button>
//               <button type="button" id="btn6" className="btn btn-outline-secondary buttons-header flex-fill" onClick={() => {handleSearch(); setShow(false);}}>
//                 <span className="material-symbols-outlined search-icon">
//                   <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" color="">
//                     <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" fill="#ffff"/>
//                   </svg>
//                 </span> 
//                 Search
//               </button>
//             </div>
//             {/* Por medio de ternarias muestra o esconde el contenido según el botón seleccionado, tambipen por medio de una funcion map sesplega todas las ciudades disponibles
//             guardadas en places para poser seleccionarlas */}
//             <div id="container-places" className="d-flex justify-content-between">
//               <div id="places" className={`flex-fill ${displaySection === 'places' ? 'visible' : 'invisible'}`}>
//                 {places.map((f, index) => {
//                   return <button type="button" key={index} className="btn btn-light d-flex flex-column m-2 p-2 places" onClick={() => handlePlaceSelection(f)}><div><span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></span><span className="norml">{f}, Finland</span></div></button>
//                 })}
//               </div>
//               {/* Contadores de Adultos y Niños */}
//               <div id="container-guests" className={`flex-fill ${displaySection === 'guests' ? 'visible' : 'invisible'}`}>
//                 <div id="guests-container-adults" className="mt-4 mb-4">
//                   <div><span className="norml1">Adults</span></div>
//                   <div><span className="guest">Ages 13 or abobe</span></div>
//                   <div className="d-flex align-items-center">
//                     <button type="button" id="rest1" className="btnTinny d-flex align-items-center justify-content-center me-2" onClick={() => handleDecrement(adultHost, setAdultHost, setGeneralCounter)}>-</button>
//                     <span className="norml">{adultHost}</span>
//                     <button type="button" id="add1" className="btnTinny d-flex align-items-center justify-content-center ms-2" onClick={() => handleIncrement(adultHost, setAdultHost, setGeneralCounter)}>+</button>
//                   </div>
//                 </div>
//                 <div id="guests-container-children" className="mt-4 mb-4">
//                   <div><span className="norml1">Children</span></div>
//                   <div><span className="guest">Ages 2-12 </span></div>
//                   <div className="d-flex align-items-center">
//                     <button type="button" id="rest2" className="btnTinny d-flex align-items-center justify-content-center me-2" onClick={() => handleDecrement(childHost, setChildHost, setGeneralCounter)}>-</button>
//                     <span className="norml">{childHost}</span>
//                     <button type="button" id="add2" className="btnTinny d-flex align-items-center justify-content-center ms-2" onClick={() => handleIncrement(childHost, setChildHost, setGeneralCounter)}>+</button>
//                   </div>
//                 </div>
//               </div>
//               <div className="vacum flex-fill">   
//               </div>
//             </div>
//             <button type="button" id="btn7" onClick={() => {handleSearch(); setShow(false);}}><span className="material-symbols-outlined search-icon norml">
//                   <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" color="">
//                     <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" fill="#ffff"/>
//                   </svg>
//                 </span> Search</button>

//         </Modal>
//      </>
//   )}

// Nav.propTypes = {
//   show: PropTypes.bool.isRequired,
//   setShow: PropTypes.func.isRequired,
//   data: PropTypes.arrayOf(PropTypes.shape({ city: PropTypes.string.isRequired, })).isRequired,
//   selectedPlace: PropTypes.string.isRequired,
//   handlePlaceSelection: PropTypes.func.isRequired,
//   adultHost: PropTypes.number.isRequired,
//   setAdultHost: PropTypes.func.isRequired,
//   childHost: PropTypes.number.isRequired,
//   setChildHost: PropTypes.func.isRequired,
//   generalCounter: PropTypes.number.isRequired,
//   setGeneralCounter: PropTypes.func.isRequired,
//   handleIncrement: PropTypes.func.isRequired,
//   handleDecrement: PropTypes.func.isRequired,
//   handleSearch: PropTypes.func.isRequired,
//   displaySection: PropTypes.string.isRequired,
//   setDisplaySection: PropTypes.func.isRequired,
// }