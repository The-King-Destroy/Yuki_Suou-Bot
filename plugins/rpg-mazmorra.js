let cooldowns = {}

let handler = async (m, { conn, usedPrefix, command }) => {
  let user = db.data.users[m.sender];
  let tiempo = 15 * 60;

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
    let tiempoRestante = Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000);
    let tiempoFormateado = segundosAHMS(tiempoRestante);
    return conn.reply(m.chat, `⏱️ Ya has explorado recientemente, espera *${tiempoFormateado}* para explorar de nuevo.`, m);
  }

  cooldowns[m.sender] = Date.now();

  function explorarMazmorra(usuario) {
    const coinEncontradas = randomNumber(10, 20);
    const probabilidadMonstruo = randomNumber(1, 16);

    if (probabilidadMonstruo <= 15) {
      const fuerzaUsuario = randomNumber(51, 100);
      const fuerzaMonstruo = randomNumber(50, 90);

      if (fuerzaUsuario > fuerzaMonstruo) {
        const bonoExtra = randomNumber(20, 30);
        global.db.data.users[m.sender].coin += bonoExtra + coinEncontradas;
        return `🏆 ¡Encontraste un monstruo! Lo derrotaste y encontraste ${coinEncontradas} ${moneda}, más ➔ ${bonoExtra} como bono extra.`;
      } else {
        global.db.data.users[m.sender].coin -= coinEncontradas;
        return `⚠️ ¡Encontraste un monstruo! El monstruo te derrotó y perdiste ➔ ${coinEncontradas} ${moneda}.`;
      }
    } else {
      global.db.data.users[m.sender].coin += coinEncontradas;
      return `🎆 ¡Exploraste la mazmorra y encontraste ${coinEncontradas} ${moneda}.`;
    }
  }

  const result = explorarMazmorra(m.sender);
  await conn.reply(m.chat, result, m);
}

handler.help = ['mazmorra'];
handler.tags = ['rpg'];
handler.command = ['explorar', 'mazmorra'];
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
