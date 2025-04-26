import { promises as _0xfs } from 'fs';
import path from 'path';

const _0xdirname = path.resolve();

const _0xcleanTempFiles = async () => {
    const _0xdir = path.join(_0xdirname, 'plugins');
    const _0xfiles = await _0xfs.readdir(_0xdir);

    const _0xtempImages = _0xfiles.filter(_0xfile => _0xfile.startsWith('temp_image_') && _0xfile.endsWith('.png'));
    const _0xtempPDFs = _0xfiles.filter(_0xfile => _0xfile.startsWith('manga_') && _0xfile.endsWith('.pdf'));

    const _0xallTempFiles = [..._0xtempImages, ..._0xtempPDFs];

    if (_0xallTempFiles.length === 0) {
        return `${emoji2} No se encontraron archivos temporales para eliminar.`;
    }

    await Promise.all(_0xallTempFiles.map(async _0xfile => {
        const _0xfilePath = path.join(_0xdir, _0xfile);
        await _0xfs.unlink(_0xfilePath);
    }));

    return `${emoji} Se eliminaron ${_0xallTempFiles.length} archivos temporales correctamente.`;
};

let _0xhandler = async (m, { conn, isOwner }) => {
    if (!isOwner) return conn.reply(m.chat, `${emoji} Solo el propietario puede usar este comando.`, m);

    try {
        const _0xresult = await _0xcleanTempFiles();
        await conn.reply(m.chat, _0xresult, m);
    } catch (_0xerror) {
        await conn.reply(m.chat, `${msm} Error: ${_0xerror.message}`, m);
    }
};

_0xhandler.help = ['cleanfiles'].map(v => v + " *");
_0xhandler.tags = ['owner'];
_0xhandler.command = ['cleanfiles'];

export default _0xhandler;
