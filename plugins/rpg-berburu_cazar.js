let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let randomaku1 = `${Math.floor(Math.random() * 5)}`;
    let randomaku2 = `${Math.floor(Math.random() * 5)}`;
    let randomaku3 = `${Math.floor(Math.random() * 5)}`;
    let randomaku4 = `${Math.floor(Math.random() * 5)}`;
    let randomaku5 = `${Math.floor(Math.random() * 5)}`;
    let randomaku6 = `${Math.floor(Math.random() * 5)}`;
    let randomaku7 = `${Math.floor(Math.random() * 5)}`;
    let randomaku8 = `${Math.floor(Math.random() * 5)}`;
    let randomaku9 = `${Math.floor(Math.random() * 5)}`;
    let randomaku10 = `${Math.floor(Math.random() * 5)}`;
    let randomaku11 = `${Math.floor(Math.random() * 5)}`;
    let randomaku12 = `${Math.floor(Math.random() * 5)}`.trim();

    let rbrb1 = (randomaku1 * 1);
    let rbrb2 = (randomaku2 * 1);
    let rbrb3 = (randomaku3 * 1);
    let rbrb4 = (randomaku4 * 1);
    let rbrb5 = (randomaku5 * 1);
    let rbrb6 = (randomaku6 * 1);
    let rbrb7 = (randomaku7 * 1);
    let rbrb8 = (randomaku8 * 1);
    let rbrb9 = (randomaku9 * 1);
    let rbrb10 = (randomaku10 * 1);
    let rbrb11 = (randomaku11 * 1);
    let rbrb12 = (randomaku12 * 1);

    let anti1 = `${rbrb1}`;
    let anti2 = `${rbrb2}`;
    let anti3 = `${rbrb3}`;
    let anti4 = `${rbrb4}`;
    let anti5 = `${rbrb5}`;
    let anti6 = `${rbrb6}`;
    let anti7 = `${rbrb7}`;
    let anti8 = `${rbrb8}`;
    let anti9 = `${rbrb9}`;
    let anti10 = `${rbrb10}`;
    let anti11 = `${rbrb11}`;
    let anti12 = `${rbrb12}`;

    let ar1 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`;
    let ar2 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`;
    let ar3 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`;
    let ar4 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`;
    let ar5 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`;
    let ar6 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`;
    let ar7 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`;
    let ar8 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`;
    let ar9 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`;
    let ar10 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`;
    let ar11 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`;
    let ar12 = `${['🪚','⛏️','🧨','💣','🔫','🔪','🗡️','🏹','🦾','🥊','🧹','🔨','🛻'].getRandom()}`;

    let hsl = `
*✧ Resultados de la caza ${conn.getName(m.sender)} ✧*

 *🐂 ${ar1} ${anti1}*			 *🐃 ${ar7} ${anti7}*
 *🐅 ${ar2} ${anti2}*			 *🐮 ${ar8} ${anti8}*
 *🐘 ${ar3} ${anti3}*			 *🐒 ${ar9} ${anti9}*
 *🐐 ${ar4} ${anti4}*			 *🐗 ${ar10} ${anti10}*
 *🐼 ${ar5} ${anti5}*			 *🐖 ${ar11} ${anti11}*
 *🐊 ${ar6} ${anti6}*		    *🐓 ${ar12} ${anti12}*`.trim();

    global.db.data.users[m.sender].banteng += rbrb1;
    global.db.data.users[m.sender].harimau += rbrb2;
    global.db.data.users[m.sender].gajah += rbrb3;
    global.db.data.users[m.sender].kambing += rbrb4;
    global.db.data.users[m.sender].panda += rbrb5;
    global.db.data.users[m.sender].buaya += rbrb6;
    global.db.data.users[m.sender].kerbau += rbrb7;
    global.db.data.users[m.sender].sapi += rbrb8;
    global.db.data.users[m.sender].monyet += rbrb9;
    global.db.data.users[m.sender].babihutan += rbrb10;
    global.db.data.users[m.sender].babi += rbrb11;
    global.db.data.users[m.sender].ayam += rbrb12;

    let time = global.db.data.users[m.sender].lastberburu + 2700000; // 45 minutos
    if (new Date - global.db.data.users[m.sender].lastberburu < 2700000) {
        return conn.sendMessage(m.chat, `𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁 𝙳𝙴𝚂𝙲𝙰𝙽𝚂𝙰 𝚄𝙽 𝙼𝙾𝙼𝙴𝙽𝚃𝙾 𝙿𝙰𝚁𝙰 𝚂𝙴𝙶𝚄𝙸𝚁 𝙲𝙰𝚉𝙰𝙽𝙳𝙾`, `⫹⫺ 𝚃𝙸𝙴𝙼𝙿𝙾 ${clockString(time - new Date())}\n${wm}`);
    }

    // Enviando el mensaje inicial
    let message = await conn.sendMessage(m.chat, hsl, { quoted: m });

    // Editar el mensaje con un resumen de los animales cazados
    setTimeout(() => {
        let resumen = `
*✧ Resumen de animales cazados ✧*

🐂 Bueyes: ${anti1}
🐅 Tigres: ${anti2}
🐘 Elefantes: ${anti3}
🐐 Cabras: ${anti4}
🐼 Osos panda: ${anti5}
🐊 Cocodrilos: ${anti6}
🐃 Búfalos: ${anti7}
🐮 Vacas: ${anti8}
🐒 Monos: ${anti9}
🐗 Jabalíes: ${anti10}
🐖 Cerdos: ${anti11}
🐓 Gallinas: ${anti12}
        `.trim();

        conn.sendMessage(m.chat, resumen, { quoted: message });
    }, 5000); // Tiempo para editar el mensaje después del envío inicial

    user.lastberburu = new Date * 1;
};

handler.help = ['caza'];
handler.tags = ['rpg'];
handler.command = /^(hunt|berburu|caza(r)?)$/i;

export default handler;

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
    }
