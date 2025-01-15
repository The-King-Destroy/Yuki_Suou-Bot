import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, '🍬 Por favor, ingresa el nombre del Pokemon que quiere buscar.', m, rcanal)
await m.react(rwait)
conn.reply(m.chat, `🍭 Buscando *<${text}>*, espere un momento...`, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: packname,
body: dev,
previewType: 0, thumbnail: icons,
sourceUrl: channel }}})
const url = `https://some-random-api.com/pokemon/pokedex?pokemon=${encodeURIComponent(text)}`;
const response = await fetch(url);
const json = await response.json();
if (!response.ok) {
await m.react(error)
return conn.reply(m.chat, '⚠️ Ocurrio un error al buscar el Pokemon.', m, rcanal)}
const aipokedex = `🍬 *Pokedex - Información de ${json.name}*\n\n☁️ *Nombre:* ${json.name}\n🔖 *ID:* ${json.id}\n💬 *Tipo:* ${json.type}\n💪 *Habilidades:* ${json.abilities}\n🎴 *Tamaño:* ${json.height}\n⚖️ *Peso:* ${json.weight}\n\n📖 *Descripción:*\n${json.description}\n\n🔍 ¡Encuentra más detalles sobre este Pokémon en la Pokedex!\n\n🔗 https://www.pokemon.com/es/pokedex/${json.name.toLowerCase()}`
conn.reply(m.chat, aipokedex, m, rcanal)
await m.react(done) }

handler.help = ['pokedex *<pokemon>*']
handler.tags = ['fun']
handler.group = true;
handler.register = true
handler.command = ['pokedex']
export default handler