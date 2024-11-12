//Código creando por LAN sígueme en ig https://www.instagram.com/lansg___/

let handler = async (m, { conn, usedPrefix, isOwner }) => {
    // Filtrar usuarios que están AFK y excluir solo los que tienen afk === -1
    let users = Object.entries(global.db.data.users)
        .filter(([_, user]) => user.afk && user.afk !== -1);

    // Función para convertir milisegundos a un formato legible (días, horas, minutos, segundos)
    const formatTime = (ms) => {
        let seconds = Math.floor((ms / 1000) % 60);
        let minutes = Math.floor((ms / (1000 * 60)) % 60);
        let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
        let days = Math.floor(ms / (1000 * 60 * 60 * 24));
        return `${days > 0 ? days + 'd ' : ''}${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${seconds > 0 ? seconds + 's' : ''}`.trim();
    };

    let te = `
👥 *Usuarios afk*

🌐 Total: *${users.length}* 

${users.length ? '\n' + users.map(([jid, user], i) => {
        let afkTime = Date.now() - user.afk; // Calcular el tiempo AFK
        return `
${i + 1}. ${conn.getName(jid) == undefined ? '💬 Desconocido' : conn.getName(jid)}
${isOwner ? '@' + jid.split`@`[0] : jid}
⏱️ Tiempo afk: ${formatTime(afkTime)}
`.trim();
    }).join('\n\n') : ''}
`.trim();

    conn.reply(m.chat, te, m, { mentions: await conn.parseMention(te) });
};

handler.help = ['listafk'];
handler.tags = ['fun'];
handler.command = ['afklist', 'listafk'];

export default handler;