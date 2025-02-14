let handler = async(m, { conn, text, usedPrefix, command }) => {

    if (m.mentionedJid && m.mentionedJid.length === 2) {
        let person1 = m.mentionedJid[0];
        let person2 = m.mentionedJid[1];
        let name1 = conn.getName(person1);
        let name2 = conn.getName(person2);
        let name3 = conn.getName(m.sender);
        const pp = './src/Imagen.jpg';

        let trio = `\t\t*TRIO VIOLENTOOOOO!*
        
${name1} y ${name2} tienen un *${Math.floor(Math.random() * 100)}%* de compatibilidad como pareja.
Mientras que ${name1} y ${name3} tienen un *${Math.floor(Math.random() * 100)}%* de compatibilidad.
Y ${name2} y ${name3} tienen un *${Math.floor(Math.random() * 100)}%* de compatibilidad.
¿Qué opinas de un trío? 😏`;

        conn.sendMessage(m.chat, { image: { url: pp }, caption: trio, mentions: [person1, person2, m.sender] }, { quoted: m });
    } else {
        conn.reply(m.chat, `${emoji} Menciona a 2 usuarios mas, para calcular la compatibilidad.`, m);
    }
}

handler.help = ['formartrio @usuario1 @usuario2'];
handler.tags = ['fun'];
handler.command = ['formartrio']
handler.group = true;
handler.register = true;

export default handler;