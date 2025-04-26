import { exec } from 'child_process';
import fs from 'fs';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`${emoji} Por favor, ingresa el nombre de un paquete de NPMJs y versión (opcional).`);

  async function npmdownloader(pkg, pkgver) {
    try {
      const filePath = await new Promise((resolve, reject) => {
        exec(`npm pack ${pkg}@${pkgver}`, (error, stdout) => {
          if (error) {
            m.reply('Error');
            console.error(`exec error: ${error}`);
            reject(error);
            return;
          }
          resolve(stdout.trim());
        });
      });

      const fileName = filePath.split('/').pop();
      const data = await fs.promises.readFile(filePath);
      let Link;
      if (pkgver === 'latest') {
        Link = `https://www.npmjs.com/package/${pkg}`;
      } else {
        Link = `https://www.npmjs.com/package/${pkg}/v/${pkgver}`;
      }
      await conn.sendMessage(m.chat, {
        document: data,
        mimetype: "application/zip",
        fileName: fileName,
        caption: `- \`Nombre\`: ${fileName}\n- \`Version\`: ${pkgver}\n- \`Link\`: ${Link}`
      }, {
        quoted: m
      });

      await fs.promises.unlink(filePath);
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

  conn.sendMessage(m.chat, {
    react: {
      text: "⏱",
      key: m.key,
    }
  });

  try {
    const [text2, ver] = text.split(",");
    await npmdownloader(text2, ver || 'latest');
  } catch (error) {
    m.reply('Sepertinya terjadi kesalahan atau package tidak ditemukan');
  }
};

handler.help = ["npmdl"];
handler.tags = ["descargas"];
handler.command = ["npmdownloader", "npmdownload", "npmpkgdownloader", "npmpkgdownload", "npmdl", "npmd"];
handler.group = false;
handler.register = true;
handler.coin = 5;

export default handler;