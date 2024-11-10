const handleVideoCommand = async (command, text, m, conn, prefix) => {
    if (command === 'video' || command === 'play2') {
        if (!text) {
            return m.reply(`*¿Qué video está buscando? 🎥*\nEjemplo: *${prefix + command}* ozuna`);
        }

        const startTime = Date.now();

        conn.fakeReply(
            m.chat,
            `*ᴇsᴘᴇʀᴀ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ 🎥.*\n\n> No hagas spam de comandos`,
            '0@s.whatsapp.net',
            '𝐄𝐧𝐯𝐢𝐚𝐧𝐝𝐨 𝐯𝐢𝐝𝐞𝐨 𝐞𝐬𝐩𝐞𝐫𝐚'
        );

        m.react(rwait);

        const yt_play = await search(text);
        if (!yt_play || yt_play.length === 0) {
            return m.reply("⚠️ No se encontró ningún video.");
        }

        const texto1 = `*🎬 Video Encontrado ✅*\n📌 *Título:* ${yt_play[0].title}\n🕒 *Publicado:* ${yt_play[0].ago}\n⏱️ *Duración:* ${secondString(yt_play[0].duration.seconds)}\n👀 *Vistas:* ${MilesNumber(yt_play[0].views)}\n✍️ *Autor:* ${yt_play[0].author.name}\n🔗 *Link:* ${yt_play[0].url}\n\n✨ *Recuerda seguir mi canal, me apoyarías mucho* 🙏: https://whatsapp.com/channel/0029VadxAUkKLaHjPfS1vP36`;

        await conn.sendMessage(m.chat, {
            image: { url: yt_play[0].thumbnail },
            caption: texto1
        }, { quoted: m });

        const apiUrl = `https://api.ryzendesu.vip/api/downloader/ytdl?url=${encodeURIComponent(yt_play[0].url)}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const videoInfo = data.resultUrl.video.find(v => v.quality === '360p');

            if (!videoInfo) throw new Error('No se encontró video en 360p');

            await conn.sendMessage(m.chat, {
                video: { url: videoInfo.download },
                fileName: `${data.result.title}.mp4`,
                mimetype: 'video/mp4',
                caption: `${lenguaje.descargar.text4}\n🔰 ${lenguaje.descargar.title} ${data.result.title}`
            }, { quoted: m });

            const endTime = Date.now();
            const totalTime = ((endTime - startTime) / 1000).toFixed(2);
            m.react(done);
            m.reply(`✅ ¡Video enviado! Tiempo total de envío: ${totalTime} segundos.`);
        } catch (e) {
            const apiUrlFallback = `https://api.nyxs.pw/dl/yt-direct?url=${encodeURIComponent(yt_play[0].url)}`;
            try {
                const response = await axios.get(apiUrlFallback);
                if (response.data.status) {
                    const videoUrl = response.data.result.urlVideo;
                    await conn.sendMessage(m.chat, {
                        video: { url: videoUrl },
                        fileName: `${response.data.result.title}.mp4`,
                        mimetype: 'video/mp4',
                        caption: `${lenguaje.descargar.text4}\n🔰 ${lenguaje.descargar.title} ${response.data.result.title}`
                    }, { quoted: m });

                    const endTime = Date.now();
                    const totalTime = ((endTime - startTime) / 1000).toFixed(2);
                    m.react(done);
                    m.reply(`✅ ¡Video enviado! Tiempo total de envío: ${totalTime} segundos.`);
                } else {
                    throw new Error('No se pudo obtener el video de la segunda API');
                }
            } catch (error) {
                m.react(error);
                return m.reply(`Ocurrió un error inesperado - ${error.message}`);
            }
        }
    }
};

// Llama a la función cuando se recibe el comando
handleVideoCommand(command, text, m, conn, prefix);