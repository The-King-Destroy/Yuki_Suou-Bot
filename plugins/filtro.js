{
  "palabras_clave": [
    "noxxx",
    "palabra2",
    "mierda"
  ],
  "frases_prohibidas": [
    "xxx",
    "porno",
    "cp"
  ],
  "acciones": {
    "bloquear": true,
    "advertir": true
  },
  "excepciones": [
    "@",
    "usuario2"
  ]
}
const fs = require('fs');
const filtro = JSON.parse(fs.readFileSync('filtro.json', 'utf8'));

// Función para verificar si un mensaje contiene contenido no deseado
function verificarMensaje(mensaje) {
  const palabrasClave = filtro.palabras_clave;
  const frasesProhibidas = filtro.frases_prohibidas;

  for (const palabra of palabrasClave) {
    if (mensaje.includes(palabra)) {
      return true;
    }
  }

  for (const frase of frasesProhibidas) {
    if (mensaje.includes(frase)) {
      return true;
    }
  }

  return false;
}

// Función para manejar mensajes entrantes
function manejarMensaje(mensaje) {
  if (verificarMensaje(mensaje.body)) {
    // Acción para bloquear o advertir al usuario
    console.log('Mensaje no deseado detectado');
    // Código para bloquear o advertir al usuario
  } else {
    // Código para manejar mensajes normales
  }
}
- Twilio: `const twilio = require('twilio');`
- MessageBird: `const messagebird = require('messagebird');`
