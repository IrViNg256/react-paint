import React, { useState } from 'react';
import '../css/Celda.css';

function Celda(props) {
  const { colorSeleccionado, mouseDown } = props; /* Asigna los parámetros recibidos desde Fila.js como parámetros */

  const [colorCelda, setColorCelda] = useState("#fff"); /* Estado que indica el color actual de la celda */
  const [colorAnterior, setColorAnterior] = useState(colorCelda); /* Estado que almacena el color anterior de una celda, para cuando se pasa el cursor encima pueda regresar a su original */
  const [puedeCambiar, setPuedeCambiar] = useState(true); /* Estado que bloquea el cambio de color de una celda */

  function handleOver(event) { /* Evento para manejar el dibujo por arrastrado, mediante un evento de pasar el mouse encima de la celda */
    if(mouseDown === true) { /* Si el mouse está presionado entonces se puede cambiar el color de la celda por el seleccionado en la paleta */
      setColorCelda(colorSeleccionado);
      setPuedeCambiar(false); /* Bloquea el cambio de color, este se desbloquea al sacar el cursor de la celda, en la función handleMouseLeave y ayuda a que no se sobreescriban los colores con la vista previa o su anterior al dibujar */
    }
  }

  function handleClick(event) { /* Evento para manejar el dibujo de celda por celda al dar clic */
    setColorCelda(colorSeleccionado);
    setPuedeCambiar(false);
  }

  function handleMouseEnter(event) { /* Evento para dar una vista previa del color seleccionado en la celda que tenga el cursor encima */
    setColorAnterior(colorCelda);
    setColorCelda(colorSeleccionado);
  }

  function handleMouseLeave(event) { /* Evento para revertir la vista previa del color seleccionado */
    if(puedeCambiar) {
      setColorCelda(colorAnterior)
    }
    setPuedeCambiar(true); /* Permitir que los colores de las celda a la que entró puedan seguir cambiando al dejar el mouse después de pintar una celda */
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