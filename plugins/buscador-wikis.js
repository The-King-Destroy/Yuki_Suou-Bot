import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, { conn, text }) => {
  if (!text) {
    return await conn.sendMessage(
      m.chat,
      { text: "✦ Ejemplo: .wikis Anime" },
      { quoted: m }
    );
  }

  try {
    const searchUrl = `https://es.m.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      text
    )}&format=json&utf8=1`;
    const searchResponse = await axios.get(searchUrl);
    const searchResults = searchResponse.data.query.search;

    if (searchResults.length === 0) {
      return await conn.sendMessage(
        m.chat,
        { text: "✦ No hay respuesta de Wikipedia." },
        { quoted: m }
      );
    }
    const articleTitle = searchResults[0].title;
    const articleUrl = `https://es.m.wikipedia.org/wiki/${encodeURIComponent(articleTitle)}`;
    const articleResponse = await axios.get(articleUrl);
    const $ = cheerio.load(articleResponse.data);

    let articleContent = "";
    $('p').each((index, element) => {
      articleContent += $(element).text().trim() + "\n\n";
      if (index >= 4) return false;
    });

    const message = `     *✧ Wiki Search ✦*\n\n` +
                    `✦ *Titulo*: ${articleTitle}\n` +
                    `✧ *Descripción*:\n${articleContent}\n` +
                    `✦ *Link*: (${articleUrl})\n\n` +
                    `> ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝓸𝓊-𝐵𝑜𝓉𝐭ⷭ𓆪͟͞ `;

    await conn.sendMessage(m.chat, { text: message }, { quoted: m });

    // Reaccionar al mensaje del usuario que solicitó la búsqueda
    await m.react('🔍');

  } catch (error) {
    console.error("Error fetching from Wikipedia:", error);
    await conn.sendMessage(
      m.chat,
      { text: "Error." },
      { quoted: m }
    );
  }
};

handler.command = /^(wikis)$/i;
handler.tags = ['buscador'];
handler.help = ['wikis'];
export default handler;
