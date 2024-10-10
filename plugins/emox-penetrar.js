let handler = async (m, { conn, command, text }) => {
    if (!text) throw `*Ingrese el @ o el nombre de la persona que quieras saber si te puedes ${command.replace('how', '')}*`;

    let user = m.mentionedJid[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : null);
    
    if (!user) throw `*No se encontró al usuario mencionado o citado.*`;

    conn.reply(m.chat, `
*TE HAN LLENADO LA CARA DE SEMEN POR PUTA Y ZORRA!*

*le ha metido el pene a ${text}* con todo y condón hasta quedar seco, has dicho "por favor más duroooooo!, ahhhhhhh, ahhhhhh, hazme un hijo que sea igual de pitudo que tú!" mientras te penetraba y luego te ha dejado en silla de ruedas!

*${text}* 
🔥 *YA TE HAN PENETRADO!* `, null, { mentions: [user] });
}

handler.help = ['penetrar @user'];
handler.tags = ['emox'];
handler.command = ['penetrar', 'penetrado'];
handler.register = true;
handler.group = true;
handler.fail = null;

export default handler;
