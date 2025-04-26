/* 
❀ Codígo creado por Destroy
✧ https://github.com/The-King-Destroy/Yuki_Suou-Bot.git 
*/

import fs from 'fs'
import path from 'path'

let handler = async (m, { conn, usedPrefix }) => {
    let who = m.mentionedJid.length > 0 ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : m.sender)
    let name = conn.getName(who)
    let name2 = conn.getName(m.sender)

    let str = m.mentionedJid.length > 0 || m.quoted 
        ? `\`${name2}\` abrazo a \`${name || who}\` (づ˶•༝•˶)づ♡` 
        : `\`${name2}\` se abrazó a sí mismo/a (づ˶•༝•˶)づ♡`
    
    if (m.isGroup) {
        let pp = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866775883.mp4'
        let pp2 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866762669.mp4'
        let pp3 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866810774.mp4'
        let pp4 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866805671.mp4'
        let pp5 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866790418.mp4'
        let pp6 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866782428.mp4'
        let pp7 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866769477.mp4'
        let pp8 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866846247.mp4'
        let pp9 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866839926.mp4'
        let pp10 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866831885.mp4'
        let pp11 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866829226.mp4'
        let pp12 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866817182.mp4'
        let pp13 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745603436585.mp4'
        let pp14 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745603441507.mp4'
        let pp15 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745603433572.mp4'
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10, pp11, pp12, pp13, pp14, pp15]
        const video = videos[Math.floor(Math.random() * videos.length)]
        
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, ptt: true, mentions: [who] }, { quoted: m })
    }
}

handler.help = ['hug']
handler.tags = ['anime']
handler.command = ['hug', 'abrazar']
handler.group = true

export default handler