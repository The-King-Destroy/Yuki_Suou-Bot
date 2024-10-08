import gplay from 'google-play-scraper'
import fetch from 'node-fetch'
let handler = async (m, {conn, args, usedPrefix: prefix, command, text}) => {
if (!args[0]) throw `*❌ Ingresa un link de la PlayStore. Ejemplo:*\n\n ${prefix + command} https://play.google.com/store/apps/details?id=com.facebook.lite`
m.react(rwait)
const url = `${args[0]}`;
const packageName = url.split("=")[1];
console.log(packageName);
const info = await gplay.app({appId: packageName})
const h = info.title
console.log(h + `\n` + info.appId)
let link = `https://d.apkpure.com/b/APK/${info.appId}?version=latest`
conn.sendFile(m.chat, link, h + '.apk', ``, m, false, { mimetype: 'application/videos.android.package-archive', asDocument: true })
m.react(done)
}
handler.command = /^(gplay)$/i;
export default handler