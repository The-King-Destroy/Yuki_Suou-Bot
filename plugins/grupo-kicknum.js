const handler = async (m, {conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin}) => {
  if (!args[0]) return conn.reply(m.chat, `🌹 Ingrese Algun Prefijo De Un Pais\nEjemplo: ${usedPrefix + command} 58`, m, rcanal);
  if (isNaN(args[0])) return conn.reply(m.chat, `🍒 Ingrese Algun Prefijo De Un Pais\nEjemplo: ${usedPrefix + command} 58`, m, rcanal);
  const lol = args[0].replace(/[+]/g, '');
  const ps = participants.map((u) => u.id).filter((v) => v !== conn.user.jid && v.startsWith(lol || lol));
  const bot = global.db.data.settings[conn.user.jid] || {};
  if (ps == '') return m.reply(`🥀 *Aqui No Hay Ningun Numero Con El Prefijo +${lol}*`);
  const numeros = ps.map((v)=> '⭔ @' + v.replace(/@.+/, ''));
  const delay = (time) => new Promise((res)=>setTimeout(res, time));
  switch (command) {
    case 'listanum': case 'listnum':
      conn.reply(m.chat, `🌹 *Lista de numeros con el prefijo +${lol} que estan en este grupo:*\n\n` + numeros.join`\n`, m, {mentions: ps});
      break;
    case 'kicknum':
      if (!bot.restrict) return conn.reply(m.chat, '🍒 *¡Este Comando Esta Desabilitado Por El Propietario Del Bot!*', m, rcanal);
      if (!isBotAdmin) return m.reply('🥀 *El bot no es admin*');
      await conn.reply(m.chat, `♻️ *Iniciando eliminación....*`, m, rcanal);
      const ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net';
      const users = participants.map((u) => u.id).filter((v) => v !== conn.user.jid && v.startsWith(lol || lol));
      for (const user of users) {
        const error = `@${user.split('@')[0]} ya ha sido eliminado o ha abandonado el grupo. 🌸`;
        if (user !== ownerGroup + '@s.whatsapp.net' && user !== global.conn.user.jid && user !== global.owner + '@s.whatsapp.net' && user.startsWith(lol || lol) && user !== isSuperAdmin && isBotAdmin && bot.restrict) {
          await delay(2000);
          const responseb = await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
          if (responseb[0].status === '404') m.reply(error, m.chat, {mentions: conn.parseMention(error)});
          await delay(10000);
        } else return m.reply(m.chat, '✖️ *Ocurrió un error.*', m, fake);
      }
      break;
  }
};
handler.command = ['kicknum', 'listnum', 'listanum'];
handler.group = true;
handler.botAdmin = true;
handler.admin = true;
handler.fail = null;
export default handler;