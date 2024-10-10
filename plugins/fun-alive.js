//Codígo creado por Destroy wa.me/584120346669

let handler = async(m, { conn, text, usedPrefix, command }) => {

    // Sound
    let name = m.pushName || conn.getName(m.sender)
    var vn = "https://raw.githubusercontent.com/davidprospero123/Musica/main/Re_Zero%20Rem%20AMV%20Edit%20_%20After%20Effects%20Edit.mp3"
    let url = "https://github.com/davidprospero123/REM-CHAM-MD"
    let murl = "https://www.youtube.com/watch?v=QIr_XOKyah0"
    let img = "https://qu.ax/sii.jpg"
    let con = { key: { fromMe: false, participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
    let doc = {
        audio: {
          url: vn
        },
        mimetype: 'audio/mp4',
        ptt: true,
        waveform:  [100, 0, 100, 0, 100, 0, 100],
        fileName: "Destroy",

        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
          title: "ESTOY VIVA Y COLEANDO :𝟹",
          body: "𝐘𝐮𝐤𝐢_𝐒𝐮𝐨𝐮-𝐁𝐨𝐭",
          thumbnailUrl: img,
          sourceUrl: 'https://whatsapp.com/channel/0029VapSIvR5EjxsD1B7hU3T',
          mediaType: 1,
          renderLargerThumbnail: true
          }}
      };

      await conn.sendMessage(m.chat, doc, { quoted: con });

    }

    handler.help = ['vives']
    handler.tags = ['fun']
    handler.command = /^(vives)$/i 

    export default handler;
