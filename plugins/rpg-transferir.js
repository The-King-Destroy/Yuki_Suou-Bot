const items = ['coin', 'exp'];
const confirmation = {};

async function handler(m, { conn, args, usedPrefix, command }) {
  if (confirmation[m.sender]) return conn.sendMessage(m.chat, {text: '🍭 Aun hay transferencias en proceso, aguarde un momento...', mentions: [m.sender]}, {quoted: m});
  const user = global.db.data.users[m.sender];
  const item = items.filter((v) => v in user && typeof user[v] == 'number');
  const lol = `*┏━┅┉┅┄┄┄⟞⟨⟡⟩⟝┄┄┄┉┉┉━┓*
*┃🍬 Uso del Comando.* 
*┃◉ ${usedPrefix + command}*  [tipo] [cantidad] [@user]
*┃🍭 Ejemplo:* ${usedPrefix + command} exp 65 @${m.sender.split('@')[0]}
┣❣◤▬▭▬▭▬ ◆ ▬▭▬▭▬ ◤❢
*┃◉ 💰 Articulos transferibles.*
┃▢ *${moneda}* = ${moneda} 💸
┃▢ *exp* = Experiencia ✨
*┗━┅┉┅┄┈┄⟞⟨⟠⟩⟝┄┈┄┉┉┉━┛*
`.trim();
  const type = (args[0] || '').toLowerCase();
  if (!item.includes(type)) return conn.sendMessage(m.chat, {text: lol, mentions: [m.sender]}, {quoted: m});
  const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1;
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : '';
  if (!who) return conn.sendMessage(m.chat, {text: '🍬 Debes mencionar a alguien para poder hacerle la transferencia.', mentions: [m.sender]}, {quoted: m});
  if (!(who in global.db.data.users)) return conn.sendMessage(m.chat, {text: `🍭 El usuario ${who} no se encuentra en mi base de datos.`, mentions: [m.sender]}, {quoted: m});
  if (user[type] * 1 < count) return conn.sendMessage(m.chat, {text: `🍭 No tienes suficientes ${type} para transferir.`, mentions: [m.sender]}, {quoted: m});
const confirm = `¿Estas seguro de de deseas transferir ${count} ${type} a @${(who || '').replace(/@s\.whatsapp\.net/g, '')}?* 
*—◉ Tienes 60 segundos para confirmar*

*—◉ Escriba:* 
*◉ si = para aceptar*
*◉ no = para cancelar*`.trim();
  await conn.sendMessage(m.chat, {text: confirm, mentions: [who]}, {quoted: m});
  confirmation[m.sender] = { sender: m.sender, to: who, message: m, type, count, timeout: setTimeout(() => (conn.sendMessage(m.chat, {text: '🍭 Se acabo el tiempo, no se obtuvo respuestas, Transferencia cancelada.', mentions: [m.sender]}, {quoted: m}), delete confirmation[m.sender]), 60 * 1000)};
}

handler.before = async (m) => {
  if (m.isBaileys) return;
  if (!(m.sender in confirmation)) return;
  if (!m.text) return;
  const { timeout, sender, message, to, type, count } = confirmation[m.sender];
  if (m.id === message.id) return;
  const user = global.db.data.users[sender];
  const _user = global.db.data.users[to];
  if (/^No|no$/i.test(m.text)) {
    clearTimeout(timeout);
    delete confirmation[sender];
    return conn.sendMessage(m.chat, {text: '🍭 Cancelando, la transferencia no se realizara.', mentions: [m.sender]}, {quoted: m});
  }
  if (/^Si|si$/i.test(m.text)) {
    const previous = user[type] * 1;
    const _previous = _user[type] * 1;
    user[type] -= count * 1;
    _user[type] += count * 1;
    if (previous > user[type] * 1 && _previous < _user[type] * 1) {
      conn.sendMessage(m.chat, {text: `🍬 Se ha transferido ${count} ${type} correctamente a @${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, mentions: [to]}, {quoted: m});
    } else {
      user[type] = previous;
      _user[type] = _previous;
      conn.sendMessage(m.chat, {text: `⚠️ Error al realizar la transferencia ${count} ${type} a @${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, mentions: [to]}, {quoted: m});
    }
    clearTimeout(timeout);
    delete confirmation[sender];
  }
};
handler.help = ['transfer'].map((v) => v + ' [tipo] [cantidad] [@tag]');
handler.tags = ['economy'];
handler.command = ['payxp', 'transfer', 'darxp', 'transferir'];
handler.disabled = false;
handler.group = true
handler.register = true
export default handler;

function special(type) {
  const b = type.toLowerCase();
  const special = (['common', 'uncommon', 'megu', 'legendary', 'pet'].includes(b) ? ' Crate' : '');
  return special;
}
function isNumber(x) {
  return !isNaN(x);
}
