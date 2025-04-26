import fg from 'api-dylux';

const mssg = {
    noLink: (service) => `${emoji} Por favor proporciona un enlace de ${service}.`,
    usage: (command, prefix) => `${emoji} Por favor, envia un link de Gdrive para descargar el archivo.`,
    name: 'Nombre del archivo',
    size: 'Tamaño del archivo',
    limitdl: 'Límite de descarga',
    limitdlTe: 'Te queda',
    error: '✘ Ocurrió un error al procesar tu solicitud.'
};

let free = 100; 
let prem = 500; 

let handler = async (m, { conn, args, usedPrefix, command, isOwner, isPrems }) => {
    if (!args[0]) {
        return conn.reply(m.chat, mssg.usage(command, usedPrefix), null, { quoted: m });
    }
    
    m.react(rwait); 

    try {
        let res = await fg.GDriveDl(args[0]);

        let limit = isPrems || isOwner ? prem : free;
        let isLimit = limit * 1024 < res.fileSizeB;

        await m.reply(`
≡  *Descargas Google Drive*

*✿ ${mssg.name}:* ${res.fileName}
*✎ ${mssg.size}:* ${res.fileSize}
${isLimit ? `\n✧ ${mssg.limitdl} *+${free} MB* ${mssg.limitdlTe} *${prem} MB*` : ''}
        `);
        
        if (!isLimit) {
            conn.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m });
        }
        m.react(done);
    } catch (error) {
        console.error(error); 
        m.reply(mssg.error); 
    }
}

handler.help = ['gdrive'];
handler.tags = ['descargas'];
handler.command = ['gdrive', 'drive'];
handler.group = true;
handler.register = true;
handler.coin = 5;

export default handler;