import React, { useState } from 'react';
import '../css/Celda.css';

function Celda(props) {
  const { colorSeleccionado, mouseDown } = props;

  const [colorCelda, setColorCelda] = useState("#fff");
  const [colorAnterior, setColorAnterior] = useState(colorCelda);
  const [puedeCambiar, setPuedeCambiar] = useState(true);

  function handleOver(event) {
    if(mouseDown === true) {
      setColorCelda(colorSeleccionado);
      setPuedeCambiar(false);
    }
  }

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
      onMouseOver={handleOver}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
    </div>
  );
}

export default Celda;