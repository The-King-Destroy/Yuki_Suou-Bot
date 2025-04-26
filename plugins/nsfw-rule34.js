import fetch from 'node-fetch';
const handler = async (m, { conn, args, usedPrefix }) => {
    if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply(`${emoji} El contenido *NSFW* está desactivado en este grupo.\n> Un administrador puede activarlo con el comando » *#nsfw on*`);
    }
    if (!args[0]) {
      await conn.reply(m.chat, `${emoji} Por favor, ingresa un tag para realizar la búsqueda.`, m);
        return;
    }
    const tag = args[0];
    const url = `https://rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&tags=${tag}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!data || data.length === 0) {
            await conn.reply(m.chat, `${emoji2} No hubo resultados para *${tag}*`, m);
            return;
        }
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomImage = data[randomIndex];
        const imageUrl = randomImage.file_url;
        await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: `${emoji} Resultados para » *${tag}*`, mentions: [m.sender] });
    } catch (error) {
        console.error(error);
        await m.reply(`${emoji} Ocurrió un error.`);
    }
};
handler.help = ['r34 <tag>', 'rule34 <tag>'];
handler.command = ['r34', 'rule34'];
handler.tags = ['nsfw'];

export default handler;
