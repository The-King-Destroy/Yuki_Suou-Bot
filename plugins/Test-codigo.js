let handler = async (m, { conn, text }) => {
    let amount = parseInt(text.trim());

    if (isNaN(amount) || amount <= 0) {
        return conn.reply(m.chat, 'Por favor, ingrese una cantidad válida de créditos.', m);
    }

    let code = Math.random().toString(36).substring(2, 10).toUpperCase();

    if (!global.db.data.codes) global.db.data.codes = {};
    global.db.data.codes[code] = { credits: amount, claimedBy: [] };

    conn.reply(m.chat, `Código generado: ${code}\nEste código puede ser canjeado por ${amount} créditos y puede ser utilizado por 5 personas.`, m);
}

handler.help = ['codigo <cantidad de créditos>'];
handler.tags = ['owner'];
handler.command = ['codigo']
handler.rowner = true;

export default handler;