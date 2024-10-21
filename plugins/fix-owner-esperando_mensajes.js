/* Codigo hecho por @Fabri115  */

import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs';
import path from 'path';

const handler = async (m, { conn, usedPrefix }) => {
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.sendMessage(m.chat, {text: '_[🌹]Ejecuta El Comando En El GokuBot-MD Principal._'}, {quoted: m});
  }
  await conn.sendMessage(m.chat, {text: '_[🌹] Se Esta Ejecutando Proceso Eliminacion De Datos Files._'}, {quoted: m});
  const sessionPath = './YukiSession/';
  try {
    if (!existsSync(sessionPath)) {
      return await conn.sendMessage(m.chat, {text: '_[🌹] No Se Encuantra La Carpeta (Undenifed)_ '}, {quoted: m});
    }
    const files = await fs.readdir(sessionPath);
    let filesDeleted = 0;
    for (const file of files) {
      if (file !== 'creds.json') {
        await fs.unlink(path.join(sessionPath, file));
        filesDeleted++;
      }
    }
    if (filesDeleted === 0) {
      await conn.sendMessage(m.chat, {text: '_[🌹] No Se Encuentra La Carpeta (Undefined)._'}, {quoted: m});
    } else {
      await conn.sendMessage(m.chat, {text: `_[🌹] Se Ah Eliminado Los Files De Manera Correcta *${filesDeleted}* Menos Las Credenciales Del Bot._`}, {quoted: m});
    }
  } catch (err) {
    console.error('Error al leer la carpeta o los archivos de sesión:', err);
    await conn.sendMessage(m.chat, {text: '_[🌹] Ejecución Fallida._'}, {quoted: m});
  }
  await conn.sendMessage(m.chat, {text: `_📍Listo, Ejecución Perfecta.📍_\n\n[✔️] _Si GokuBot-MD No Responde Haga Un Pequeño Spam._\n\n*—◉ ᴇᴊᴇᴍᴘʟᴏ:*\n${usedPrefix}s\n${usedPrefix}s\n${usedPrefix}s`}, {quoted: m});
};
handler.help = ['del_reg_in_session_owner'];
handler.tags = ['owner'];
handler.command = /^(del_reg_in_session_owner|lobodel|delgoku|clearallsession)$/i;
handler.rowner = true
export default handler;