import React, { useState } from 'react';
import '../css/Celda.css';

function Celda(props) {
  const { colorSeleccionado } = props;

  const [colorCelda, setColorCelda] = useState("#fff");
  const [colorAnterior, setColorAnterior] = useState(colorCelda);
  const [puedeCambiar, setPuedeCambiar] = useState(true);

  function handleClick(event) {
    setColorCelda(colorSeleccionado);
    setPuedeCambiar(false);
  }

  function handleMouseEnter(event) {
    setColorAnterior(colorCelda);
    setColorCelda(colorSeleccionado);
  }

  function handleMouseLeave(event) {
    if(puedeCambiar) {
      setColorCelda(colorAnterior)
    }
    setPuedeCambiar(true);
  }

  return (
    <div
      className="celda"
      style={{backgroundColor: colorCelda}}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
    </div>
  );
}

export default Celda;