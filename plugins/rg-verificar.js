import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';
import moment from 'moment-timezone';

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;

let handler = async function (m, { conn, text, usedPrefix, command }) {
    let user = global.db.data.users[m.sender];
    let name2 = conn.getName(m.sender);
    let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg');
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => 'https://files.catbox.moe/xr2m6u.jpg');
    let bio = 0, fechaBio;
    let sinDefinir = '😿 Es privada';
    let biografia = await conn.fetchStatus(m.sender).catch(() => null);
    
    if (!biografia || !biografia[0] || biografia[0].status === null) {
        bio = sinDefinir;
        fechaBio = "Fecha no disponible";
    } else {
        bio = biografia[0].status || sinDefinir;
        fechaBio = biografia[0].setAt ? new Date(biografia[0].setAt).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Fecha no disponible";
    }
    
    if (user.registered === true) throw `*『✦』Ya estás registrado, para volver a registrarte, usa el comando: #unreg*`;
    if (!Reg.test(text)) throw `*『✦』El comando ingresado es incorrecto, úselo de la siguiente manera:*\n\n#reg *Nombre.edad*\n\n\`\`\`Ejemplo:\`\`\`\n#reg *${name2}.10000*`;
    
    let [_, name, splitter, age] = text.match(Reg);
    if (!name) throw '*『✦』No puedes registrarte sin nombre, el nombre es obligatorio. Inténtalo de nuevo.*';
    if (!age) throw '*『✦』No puedes registrarte sin la edad, la edad es opcional. Inténtalo de nuevo.*';
    if (name.length >= 30) throw '*『✦』El nombre no debe tener más de 30 caracteres.*';
    
    age = parseInt(age);
    if (age > 10000) throw '*『😏』Viejo/a Sabroso/a*';
    if (age < 5) throw '*『🍼』Ven aquí, te adoptarè!!*';
    
    user.name = name.trim();
    user.age = age;
    user.descripcion = bio;
    user.regTime = +new Date();
    user.registered = true;
    global.db.data.users[m.sender].coin += 10;
    global.db.data.users[m.sender].exp += 245;
    global.db.data.users[m.sender].joincount += 5;
    
    let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20);
    m.react('📩');
    
let regbot = `👤 𝗥 𝗘 𝗚 𝗜 𝗦 𝗧 𝗥 𝗔 𝗗 𝗢 👤
•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•
「☁️」𝗡𝗼𝗺𝗯𝗿𝗲 » ${name}
「⭐」𝗘𝗱𝗮𝗱 » ${age} años
•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•
「🎁」𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗮𝘀:
• 💸 ${moneda} » 15
• ✨ Experiencia » 245
• ⚜️ Tokens » 12
•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•
ᴠᴇʀɪғɪᴄᴀ ᴛᴜ ʀᴇɢɪᴛʀᴏ ᴀϙᴜɪ:
${channel2} 
•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•
${packname}`;
    
    await conn.sendMessage(m.chat, {
        text: regbot,
        contextInfo: {
            externalAdReply: {
                title: '✧ Usuario Verificado ✧',
                body: textbot,
                thumbnailUrl: pp,
                sourceUrl: channel,
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
    
    let chtxt = `👤 *𝚄𝚜𝚎𝚛* » ${m.pushName || 'Anónimo'}
🗂 *𝚅𝚎𝚛𝚒𝚏𝚒𝚌𝚊𝚌𝚒𝚘́𝚗* » ${user.name}
⭐️ *𝙴𝚍𝚊𝚍* » ${user.age} años
👀 *𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚌𝚒𝚘𝚗* » ${user.descripcion} 
⏳ *𝚄𝚕𝚝𝚒𝚖𝚊 𝙼𝚘𝚍𝚒𝚏𝚒𝚌𝚊𝚝𝚒𝚘𝚗* » ${fechaBio}
📆 *𝙵𝚎𝚌𝚑𝚊* » ${moment.tz('America/Bogota').format('DD/MM/YY')}
☁️ *𝙽𝚞𝚖𝚎𝚛𝚘 𝚍𝚎 𝚛𝚎𝚐𝚒𝚜𝚝𝚛𝚘* »
⤷ ${sn}`;

    await conn.sendMessage(global.idchannel, {
        text: chtxt,
        contextInfo: {
            externalAdReply: {
                title: "【 🔔 𝐍𝐎𝐓𝐈𝐅𝐈𝐂𝐀𝐂𝐈𝐎́𝐍 🔔 】",
                body: '🥳 ¡𝚄𝚗 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚗𝚞𝚎𝚟𝚘 𝚎𝚗 𝚖𝚒 𝚋𝚊𝚜𝚎 𝚍𝚎 𝚍𝚊𝚝𝚘𝚜!',
                thumbnailUrl: perfil,
                sourceUrl: redes,
                mediaType: 1,
                showAdAttribution: false,
                renderLargerThumbnail: false
            }
        }
    }, { quoted: null });
};

handler.help = ['reg'];
handler.tags = ['rg'];
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'];

export default handler;