import axios from 'axios';

const handler = async (m, { conn, args }) => {
    const input = args.join(" ");
    const [name, ...contentParts] = input.split(" ").map(part => part.trim());
    const text = contentParts.join(" ");

    if (!text) {
        return m.reply("🌹 *Nombre y Texto que deseás Subír.*\n\n *Ejemplo:*\n\n *.paste Hola ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉𝐭ⷭ𓆪͟͞ .*");
    }

    const fileName = name || "nombre_no_definifo";
    
    try {
        await m.react('⏳');
        const requestData = {
            name: fileName,
            description: `Paste ${fileName}`,
            visibility: "public",
            expires: null,
            files: [
                {
                    name: `${fileName}.js`,
                    content: {
                        format: "text",
                        value: text
                    }
                }
            ]
        };

        const response = await axios.post("https://api.paste.gg/v1/pastes", requestData, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        if (response.status === 201 && response.data && response.data.result && response.data.result.id) {
            const pasteId = response.data.result.id;
            const pasteUrl = `https://paste.gg/${pasteId}`;

            await conn.sendMessage(m.chat, {
                text: `✅ *Texto publicado con éxito a Paste.gg!*\n\n📝 *Nombre del archivo:* ${fileName}\n🔗 *Link:* ${pasteUrl}\n\n*¡Gracias por utilizar nuestro servicio!*`
            }, { quoted: m });
            await m.react('✅');
            console.log(`El texto se subió con éxito a paste.gg con el nombre "${fileName}" el link se mando a ${m.chat}`);
        } else {
            console.error("Error no responde la API paste.gg:", response.data);
            m.reply("⚠️ *Error al cargar el texto.*");
        }

    } catch (error) {
        console.error('Error:', error.message);
        m.reply(`⚠️ *Error al cargar el texto: ${error.message}*`);
    }
};

handler.tags = ['transformador'];
handler.command = ['paste'];
handler.help = ['paste nombre txt'];

export default handler;
