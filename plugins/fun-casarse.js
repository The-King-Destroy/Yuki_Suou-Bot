import fs from 'fs';
import path from 'path';

let marriageConfirmation = {};

let marryHandler = async (m, { conn, usedPrefix, isGroup }) => {
  let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  if (!who) throw 'Etiqueta o menciona a alguien';

  let name1 = conn.getName(who);
  let name2 = conn.getName(m.sender);

  if (marriageConfirmation[m.sender]) return m.reply('Ya tienes una propuesta pendiente.');

  let proposalTime = Date.now();

  let str = `@${m.sender.split('@')[0]} te ha propuesto matrimonio @${who.split('@')[0]}! Responde con "acepto" o "rechazo" en los próximos 5 minutos.`;
  await conn.sendMessage(m.chat, { text: str, mentions: conn.parseMention(str) }, { quoted: m });

  marriageConfirmation[who] = {
    sender: m.sender,
    to: who,
    message: m,
    timeout: setTimeout(() => {
      m.reply(`⏳ Tiempo de respuesta agotado.`);
      delete marriageConfirmation[m.sender];
    }, 5 * 60 * 1000) // 5 minutos
  };
};

marryHandler.before = async (m) => {
  if (!(m.sender in marriageConfirmation)) return;
  if (!m.text) return;

  let { timeout, sender, message, to } = marriageConfirmation[m.sender];
  if (m.id === message.id) return;

  if (/rechazo|no/i.test(m.text)) {
    clearTimeout(timeout);
    delete marriageConfirmation[sender];
    return m.reply(`❌ La propuesta de matrimonio fue rechazada por @${to.split('@')[0]}.`);
  }

  if (/acepto|si/i.test(m.text)) {
    let imgs = [
      'https://qu.ax/OpVX.mp4',
      'https://qu.ax/ChmG.mp4',
      'https://qu.ax/yUBa.mp4'
    ];
    let img = imgs[Math.floor(Math.random() * imgs.length)];
    let finalStr = `@${sender.split('@')[0]} se ha casado con @${to.split('@')[0]}! ¡Felicidades!`.trim();

    await conn.sendMessage(m.chat, {
      video: { url: img },
      gifPlayback: true,
      caption: finalStr,
      mentions: conn.parseMention(finalStr)
    }, { quoted: message });

    global.db.data.users[sender].casado = true;
    global.db.data.users[to].casado = true;
    global.db.data.users[sender].pareja = to;
    global.db.data.users[to].pareja = sender;

    clearTimeout(timeout);
    delete marriageConfirmation[sender];
  }
};

marryHandler.help = ['casarse @tag'];
marryHandler.tags = ['fun'];
marryHandler.command = ['casarse', 'marry'];
marryHandler.group = true;
export default marryHandler;
