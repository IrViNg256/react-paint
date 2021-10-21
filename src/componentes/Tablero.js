import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import Fila from './Fila';
import '../css/Tablero.css';

function Tablero(props) {
  const { ancho, alto, colorSeleccionado, mouseDown } = props; /* Asigna los parámetros recibidos desde Evento.js como props */
  let filas = []; /* Se crea un arreglo vacío de filas */
  const tableroRef = useRef(); /* Referencia al tablero de dibujo */
  const printRef = useRef(); /* Referencia al espacio para imprimir */

  for(let i = 0; i < alto; i++) { /* Ciclo donde al arreglo de filas se le van insertando nuevas filas basadas en el alto recibido desde Evento.js */
    filas.push(
      <Fila
        key={i} /* Clave para no perder la fila si el arreglo cambia */
        ancho={ancho} /* Pasa como parámetro el ancho recibido en Event.js */
        colorSeleccionado={colorSeleccionado}  /* Pasa como parámetro el color seleccionado recibido en Event.js */
        mouseDown={mouseDown} /* Pasa como parámetro si el mouse está presionado desde Event.js */
      />
    );
  }

  function handlePrint(event) { /* Función para controlar la impresión usando html2canvas */
    printRef.current.innerHTML = ''; /* Vacía el div para la impresión */
    html2canvas(tableroRef.current).then(function(canvas) { /* Primero indica lo que se quiere imprimir, una vez que se haya generado el canvas del componente impreso, se agrega al div del área de impresión */
        printRef.current.appendChild(canvas);
      });
  }

  return (
    <div id="tablero">
      <div id="celdas" ref={tableroRef}> {/* Div del tablero de dibujo, en este se agregan todas las filas generadas en el ciclo */}
        {filas}
      </div>
      <button className="boton" onClick={handlePrint}>Imprimir imagen</button> {/* Botón para imprimir */}
      <div ref={printRef}> {/* Div para imprimir imagen, en ella se agrega la imagen generada al presionar el botón de imprimir */}
    
      </div>
    </div>
  );
}

export default Tablero;