// Powered By >> OfcKing

import fs from "fs";

let frases = [];
let frasesEnviadas = [];
let yukisuouid = "120363322713003916@newsletter";
let idyukisuou = "120363343811229130@newsletter";

fs.readFile('./src/Frases/frases.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo JSON:', err);
    return;
  }
  const jsonData = JSON.parse(data);
  frases = jsonData.frases;
});

function enviarFrase() {
  if (frases.length === 0) {
    conn.reply(yukisuouid, '🌷 No hay frases disponibles, por enviar.', null, fake);
    conn.reply(idyukisuou, '🌷 No hay frases disponibles, por enviar.', null, fake);
    return;
  }

  if (frasesEnviadas.length === frases.length) {
    conn.reply(yukisuouid, '🌸 Todas las frases ya fueron eviadas, se reiniciará la raiz para que envie las antiguas frases ya enviadas.', null, fake);
    conn.reply(idyukisuou, '🌸 Todas las frases ya fueron eviadas, se reiniciará la raiz para que envie las antiguas frases ya enviadas.', null, fake);
      frasesEnviadas = []; 
    return;
  }

  let fraseAleatoriaIndex;
  do {
    fraseAleatoriaIndex = Math.floor(Math.random() * frases.length);
  } while (frasesEnviadas.includes(fraseAleatoriaIndex));

  frasesEnviadas.push(fraseAleatoriaIndex);

  const fraseAleatoria = frases[fraseAleatoriaIndex];
  conn.reply(yukisuouid, `${fraseAleatoria}`, null, fake);
  conn.reply(idyukisuou, `${fraseAleatoria}`, null, fake);
}

// Enviar frase cada 24 horas (86,400,000 ms)
setInterval(enviarFrase, 86400000);