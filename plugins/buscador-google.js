import axios from 'axios';

let handler = async (m, { conn, command, args }) => {
    const text = args.join` `;
    
    if (!text) return conn.reply(m.chat, '🌸 Ingresa lo que deseas buscar junto al comando.', m);

    await m.react('🕓');
    const apiUrl = `https://eliasar-yt-api.vercel.app/api/google?query=${encodeURIComponent(text)}`;
    const img = 'https://i.ibb.co/P5kZNFF/file.jpg';

    try {
        let response = await axios.get(apiUrl);
        let results = response.data.results;

        if (results && results.length > 0) {
            let teks = `💫  Resultados de la búsqueda para: ${text}\n\n`;
            for (let g of results) {
                teks += `🔍 Título: ${g.title}\n`;
                teks += `🔍 *LINK*: ${g.link}\n`;
                teks += `🔍 Descripción: ${g.description || 'Sin descripción'}\n\n★━━━━━━✩━━━━━━★\n\n`;
            }
            conn.sendFile(m.chat, img, 'thumbnail.jpg', teks.trim(), m).then(() => m.react('✅'));
        } else {
            m.reply('No se encontraron resultados.');
        }
    } catch (error) {
        console.error(error);
        m.reply('Error en la búsqueda. Intenta nuevamente más tarde.');
    }
}

handler.help = ['google *<texto>*'];
handler.tags = ['buscador'];
handler.command = /^googlef?$/i;
//handler.limit = 1;
handler.register = true;

export default handler;
```

### Cambios realizados:
- Se ha añadido la propiedad `description` en el mensaje de respuesta que se envía al usuario, mostrando "Sin descripción" si la descripción está vacía.
- Se mantiene la estructura general del plugin y la funcionalidad de búsqueda.

Con este código, cuando realices una búsqueda, se mostrarán los títulos, enlaces y descripciones (si están disponibles) de los resultados. Si tienes más preguntas o necesitas más cambios, ¡hazmelo saber!Aquí tienes el plugin actualizado para utilizar la API que proporcionaste y procesar los resultados en base a la estructura de respuesta que has compartido:

```javascript
import axios from 'axios';

let handler = async (m, { conn, command, args }) => {
    const text = args.join` `;
    
    if (!text) return conn.reply(m.chat, '🌸 Ingresa lo que deseas buscar junto al comando.', m);

    await m.react('🕓');
    const apiUrl = `https://eliasar-yt-api.vercel.app/api/google?query=${encodeURIComponent(text)}`;
    const img = 'https://i.ibb.co/P5kZNFF/file.jpg';

    try {
        let response = await axios.get(apiUrl);
        let results = response.data.results;

        if (results && results.length > 0) {
            let teks = `💫  Resultados de la búsqueda para: ${text}\n\n`;
            for (let g of results) {
                teks += `🔍 Título: ${g.title}\n`;
                teks += `🔍 *LINK*: ${g.link}\n`;
                teks += `🔍 Descripción: ${g.description || 'Sin descripción'}\n\n★━━━━━━✩━━━━━━★\n\n`;
            }
            conn.sendFile(m.chat, img, 'thumbnail.jpg', teks.trim(), m).then(() => m.react('✅'));
        } else {
            m.reply('No se encontraron resultados.');
        }
    } catch (error) {
        console.error(error);
        m.reply('Error en la búsqueda. Intenta nuevamente más tarde.');
    }
}

handler.help = ['google *<texto>*'];
handler.tags = ['buscador'];
handler.command = /^google?$/i;
//handler.limit = 1;
handler.register = true;

export default handler;
