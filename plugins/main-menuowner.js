import moment from 'moment-timezone';

let handler = async (m, { conn, args }) => {
let owner = `
һ᥆ᥣᥲ! s᥆ᥡ  *${botname}*  ٩(˘◡˘)۶
ᥲ𝗊ᥙí 𝗍іᥱᥒᥱs ᥣᥲ ᥣіs𝗍ᥲ ძᥱ ᥴ᥆mᥲᥒძ᥆s ძᥱ m᥆ძs ᥡ ᥆ᥕᥒᥱrs

»  ⊹˚• \`MODS\` •˚⊹

🍬 Comandos de moderación para mods y owners.
ᰔᩚ *#addcoins • #añadircoin*
> ✦ Añade coins a un usuario.
ᰔᩚ *#userpremium • #addprem*
> ✦ Otorgar premium a un usuario.
ᰔᩚ *#delprem #remove*
> ✦ Quitar premium a un usuario.
ᰔᩚ *#addexp • #añadirxp*
> ✦ Añade XP a un usuario.
ᰔᩚ *#autoadmin*
> ✦ El Bot dara admin automáticamente solo si el Bot es admin.
ᰔᩚ *#listban • #banlist*
> ✦ Lista de usuarios y chats baneados.
ᰔᩚ *#banuser*
> ✦ Banear a un usuario.
ᰔᩚ *#unbanuser*
> ✦ Desbanear a un usuario.
ᰔᩚ *#dsowner • #delai*
> ✦ Elimina archivos innecesarios de sesión.
ᰔᩚ *#removecoin • #quitarcoin
> ✦ Quitar coins de un usuario.
ᰔᩚ *#deletedatauser • #resetuser*
> ✦ Restablecer los datos de un usuario.
ᰔᩚ
> ✦ 
ᰔᩚ
> ✦ 
ᰔᩚ
> ✦ 
ᰔᩚ
> ✦ 
ᰔᩚ
> ✦ 
ᰔᩚ
> ✦ 
ᰔᩚ
> ✦ 
ᰔᩚ
> ✦ 
ᰔᩚ
> ✦ 
ᰔᩚ
> ✦ 
ᰔᩚ
> ✦ 
ᰔᩚ
> ✦ 

»  ⊹˚• \`OWNERS\` •˚⊹

🍬 Comandos de moderación y control avanzado para owners.
ᰔᩚ *#addowner • #delowner*
> ✦ Agrega o elimina un número de la lista de owners.
ᰔᩚ *#backup • #copia*
> ✦ Crear un respaldo de seguridad de la *db* del Bot.
ᰔᩚ *#bcgc*
> ✦ Envia un mensaje a todos los grupos donde este el Bot.
ᰔᩚ *#block • #unblock*
> ✦ Bloquear o desbloquear a un usuario del número del Bot.
ᰔᩚ *#listblock • #blocklist*
> ✦ Ver listado de usuarios bloqueados.
ᰔᩚ *#cleanfiles*
> ✦ Elimina archivos temporales.
ᰔᩚ *#newgc #creargc*
> ✦ Crea un nuevo grupo desde el número del Bot.
ᰔᩚ *#deletefile*
> ✦ Elimina archivos del Bot
ᰔᩚ *#cleartmp • #borrartmp • #vaciartmp*
> ✦ Elimina archivo innecesarios de la carpeta tmp.
ᰔᩚ *= • > • => • $*
> ✦ Opciones avanzadas
ᰔᩚ *#get • #fetch*
> ✦ Ver el estado de una página web.
ᰔᩚ *#plugin • #getplugin*
> ✦ Extraer un plugin de los archivos del Bot.
ᰔᩚ *#grouplist • #listgroup*
> ✦ Ver listado de grupos en los que está unido el Bot.
ᰔᩚ *#join • #invite*
> ✦ Agregar el Bot a un grupo mediante el enlace de invitación.
ᰔᩚ *#leave • #salir*
> ✦ Sacar el Bot de un grupo.
ᰔᩚ *#let*
> ✦ Envia un mensaje con una duración de 1 hora.
ᰔᩚ *#prefix*
> ✦ Ver o cambiar el prefijo del Bot.
ᰔᩚ *#resetprefix*
> ✦ Restablecer el prefijo del Bot.
ᰔᩚ *#reiniciar • #restart*
> ✦ Reiniciar el servidor del Bot.
ᰔᩚ *#reunionstaff
> ✦ 
ᰔᩚ
> ✦ 
ᰔᩚ
> ✦ 
ᰔᩚ
> ✦ 
ᰔᩚ
> ✦ 
ᰔᩚ
> ✦ 
ᰔᩚ
> ✦ 
ᰔᩚ
> ✦ 
ᰔᩚ
> ✦ 
ᰔᩚ
> ✦ 
ᰔᩚ
> ✦ 
ᰔᩚ
> ✦ 
`.trim();

await conn.sendMessage(m.chat, {
text: owner,
contextInfo: {
externalAdReply: {
title: packname,
body: dev,
thumbnailUrl: icono,
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: true
}
}
}, { quoted: m });
};

handler.help = ['mods'];
handler.tags = ['main'];
handler.command = ['mods', 'dev', 'owners'];
handler.mods = true

export default handler;
