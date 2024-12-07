import fs from 'fs'
  import WSF from "wa-sticker-formatter";
var handler = async (m, {
    conn, 
    args, 
    text, 
    usedPrefix, 
    command
}) => {
    let ps = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.quoted && m.quoted.caption ? m.quoted.caption : m.quoted && m.quoted.description ? m.quoted.description : ''
    if (!ps) throw m.reply(`*• Ejemplo :* ${usedPrefix + command} *[texto]*`)

    let res = `https://mxmxk-helper.hf.space/brat?text=${ps}`

    try {
async function sticker(img, url, packname, author, categories = [""]) {

  const stickerMetadata = {
    type: "full",
    pack: packname,
    author,
    categories,
  };
  return await new WSF.Sticker(img ? img : url, stickerMetadata).build();
}

        var stikerp = await sticker(res, { ps })
        await conn.sendFile(m.chat, stikerp, 'atmin.webp', '', m)
    } catch (e) {
        console.log(e)
        await m.reply(eror)
    }
}

handler.help = ['brat'];
handler.tags = ['sticker'];
handler.command = /^(brat)$/i;

export default handler;