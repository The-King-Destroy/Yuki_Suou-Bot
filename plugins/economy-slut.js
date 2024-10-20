let cooldowns = {}

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  let tiempoEspera = 5 * 60; // Tiempo de espera total

  // Usa el ID del chat como clave para los cooldowns
  let chatId = m.chat;
  if (cooldowns[chatId] && Date.now() - cooldowns[chatId] < tiempoEspera * 1000) {
    const tiempoRestante = segundosAHMS(Math.ceil((cooldowns[chatId] + tiempoEspera * 1000 - Date.now()) / 1000));
    conn.reply(m.chat, `⏳ ¡Ten paciencia! Debes esperar *${tiempoRestante}* para volver a usar *slut* en este grupo.`);
    return;
  }

  cooldowns[chatId] = Date.now();
  let resultado = Math.floor(Math.random() * 2500);
  let cookiesGanadas = Math.floor(Math.random() * 50) + 10; // Gana entre 10 y 59 Cookies 🍪

  user.limit += resultado;
  user.cookies = (user.cookies || 0) + cookiesGanadas;

  // Mensaje aleatorio
  let mensajeAleatorio = pickRandom(works).toUpperCase();

  // Selección aleatoria de acción
  let randomUserId = Object.keys(global.db.data.users)[Math.floor(Math.random() * Object.keys(global.db.data.users).length)];
  while (randomUserId === m.sender) {
    randomUserId = Object.keys(global.db.data.users)[Math.floor(Math.random() * Object.keys(global.db.data.users).length)];
  }

  let randomOption = Math.floor(Math.random() * 3);
  let mensajeFinal = `✨ *${mensajeAleatorio}*\n\n`;

  switch (randomOption) {
    case 0:
      global.db.data.users[randomUserId].cookies -= cookiesGanadas;
      mensajeFinal += `🚩¡Te Postituiste Y Ganaste *${cookiesGanadas} Cookies 🍪*! Dejaste Casi Seco A @${randomUserId.split("@")[0]}!\n`;
      break;
    case 1:
      let amountSubtracted = Math.min(Math.floor(Math.random() * (user.cookies - 10) + 10), 50);
      user.cookies -= amountSubtracted;
      mensajeFinal += `🚩 Te cobraron y se te quitaron *-${amountSubtracted} Cookies 🍪* a ${conn.getName(m.sender)}.\n`;
      break;
    case 2:
      let smallAmountTaken = Math.min(Math.floor(Math.random() * (global.db.data.users[randomUserId].cookies / 2) + 10), 50);
      user.cookies += smallAmountTaken;
      global.db.data.users[randomUserId].cookies -= smallAmountTaken;
      mensajeFinal += `🚩 Vuelves A Las Calles Y Te Vas A Un Motel, te pagaron *${smallAmountTaken} Cookies 🍪* de @${randomUserId.split("@")[0]}.\n`;
      break;
  }

  mensajeFinal += `
🪙 *${toNum(resultado)} YukiCoins* ( *${resultado}* ) 
🍪 *${cookiesGanadas} Cookies 🍪*

✨ Tu total de Cookies ahora es: *${user.cookies} Cookies 🍪* 
¡Sigue acumulando riquezas y sorprende a todos! 💰🌟`;

  await conn.reply(m.chat, mensajeFinal.trim(), { contextInfo: { mentionedJid: [randomUserId] } });

  // Agregar la reacción al mensaje
  await conn.sendMessage(m.chat, { react: { text: '🥵', key: m.key } });
}

handler.help = ['slut']
handler.tags = ['economy', 'rpg']
handler.command = ['slut', 'prost']
handler.register = true; 
handler.group = true;

export default handler;

function toNum(number) {
  if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(1) + 'k';
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else {
    return number.toString();
  }
}

function segundosAHMS(segundos) {
  let minutos = Math.floor((segundos % 3600) / 60);
  let segundosRestantes = segundos % 60;
  return `${minutos} minutos y ${segundosRestantes} segundos`;
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}

const works = [
  "𝐃𝐞𝐣𝐚𝐬𝐭𝐞 𝐪𝐮𝐞 𝐮𝐧 𝐠𝐫𝐮𝐩𝐨 𝐝𝐞 𝐣𝐨𝐯𝐞𝐧𝐞𝐬 𝐭𝐞 𝐯𝐢𝐬𝐭𝐢𝐞𝐫𝐚𝐧 𝐝𝐞 𝐩𝐮𝐭𝐚 🥵 𝐚 𝐜𝐚𝐦𝐛𝐢𝐨 𝐝𝐞",
  "𝐀𝐲𝐮𝐝𝐚𝐬𝐭𝐞 𝐚𝐥 𝐚𝐝𝐦𝐢𝐧 𝐚 𝐞𝐲𝐚𝐜𝐮𝐥𝐚𝐫 💦 𝐲 𝐭𝐞 𝐝𝐢ó",
  "𝐓𝐞 𝐯𝐢𝐬𝐭𝐢𝐞𝐫𝐨𝐧 𝐝𝐞 𝐦𝐚𝐢𝐝 👯 𝐞𝐧 𝐩𝐮𝐛𝐥𝐢𝐜𝐨 𝐲 𝐭𝐞 𝐝𝐢𝐞𝐫𝐨𝐧",
  "𝐋𝐞 𝐬𝐨𝐛𝐚𝐬𝐭𝐞 𝐞𝐥 𝐩𝐢𝐭𝐨 🍆 𝐚 𝐮𝐧 𝐜𝐥𝐢𝐞𝐧𝐭𝐞 𝐡𝐚𝐛𝐢𝐭𝐮𝐚𝐥 𝐲 𝐠𝐚𝐧𝐚𝐬𝐭𝐞",
  "𝐓𝐞 𝐯𝐢𝐬𝐭𝐢𝐞𝐫𝐨𝐧 𝐝𝐞 𝐜𝐨𝐥𝐞𝐠𝐢𝐚𝐥𝐚 👩‍🏫 𝐞𝐧 𝐩𝐮𝐛𝐥𝐢𝐜𝐨 𝐲 𝐭𝐞 𝐝𝐢𝐞𝐫𝐨𝐧",
  "𝐋𝐞 𝐝𝐢𝐬𝐭𝐞 𝐥𝐨𝐬 𝐬𝐞𝐧𝐭𝐨𝐧𝐞𝐬 🍑 𝐝𝐞 𝐬𝐮 𝐯𝐢𝐝𝐚 𝐚 𝐮𝐧 𝐡𝐨𝐦𝐛𝐫𝐞 𝐪𝐮𝐞 𝐞𝐧𝐜𝐨𝐧𝐭𝐫𝐚𝐬𝐭𝐞 𝐩𝐨𝐫 𝐚𝐡𝐢 𝐲 𝐠𝐚𝐧𝐚𝐬𝐭𝐞",
];
