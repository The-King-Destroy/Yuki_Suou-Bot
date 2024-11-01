import fg from 'api-dylux' 
let free = 500 // limite de descarga
let handler = async (m, { conn, args, usedPrefix, command, isOwner, isPrems }) => {

	if (!args[0]) throw `🌹 ${mssg.noLink('Google Drive')}`
	m.react(rwait) 
	
	try {
	let res = await fg.GDriveDl(args[0])

	let limit = isPrems || isOwner ? prem : free
    let isLimit = limit * 1024 < res.fileSizeB
	 await m.reply(`
≡ *Google Drive DL*

*📌${mssg.name}:* ${res.fileName}
*⚖️${mssg.size}:* ${res.fileSize}
${isLimit ? `\n❖ ${mssg.limitdl} *+${free} MB* ${mssg.limitdlTe} *${prem} MB*` : ''} 
`)
		
	if(!isLimit) conn.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m })
	m.react(done)
   } catch {
	m.reply(mssg.error) 
  }
}
handler.help = ['gdrive']
handler.tags = ['descargas']
handler.command = ['gdrive']

export default handler