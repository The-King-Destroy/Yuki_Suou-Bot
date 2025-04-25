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
        ? `\`${name2}\` mato a \`${name || who}\` ( ⚆ _ ⚆ )` 
        : `\`${name2}\` se mato a sí mismo/a ( ⚆ _ ⚆ )`
    
    if (m.isGroup) {
        let pp = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742868092808.mp4'
        let pp2 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742868083346.mp4'
        let pp3 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742868148234.mp4'
        let pp4 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742868143055.mp4'
        let pp5 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742868114367.mp4'
        let pp6 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742868107676.mp4'
        let pp7 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742868100525.mp4'
        let pp8 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742868196115.mp4'
        let pp9 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742868174088.mp4'
        let pp10 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742868169192.mp4'
        let pp11 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742868160846.mp4'
        let pp12 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742868154174.mp4'
        let pp13 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745603772523.mp4'
        let pp14 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745603785046.mp4'
        let pp15 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745603777725.mp4'
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10, pp11, pp12, pp13, pp14, pp15]
        const video = videos[Math.floor(Math.random() * videos.length)]
        
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, ptt: true, mentions: [who] }, { quoted: m })
    }
}

handler.help = ['kill']
handler.tags = ['anime']
handler.command = ['kill', 'matar']
handler.group = true

export default handler