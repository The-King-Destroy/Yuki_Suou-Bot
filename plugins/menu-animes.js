import fetch from 'node-fetch';
const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  try {
    const pp = imagen2;
    // let vn = './media/menu.mp3'
    const img = './Menu3.jpg';
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

 await conn.sendMessage(m.chat, { react: { text: '🍨', key: m.key } })


const document = doc[Math.floor(Math.random() * doc.length)];
 const str = `╭━━━(❀)❝┊𝕸𝖊𝖓𝖚 𝕬𝖓𝖎𝖒𝖊┊❝(❀)
┣⟣❥🌸  _!animelink_
┣⟣❥🌸  _!amv 1/2_
┣⟣❥🌸  _!sakurita_
┣⟣❥🌸  _!karolg_
┣⟣❥🌸  _!antiguo_
┣⟣❥🌸  _!lolivid_
┣⟣❥🌸  _!loli_
┣⟣❥🌸  _!ppcouple_
┣⟣❥🌸  _!neko_
┣⟣❥🌸  _!waifu_
┣⟣❥🌸  _!akira_
┣⟣❥🌸  _!akiyama_
┣⟣❥🌸  _!anna_
┣⟣❥🌸  _!asuna_
┣⟣❥🌸  _!ayuzawa_
┣⟣❥🌸  _!boruto_
┣⟣❥🌸  _!chiho_
┣⟣❥🌸  _!chitoge_
┣⟣❥🌸  _!deidara_
┣⟣❥🌸  _!erza_
┣⟣❥🌸  _!elaina_
┣⟣❥🌸  _!eba_
┣⟣❥🌸  _!emilia_
┣⟣❥🌸  _!hestia_
┣⟣❥🌸  _!hinata_
┣⟣❥🌸  _!inori_
┣⟣❥🌸  _!isuzu_
┣⟣❥🌸  _!itachi_
┣⟣❥🌸  _!itori_
┣⟣❥🌸  _!kaga_
┣⟣❥🌸  _!kagura_
┣⟣❥🌸  _!kaori_
┣⟣❥🌸  _!keneki_
┣⟣❥🌸  _!kotori_
┣⟣❥🌸  _!kurumi_
┣⟣❥🌸  _!madara_
┣⟣❥🌸  _!mikasa_
┣⟣❥🌸  _!miku_
┣⟣❥🌸  _!minato_
┣⟣❥🌸  _!naruto_
┣⟣❥🌸  _!nezuko_
┣⟣❥🌸  _!sagiri_
┣⟣❥🌸  _!sasuke_
┣⟣❥🌸  _!sakura_
┣⟣❥🌸  _!cosplay_
┣⟣❥🌸  _!infoanime_
┣⟣❥🌸  _!messi_
┣⟣❥🌸  _!cr7_
┣⟣❥🌸  _!waifu_
┣⟣❥🌸  _!lolicon_
┗━━━━━━━━━━━━━━━━┛`.trim();     if (m.isGroup) { 
 // await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, { type: 'audioMessage', ptt: true})
      const fkontak2 = {'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'}, 'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, 'participant': '0@s.whatsapp.net'};
      conn.sendMessage(m.chat, {image: pp, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net')}, {quoted: m});
    } else {
      // await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, { type: 'audioMessage', ptt: true})
      const fkontak2 = {'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'}, 'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, 'participant': '0@s.whatsapp.net'};
      conn.sendMessage(m.chat, {image: pp, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net')}, {quoted: fkontak2});
    }
  } catch {
    conn.reply(m.chat, '*⚙️ Error Avisele Al Creador!.*', m);
  }
};
handler.command = ['animesmenu','menuanime'];
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
