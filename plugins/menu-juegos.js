import fetch from 'node-fetch';
const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  try {
    const pp = imagen7;
    // let vn = './media/menu.mp3'
    const img = './Menu2.jpg';
    const d = new Date(new Date + 3600000);
    const locale = 'es-ES';
    const week = d.toLocaleDateString(locale, {weekday: 'long'});
    const date = d.toLocaleDateString(locale, {day: '2-digit', month: '2-digit', year: 'numeric'});
    const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);
    const user = global.db.data.users[m.sender];
    const {money, joincount} = global.db.data.users[m.sender];
    const {exp, limit, level, role} = global.db.data.users[m.sender];
    const rtotalreg = Object.values(global.db.data.users).filter((user) => user.registered == true).length;
    const rtotal = Object.entries(global.db.data.users).length || '0'
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(850);
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
    const doc = ['pdf', 'zip', 'vnd.openxmlformats-officedocument.presentationml.presentation', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.openxmlformats-officedocument.wordprocessingml.document'];

 await conn.sendMessage(m.chat, { react: { text: '🎮', key: m.key } })


const document = doc[Math.floor(Math.random() * doc.length)];
 const str = `┏━━⪩「 𝕯𝖎𝖛𝖊𝖗𝖘𝖎ó𝖓 乂 𝕵𝖚𝖊𝖌𝖔𝖘 」⪨
┃✧ _!amistad_
┃✧ _!character_
┃✧ _!darrw_
┃✧ _!obtenidos_
┃✧ _!c_
┃✧ _!robarpersonaje_
┃✧ _!rw_
┃✧ _!toprw_
┃✧ _!gay <@tag> | <nombre>_
┃✧ _!lesbiana <@tag> | <nombre>_
┃✧ _!pajero <@tag> | <nombre>_
┃✧ _!pajera <@tag> | <nombre>_
┃✧ _!puto <@tag> | <nombre>_
┃✧ _!puta <@tag> | <nombre>_
┃✧ _!manco <@tag> | <nombre>_
┃✧ _!manca <@tag> | <nombre>_
┃✧ _!rata <@tag> | <nombre>_
┃✧ _!prostituta <@tag> | <nombre>_
┃✧ _!prostituto <@tag> | <nombre>_
┃✧ _!casarse @tag_
┃✧ _!acertijo_
┃✧ _!paises_
┃✧ _!cancion_
┃✧ _!pista_
┃✧ _!peliculas_
┃✧ _!ahorcado_
┃✧ _!math <mode>_
┃✧ _!aplauso_
┃✧ _!marron_
┃✧ _!suicide_
┃✧ _!chupalo_
┃✧ _!ppt_
┃✧ _!pvp_
┃✧ _!reto_
┃✧ _!sopa_
┃✧ _!buscarpalabras_
┃✧ _!verdad_
┃✧ _!consejo_
┃✧ _!divorciarse @tag_
┃✧ _!doxear_
┃✧ _!doxxing <nombre> | <@tag>_
┃✧ _!formarpareja_
┃✧ _!formarpareja5_
┃✧ _!horny_
┃✧ _!hornycard_
┃✧ _!huevo @user_
┃✧ _!iqtest_
┃✧ _!marica_
┃✧ _!meme_
┃✧ _!minovia @user_
┃✧ _!morse *<encode|decode>*_
┃✧ _!nombreninja *<texto>*_
┃✧ _!pajeame_
┃✧ _!personalidad_
┃✧ _!piropo_
┃✧ _!pokedex *<pokemon>*_
┃✧ _!pregunta_
┃✧ _!ship_
┃✧ _!love_
┃✧ _!simpcard_
┃✧ _!sorteo_
┃✧ _!itssostupid_
┃✧ _!estupido_
┃✧ _!stupid_
┃✧ _!top *<texto>*_
┃✧ _!formartrio @usuario|@usuario_
┃✧ _!waste @user_
┃✧ _!zodiac *2002 02 25*_
┗━━━━━━━━━━━━━━━━━⪩`.trim();     if (m.isGroup) { 
 // await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, { type: 'audioMessage', ptt: true})
      const fkontak2 = {'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'}, 'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, 'participant': '0@s.whatsapp.net'};
      conn.sendMessage(m.chat, {image: pp, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net')}, {quoted: m});
    } else {
      // await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, { type: 'audioMessage', ptt: true})
      const fkontak2 = {'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'}, 'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, 'participant': '0@s.whatsapp.net'};
      conn.sendMessage(m.chat, {image: pp, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net')}, {quoted: fkontak2});
    }
  } catch {
    conn.reply(m.chat, '*⚙️ Error Al Enviar!.*', m);
  }
};
handler.command = ['juegosmenu','games','juegos','menujuegos']
handler.register = true
handler.exp = 50;
handler.fail = null;
export default handler;
function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}
