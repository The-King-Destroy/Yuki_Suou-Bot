// Credits: OfcKing
// >> https://github.com/OfcKing

import fs from 'fs';

const directoryPath = './YukiJadiBot/';
const sanSessionPath = './YukiSession/';

function cleanSubbotDirectories() {
  fs.readdir(directoryPath, (err, subbotDirs) => {
    if (err) {
      return console.log('No se puede escanear el directorio: ' + err);
    }

    subbotDirs.forEach((subbotDir) => {
      const subbotPath = `${directoryPath}${subbotDir}/`;

      fs.readdir(subbotPath, (err, files) => {
        if (err) {
          return console.log('No se puede escanear el directorio: ' + err);
        }

        files.forEach((file) => {
          if (file !== 'creds.json') {
            fs.unlink(`${subbotPath}${file}`, (err) => {
              if (err && err.code !== 'ENOENT') {
                console.log(`Error al eliminar JadiBot: ${file}: ` + err);
              } else {
                console.log(`JadiBot: ${file} eliminado.`);
              }
            });
          }
        });
      });
    });
  });
}

function cleanSessionFiles() {
  fs.readdir(sanSessionPath, (err, files) => {
    if (err) {
      return console.log('No se puede escanear el directorio: ' + err);
    }

    files.forEach((file) => {
      if (file !== 'creds.json') {
        fs.unlink(`${sanSessionPath}${file}`, (err) => {
          if (err && err.code !== 'ENOENT') {
            console.log(`Error al eliminar Session: ${file}: ` + err);
          } else {
            console.log(`Session: ${file} eliminado.`);
          }
        });
      }
    });
  });
}

setInterval(cleanSubbotDirectories, 60 * 1000);
setInterval(cleanSessionFiles, 60 * 1000);

cleanSubbotDirectories();
cleanSessionFiles();
