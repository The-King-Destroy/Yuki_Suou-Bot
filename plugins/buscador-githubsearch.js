import axios from 'axios';

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

async function getUserInfo(username) {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        const user = response.data;

        return `
 *☁️ Usuario:* ${user.login}
 *🍬 Nombre:* ${user.name ? user.name : 'No disponible'}
 *🍭 Bio:* ${user.bio ? user.bio : 'No disponible'}
 *📍 Ubicación:* ${user.location ? user.location : 'No disponible'}
 *📌 Blog:* ${user.blog ? user.blog : 'No disponible'}
 *👥 Seguidores:* ${user.followers}
 *👤 Siguiendo:* ${user.following}
 *📊 Repositorios:* ${user.public_repos}
 *👾 Cuenta creada:* ${formatDate(user.created_at)}`;
    } catch (error) {
        console.error('Error fetching user info:', error);
        return 'Error fetching user info';
    }
}

async function getUserRepos(username) {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        const repos = response.data;

        return repos.map((repo, index) => `
 *☁️ Resultado:* ${1 + index}
 *🍬 Nombre:* ${repo.name}
 *🚩 Creado:* ${formatDate(repo.created_at)}
 *📈 Actualizado:* ${formatDate(repo.updated_at)}
 *🌟 Estrellas:* ${repo.stargazers_count}
 *📰 Descripción:* ${repo.description ? `${repo.description}` : 'Sin Descripción'}
 *🔗 Enlace:* ${repo.html_url}`).join('\n');
    } catch (error) {
        console.error('Error fetching repositories:', error);
        return 'Error fetching repositories';
    }
}

const handler = async (message, { conn }) => {
    const username = message.text.split(' ')[1];
    if (!username) {
        return conn.reply(message.chat, '🍬 Por favor, ingresa un usuario de GitHub para realizar la búsqueda.', message);
    }

    const userInfo = await getUserInfo(username);
    const userRepos = await getUserRepos(username);

    const result = `
*👤 Información del Usuario:*
${userInfo}

*📊 Repositorios:*
${userRepos}`;
    
    conn.reply(message.chat, result, message);
};

handler.help = ['githubsearch'];
handler.tags = ['buscador'];
handler.command = ['githubsearch'];

export default handler;