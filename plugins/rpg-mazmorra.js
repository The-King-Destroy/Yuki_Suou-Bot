let cooldowns = {}

let handler = async (m, { conn, usedPrefix, command }) => {
  let user = db.data.users[m.sender];
  let tiempo = 8 * 60;

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
    let tiempoRestante = Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000);
    let tiempoFormateado = segundosAHMS(tiempoRestante);
    return conn.reply(m.chat, `⏱️ Ya has explorado las mazmorras recientemente, espera *${tiempoFormateado}* para explorar de nuevo.`, m);
  }

  cooldowns[m.sender] = Date.now();

  function explorarMazmorra() {
    const eventos = [
      { nombre: 'Mazmorras de los Caídos', tipo: 'victoria', coinEncontradas: randomNumber(15, 30), bonoExtra: randomNumber(20, 40), mensaje: `🏆 ¡Has derrotado al guardián de las mazmorras! Encontraste` },
      { nombre: 'Cueva de las Sombras', tipo: 'derrota', coinEncontradas: randomNumber(10, 25), saludPerdida: randomNumber(5, 15), mensaje: `⚠️ ¡Un espectro te ha atrapado! Perdiste` },
      { nombre: 'Santuario del Tesoro', tipo: 'tesoro', coinEncontradas: randomNumber(20, 35), mensaje: `🎆 ¡Encontraste un cofre lleno de riquezas en el santuario! Recibiste` },
      { nombre: 'Trampa del Laberinto', tipo: 'trampa', coinEncontradas: randomNumber(5, 15), saludPerdida: randomNumber(5, 10), mensaje: `🚧 ¡Cayaste en una trampa mortal! Perdiste` },
      { nombre: 'Cripta del Olvido', tipo: 'victoria', coinEncontradas: randomNumber(25, 50), bonoExtra: randomNumber(10, 20), mensaje: `🏆 ¡Has vencido al espectro de la cripta! Encontraste` },
      { nombre: 'Cámara de los Demonios', tipo: 'derrota', coinEncontradas: randomNumber(20, 40), saludPerdida: randomNumber(10, 20), mensaje: `⚠️ ¡Un demonio te ha consumido! Perdiste` },
      { nombre: 'Ruinas Antiguas', tipo: 'tesoro', coinEncontradas: randomNumber(15, 25), mensaje: `🎆 ¡Exploraste las ruinas y encontraste un antiguo tesoro! Recibiste` },
      { nombre: 'La Guarida del Dragón', tipo: 'trampa', coinEncontradas: randomNumber(10, 20), saludPerdida: randomNumber(10, 30), mensaje: `🚧 ¡Cayaste en la trampa del dragón! Perdiste` },
    ];

    let evento = eventos[Math.floor(Math.random() * eventos.length)];
    let resultado;

    if (evento.tipo === 'victoria') {
      global.db.data.users[m.sender].coin += evento.coinEncontradas + evento.bonoExtra;
      resultado = `${evento.mensaje} ${evento.coinEncontradas} ${moneda}, más ➔ ${evento.bonoExtra} como bono extra.`;
      evento.health = 0;
    } else if (evento.tipo === 'derrota') {
      global.db.data.users[m.sender].coin -= evento.coinEncontradas;
      user.health -= evento.saludPerdida;
      resultado = `${evento.mensaje} ➔ ${evento.coinEncontradas} ${moneda} y perdiste ${evento.saludPerdida} de salud.`;
      evento.health = -evento.saludPerdida;
    } else if (evento.tipo === 'tesoro') {
      global.db.data.users[m.sender].coin += evento.coinEncontradas;
      resultado = `${evento.mensaje} ${evento.coinEncontradas} ${moneda}.`;
      evento.health = 0;
    } else if (evento.tipo === 'trampa') {
      global.db.data.users[m.sender].coin -= evento.coinEncontradas;
      user.health -= evento.saludPerdida;
      resultado = `${evento.mensaje} ➔ ${evento.coinEncontradas} ${moneda} y perdiste ${evento.saludPerdida} de salud.`;
      evento.health = -evento.saludPerdida;
    }

    return { nombreMision: evento.nombre, resultado, salud: user.health, ganancia: evento.coinEncontradas + (evento.bonoExtra || 0), health: evento.health };
  }

  const { nombreMision, resultado, salud, ganancia, health } = explorarMazmorra();
  let img = 'https://qu.ax/jbnNz.jpg';
  let info = `╭━〔 Viaje a la Mazmorra 〕\n` +
             `┃Mazmora: *${nombreMision}*\n` +
             `┃Evento: ${resultado}\n` +
             `┃Ganaste: ${ganancia} ${moneda}\n` +
             `┃Tu salud ${health < 0 ? 'bajó en: ' + Math.abs(health) : 'se mantuvo igual.'}\n` +
             `╰━━━━━━━━━━━━⬣`;

  await conn.sendFile(m.chat, img, 'mazmorras.jpg', info, m);
}

handler.help = ['mazmorra'];
handler.tags = ['rpg'];
handler.command = ['dungeon', 'mazmorra'];
handler.group = true;
handler.register = true;

export default handler;

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function segundosAHMS(segundos) {
  let horas = Math.floor(segundos / 3600);
  let minutos = Math.floor((segundos % 3600) / 60);
  let segundosRestantes = segundos % 60;
  return `${minutos} minutos y ${segundosRestantes} segundos`;
}
