import fs from 'fs';
import path from 'path';

const missionsFilePath = path.join(__dirname, './src/database/gremio.json');
let cooldowns = {};

function loadMissions() {
  const data = fs.readFileSync(missionsFilePath);
  return JSON.parse(data);
}

async function handleGremio(m, conn) {
  const missions = loadMissions();
  let missionList = missions.map(mission =>
    `ID: ${mission.id} - **${mission.nombre}**\n   Nivel requerido: ${mission.level}\n   Recompensa: ${mission.coin} monedas, ${mission.exp} EXP`
  ).join('\n\n');

  let img = 'https://qu.ax/ljzxA.jpg';
  let info = `🔍 **Lista de Misiones**:\n${missionList}\n\nPara seleccionar una misión, usa el comando .mision [ID]`;

  await conn.sendFile(m.chat, img, 'gremio.jpg', info, m);
}

async function handleMision(m, conn, args, users) {
  const missions = loadMissions();
  const missionId = parseInt(args[1]);
  const senderId = m.sender;

  if (isNaN(missionId) || !missions.some(m => m.id === missionId)) {
    await m.reply("⚠️ Misión no válida. Por favor elige un ID de misión de la lista.");
    return;
  }

  const selectedMission = missions.find(m => m.id === missionId);

  if (!users[senderId]) {
    users[senderId] = { health: 100, coin: 0, exp: 0, level: 1 };
  }

  if (users[senderId].level < selectedMission.level) {
    await m.reply(`⚠️ No tienes el nivel suficiente para realizar esta misión. Te falta(n) ${selectedMission.level - users[senderId].level} nivel(es).`);
    return;
  }

  const tiempoEspera = 30 * 60 * 1000;

  if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < tiempoEspera) {
    const tiempoRestante = Math.ceil((cooldowns[senderId] + tiempoEspera - Date.now()) / 1000);
    await m.reply(`⏳ Ya estás en una misión. Espera ${tiempoRestante} segundos antes de intentar otra.`);
    return;
  }

  cooldowns[senderId] = Date.now();

  users[senderId].coin += selectedMission.coin;
  users[senderId].exp += selectedMission.exp;
  users[senderId].health += selectedMission.health;

  let img = 'https://qu.ax/ljzxA.jpg';
  let info = `╭━〔 Gremio de aventureros 〕\n` +
             `┃Misión: *${selectedMission.nombre}*\n` +
             `┃Evento: ${selectedMission.mensaje}\n` +
             `┃Recompensa: +${selectedMission.coin} *monedas* y +${selectedMission.exp} *XP*.\n` +
             `┃Tu salud ${selectedMission.health < 0 ? 'bajó en: ' + Math.abs(selectedMission.health) : 'se mantuvo igual.'}\n` +
             `╰━━━━━━━━━━━━⬣`;

  await conn.sendFile(m.chat, img, 'gremio.jpg', info, m);
  await global.db.write();
}

let handler = async (m, { conn, args }) => {
  const command = args[0];
  const users = global.db.data.users;

  if (command === 'gremio') {
    await handleGremio(m, conn);
  } else if (command === 'mision') {
    await handleMision(m, conn, args, users);
  }
};

handler.tags = ['rpg'];
handler.help = ['gremio', 'mision <ID>'];
handler.command = ['gremio', 'mision'];
handler.register = true;
handler.group = true;

export default handler;
