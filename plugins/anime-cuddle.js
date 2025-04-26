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
        ? `\`${name2}\` se acurrucó con \`${name || who}\` ꒰ঌ(˶ˆᗜˆ˵)໒꒱` 
        : `\`${name2}\` se acurrucó con sí mismo/a ꒰ঌ(˶ˆᗜˆ˵)໒꒱`
    
    if (m.isGroup) {
        let pp = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742859386813.mp4'
        let pp2 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742859394090.mp4'
        let pp3 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742859425380.mp4'
        let pp4 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742859418757.mp4'
        let pp5 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742859412296.mp4'
        let pp6 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742859406171.mp4'
        let pp7 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742859400216.mp4'
        let pp8 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742859462482.mp4'
        let pp9 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742859457148.mp4'
        let pp10 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742859450136.mp4'
        let pp11 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742859437240.mp4'
        let pp12 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742859431305.mp4'
        let pp13 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745602276418.mp4'
        let pp14 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745602283516.mp4'
        let pp15 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745602288670.mp4'
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10, pp11, pp12, pp13, pp14, pp15]
        const video = videos[Math.floor(Math.random() * videos.length)]
        
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, ptt: true, mentions: [who] }, { quoted: m })
    }
}

handler.help = ['cuddle']
handler.tags = ['anime']
handler.command = ['cuddle', 'acurrucarse']
handler.group = true

export default handler