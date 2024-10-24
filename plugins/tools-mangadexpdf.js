import fetch from 'node-fetch'; 
import { createWriteStream } from 'fs'; 
import { promises as fsPromises } from 'fs'; 
import PDFDocument from 'pdfkit'; 
import { fileURLToPath } from 'url'; 
import path from 'path';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const _0x1a6d=["\x74\x65\x6D\x70\x5F\x69\x6D\x61\x67\x65\x5F","\x70\x6E\x67","\x6A\x6F\x69\x6E","\x66\x69\x6E\x69\x73\x68","\x65\x72\x72\x6F\x72","\x77\x72\x69\x74\x65","\x73\x6C\x69\x63\x65\x2D\x30","\x65\x6E\x64","\x63\x6F\x6D\x6D\x61\x6E\x64", "\x68\x65\x63\x68\x6F\x20\x70\x6F\x72\x20\x4D\x61\x73\x68\x61\x20\x4F\x46\x43"]; 

const downloadImage = async(_0x5562x2,_0x5562x3)=>{ 
    const _0x5562x4=path[_0x1a6d[2]](__dirname,`${_0x1a6d[0]}${_0x5562x3}.${_0x1a6d[1]}`);
    const _0x5562x5= await fetch(_0x5562x2); 
    if(!_0x5562x5.ok) throw new Error(`No se pudo descargar la imagen: ${_0x5562x2}`); 
    const _0x5562x6=createWriteStream(_0x5562x4);
    _0x5562x5.body.pipe(_0x5562x6);
    console.log(_0x1a6d[9]); // Mensaje oculto
    return new Promise((_0x5562x7,_0x5562x8)=>{ 
        _0x5562x6.on(_0x1a6d[3],()=>{_0x5562x7(_0x5562x4);}); 
        _0x5562x6.on(_0x1a6d[4],_0x5562x8);}); 
};

const createPDF= async(_0x5562x9,_0x5562xa)=>{ 
    const _0x5562xb=new PDFDocument(); 
    const _0x5562xc=path[_0x1a6d[2]](__dirname,`manga_part_${_0x5562xa}.pdf`);
    const _0x5562xd=createWriteStream(_0x5562xc); 
    _0x5562xb.pipe(_0x5562xd); 
    for(const _0x5562xe of _0x5562x9){ 
        _0x5562xb.addPage();
        _0x5562xb.image(_0x5562xe,{fit:[500,700],align:'center',valign:'center'});
    } 
    _0x5562xb.end(); 
    return new Promise((_0x5562x7,_0x5562x8)=>{ 
        _0x5562xd.on(_0x1a6d[3],()=>{_0x5562x7(_0x5562xc);});
        _0x5562xd.on(_0x1a6d[4],_0x5562x8);
    });
};

let handler= async(_0x5562x2,{conn,args})=>{ 
    if(!args[0]){return conn.reply(_0x5562x2.chat,'🚩 Por favor, ingresa el ID del manga que deseas descargar.',_0x5562x2);} 
    const _0x5562x5=args[0]; 
    const _0x5562x6=`https://api.mangadex.org/manga/${_0x5562x5}/feed`;
    try {
        await _0x5562x2.react('🕓'); 
        const _0x5562x7= await fetch(_0x5562x6); 
        if(!_0x5562x7.ok){throw new Error('No se pudo obtener información del manga.');} 
        const _0x5562x8= await _0x5562x7.json(); 
        const _0x5562x9=_0x5562x8.data; 
        if(!_0x5562x9||_0x5562x9.length===0){return conn.reply(_0x5562x2.chat,'🚩 No se encontraron capítulos para este manga.',_0x5562x2);} 
        const _0x5562xa=[]; 
        let _0x5562xb=0; 
        let _0x5562xc=1; 
        for(const _0x5562xd of _0x5562x9){ 
            const _0x5562xe=_0x5562xd.id; 
            const _0x5562xf= await fetch(`https://api.mangadex.org/at-home/server/${_0x5562xe}`); 
            const _0x5562x10= await _0x5562xf.json(); 
            if(!_0x5562x10.chapter){continue;} 
            const _0x5562x11=_0x5562x10.baseUrl; 
            const _0x5562x12=_0x5562x10.chapter.hash; 
            const _0x5562x13=_0x5562x10.chapter.data;
            for(let _0x5562x14=0;_0x5562x14<_0x5562x13.length;_0x5562x14++){ 
                const _0x5562x15=`${_0x5562x11}/data/${_0x5562x12}/${_0x5562x13[_0x5562x14]}`;
                const _0x5562x16= await downloadImage(_0x5562x15,_0x5562xb); 
                _0x5562xa.push(_0x5562x16); 
                _0x5562xb++; 
                if(_0x5562xb%80===0){ 
                    const _0x5562x17= await createPDF(_0x5562xa.slice(-80),_0x5562xc); 
                    await conn.sendMessage(_0x5562x2.chat,{document:{url:_0x5562x17},mimetype:'application/pdf',fileName:`manga_part_${_0x5562xc}.pdf`},{quoted:_0x5562x2}); 
                    _0x5562xc++; 
                    await Promise.all(_0x5562xa.slice(-80).map(async(_0x5562x18)=>{try {await fsPromises.unlink(_0x5562x18);}catch(_0x5562x19){}})); 
                }
            }
        } 
        if(_0x5562xa.length%80!==0){ 
            const _0x5562x1a= await createPDF(_0x5562xa.slice(-_0x5562xa.length%80),_0x5562xc); 
            await conn.sendMessage(_0x5562x2.chat,{document:{url:_0x5562x1a},mimetype:'application/pdf',fileName:`manga_part_${_0x5562xc}.pdf`},{quoted:_0x5562x2}); 
            await Promise.all(_0x5562xa.slice(-_0x5562xa.length%80).map(async(_0x5562x18)=>{try {await fsPromises.unlink(_0x5562x18);}catch(_0x5562x19){}})); 
        }
        await _0x5562x2.react('✅'); 
    } catch(_0x5562x1b){ 
        await _0x5562x2.react('✖️'); 
        return conn.reply(_0x5562x2.chat,`🚩 Error: ${_0x5562x1b.message}`,_0x5562x2); 
    }
};

handler.help=[_0x1a6d[8]].map(v=>v+" *<ID del manga>*"); 
handler.tags=['tools']; 
handler.command=['mangadex']; 
export default handler;
