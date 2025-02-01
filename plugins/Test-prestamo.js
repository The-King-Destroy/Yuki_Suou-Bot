import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    let user = global.db.data.users[m.sender];

    const prestamos = {
        100: 2 * 60 * 60 * 1000,
        300: 3 * 60 * 60 * 1000,
        600: 4 * 60 * 1000,
        1200: 5 * 60 * 60 * 1000,
        2400: 6 * 60 * 60 * 1000,
        4800: 7 * 60 * 60 * 1000,
    };

    if (command === 'prestamo') {
        if (user.coin < 20 || user.coin >= 300) {
            return conn.reply(m.chat, `Este comando puede ser usado pasando los 20 ${moneda}.`, m);
        }

        let monto = parseInt(text);
        if (!prestamos[monto]) {
            return conn.reply(m.chat, 
                `Por favor elige una cantidad válida para el préstamo\n\n` +
                `Estos son los préstamos disponibles:\n` +
                `100  =  tiempo a pagar 2 horas\n` +
                `300  =  tiempo a pagar 3 horas\n` +
                `600  =  tiempo a pagar 4 horas\n` +
                `1200  =  tiempo a pagar 5 horas\n` +
                `2400  =  tiempo a pagar 6 horas\n` +
                `4800  =  tiempo a pagar 7 horas\n\n Ejemplo: .prestamo 100`, m);
        }

        if (user.prestamo && user.prestamo.monto > 0) {
            return conn.reply(m.chat, 'Ya tienes un préstamo pendiente. Debes pagarlo antes de solicitar otro.', m);
        }

        user.coin += monto;
        user.prestamo = {
            monto: monto,
            fechaPago: Date.now() + prestamos[monto],
            descuentoActivo: false
        };

        conn.reply(m.chat, `Has recibido un préstamo de ${monto} ${moneda}. Debes pagarlo en ${prestamos[monto] / (60 * 60 * 1000)} horas.\n\n.pagar < cantidad >  para pagar el prestamo`, m);

        setTimeout(() => {
            if (user.prestamo.monto > 0) {
                conn.reply(m.chat, `@${m.sender.split('@')[0]} usted no pagó su préstamo en el tiempo indicado, los ${moneda} que gane se les descontará gracias...`, null, { mentions: [m.sender] });
                user.prestamo.descuentoActivo = true;
            }
        }, prestamos[monto]);
    } else if (command === 'pagar') {
        let cantidad = parseInt(text);

        if (!user.prestamo || user.prestamo.monto <= 0) {
            return conn.reply(m.chat, 'No tienes préstamos pendientes por pagar.', m);
        }

        if (isNaN(cantidad) || cantidad <= 0) {
            return conn.reply(m.chat, `Uso: ${usedPrefix}${command} <cantidad>\n\nTu deuda actual es de ${user.prestamo.monto} ${moneda}.`, m);
        }

        if (user.coin < cantidad) {
            return conn.reply(m.chat, `No tienes suficientes ${moneda} para pagar esa cantidad. Necesitas ${user.prestamo.monto} ${moneda} para saldar tu deuda.`, m);
        }

        if (cantidad >= user.prestamo.monto) {
            user.coin -= user.prestamo.monto;
            user.prestamo = {};
            conn.reply(m.chat, 'Su préstamo fue pagado con éxito. No tiene deudas.', m);
        } else {
            user.coin -= cantidad;
            user.prestamo.monto -= cantidad;
            conn.reply(m.chat, `Has pagado ${cantidad} ${moneda}. Tu deuda restante es de ${user.prestamo.monto} ${moneda}.`, m);
        }
    }
}

let handlerCreditInterceptor = async (user, coinGained) => {
    if (user.prestamo && user.prestamo.descuentoActivo) {
        if (coinGained >= user.prestamo.monto) {
            user.coin += (coinGained - user.prestamo.monto);
            user.prestamo = {};
        } else {
            user.prestamo.monto -= coinGained;
        }
    } else {
        user.coin += coinGained;
    }
};

handler.help = ['prestamo <cantidad>', 'pagar <cantidad>'];
handler.tags = ['econ'];
handler.command = ['pagar', 'prestamo'];
handler.group = true;
handler.register = true;

export default handler;
