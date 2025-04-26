let cooldowns = {};

let handler = async (m, { conn, usedPrefix, command }) => {
  let users = global.db.data.users;
  let senderId = m.sender;

  let tiempoEspera = 8 * 60;

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000));
    return conn.reply(m.chat, `⏱️ Ya exploraste la mazmora recientemente. Espera ⏳ *${tiempoRestante}* antes de aventurarte de nuevo.`, m);
  }

  cooldowns[m.sender] = Date.now();

  if (!users[senderId]) {
    users[senderId] = { health: 100, coin: 0, exp: 0 };
  }

  const eventos = [
    { nombre: 'Mazmorras de los Caídos', tipo: 'victoria', coin: randomNumber(150, 300), exp: randomNumber(50, 100), health: 0, mensaje: `🏆 ¡Has derrotado al guardián! Al abrir su cofre, encontraste un montón de ${moneda}.` },
    { nombre: 'Cámara de los Espectros', tipo: 'derrota', coin: randomNumber(-70, -40), exp: randomNumber(10, 20), health: randomNumber(-15, -5), mensaje: `⚠️ Un espectro te ha atrapado en su red de sombras. Perdiste algunas ${moneda} mientras logras escaparte.` },
    { nombre: 'Cripta del Olvido', tipo: 'victoria', coin: randomNumber(250, 400), exp: randomNumber(100, 150), health: 0, mensaje: `💎 Te adentras y descubres un tesoro antiguo lleno de gemas y ${moneda}.` },
    { nombre: 'Trampa del Laberinto', tipo: 'trampa', coin: 0, exp: randomNumber(5, 10), health: 0, mensaje: `🚧 Activaste una trampa oculta. Afortunadamente, logras salir ileso, pero no ganaste nada.` },
    { nombre: 'Cámara de los Demonios', tipo: 'derrota', coin: randomNumber(-150, -80), exp: randomNumber(20, 40), health: randomNumber(-30, -20), mensaje: `🐉 Un feroz demonio te embosca en la oscuridad. Logras escapar, pero no sin perder algunas ${moneda} y salud.` },
    { nombre: 'Santuario de la Luz', tipo: 'victoria', coin: randomNumber(100, 200), exp: randomNumber(30, 60), health: 0, mensaje: `🎆 Encuentras un cofre repleto de riquezas que brillan intensamente.` },
    { nombre: 'Laberinto de los Perdidos', tipo: 'trampa', coin: 0, exp: randomNumber(5, 15), health: 0, mensaje: `🌀 Te adentras en un laberinto confuso. Logras salir, pero no obtienes recompensas.` },
    { nombre: 'Ruinas de los Caídos', tipo: 'victoria', coin: randomNumber(150, 300), exp: randomNumber(70, 120), health: 0, mensaje: `🏺 Descubres artefactos antiguos que brillan con un encanto misterioso y te recompensan.` },
    { nombre: 'Guarida del Dragón', tipo: 'derrota', coin: randomNumber(-200, -100), exp: randomNumber(20, 40), health: randomNumber(-30, -20), mensaje: `🔥 Un dragón lanza una llamarada hacia ti. Logras escapar, pero pierdes algunas riquezas y salud.` },
    { nombre: 'Sabio de la Mazmora', tipo: 'victoria', coin: randomNumber(50, 100), exp: randomNumber(30, 50), health: 0, mensaje: `👴 Te encuentras con un sabio que comparte historias y te recompensa por tu atención.` },
  ];

  let evento = eventos[Math.floor(Math.random() * eventos.length)];

  if (evento.tipo === 'victoria') {
    users[senderId].coin += evento.coin;
    users[senderId].exp += evento.exp;
    users[senderId].health += evento.health;
  } else if (evento.tipo === 'derrota') {
    users[senderId].coin += evento.coin;
    users[senderId].exp += evento.exp;
    users[senderId].health += evento.health;
  } else if (evento.tipo === 'trampa') {
    users[senderId].exp += evento.exp;
  }

  let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745558209798.jpeg';
  let info = `╭━〔 Mazmoras Antiguas 〕\n` +
             `┃Misión: *${evento.nombre}*\n` +
             `┃Evento: ${evento.mensaje}\n` +
             `┃Recompensa: ${evento.coin > 0 ? '+' : '-'}${Math.abs(evento.coin)} *${moneda}* y +${evento.exp} *XP*.\n` +
             `┃Tu salud ${evento.health < 0 ? 'bajó en: ' + Math.abs(evento.health) : 'se mantuvo igual.'}\n` +
             `╰━━━━━━━━━━━━⬣`;

  await conn.sendFile(m.chat, img, 'mazmorras.jpg', info, fkontak);

  global.db.write();
};

handler.tags = ['rpg'];
handler.help = ['explorar'];
handler.command = ['dungeon', 'mazmorra', 'cueva'];
handler.register = true;
handler.group = true;

export default handler;

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function segundosAHMS(segundos) {
  let minutos = Math.floor(segundos / 60);
  let segundosRestantes = segundos % 60;
  return `${minutos} minutos y ${segundosRestantes} segundos`;
}
