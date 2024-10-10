import moment from 'moment-timezone';
import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
  try {
    let res = await fetch('https://api.github.com/The-King-Destroy/Yuki_Suou-Bot');
    if (!res.ok) throw new Error('Error al obtener datos del repositorio');
    let json = await res.json();

    let txt = `*乂  S C R I P T  -  M A I N  乂*\n\n`;
    txt += `✩  *Nombre* : ${json.name}\n`;
    txt += `✩  *Visitas* : ${json.watchers_count}\n`;
    txt += `✩  *Peso* : ${(json.size / 1024).toFixed(2)} MB\n`;
    txt += `✩  *Actualizado* : ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n`;
    txt += `✩  *Url* : ${json.html_url}\n`;
    txt += `✩  *Forks* : ${json.forks_count}\n`;
    txt += `✩  *Stars* : ${json.stargazers_count}\n\n`;
    txt += `✨ *${packname}*`;

    let img = imagen1;

    await conn.sendMini(m.chat, packname, wm, txt, img, img, redes, fkontak);
  } catch (error) {
    console.error(error);
    await m.react(error);  // Reacciona con un emoji de error si ocurre un problema
  }
};

handler.help = ['script'];
handler.tags = ['main'];
handler.command = ['script', 'sc'];
handler.register = true;

export default handler;