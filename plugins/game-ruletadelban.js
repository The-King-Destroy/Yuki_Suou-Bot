let handler = async (m, { conn, groupMetadata }) => {
    // Verificar si el bot tiene restricciones
    let bot = global.db.data.settings[conn.user.jid] || {};
    if (!bot.restrict) return m.reply(`⚠️ Solo el propietario puede usar este comando.`);
  
    // Verificar si el mensaje es en un grupo
    if (!m.isGroup) return m.reply(`⚠️ Este comando solo se puede usar en grupos.`);
    
    // Número de teléfono del creador del bot
    const botCreatorNumber = '584120346669@s.whatsapp.net'; // Formato correcto del ID del número

    // Función para verificar si un usuario es administrador, moderador o el creador del bot
    const isAdminOrCreator = (participant) => {
        return participant.admin === 'admin' || participant.admin === 'superadmin' || participant.id === groupMetadata.owner || participant.id === botCreatorNumber;
    };
    
    // Filtrar participantes (no incluir al bot y a los administradores, moderadores y creador del bot)
    let psmap = groupMetadata.participants
        .filter(v => v.id !== conn.user.jid && !isAdminOrCreator(v))
        .map(v => v.id);
    
    // Verificar si hay candidatos
    if (psmap.length === 0) return m.reply(`⚠️ No se encontraron candidatos para la ruleta o todos son administradores/moderadores/creador del bot.`);
    
    // Elegir un usuario al azar
    let user = psmap[Math.floor(Math.random() * psmap.length)];
    
    // Formatear menciones
    let format = a => '@' + a.split('@')[0];

    // Notificar al usuario elegido y proceder con la eliminación
    m.reply(`*${format(user)} ☠️ Has sido elegido por la ruleta de la muerte*`, null, { mentions: [user] });
    
    // Esperar 2 segundos antes de eliminar al usuario
    await delay(2000);
    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
};

handler.command = /^(ruletadelban)$/i;
handler.group = true;
handler.tags = ['game'];
handler.admin = true;
handler.botAdmin = true;
export default handler;

const delay = time => new Promise(res => setTimeout(res, time));
