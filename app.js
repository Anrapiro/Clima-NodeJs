// yargs
const argv = require('./config/yargs').argv;
// Axio
const axios = require('./peticiones-HTTP/axios');
// Import colors
require('colors');

/**
 * Obtener la informacion de las promesas
 * @param  {[String]}  direccion lugar del mundo
 * @return {Promise} promesa con la respuesta
 */
const getInfo = async (direccion) => {
  try {
    const coordenadas = await axios.getLocation(direccion);
    const temperatura = await axios.getClima(coordenadas.latitud, coordenadas.longitud);
    // return `El clima en ${coordenadas.direccion} es de ${temperatura}`;
    const data = {
      dir: coordenadas.direccion,
      lat: coordenadas.latitud,
      lng: coordenadas.longitud,
      temp: temperatura.tempetatura
    };
    return data;
  } catch (e) {
    return `No se encontro resultados en ${direccion}`;
  }
};

/**
 * Usar la funcion getInfo la cual es una promesa para obtener informacion
 * @param  {[String]} argv Lugar del mundo especificado por consola
 * @return {[String]} Respuesta de la promesa
 */
getInfo(argv.direccion).then(value => {
  if (value.dir === undefined) {
    return console.log(value.red);
  }
  console.log(`El clima en ${value.dir} es de ${value.temp} Grados`.green);
}).catch(err => {
  console.log(err);
});
