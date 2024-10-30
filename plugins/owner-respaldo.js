import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';

/************
https://Github.com/The-King-Destroy
************/

const createZip = (directory, zipName) => {
    const zip = new AdmZip();

    const addFilesToZip = (dir) => {
        const files = fs.readdirSync(dir);
        files.forEach((file) => {
            const fullPath = path.join(dir, file);
            if (file.startsWith('.') || file === 'node_modules') {
                return; // Ignorar archivos ocultos y node_modules
            }
            const stats = fs.statSync(fullPath);
            if (stats.isDirectory()) {
                addFilesToZip(fullPath); // Recursión para directorios
            } else {
                zip.addLocalFile(fullPath, path.relative('.', dir));
            }
        });
    };

    addFilesToZip(directory);
    const zipPath = `${zipName}.zip`;
    zip.writeZip(zipPath);
    return zipPath;
};

const handler = async (m, { conn, command }) => {
    try {
        const baseDir = '.'; // Directorio actual
        const zipName = command === 'respaldo' ? 'Yuki_Respaldo' : 'Backup_Files'; // Nombre del archivo basado en el comando
        const zipPath = createZip(baseDir, zipName);
        const fileBuffer = fs.readFileSync(zipPath);

        await conn.sendMessage(m.chat, { 
            document: fileBuffer, 
            mimetype: 'application/zip', 
            fileName: `${zipName}.zip`, 
            caption: "*[ 🌹 ] Successful.*" 
        }, { quoted: m });

        fs.unlinkSync(zipPath); // Eliminar el archivo zip después de enviarlo
    } catch (error) {
        console.error(error);
        await conn.sendMessage(m.chat, { text: 'Hubo un error al intentar generar o enviar el archivo zip.' }, { quoted: m });
    }
};

// Configuración del comando
handler.help = ['respaldo', 'getfiless', 'compress'];
handler.command = ['getfiless', 'respaldo', 'compress'];
handler.owner = true;

export default handler;