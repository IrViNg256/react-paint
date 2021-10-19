import React from 'react';
import Celda from './Celda'
import '../css/Fila.css';

function Fila(props) {
  const { ancho, colorSeleccionado } = props;
  let celdas = [];

  for(let i = 0; i < ancho; i++) {
    celdas.push(
      <Celda
        key={i}
        colorSeleccionado={colorSeleccionado}
      />
    );
  }

  return (
    <div className="fila">
      {celdas} 
    </div>
  );
}

export default Fila;