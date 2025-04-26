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
        ? `\`${name2}\` mordió a \`${name || who}\` ≽^•⩊•^≼` 
        : `\`${name2}\` se mordió a sí mismo/a ≽^•⩊•^≼`
    
    if (m.isGroup) {
        let pp = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789640809.mp4'
        let pp2 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789647443.mp4'
        let pp3 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789653530.mp4'
        let pp4 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789660235.mp4'
        let pp5 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789666686.mp4'
        let pp6 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789604757.mp4'
        let pp7 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789611045.mp4'
        let pp8 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789617091.mp4'
        let pp9 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789623357.mp4'
        let pp10 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789629746.mp4'
        let pp11 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789592139.mp4'
        let pp12 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789597656.mp4'
        let pp13 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745595529576.mp4'
        let pp14 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745595524733.mp4'
        let pp15 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745595520348.mp4'
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10, pp11, pp12, pp13, pp14, pp15]
        const video = videos[Math.floor(Math.random() * videos.length)]
        
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, ptt: true, mentions: [who] }, { quoted: m })
    }
}

handler.help = ['bite']
handler.tags = ['anime']
handler.command = ['bite', 'morder']
handler.group = true

export default handler