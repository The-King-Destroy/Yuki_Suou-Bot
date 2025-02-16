let cooldowns = {};

const missions = [
  { id: 1, nombre: '🐺 Caza de Lobos', level: 1, coin: 150, exp: 40, health: -5, mensaje: `¡Has cazado un lobo y ganaste 150 monedas!` },
  { id: 2, nombre: '🐻 Caza de Osos', level: 2, coin: 300, exp: 70, health: -15, mensaje: `¡Has cazado un oso! Ganaste 300 monedas.` },
  { id: 3, nombre: '🌿 Recolección de Hierbas', level: 1, coin: 100, exp: 30, health: 0, mensaje: `¡Has recolectado hierbas útiles! Ganaste 100 monedas.` },
  { id: 4, nombre: '🦖 Caza de Dinosaurios', level: 5, coin: 500, exp: 100, health: -30, mensaje: `¡Increíble! ¡Has cazado un dinosaurio y ganaste 500 monedas!` },
  { id: 5, nombre: '🦊 Caza de Zorros', level: 2, coin: 200, exp: 50, health: -10, mensaje: `¡Has cazado un zorro! Ganaste 200 monedas.` },
  { id: 6, nombre: '🍄 Recolección de Setas', level: 1, coin: 50, exp: 20, health: 0, mensaje: `¡Has recolectado setas! Ganaste 50 monedas.` },
  { id: 7, nombre: '🐍 Caza de Serpientes', level: 3, coin: 400, exp: 80, health: -20, mensaje: `¡Has cazado una serpiente! Ganaste 400 monedas.` },
  { id: 8, nombre: '⚔️ Batalla contra un Goblin', level: 1, coin: 200, exp: 50, health: -10, mensaje: `¡Has derrotado a un Goblin! Ganaste 200 monedas.` },
  { id: 9, nombre: '🧙‍♂️ Ayuda al Viejo Sabio', level: 2, coin: 250, exp: 60, health: 0, mensaje: `Ayudaste a un viejo sabio y recibiste 250 monedas.` },
  { id: 10, nombre: '🏰 Explorar el Castillo Abandonado', level: 4, coin: 400, exp: 90, health: -20, mensaje: `Exploraste un castillo abandonado y encontraste 400 monedas.` },
  { id: 11, nombre: '🧚 Encuentro con una Hada', level: 3, coin: 300, exp: 70, health: 0, mensaje: `Te encontraste con una hada mágica que te otorgó 300 monedas.` },
  { id: 12, nombre: '⚡ Derrota a un Dragón', level: 5, coin: 1000, exp: 200, health: -50, mensaje: `¡Increíble! ¡Has derrotado a un dragón y ganado 1000 monedas!` },
];

const commandHandlers = {
  gremio: async (m, conn) => {
    let missionList = missions.map(mission =>
      `ID: ${mission.id} - **${mission.nombre}**\n   Nivel requerido: ${mission.level}\n   Recompensa: ${mission.coin} monedas, ${mission.exp} EXP`
    ).join('\n\n');

    let img2 = 'https://qu.ax/ljzxA.jpg';
    let info = `🔍 **Lista de Misiones**:\n${missionList}\n\nPara seleccionar una misión, usa el comando .mision [ID]`;

    await conn.sendFile(m.chat, img2, 'gremio.jpg', info, m);
  },

  mision: async (m, conn, args, users) => {
    const missionId = parseInt(args[1]);

    if (isNaN(missionId) || !missions.some(m => m.id === missionId)) {
      await m.reply("⚠️ Misión no válida. Por favor elige un ID de misión de la lista.");
      return;
    }

    const selectedMission = missions.find(m => m.id === missionId);
    const senderId = m.sender;

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
               `┃Recompensa: ${selectedMission.coin > 0 ? '+' : '-'}${Math.abs(selectedMission.coin)} *monedas* y +${selectedMission.exp} *XP*.\n` +
               `┃Tu salud ${selectedMission.health < 0 ? 'bajó en: ' + Math.abs(selectedMission.health) : 'se mantuvo igual.'}\n` +
               `╰━━━━━━━━━━━━⬣`;

    await conn.sendFile(m.chat, img, 'gremio.jpg', info, m);
    await global.db.write();
  }
};

let handler = async (m, { conn, args }) => {
  const users = global.db.data.users;
  const senderId = m.sender;

  if (!users[senderId]) {
    users[senderId] = { health: 100, coin: 0, exp: 0, level: 1 };
  }

  const command = args[0];
  if (command in commandHandlers) {
    await commandHandlers[command](m, conn, args, users);
  }
};

handler.tags = ['rpg'];
handler.help = ['gremio', 'mision <ID>'];
handler.command = ['gremio', 'mision'];
handler.register = true;
handler.group = true;

export default handler;
