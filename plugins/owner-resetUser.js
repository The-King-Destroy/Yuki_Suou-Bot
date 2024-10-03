let handler = async (m, { conn, text }) => {
    function no(number){
    return number.replace(/\s/g,'').replace(/([@+-])/g,'')
  }

    text = no(text)

  if(isNaN(text)) {
		var number = text.split`@`[1]
  } else if(!isNaN(text)) {
		var number = text
  }

    if(!text && !m.quoted) return m.reply(`🚩 Etiqueta o escribe el número del usuario.`)
    if(isNaN(number)) return m.reply(`🚩 El número no es válido.`)

      try { 
		if(text) {
			var user = number + '@s.whatsapp.net'
		} else if(m.quoted.sender) {
			var user = m.quoted.sender
		} else if(m.mentionedJid) {
  		  var user = number + '@s.whatsapp.net'
			}  
		} catch (e) {
  } finally {
    	let number = user.split('@')[0]
        delete global.global.db.data.users[user]
        conn.reply(m.chat, `🚩 @${number} fue reiniciado con exito.`, null, { mentions: [user] })
    }
    
}
handler.help = ['resetuser *@user*']
handler.tags = ['owner']
handler.command = ['resetuser'] 
handler.rowner = true

export default handler