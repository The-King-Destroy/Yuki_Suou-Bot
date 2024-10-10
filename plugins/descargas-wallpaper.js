import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw m.reply(`*𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝚎𝚕 𝚝𝚎𝚡𝚝𝚘 𝚍𝚎 𝚕𝚊 𝚒𝚖𝚊𝚐𝚎𝚗 𝚚𝚞𝚎 𝚚𝚞𝚒𝚎𝚛𝚎𝚜*\n\n*_𝚎𝚓𝚎𝚖𝚙𝚕𝚘_*\n *${usedPrefix + command} Naruto*`)

  const apiUrl = `https://weeb-api.vercel.app/wallpaper?query=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw `Error al obtener el fondo de pantalla: ${response.status} ${response.statusText}`;
    }

    const imageUrls = await response.json();

    if (imageUrls.length === 0) {
      throw `No se encontraron fondos de pantalla para: ${text}`;
    }

    // Choose 2 random images from the array
    const randomIndexes = getRandomIndexes(imageUrls.length, 2);
    const randomImages = randomIndexes.map(index => imageUrls[index]);

    for (const imageUrl of randomImages) {
      const imageResponse = await fetch(imageUrl);

      if (!imageResponse.ok) {
        throw `Error al obtener la imagen: ${imageResponse.status} ${imageResponse.statusText}`;
      }

      // Use 'buffer()' to get the image data as a buffer
      const buffer = await imageResponse.buffer();

      conn.sendFile(m.chat, buffer, 'wallpaper.jpg', `*${text}*`, m, null, rcanal);
    }
  } catch {
m.react(error)
  }
};

// Function to generate random indexes
function getRandomIndexes(max, count) {
  const indexes = [];
  while (indexes.length < count) {
    const randomIndex = Math.floor(Math.random() * max);
    if (!indexes.includes(randomIndex)) {
      indexes.push(randomIndex);
    }
  }
  return indexes;
}

handler.help = [''].map(v => 'wallpaper' + v + ' <query>');
handler.tags = ['descargas'];
handler.command = /^(wall|wallpaper)$/i

export default handler;
