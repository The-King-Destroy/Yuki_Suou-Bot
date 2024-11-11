import fs from 'fs';
import {sticker} from '../lib/sticker.js';
const handler = (m) => m;
handler.all = async function(m) {

const chat = global.db.data.chats[m.chat];
if (chat.isBaneed) return
if (/^bot$/i.test(m.text)) {
conn.reply(m.chat, `🌹 ¡Hola! Soy 𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉, en que puedo ayudarte hoy?\n\n✰ Usa *!menu* para ver mis comandos.`, m, rcanal, )
}
/*if (/^niño|piña|Niño Piña$/i.test(m.text)) {
conn.reply(m.chat, `*Niño Piña 🍍 es la perrita de mi creador* 🥵🥵`, m, rcanal, )
}
if (/^tesis|I'am Fz'|fz|iam|iam fz$/i.test(m.text)) {
conn.reply(m.chat, `*I'm fz' 🔥 le mama la verga a mi creador* 🥵🥵`, m, rcanal, )
}
/*if (/^sexo$/i.test(m.text)) {
conn.reply(m.chat, `*pervertido* 🫣`, m, rcanal, )
}
if (/^a$/i.test(m.text)) {
conn.reply(m.chat, `*rroz y pollo* 😄👌`, m, rcanal, )
}
if (/^Destroy|destroy|wilker|Wilker/i.test(m.text)) {
conn.reply(m.chat, `*ⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜 Es Mi Creador, Respeta!*`, m, rcanal, )
}*/
/*if (/^porno|cp|xxx|gore|nopor/i.test(m.text)) {
conn.reply(m.chat, `*Escucha maldita sabandija ni se te ocurra enviar ese tipo de contenido 🤬*`, m, rcanal, )
}*/
if (/^canal$/i.test(m.text)) {
conn.reply(m.chat, `*🌹 Hola Nos ayudas a cumplir nuestra meta de 500 seguidores 🍒*

 https://whatsapp.com/channel/0029VapSIvR5EjxsD1B7hU3T
 \n> *Gracias por Preferirnos 𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉 🌹* `, m, rcanal, )
}
/*if (/^Conoces a Legendary|Legendary|Diomar/i.test(m.text)) { 
conn.reply(m.chat, `*Si Lo conozco, Es Una Zorra caliente 🥵❤️‍🔥*`, m, rcanal, )
}
if (/^Bot de mrd/i.test(m.text)) {
conn.reply(m.chat, `*Ya te dieron De Comer?🥵🍆*`, m, rcanal, )
}*/
if (/^Bot de mierda/i.test(m.text)) {
conn.reply(m.chat, `*No digas mamadas, Meriyein*`, m, rcanal, )
}
if (/^English|inglés$/i.test(m.text)) {
conn.reply(m.chat, `*The first one to speak is gay*`, m, rcanal, )
}
/*if (!chat.isBanned && m.text.match(/(te amo|teamo|te amo bot|te amo megumin)/gi)) {
  conn.sendMessage(m.chat, {
 stiker:{ url: global.stickeramor}
}, { quoted: fakegif2});
}*/
if (/^bug$/i.test(m.text)) {
conn.reply(m.chat, `*tu mamá we* 😹`, m, rcanal, )
}
if (/^Como puedo tener bot|Quiero un bot/i.test(m.text)) {
conn.reply(m.chat, `*¡Contacta Al Creador!*
> *wa.me/584120346669*`, m, rcanal, )
}
if (/^Bot en decadencia|En decadencia|Decadencia/i.test(m.text)) {
conn.reply(m.chat, `*Calla 🍆🥵*`, m, rcanal, )
}
/*if (/^pene$/i.test(m.text)) {
conn.reply(m.chat, `*comes* 😹`, m, rcanal, )
}*/
if (/^reglas$/i.test(m.text)) {
conn.reply(m.chat, `**R꙰EGLAS DEL GRUP❍ꪜ*

📸 *Presentarse*
🚫𝗡𝗼 𝗘𝗻𝘃𝗶𝗮𝗿 𝗣𝗩 𝘀𝗶𝗻 𝗽𝗲𝗿𝗺𝗶𝘀𝗼
🚫𝗡𝗼 𝘃𝗶𝗱𝗲𝗼🎥 𝗣𝗼𝗿𝗻𝗼𝗴𝗿𝗮𝗳𝗶𝗮 𝗜𝗻𝗳𝗮𝗻𝘁𝗶𝗹 𝘆 𝗱𝗲 𝗮𝗱𝘂𝗹𝘁𝗼

━━━━━━V͇̿I͇̿P͇̿━━━━━━

⚜️🔰🅿🆁🅾🅷🅸🅱🅸🅳🅾⚜️𝗡𝗼 𝗣𝗼𝗿𝗻𝗼𝗴𝗿𝗮𝗳𝗶𝗮 
➬⃢⃞⃟🔞𝗡𝗼 𝗺𝗲𝗻𝗼𝗿𝗲𝘀 𝗱𝗲 16 años
➬⃢⃞⃟🩸𝗡𝗼 𝘃𝗶𝗱𝗲𝗼𝘀 𝗦𝗮𝗻𝗴𝗿𝗶𝗲𝗻𝘁𝗼𝘀
➬⃢⃞⃟🚫𝗡𝗼 𝗣𝗼𝗿𝗻𝗼𝗴𝗿𝗮𝗳𝗶𝗰𝗼𝘀
➬⃢⃞⃟❌𝗡𝗼 𝗠𝗮𝗻𝗱𝗮𝗿 𝗣𝗩 𝘀𝗶𝗻 𝗽𝗲𝗿𝗺𝗶𝘀𝗼 
➬⃢⃞⃟👀𝗡𝗼 𝗺𝗶𝗿𝗼𝗻𝗲𝘀
➬⃢⃞⃟👾𝗡𝗼 𝘀𝗼𝗽𝗹𝗼𝗻𝗲𝘀
➬⃢⃞⃟👻𝗡𝗼 𝗳𝗮𝗻𝘁𝗮𝘀𝗺𝗮
➬⃢⃞⃟📱🚫𝗡𝗼 𝗦𝗽𝗮𝗺
➬⃢⃞⃟🦠𝗩𝗶𝗿𝘂𝘀 𝘆 𝗧𝗿𝗮𝗯𝗮𝘀
🚫NO ENLACES 🔗
➬⃢⃞⃟💣𝗦𝗶 𝗻𝗼 𝗰𝘂𝗺𝗽𝗹𝗲 𝘁𝗲 𝗱𝗮𝗻 𝗕𝗮𝗺💣

█║║██║║██║║██║║██║║█
✧･ﾟ: *✧･Atte.

☆ ፝͜★ৡ͜͡✞*𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉*➵͡☠️⃪̸ੵ᷒ᰰ↱

✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:*`, m, rcanal, )
}
return !0;
};
export default handler;
