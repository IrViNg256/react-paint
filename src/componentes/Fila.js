import React from 'react';
import Celda from './Celda'
import '../css/Fila.css';

function Fila(props) {
  const { ancho, colorSeleccionado, mouseDown } = props; /* Recibe los parámetros pasados en Tablero.js y los agrega como props */
  let celdas = []; /* Crea un arreglo de celdas vacío */

  for(let i = 0; i < ancho; i++) { /* Ciclo para llenar el arreglo con los componentes celdas basados en el ancho */
    celdas.push(
      <Celda
        key={i} /* Clave para no perder el orden en caso de cambio */
        colorSeleccionado={colorSeleccionado} /* Pasa como parámetro el colorSeleccionado recibido desde Tablero.js */
        mouseDown={mouseDown} /* Pasa como parámetro si el mouse está presionado, recibido desde Tablero.js */
      />
    );
  }

  return (
    <div className="fila"> {/* Div del componente fila donde se estarán los componentes celdas generados en el ciclo */}
      {celdas} 
    </div>
  );
}

export default Fila;