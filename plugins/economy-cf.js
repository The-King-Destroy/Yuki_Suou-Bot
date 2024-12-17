let users = {};

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [eleccion, cantidad] = text.split(' ');
    if (!eleccion || !cantidad) {
        return m.reply(`🌸 Por favor, elige cara o cruz y una cantidad de Yenes para apostar.\nEjemplo: *${usedPrefix + command} cara 50*`);
    }

    eleccion = eleccion.toLowerCase();
    cantidad = parseInt(cantidad);
    if (eleccion !== 'cara' && eleccion !== 'cruz') {
        return m.reply(`🌷 Elección no válida. Por favor, elige cara o cruz.\nEjemplo: *${usedPrefix + command} cara*`);
    }

    if (isNaN(cantidad) || cantidad <= 0) {
        return m.reply(`🌸 Cantidad no válida. Por favor, elige una cantidad de Yenes para apostar.\nEjemplo: *${usedPrefix + command} cara 50*`);
    }

    let userId = m.sender;
    if (!users[userId]) users[userId] = { yenes: 100 };
    let user = global.db.data.users[m.sender];
    if (user.yenes < cantidad) {
        return m.reply(`🌸 No tienes suficientes Yenes para apostar. Tienes ${user.yenes} Yenes.`);
    }

    let resultado = Math.random() < 0.5 ? 'cara' : 'cruz';
   let mensaje = `⭐️ La moneda ha caído en `
    if (resultado === eleccion) {
        user.yenes += cantidad; 
    mensaje += `*${resultado}* y has ganado *${cantidad} Yenes*!`;
    } else {
        user.yenes -= cantidad;
        mensaje += `*${resultado}* y has perdido *${cantidad} Yenes*!`;
    }

    await conn.reply(m.chat, mensaje, m);
};

handler.help = ['cf'];
handler.tags = ['economy'];
handler.command = ['cf', 'suerte', 'caracruz'];

export default handler;
