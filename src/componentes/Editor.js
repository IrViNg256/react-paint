import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import Tablero from './Tablero';
import '../css/Editor.css';

function Editor() {
  const [mostrarTablero, setMostrarTablero] = useState(false); /* Estado para mostar ocultar el tablero de dibujo */
  const [textoBoton, setTextoBoton] = useState("Empezar a dibujar"); /* Estado para cambiar el texto del botón entre empezar a dibujar y reiniciar */
  const [colorSeleccionado, setColorSeleccionado] = useState("#d0021b");  /* Estado para el color seleccionado en la paleta */
  const [mouseDown, setMouseDown] = useState(false); /* Estado bandera para saber cuando el mouse esté presionado */

  const sizeTablero = 16; /* Tamaño del tablero NxN */

  document.body.onmousedown = function() { /* Función para cuando el mouse esté presionado, cambia el estado bandera a true */
    setMouseDown(true);
  }

  document.body.onmouseup = function() { /* Función para cuando el mouse no esté presionado, cambia el estado bandera a false */
    setMouseDown(false);
  }

  function handleClickBoton(event) { /* Evento para el botón de empezar a dibujar y reiniciar, niega el estado de mostrarTablero y cambia el texto por su opuesto */
    setMostrarTablero(!mostrarTablero);
    if(textoBoton === "Empezar a dibujar") {
      setTextoBoton("Reiniciar");
    } else {
      setTextoBoton("Empezar a dibujar");
    }
  }

  function handleChangeColor(event) { /* Evento para cambiar el color en colorSeleccionado por el que se haya elegido de la paleta */
    setColorSeleccionado(event.hex);
  }

  return (
    <div id="editor">
      <h1>React Paint</h1>

      <button className="boton" onClick={handleClickBoton}>{textoBoton}</button> {/* Botón para mostrar el tablero a partir del estado mostrarTablero */}

      {mostrarTablero && <SketchPicker /* Oculta el selector dependiendo del estado, selector del paquete react-color que recibe el colorSeleccionado y tiene un evento en caso de cambio */
        color={colorSeleccionado}
        onChangeComplete={handleChangeColor}
      />}

      <p></p>

      {mostrarTablero && <Tablero /* Oculta el tablero de dibujo dependiendo del estado, el tablero recibe el tamaño en ancho alto, el color seleccionado y si el mouse está presionado como parámetros */
        ancho={sizeTablero}
        alto={sizeTablero}
        colorSeleccionado={colorSeleccionado}
        mouseDown={mouseDown}
      />}
    </div>
  );
}

export default Editor;