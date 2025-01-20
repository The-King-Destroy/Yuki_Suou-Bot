function handler(m) {
let name = conn.getName(`${numcreador}@s.whatsapp.net`)
let ownerN = `${numcreador}`
conn.sendContact(m.chat, [[`${ownerN}@s.whatsapp.net`, `${name}`]], m, {
 contextInfo: { 
 forwardingScore: 2023,
isForwarded: false, 
 externalAdReply: {  
 title: packname, 
 body: dev, 
 sourceUrl: channel,
 thumbnail: banner,
 thumbnailUrl: banner, 
 mediaType: 1,
 showAdAttribution: true, 
 renderLargerThumbnail: true 
 }
   }
     },
       {
         quoted: m
           }
             );

}

handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler
