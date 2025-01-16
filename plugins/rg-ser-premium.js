let handler = async (m, { conn, text }) => {
  let user = global.db.data.users[m.sender];
  if (!text) return conn.reply(m.chat, '*🍬 Ingresa el tipo de membresía y la duración.*\n> Ejemplo: #comprarpremium 1 dia', m);

  let [amount, unit] = text.split(' ');
  amount = parseInt(amount);
  if (isNaN(amount)) return conn.reply(m.chat, '🍬 La cantidad debe ser un número.', m);
  
  const units = { minuto: 1, minutos: 1, hora: 60, horas: 60, dia: 1440, dias: 1440 };
  if (!units[unit.toLowerCase()]) return conn.reply(m.chat, '🍬 Unidad de tiempo no válida. Usa minutos, horas o días.', m);

  let cost = amount * (units[unit.toLowerCase()] / 200);
  if (user.coin < cost) return conn.reply(m.chat, `😂 No tienes suficientes ${global.moneda}. Necesitas ${cost} ${global.moneda} para comprar esta membresía.`, m);

  user.coin -= cost;
  user.premium = true;
  user.premiumTime = +new Date() + amount * units[unit.toLowerCase()] * 60 * 1000; 
  
  conn.reply(m.chat, `🎉 ¡Felicitaciones! Ahora eres miembro premium por ${amount} ${unit}. Has gastado ${cost} ${global.moneda}.`, m);
};

handler.help = ['comprarpremium'];
handler.tags = ['premium'];
handler.command = ['comprarpremium', 'premium', 'vip'];
handler.register = true;

export default handler;