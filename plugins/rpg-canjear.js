let handler = async (m, { conn, text }) => {
    let code = text.trim().toUpperCase();

    if (!code) {
        return conn.reply(m.chat, `${emoji} Por favor, ingrese un código para canjear.`, m);
    }

    let codesDB = global.db.data.codes || {};
    let user = global.db.data.users[m.sender];

    if (!codesDB[code]) {
        return conn.reply(m.chat, `${emoji2} Código no válido.`, m);
    }

    if (codesDB[code].claimedBy.includes(m.sender)) {
        return conn.reply(m.chat, `${emoji2} Ya has canjeado este código.`, m);
    }

    if (codesDB[code].claimedBy.length >= 5) {
        return conn.reply(m.chat, `${emoji2} Este código fue agotado completamente... Espera a que el creador ponga otro código.`, m);
    }

    user.coin += codesDB[code].coin;
    codesDB[code].claimedBy.push(m.sender);

    let remaining = 50 - codesDB[code].claimedBy.length;

    conn.reply(m.chat, `${emoji} Has canjeado el código con éxito. Has recibido ${codesDB[code].coin} ${moneda}.\nQuedan ${remaining} vacantes para canjear el código.`, m);
}

handler.help = ['canjear <código>'];
handler.tags = ['economia'];
handler.command = ['canjear'];
handler.group = true;
handler.register = true;

export default handler;
