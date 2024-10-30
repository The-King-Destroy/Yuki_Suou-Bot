import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';
/************
https://Github.com/The-King-Destroy
************/
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    function ZipFiles(directorio, name) {
        const zip = new AdmZip();
        function addFiles(directorio) {
            const archivos = fs.readdirSync(directorio);
            archivos.forEach((archivo) => {
                const rutaCompleta = path.join(directorio, archivo);
                if (archivo.startsWith('.') || archivo === 'node_modules') {
                    return;
                }
                const stats = fs.statSync(rutaCompleta);

                if (stats.isDirectory()) {
                    addFiles(rutaCompleta);
                } else {
                    zip.addLocalFile(rutaCompleta, path.relative('.', directorio));
                }
            });
        }
        addFiles(directorio);
        const zipPath = `${name}.zip`;
        zip.writeZip(zipPath);
        return zipPath;
    }
    try {
        const Base = '.'; // Directorio actual
        const name = 'Yuki_Respaldo';
        const rutaZip = ZipFiles(Base, name);
        const Yuki = destroy.readFileSync(rutaZip);
        await conn.sendMessage(m.chat, { 
            document: Yuki, 
            mimetype: 'application/zip', 
            fileName: `${botName}.zip`, 
            caption: "*[ 🌹 ] Successful.*"
        }, { quoted: m });
        fs.unlinkSync(rutaZip);
    } catch (error) {
        console.error(error);
        await conn.sendMessage(m.chat, { text: 'Hubo un error al intentar generar o enviar el archivo zip.' }, { quoted: m });
    }
}

handler.help = ['respaldo'];
handler.command = ['getfiless','respaldo''compress'];
handler.owner = true;
export default handler;