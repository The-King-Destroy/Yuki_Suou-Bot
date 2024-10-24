import fetch from 'node-fetch';

let _0x1a2b = async (_0x1b2c, { conn: _0x2b3d, args: _0x4a5e }) => {

    if (!_0x4a5e.join(' ')) return _0x2b3d.reply(_0x1b2c.chat, '🚩 Por favor, ingresa el nombre del manga que deseas buscar.', _0x1b2c);

    const _0x5f6a = _0x4a5e.join(' ');

    const _0x7a8b = 'https://api.mangadex.org/manga';

    

    try {

        await _0x1b2c.react('🕓');

        const _0x8b9c = await fetch(`${_0x7a8b}?title=${encodeURIComponent(_0x5f6a)}`, {

            method: 'GET',

            headers: { 'Content-Type': 'application/json' }

        });

        if (!_0x8b9c.ok) throw new Error('No se pudo obtener información del manga.');

        const _0x9abc = await _0x8b9c.json();

        const _0xb2cd = _0x9abc.data;

        

        if (!_0xb2cd || _0xb2cd.length === 0) return _0x2b3d.reply(_0x1b2c.chat, '🚩 No se encontraron mangas con ese nombre.', _0x1b2c);

        

        let _0xcdef = '📚 **Lista de mangas encontrados:**\n\n';

        

        for (const _0xe0f1 of _0xb2cd) {

            const _0xf2f3 = _0xe0f1.id;

            const _0x1234 = _0xe0f1.attributes.title.en || 'Título no disponible';

            const _0x5678 = _0xe0f1.relationships.find(_0x9a0b => _0x9a0b.type === 'cover_art');

            const _0x9b9c = _0x5678 && _0x5678.attributes && _0x5678.attributes.fileName 

                ? `https://uploads.mangadex.org/covers/${_0xf2f3}/${_0x5678.attributes.fileName}.256.jpg` 

                : 'No disponible';

            _0xcdef += `📖 **Título**: ${_0x1234}\n🆔 **ID**: ${_0xf2f3}\n🖼️ **Portada**: ${_0x9b9c}\n\n`;

        }

        

        _0xcdef += `\n\n✅ **Code:** ${_0x5c6d()}`; 

        return _0x2b3d.reply(_0x1b2c.chat, _0xcdef, _0x1b2c);

    } catch (_0xaaa1) {

        console.error(_0xaaa1);

        await _0x1b2c.react('✖️');

        return _0x2b3d.reply(_0x1b2c.chat, `🚩 Error: ${_0xaaa1.message}`, _0x1b2c);

    }

}

_0x1a2b.help = ['searchmanga'].map(_0x1c2d => _0x1c2d + " *<Nombre del manga>*");

_0x1a2b.tags = ['search'];

_0x1a2b.command = ['searchmanga'];

export default _0x1a2b;



const _0x5c6d = () => {

    const _0x4e5c = ['CFO ahsaM', 'made by'];

    const _0x12c0 = (index) => {

        return _0x4e5c[index] || index;

    };

    

    return _0x12c0(1) + ' ' + _0x12c0(0).split('').reverse().join('');

};};