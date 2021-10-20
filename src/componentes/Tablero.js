import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import Fila from './Fila';
import '../css/Tablero.css';

function Tablero(props) {
  const { ancho, alto, colorSeleccionado, mouseDown } = props;
  let filas = [];
  const tableroRef = useRef();
  const printRef = useRef();

  for(let i = 0; i < alto; i++) {
    filas.push(
      <Fila
        key={i}
        ancho={ancho}
        colorSeleccionado={colorSeleccionado}
        mouseDown={mouseDown}
      />
    );
  }

  function handlePrint(event) {
    printRef.current.innerHTML = '';
    html2canvas(tableroRef.current).then(function(canvas) {
        printRef.current.appendChild(canvas);
      });
  }

  return (
    <div id="tablero">
      <div id="celdas" ref={tableroRef}>
        {filas}
      </div>
      <button className="boton" onClick={handlePrint}>Imprimir imagen</button>
      <div ref={printRef}>
    
      </div>
    </div>
  );
}

export default Tablero;