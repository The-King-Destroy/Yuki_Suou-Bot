import fs from 'fs';
import path from 'path';

const missionsFilePath = path.join(__dirname, './src/database/gremio.json');

function loadMissions() {
  const data = fs.readFileSync(missionsFilePath);
  return JSON.parse(data);
}

let handler = async (m, { conn }) => {
  const missions = loadMissions();
  let missionList = missions.map(mission =>
    `ID: ${mission.id} - **${mission.nombre}**\n   Nivel requerido: ${mission.level}\n   Recompensa: ${mission.coin} monedas, ${mission.exp} EXP`
  ).join('\n\n');

  let img = 'https://qu.ax/ljzxA.jpg';
  let info = `🔍 **Lista de Misiones**:\n${missionList}\n\nPara seleccionar una misión, usa el comando .mision [ID]`;

  await conn.sendFile(m.chat, img, 'gremio.jpg', info, m);
};

handler.command = ['gremio'];
handler.tags = ['rpg'];
handler.help = ['gremio'];
handler.register = true;
handler.group = true;

export default handler;
