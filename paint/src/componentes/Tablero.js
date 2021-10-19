import React, { useRef } from 'react';
import Fila from './Fila';
import { exportComponentAsPNG } from 'react-component-export-image';
import '../css/Tablero.css';

function Tablero(props) {
  const { ancho, alto, colorSeleccionado } = props;
  let filas = [];
  const tableroRef = useRef();

  for(let i = 0; i < alto; i++) {
    filas.push(
      <Fila
        key={i}
        ancho={ancho}
        colorSeleccionado={colorSeleccionado}
      />
    );
  }

  function handleClick(event) {
    exportComponentAsPNG(tableroRef);
  }

  return (
    <div id="tablero">
      <div id="celdas" ref={tableroRef}>
        {filas}
      </div>
      
      <button className="boton" onClick={handleClick}>Imprimir imagen</button>
    </div>
  );
}

export default Tablero;