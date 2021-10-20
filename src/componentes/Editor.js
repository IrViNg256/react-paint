import React, { useState } from 'react';
import { CirclePicker } from 'react-color';
import Tablero from './Tablero';
import '../css/Editor.css';

function Editor() {
  const [anchoTablero, setAnchoTablero] = useState(16);
  const [altoTablero, setAltoTablero] = useState(16);
  const [ocultarOpciones, setOcultarOpciones] = useState(false);
  const [ocultarTablero, setOcultarTablero] = useState(true);
  const [textoBoton, setTextoBoton] = useState("Empezar a dibujar");
  const [colorSeleccionado, setColorSeleccionado] = useState("#f44336");

  function handleChangeAncho(event) {
    const value = event.target.value;
    setAnchoTablero(value);
  }

  function handleChangeAlto(event) {
    const value = event.target.value;
    setAltoTablero(value);
  }

  function handleClickBoton(event) {
    setOcultarOpciones(!ocultarOpciones);
    setOcultarTablero(!ocultarTablero);
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
      {ocultarTablero && <h2>Ingresa tamaño del tablero</h2>}
      {ocultarTablero && (<div id="opciones">
        <div className="opcion">
          <input
            type="number"
            className="tableroInput"
            defaultValue={anchoTablero}
            onChange={handleChangeAncho}
          />
          <span>Ancho</span>
        </div>

        <div className="opcion">
          <input
            type="number"
            className="tableroInput"
            defaultValue={altoTablero}
            onChange={handleChangeAlto}
          />
          <span>Alto</span>
        </div>
      </div>)}

      <button className="boton" onClick={handleClickBoton}>{textoBoton}</button>

      {ocultarOpciones && <CirclePicker
        color={colorSeleccionado}
        onChangeComplete={handleChangeColor}
      />}

      {ocultarOpciones && <Tablero 
        ancho={anchoTablero}
        alto={altoTablero}
        colorSeleccionado={colorSeleccionado}
      />}
    </div>
  );
}

export default Editor;