/* Githubsearch By Jose XrL
- Free Codes Titan
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S
*/

// *【🔍】Githubsearch*

import fetch from 'node-fetch';

let handler = async (m, { text, command, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, '🍬 Por favor ingresa un nombre de un repositorio GitHub.`, m, rcanal);
  
  await m.react('🕓');

  try {
    const res = await fetch(global.API('https://api.github.com', '/search/repositories', {
      q: text
    }));
    
    const json = await res.json();
    if (res.status !== 200) throw json;

    if (json.items.length > 0) {
      let txt = '`乂  G I T H U B  -  B Ú S Q U E D A`\n\n';
      
      json.items.forEach((repo, i) => {
        txt += `    ✩  *Nro* : ${i + 1}\n`;
        txt += `    ✩  *Nombre del Repositorio* : ${repo.full_name}\n`;
        txt += `    ✩  *URL* : ${repo.html_url}\n`;
        txt += `    ✩  *Creado en* : ${formatDate(repo.created_at)}\n`;
        txt += `    ✩  *Última actualización* : ${formatDate(repo.updated_at)}\n`;
        txt += `    ✩  *Watchers* : ${repo.watchers}\n`;
        txt += `    ✩  *Forks* : ${repo.forks}\n`;
        txt += `    ✩  *Estrellas* : ${repo.stargazers_count}\n`;
        txt += `    ✩  *Issues Abiertos* : ${repo.open_issues}\n`;
        txt += `    ✩  *Descripción* : ${repo.description || 'Sin descripción'}\n`;
        txt += `    ✩  *Clone* : ${repo.clone_url}\n\n`;
        txt += `> ${dev}`;
      });
      
      await m.reply(txt);
      await m.react('✅');
    } else {
      await m.react('✖️');
      await m.reply('🍭 No se encontraron repositorios para esta búsqueda.', m);
    }
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await m.reply('⚠️ Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', m);
  }
}

handler.tags = ['internet'];
handler.help = ['githubsearch *<búsqueda>*'];
handler.command = ['githubsearch', 'gbsearch'];
handler.register = true;

export default handler;

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
