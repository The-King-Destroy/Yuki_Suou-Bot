import fs from 'fs'

async function handler(m, {usedPrefix}) {

const user = m.sender.split('@')[0]
if (fs.existsSync(`./${jadi}/` + user + '/creds.json')) {
let token = Buffer.from(fs.readFileSync(`./${jadi}/` + user + '/creds.json'), 'utf-8').toString('base64')    

await conn.reply(m.chat, `${emoji} El token te permite iniciar sesion en otros bots, recomendamos no compartirlo con nadie\n\n*Tu token es:*`, m)
await conn.reply(m.chat, token, m)
} else {
await conn.reply(m.chat, `${emoji2} No tienes ningun token activo, usa #jadibot para crear uno.`, m)
}

}
handler.help = ['token']
handler.command = ['token']
handler.tags = ['serbot']
handler.private = true

export default handler 