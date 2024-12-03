import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';
import fs from 'fs';

const loadMarriages = () => {
    if (fs.existsSync('./src/database/marry.json')) {
        const data = JSON.parse(fs.readFileSync('./src/database/marry.json', 'utf-8'));
        global.db.data.marriages = data;
    } else {
        global.db.data.marriages = {};
    }
};

var handler = async (m, { conn }) => {
    loadMarriages();

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => imagen1);
    let { premium, level, genre, birth, yenes, exp, lastclaim, registered, regTime, age, role } = global.db.data.users[m.sender];
    let username = conn.getName(who);

    let isMarried = who in global.db.data.marriages;
    let partner = isMarried ? global.db.data.marriages[who] : null;
    let partnerName = partner ? conn.getName(partner) : 'Nadie';
    let api = await axios.get(`https://deliriussapi-oficial.vercel.app/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`)
    let userNationalityData = api.data.result
    let userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido'
    
    let noprem = `
「 👤 *PERFIL DE USUARIO* 」
☁️ *Nombre:* » *${username}*
💠 *Edad:* » *${registered ? `${age} años` : '×'}*
⚧️ *Genero:* » *${birth = birth === 0 ? 'No especificado' : genre == 'Mujer' ? `${genre}` : genre == 'Hombre' ? `${genre}` : 'No especificado'}*
🎂 *Cumpleaños* » *${birth = birth === 0 ? `${birth}` : 'No especificado'}*
🌐 *Pais:* » *${userNationality}*
🌀 *Registrado:* » ${registered ? '✅': '❌'}
👩‍❤️‍👩 *Casado/a:* » *${isMarried ? partnerName : 'Nadie'}*

「 💰 *RECURSOS* 」
💴 *Yenes:* ${yenes}
🔰 *Nivel:* ${level}
✨ *Experiencia:* ${exp}
⚜️ *Rango:* ${role}
👑 *Premium:* ${premium ? '✅': '❌'}
`.trim();

    let prem = `╭──⪩ 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 ⪨
│⧼👤⧽ *ᴜsᴜᴀʀɪᴏ:* ${username}
│⧼💠⧽ *ᴇᴅᴀᴅ:* *${registered ? `${age} años` : '×'}*
│⧼⚧️⧽ *ɢᴇɴᴇʀᴏ:* *${genre = genre === 0 ? 'No especificado' : genre == 'Mujer' ? `${genre}` : genre == 'Hombre' ? `${genre}` : 'No especificado'}*
│⧼🌐⧽ *ᴘᴀɪs:* *${userNationality}*
│⧼💌⧽ *ʀᴇɢɪsᴛʀᴀᴅᴏ:* ${registered ? '✅': '❌'}
│⧼🔱⧽ *ʀᴏʟ: ᴠɪᴘ* 👑
│⧼👩‍❤️‍👩⧽ *ᴄᴀsᴀᴅᴏ:* ${isMarried ? partnerName : 'Nadie'}
╰─────────────────⪨

╭────⪩ 𝐑𝐄𝐂𝐔𝐑𝐒𝐎𝐒 ⪨
│⧼💴⧽ *ʏᴇɴᴇs:* ${yenes}
│⧼🔰⧽ *ɴɪᴠᴇʟ:* ${level}
│⧼✨⧽ *ᴇxᴘᴇʀɪᴇɴᴄɪᴀ:* ${exp}
│⧼⚜️⧽ *ʀᴀɴɢᴏ:* ${role}
╰───⪨ *𝓤𝓼𝓾𝓪𝓻𝓲𝓸 𝓓𝓮𝓼𝓽𝓪𝓬𝓪𝓭𝓸* ⪩`.trim();

    conn.sendFile(m.chat, pp, 'perfil.jpg', `${premium ? prem.trim() : noprem.trim()}`, m, rcanal, { mentions: [who] });
}

handler.help = ['profile'];
handler.register = true;
handler.group = true;
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];

export default handler;
