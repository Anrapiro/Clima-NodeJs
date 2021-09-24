// Import axios
const axios = require('axios');

/**
 * Obtiene los datos del la peticion API de google
 * @param  {[String]} direccion direccion del lugar
 * @return {[Object]} Datos de la direccion especificada
 */
async function getLocation (direccion) {
  // Transformar a un url freenly, compatible con html
  const encodedUrl = encodeURI(direccion);

  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUrl}&key=AIzaSyD6bGrXAeJCe_Ybpy7qVtNuty-U5wl8DLE`);

  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error(`No se encontraron datos de la direccion '${encodedUrl} '`);
  }

  // =================== Obtener Elementos del objeto data  ================
  const result = response.data.results[0];
  const formattedAddress = result.formatted_address;
  const location = result.geometry.location;

  return {
    direccion: formattedAddress,
    latitud: location.lat,
    longitud: location.lng
  };
}

/**
 * Obtiene datos del clima de un lugar del mundo
 * @param  {[Number]} lat Latitud del lugar
 * @param  {[Number]} lng Longitud del lugar
 * @return {[Object]} Temperatura
 */
async function getClima (lat, lng) {
  const respuesta = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=9e1c3780f29d301d6c41f66edb01a22a`);

  if (respuesta.data.cod !== 200) {
    throw new Error(`No se encontraron datos en la lat:${lat} y lgn:${lng}`);
  }

  return {
    tempetatura: respuesta.data.main.temp
  };
}

/**
 * Exporta las funciones fuera de este documento
 * @type {Object}
 */
module.exports = {
  getLocation,
  getClima
};
