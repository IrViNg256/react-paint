import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import Tablero from './Tablero';
import '../css/Editor.css';

function Editor() {
  const [mostrarTablero, setMostrarTablero] = useState(false);
  const [textoBoton, setTextoBoton] = useState("Empezar a dibujar");
  const [colorSeleccionado, setColorSeleccionado] = useState("#d0021b");
  const [mouseDown, setMouseDown] = useState(false);

  const sizeTablero = 16;

  document.body.onmousedown = function() {
    setMouseDown(true);
  }

  document.body.onmouseup = function() {
    setMouseDown(false);
  }

  function handleClickBoton(event) {
    setMostrarTablero(!mostrarTablero);
    if(textoBoton === "Empezar a dibujar") {
      setTextoBoton("Reiniciar");
    } else {
      setTextoBoton("Empezar a dibujar");
    }
  }

  function handleChangeColor(event) {
    setColorSeleccionado(event.hex);
  }

  return (
    <div id="editor">
      <h1>React Paint</h1>

      <button className="boton" onClick={handleClickBoton}>{textoBoton}</button>

      {mostrarTablero && <SketchPicker
        color={colorSeleccionado}
        onChangeComplete={handleChangeColor}
      />}

      <p></p>

      {mostrarTablero && <Tablero 
        ancho={sizeTablero}
        alto={sizeTablero}
        colorSeleccionado={colorSeleccionado}
        mouseDown={mouseDown}
      />}
    </div>
  );
}

export default Editor;