import fg from 'api-dylux';

const mssg = {
    noLink: (service) => `Por favor proporciona un enlace de ${service}.`,
    name: 'Nombre del archivo',
    size: 'Tamaño del archivo',
    limitdl: 'Límite de descarga',
    limitdlTe: 'Te queda',
    error: 'Ocurrió un error al procesar tu solicitud.'
};

let free = 150; // Límite de descarga
let prem = 500; // Límite de descarga para miembros premium

let handler = async (m, { conn, args, usedPrefix, command, isOwner, isPrems }) => {
    if (!args[0]) throw `🌹 ${mssg.noLink('Google Drive')}`;
    m.react(rwait); 

    try {
        let res = await fg.GDriveDl(args[0]);

        let limit = isPrems || isOwner ? prem : free;
        let isLimit = limit * 1024 < res.fileSizeB;

        await m.reply(`
≡ *Google Drive DL*

*📌${mssg.name}:* ${res.fileName}
*⚖️${mssg.size}:* ${res.fileSize}
${isLimit ? `\n❖ ${mssg.limitdl} *+${free} MB* ${mssg.limitdlTe} *${prem} MB*` : ''} 
> ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉𝐭ⷭ𓆪͟͞ 
        `);
        
        if (!isLimit) {
            conn.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m });
        }
        m.react(done);
    } catch (error) {
        console.error(error); // Para obtener más detalles del error
        m.reply(mssg.error); 
    }
}

handler.help = ['gdrive'];
handler.tags = ['descargas'];
handler.command = ['gdrive'];
handler.cookies = 15;

export default handler;
