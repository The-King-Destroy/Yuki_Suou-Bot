import yts from 'yt-search'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
let limit = 320;
let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    
    let msgg = `*[🌹] Complementa tu dedicatoria con alguna canción y una mención.*\n\n_🔗.- Ejemplo:_ ${usedPrefix}dedicar enemy tommoee profitt @${m.sender.split('@')[0]}.`;
    if (!text) return conn.sendMessage(m.chat, { text: msgg,  mentions: conn.parseMention(msgg) }, {quoted: m});
    
  let chat = global.db.data.chats[m.chat]
  let res = await yts(text)
  let vid = res.videos[0]
  if (!vid) throw `*[✨] Petición no encontrada.* _Intenta nuevamente_`
  let isVideo = /vid$/.test(command)
  try {
  let q = isVideo ? '360p' : '128kbps' 
  let v = vid.url
  let yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
  let dl_url = await (isVideo ? yt.video[q].download() : yt.audio[q].download())
  let title = await yt.title
  let size = await (isVideo ? yt.video[q].fileSizeH : yt.audio[q].fileSizeH)
  
   let play = `*[🌟] @${who.split('@')[0]}, Te hicieron una dedicatoria:*\n
   *☊.- 𝚃𝚒́𝚝𝚞𝚕𝚘: ${vid.title}*\n
_💫.- Dedicatoria hecha por:_ *@${m.sender.split('@')[0]}.*`;

conn.sendMessage(m.chat, { image: { url: vid.thumbnail }, caption: play, mentions: conn.parseMention(play)}, {quoted: m});
//conn.sendFile(m.chat, vid.thumbnail, 'play', play, m)

if (size.split('MB')[0] >= limit) return m.reply(`*『  𝐘 𝐮 𝐤 𝐢 _ 𝐒 𝐮 𝐨 𝐮 - 𝐁 𝐨 𝐭  』*\n\n*🜵.-𝙿𝚎𝚜𝚘:* ${size}\n*🝓.-𝙲𝚊𝚕𝚒𝚍𝚊𝚍:* ${q}\n\n*[🌹]* 𝙴𝚕 𝚊𝚛𝚌𝚑𝚒𝚟𝚘 𝚜𝚘𝚕𝚒𝚌𝚒𝚝𝚊𝚍𝚘 𝚜𝚞𝚙𝚎𝚛𝚊 𝚎𝚕 𝚕í𝚖𝚒𝚝𝚎 𝚍𝚎 𝚍𝚎𝚜𝚌𝚊𝚛𝚐𝚊. +${limit} 𝚖𝚋*`) 
      
if (size.includes('GB')) return m.reply(`*『  𝐘 𝐮 𝐤 𝐢 _ 𝐒 𝐮 𝐨 𝐮 - 𝐁 𝐨 𝐭  』*\n\n*🜵.-𝙿𝚎𝚜𝚘:* ${size}\n*🝓.-𝙲𝚊𝚕𝚒𝚍𝚊𝚍:* ${q}\n\n*[✨]* 𝙴𝚕 𝚊𝚛𝚌𝚑𝚒𝚟𝚘 𝚜𝚘𝚕𝚒𝚌𝚒𝚝𝚊𝚍𝚘 𝚜𝚞𝚙𝚎𝚛𝚊 𝚎𝚕 𝚕í𝚖𝚒𝚝𝚎 𝚍𝚎 𝚍𝚎𝚜𝚌𝚊𝚛𝚐𝚊. +${limit} 𝚖𝚋*`)   
	  conn.sendFile(m.chat, dl_url, title + '.mp' + (3 + /vid$/.test(command)), ``, m, false, { mimetype: isVideo ? '' : 'audio/mpeg', asDocument: false })
		
    } catch {
        console.log('/////////////////////////////////\nEsta mrd no jala todo culpa de Maduro y su puto gobierno Chavista\n/////////////////////////////////');
		m.reply(global.errori)
    }

}
handler.tags = ['descargas']
handler.command = ['dedicar', 'dedicatoria', 'dd']

export default handler