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
        ? `\`${name2}\` se da una palmada en la cara por las estupideces de \`${name || who}\` (ভ_ ভ) ރ` 
        : `\`${name2}\` se da una palmada en la cara (ভ_ ভ) ރ`
    
    if (m.isGroup) {
        let pp = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864486946.mp4'
        let pp2 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864475871.mp4'
        let pp3 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864518724.mp4'
        let pp4 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864512181.mp4'
        let pp5 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864505137.mp4'
        let pp6 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864499616.mp4'
        let pp7 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864494866.mp4'
        let pp8 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864551167.mp4'
        let pp9 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864556219.mp4'
        let pp10 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864541815.mp4'
        let pp11 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864530827.mp4'
        let pp12 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864525491.mp4'
        let pp13 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745603117511.mp4'
        let pp14 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745603121055.mp4'
        let pp15 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745603117511.mp4'
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10, pp11, pp12, pp13, pp14, pp15]
        const video = videos[Math.floor(Math.random() * videos.length)]
        
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, ptt: true, mentions: [who] }, { quoted: m })
    }
}

handler.help = ['facepalm']
handler.tags = ['anime']
handler.command = ['facepalm', 'palmada']
handler.group = true

export default handler