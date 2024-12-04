let handler = async (m, { conn, text, command }) => {
    const args = text.split(' ');

    if (!m.isGroup || !global.db.data.chats[m.chat].admins.includes(m.sender)) {
        return conn.reply(m.chat, '✧ Este comando solo puede ser utilizado por administradores del grupo.', m);
    }

    if (args.length < 2) {
        return conn.reply(m.chat, '✧ Por favor proporciona una URL válida.\n\nUso correcto:\n- *setbanner1 <URL>*\n- *setbanner2 <URL>*\n- *setbanner3 <URL>*\n- *seticon <URL>*', m);
    }

    const url = args[1];
    if (!/^https?:\/\/.+\.(mp4|webm)$/.test(url)) {
        return conn.reply(m.chat, '✧ La URL proporcionada no es válida o no es un video.\n\nUso correcto:\n- *setbanner1 <URL>*\n- *setbanner2 <URL>*\n- *setbanner3 <URL>*\n- *seticon <URL>*', m);
    }

    switch (command) {
        case 'setbanner1':
            global.videoBanner1 = url;
            conn.reply(m.chat, '✐ El primer video del banner fue actualizado a: ' + url, m);
            break;
        case 'setbanner2':
            global.videoBanner2 = url;
            conn.reply(m.chat, '✐ El segundo video del banner fue actualizado a: ' + url, m);
            break;
        case 'setbanner3':
            global.videoBanner3 = url;
            conn.reply(m.chat, '✐ El tercer video del banner fue actualizado a: ' + url, m);
            break;
        case 'seticon':
            global.icono = url;
            conn.reply(m.chat, '✐ El ícono fue actualizado a: ' + url, m);
            break;
        default:
            conn.reply(m.chat, '✧ Comando no reconocido.', m);
            break;
    }
};

handler.help = ['setbanner1 <URL>', 'setbanner2 <URL>', 'setbanner3 <URL>', 'seticon <URL>'];
handler.tags = ['main'];
handler.command = ['setbanner1', 'setbanner2', 'setbanner3', 'seticon'];
handler.register = true;
handler.run = handler;

export default handler;
