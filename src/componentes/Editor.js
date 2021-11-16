import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import axios from 'axios';
import Tablero from './Tablero';
import '../css/Editor.css';

function Editor() {
  const [mostrarTablero, setMostrarTablero] = useState(false); /* Estado para mostar ocultar el tablero de dibujo */
  const [estadoLoading, setEstadoLoading] = useState('idle'); /* Estado del API */
  const [textoBoton, setTextoBoton] = useState("Empezar a dibujar"); /* Estado para cambiar el texto del botón entre empezar a dibujar y reiniciar */
  const [colorSeleccionado, setColorSeleccionado] = useState("#ffffff");  /* Estado para el color seleccionado en la paleta */
  const [mouseDown, setMouseDown] = useState(false); /* Estado bandera para saber cuando el mouse esté presionado */
  const [colores, setColores] = useState([]); /* Estado que contendrá los colores que serán mostrados en la paleta */

  const sizeTablero = 16; /* Tamaño del tablero NxN */

  document.body.onmousedown = function() { /* Función para cuando el mouse esté presionado, cambia el estado bandera a true */
    setMouseDown(true);
  }

  document.body.onmouseup = function() { /* Función para cuando el mouse no esté presionado, cambia el estado bandera a false */
    setMouseDown(false);
  }

  const getColors = async () => { /* Función asíncrona que hace la llamada al API colr.org para conseguir colores */
    axios.get('https://www.colr.org/json/colors/random/21').then(respuesta => { /* Hace la llamada al API, a su función para generar colores aleatorios (25), seguido de un .then() con instrucciones en caso de que sea exitosa la llamada */
      setEstadoLoading('loading'); /* Cambia el estado del API a 'loading', mientras se intenta conseguir la paleta de colores para el selector */
      console.log(respuesta); /* Log de la respuesta del API, BORRAR DESPUÉS */
      const coloresGenerados = respuesta.data.matching_colors.map((value) => { /* Meter en un arreglo auxiliar, cada una de las variables del arreglo de la respuesta, con un '#' concatenado al inicio para que pueda ser leído */
        return '#' + value;
      });
      const coloresFiltrados = coloresGenerados.filter(element => { /* A partir de los colores generados ya con '#' concatenado, filtra aquellos que estén vacíos, que solo sean '#' y no algo como '#F0D14A' */
        return element !== '#';
      });
      const arregloColores = []; /* Arreglo temporal para meter el número de colores necesarios, se necesitan 16 colores, pero se generan 21 para dar un margen para aquellos colores que son vacíos */
      for(let i = 0; i < 16; i++) { /* Llena el arregloColores con 16 colores, los demás quedan descartados */
        arregloColores.push(coloresFiltrados[i]);
      }
      setColores(arregloColores); /* Meter el arreglo temporal arregloColores en el estado que contendrá colores que serán mostrados en la paleta */
      setEstadoLoading('complete'); /* Cambia el estado del API a 'complete', la paleta de colores y el tablero de dibujo ya se pueden mostrar */
      console.log(colores); /* Log del estado de colores, BORRAR DESPUÉS */
    }).catch(() => { /* .catch en caso de que la llamada no se logre, para así generar un mensaje de error y cambiar el estado del API */
      alert("No se pudo cargar la paleta de colores"); /* Lanza un mensaje de error en la ventana del navegador */
      setEstadoLoading('error'); /* Cambia el estado del API a 'error', no se pudo generar una paleta de colores para el selector */
    })
  }

  function handleClickBoton(event) { /* Evento para el botón de empezar a dibujar y reiniciar, niega el estado de mostrarTablero y cambia el texto por su opuesto */
    getColors();
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

  useEffect(() => {
    console.log("Corriendo el efecto", estadoLoading);
    getColors();
  }, [mostrarTablero]);

  return (
    <div id="editor">
      <h1>React Paint</h1>

      <button className="boton" onClick={handleClickBoton}>{textoBoton}</button> {/* Botón para mostrar el tablero a partir del estado mostrarTablero */}

      {mostrarTablero && <SketchPicker /* Oculta el selector dependiendo del estado, selector del paquete react-color que recibe el colorSeleccionado y tiene un evento en caso de cambio */
        presetColors={colores}
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