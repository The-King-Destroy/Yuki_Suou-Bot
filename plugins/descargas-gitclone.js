import fetch from 'node-fetch'

let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let handler = async (m, { args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `${emoji} Por favor, ingresa la URL de un repositorio de GitHub que deseas descargar.`, m)
  }
  if (!regex.test(args[0])) {
    return conn.reply(m.chat, `${emoji2} Verifica que la *URL* sea de GitHub`, m).then(_ => m.react(error))
  }
  let [_, user, repo] = args[0].match(regex) || []
  let sanitizedRepo = repo.replace(/.git$/, '')
  let repoUrl = `https://api.github.com/repos/${user}/${sanitizedRepo}`
  let zipUrl = `https://api.github.com/repos/${user}/${sanitizedRepo}/zipball`
  await m.react(rwait)
  try {
  conn.reply(m.chat, wait, m)
    let [repoResponse, zipResponse] = await Promise.all([
      fetch(repoUrl),
      fetch(zipUrl),
    ])
    let repoData = await repoResponse.json()
    let filename = zipResponse.headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
    let type = zipResponse.headers.get('content-type')
    let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745610598914.jpeg'
    let txt = `*乂  G I T H U B  -  D O W N L O A D*\n\n`
       txt += `✩  *Nombre* : ${sanitizedRepo}\n`
       txt += `✩  *Repositorio* : ${user}/${sanitizedRepo}\n`
       txt += `✩  *Creador* : ${repoData.owner.login}\n`
       txt += `✩  *Descripción* : ${repoData.description || 'Sin descripción disponible'}\n`
       txt += `✩  *Url* : ${args[0]}\n\n`
       txt += `> ${dev}`

await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
await conn.sendFile(m.chat, await zipResponse.buffer(), filename, null, m)
await m.react(done)
  } catch {
await m.react(error)
  }
}
handler.help = ['gitclone *<url git>*']
handler.tags = ['descargas']
handler.command = ['gitclone']
handler.group = true
handler.register = true
handler.coin = 3

export default handler
