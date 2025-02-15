let cooldowns = {};

let handler = async (m, { conn, args }) => {
  let users = global.db.data.users;
  let senderId = m.sender;

  if (!users[senderId]) {
    users[senderId] = { health: 100, coin: 0, exp: 0, level: 1 };
  }

  const missions = [
    { nombre: '🐺 Caza de Lobos', level: 1, coin: 150, exp: 40, health: -5, mensaje: `¡Has cazado un lobo y ganaste 150 monedas!` },
    { nombre: '🐻 Caza de Osos', level: 2, coin: 300, exp: 70, health: -15, mensaje: `¡Has cazado un oso! Ganaste 300 monedas.` },
    { nombre: '🌿 Recolección de Hierbas', level: 1, coin: 100, exp: 30, health: 0, mensaje: `¡Has recolectado hierbas útiles! Ganaste 100 monedas.` },
    { nombre: '🦖 Caza de Dinosaurios', level: 5, coin: 500, exp: 100, health: -30, mensaje: `¡Increíble! ¡Has cazado un dinosaurio y ganaste 500 monedas!` },
    { nombre: '🦊 Caza de Zorros', level: 2, coin: 200, exp: 50, health: -10, mensaje: `¡Has cazado un zorro! Ganaste 200 monedas.` },
    { nombre: '🍄 Recolección de Setas', level: 1, coin: 50, exp: 20, health: 0, mensaje: `¡Has recolectado setas! Ganaste 50 monedas.` },
    { nombre: '🐍 Caza de Serpientes', level: 3, coin: 400, exp: 80, health: -20, mensaje: `¡Has cazado una serpiente! Ganaste 400 monedas.` },
    { nombre: '⚔️ Batalla contra un Goblin', level: 1, coin: 200, exp: 50, health: -10, mensaje: `¡Has derrotado a un Goblin! Ganaste 200 monedas.` },
    { nombre: '🧙‍♂️ Ayuda al Viejo Sabio', level: 2, coin: 250, exp: 60, health: 0, mensaje: `Ayudaste a un viejo sabio y recibiste 250 monedas.` },
    { nombre: '🏰 Explorar el Castillo Abandonado', level: 4, coin: 400, exp: 90, health: -20, mensaje: `Exploraste un castillo abandonado y encontraste 400 monedas.` },
    { nombre: '🧚 Encuentro con una Hada', level: 3, coin: 300, exp: 70, health: 0, mensaje: `Te encontraste con una hada mágica que te otorgó 300 monedas.` },
    { nombre: '⚡ Derrota a un Dragón', level: 5, coin: 1000, exp: 200, health: -50, mensaje: `¡Increíble! ¡Has derrotado a un dragón y ganado 1000 monedas!` },
  ];

  if (args[0] === 'gremio') {
    let missionList = missions.map((mission, index) =>
      `${index + 1}. **${mission.nombre}**\n   Nivel requerido: ${mission.level}\n   Recompensa: ${mission.coin} monedas, ${mission.exp} EXP`
    ).join('\n\n');

    let jpg = 'https://qu.ax/ljzxA.jpg';
    let info = `*Lista de Misiones*:\n${missionList}\n\nPara seleccionar una misión, usa el comando .mision [número]`;

    await conn.sendFile(m.chat, jpg, 'gremio.jpg', info, m);
    return;
  }

  if (args[0] === 'mision') {
    let missionIndex = parseInt(args[1]) - 1;

    if (missionIndex < 0 || missionIndex >= missions.length) {
      m.reply("⚠️ Misión no válida. Por favor elige un número de misión de la lista.");
      return;
    }

    let selectedMission = missions[missionIndex];

    if (users[senderId].level < selectedMission.level) {
      m.reply(`⚠️ No tienes el nivel suficiente para realizar esta misión. Te falta(n) ${selectedMission.level - users[senderId].level} nivel(es).`);
      return;
    }

    let tiempoEspera = 30 * 60 * 1000;

    if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < tiempoEspera) {
      let tiempoRestante = Math.ceil((cooldowns[senderId] + tiempoEspera - Date.now()) / 1000);
      m.reply(`⏳ Ya estás en una misión. Espera ${tiempoRestante} segundos antes de intentar otra.`);
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

handler.tags = ['rpg'];
handler.help = ['gremio', 'mision <número>'];
handler.command = ['gremio', 'mision'];
handler.register = true;
handler.group = true;

export default handler;
