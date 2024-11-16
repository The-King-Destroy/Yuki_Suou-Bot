import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix }) => {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;

    if (!(who in global.db.data.users)) {
        return conn.reply(m.chat, '👤 El usuario no se encuentra en mi base de Datos.', m);
    }

    let user = global.db.data.users[who];
    let name = conn.getName(who);

    // Verificación de estado premium
    let premium = user.premium ? '✅' : '❌';

    let text = `╭━〔 Inventario de ${name} 〕⬣\n` +
               `┋ 🍪 *Cookies en Cartera:* ${user.cookies || 0} 🍪\n` +  // Cookies
               `┋ 🏦 *Cookies en Banco:* ${user.bank || 0} 🍪\n` +  // Cookies en banco
               `┋ 💎 *Esmeraldas:* ${user.emerald || 0}\n` +  // Esmeraldas
               `┋ 🔩 *Hierro:* ${user.iron || 0}\n` +  // Hierro
               `┋ 🏅 *Oro:* ${user.gold || 0}\n` +  // Oro
               `┋ 🕋 *Carbón:* ${user.coal || 0}\n` +  // Carbón
               `┋ 🪨 *Piedra:* ${user.stone || 0}\n` +  // Piedra
               `┋ 💰 *Experiencia:* ${user.exp || 0}\n` +  // Experiencia
               `┋ ❤️ *Salud:* ${user.health || 100}\n` +  // Salud
               `┋ 💎 *Diamantes:* ${user.diamond || 0}\n` +  // Diamantes
               `┋ 🪙 *YukiCoins:* ${user.money || 0}\n` +  // YukiCoins
               `┋ 🍬 *Dulces:* ${user.candies || 0}\n` +  // Dulces (regalos de Halloween)
               `┋ 🎁 *Regalos:* ${user.gifts || 0}\n` +  // Regalos de Halloween
               `┋ 🎟️ *Tokens:* ${user.joincount || 0}\n` +  // Tokens
               `┋ ⚜️ *Premium:* ${premium}\n` +  // Estado premium
               `┋ 🥤 *Pociones:* ${user.potion || 0}\n` +  // Pociones
               `┋ 🐶 *Perros:* ${user.dog || 0}\n` +  // Cantidad de perros
               `┋ 🐂 *Vacas Capturadas:* ${user.banteng || 0}\n` +  // Vacas
               `┋ 🐅 *Tigres Capturados:* ${user.harimau || 0}\n` +  // Tigres
               `┋ 🐘 *Elefantes Capturados:* ${user.gajah || 0}\n` +  // Elefantes
               `┋ 🐼 *Pandas Capturados:* ${user.panda || 0}\n` +  // Pandas
               `┋ 🐊 *Cocodrilos Capturados:* ${user.buaya || 0}\n` +  // Cocodrilos
               `┋ 🦙 *Llamas Capturadas:* ${user.kerbau || 0}\n` +  // Llamas
               `┋ 🐮 *Búfalos Capturados:* ${user.sapi || 0}\n` +  // Búfalos
               `┋ 🐒 *Monos Capturados:* ${user.monyet || 0}\n` +  // Monos
               `┋ 🐖 *Cerdos Capturados:* ${user.babi || 0}\n` +  // Cerdos
               `┋ 🐓 *Gallinas Capturadas:* ${user.ayam || 0}\n` +  // Gallinas
               `┋ 📅 *Última Actividad de Caza:* ${user.lastHunt || 'Nunca'}\n` +  // Última actividad de caza
               `┋ ⏱️ *Tiempo de Recarga:* ${user.huntCooldown || 'No disponible'}\n` +  // Tiempo de recarga
               `┋ 📅 *Fecha:* ${new Date().toLocaleString('id-ID')}\n` +
               `╰━━━━━━━━━━━━⬣`;

    await conn.reply(m.chat, text, m);
}

handler.help = ['inventario', 'inv']
handler.tags = ['rpg']
handler.command = ['inventario', 'inv'] 
handler.register = true 

export default handler;