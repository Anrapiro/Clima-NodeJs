// Configuracion del yargs
const argv = require('yargs').options({ // con option podemos enviar el argumento sin comandos
  direccion: {
    demand: true,
    alias: 'd',
    desc: 'Direccion de la ciudad para obtener el clima'
  }
}).argv;

module.exports = {
  argv
};
