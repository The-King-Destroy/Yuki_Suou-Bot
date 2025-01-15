import cp, { exec as _exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';

const exec = promisify(_exec).bind(cp);

const handler = async (m, { conn, isROwner, usedPrefix, command, text }) => {
  const ar = Object.keys(plugins);
  const ar1 = ar.map((v) => v.replace('.js', ''));
  
  if (!text) {
    return conn.reply(m.chat, `*🍬 Ingrese el nombre de algún plugin (archivo) existente*\n\n*—◉ Ejemplo*\n*◉ ${usedPrefix + command}* info-infobot\n\n*—◉ Lista de plugins (archivos) existentes:*\n*◉* ${ar1.map((v) => ' ' + v).join`\n*◉*`}`, m);
  }

  if (!ar1.includes(text)) {
    return conn.reply(m.chat, `*🍭 No se encontró ningún plugin (archivo) llamado "${text}", ingrese alguno existente*\n\n*==================================*\n\n*—◉ Lista de plugins (archivos) existentes:*\n*◉* ${ar1.map((v) => ' ' + v).join`\n*◉*`}`, m);
  }
  
  let o;
  try {
    o = await exec('cat plugins/' + text + '.js');
  } catch (e) {
    o = e;
  } finally {
    const { stdout, stderr } = o;
    if (stdout.trim()) {
      // const aa = await conn.sendMessage(m.chat, { text: stdout }, { quoted: m });
      await conn.sendMessage(m.chat, { document: fs.readFileSync(`./plugins/${text}.js`), mimetype: 'application/javascript', fileName: `${text}.js` }, { quoted: m });
    }
    if (stderr.trim()) {
      // const aa2 = await conn.sendMessage(m.chat, { text: stderr }, { quoted: m });
      await conn.sendMessage(m.chat, { document: fs.readFileSync(`./plugins/${text}.js`), mimetype: 'application/javascript', fileName: `${text}.js` }, { quoted: m });
    }
  }
};

handler.help = ['getplugin']
handler.tags = ['owner'];
handler.command = ['getplugin', 'plugin'];
handler.rowner = true;

export default handler;