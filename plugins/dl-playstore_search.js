import gplay from "google-play-scraper";

let handler = async (m, { conn, text }) => {
  if (!text) throw "*[❗] Ingresa el nombre de app que quieres busc6*";
  let res = await gplay.search({ term: text });
  if (!res.length) throw `*[❗] Por favor ingresa el nombre de una app de la play store*`;
  let opt = {
    contextInfo: {
      externalAdReply: {
        title: res[0].title,
        body: res[0].summary,
        thumbnail: (await conn.getFile(res[0].icon)).data,
        sourceUrl: res[0].url,
      },
    },
  };
  await console.log(res);
  res = res.map(
    (v) =>
      `*🔍 Resultado:* ${v.title}
       *✍️ Desarrollador:* ${v.developer}
       *💸 Precio:* ${v.priceText}
       *📈 Puntuacion:* ${v.scoreText}
        *⛓️ Link:* ${v.url}`
  ).join`\n\n`;
  m.reply(res, null, opt);
};
handler.help = ['playstore'];
handler.tags = ['dl'];
handler.command = /^(playstore)$/i;
export default handler;