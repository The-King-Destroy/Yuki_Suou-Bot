let handler = async (m, { conn, command, text }) => {
    // Verifica si se proporcionó un texto
    if (!text) {
        return conn.reply(m.chat, `*Por favor, menciona al usuario para saber si puedes ${command.replace('how', '')}*`, m);
    }

    // Obtiene el usuario mencionado o el que respondió al mensaje
    let user = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null);
    
    // Verifica si se encontró al usuario
    if (!user) {
        return conn.reply(m.chat, `*No se encontró al usuario mencionado o citado.*`, m);
    }

    // Mensaje de respuesta
    const responseMessage = `
*TE HAN LLENADO LA CARA DE SEMEN POR PUTA Y ZORRA!*

*Le ha metido el pene a ${text}* con todo y condón hasta quedar seco, has dicho "por favor más duroooooo!, ahhhhhhh, ahhhhhh, hazme un hijo que sea igual de pitudo que tú!" mientras te penetraba y luego te ha dejado en silla de ruedas!

*${text}* 
🔥 *YA TE HAN PENETRADO!*`;

    // Envía la respuesta al chat
    conn.reply(m.chat, responseMessage, null, { mentions: [user] });
}

// Ayuda y configuración del comando
handler.help = ['penetrar @user'];
handler.tags = ['emox'];
handler.command = ['penetrar', 'penetrado'];
handler.register = true;
handler.group = true;
handler.fail = null;

export default handler;
