import axios from 'axios';

let delay = ms => new Promise(resolve => setTimeout(resolve, ms));

let handler = async (m, { conn, args }) => {
 if (!args || !args[0]) return conn.reply(m.chat, '*\`Ingresa El link Del audio a descargar 🤍\`*', m, fake)
await m.react('🕓');
//  if (!args[0]) return m.reply('*\`Ingresa El link Del vídeo a descargar 🤍\`*');

  try {
    let api = await axios.get(`https://api.ryzendesu.vip/api/downloader/spotify?url=${encodeURIComponent(args[0])}`);
    let json = api.data;

    if (json.success) {
      if (json.metadata.playlistName) {
        let playlistName = json.metadata.playlistName;
        let cover = json.metadata.cover;
        let tracks = json.tracks;

        for (let i = 0; i < tracks.length; i++) {
          let track = tracks[i];
          if (track.success) {
            let { title, artists, album, cover, releaseDate } = track.metadata;
            let link = track.link;
            let audioGet = await axios.get(link, { responseType: 'arraybuffer' });
            let audio = audioGet.data;
            let text = `*\`【 S P O T I F Y - D L 】\`*

> *🤍 \`TÍTULO:\`* ${title}
> *🤍 \`ARTISTAS:\`* ${artists}
> *🤍 \`ALBUM:\`* ${album}
> *🤍 \`FECHA:\`* ${releaseDate}
> *🤍 \`IMAGEN:\`* ${cover}

> ©️ ρσωε૨ ɓყ ɠαℓαאყ ƭεαɱ`
            await m.react('✅');
            await conn.sendFile(m.chat, cover, `image.jpeg`, text, m, null, fake);
            await conn.sendMessage(m.chat, {
              audio: audio,
              mimetype: 'audio/mp4',
              fileName: `${title}.mp3`,
              caption: ` `
            }, { quoted: m });
          }
        }
      } else {
        let { title, artists, album, cover, releaseDate } = json.metadata;
        let link = json.link;

        let audioGet = await axios.get(link, { responseType: 'arraybuffer' });
        let audio = audioGet.data;
        let text = `*\`【 S P O T I F Y - D L 】\`*

> *\`TÍTULO:\`* ${title}
> *\`ARTISTAS:\`* ${artists}
> *\`ALBUM:\`* ${album}
> *\`FECHA:\`* ${releaseDate}
> *\`IMAGEN:\`* ${cover}

> ©️ ρσωε૨ ɓყ ɠαℓαאყ ƭεαɱ`
            await m.react('✅');
            await conn.sendFile(m.chat, cover, `image.jpeg`, text, m, null, fake);
            await conn.sendMessage(m.chat, {
          audio: audio,
          mimetype: 'audio/mp4',
          fileName: `${title}.mp3`,
          caption: ` `
        }, { quoted: m });
      }
    }
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    m.reply('Hubo un error al intentar descargar el contenido de Spotify.');
  }
};

handler.command = /^(spotify)$/i;

export default handler;
