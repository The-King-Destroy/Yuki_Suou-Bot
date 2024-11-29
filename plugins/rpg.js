import fs from 'fs';
import path from 'path';
import readline from 'readline';

const dbPath = path.join(__dirname, 'database.json');

function readDatabase() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: {} }, null, 2));
  }
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
}

function writeDatabase(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

global.db = readDatabase();

global.rpg = {
  emoticon(string) {
    const emot = {
      level: '🧬 Nivel',
      yenes: '💴 Yenes',
      exp: '⚡ Experiencia',
      bank: '🏦 Banco',
      diamond: '💎 Diamante',
      health: '❤️ Salud',
      joincount: '💰 Token',
      emerald: '💚 Esmeralda',
      stamina: '✨ Energía',
      role: '💪 Rango',
      premium: '🎟️ Premium',
      gold: '👑 Oro',
    };
    const results = Object.keys(emot).map((v) => [v, new RegExp(v, 'gi')]).filter((v) => v[1].test(string));
    return results.length ? emot[results[0][0]] : '';
  }
};

global.rpgshop = {
  items: {
    exp: { name: '⚡ Experiencia', price: 100 },
    yenes: { name: '💴 Yenes', price: 50 },
    diamond: { name: '💎 Diamante', price: 200 },
    emerald: { name: '💚 Esmeralda', price: 150 },
    gold: { name: '👑 Oro', price: 250 },
  },
  getItemsList() {
    return Object.keys(this.items).map(key => `${this.items[key].name} - ${this.items[key].price} Yenes`).join('\n');
  },
  isValidItem(item) {
    return this.items.hasOwnProperty(item);
  }
};

function getEmoticon(item) {
  return global.rpg.emoticon(item);
}

function mostrarInventario(usuario) {
  const inventario = global.db.data.users[usuario] || {};
  let mensaje = `🎒 Inventario de ${usuario}:\n`;

  for (const [key, value] of Object.entries(inventario)) {
    const emoticono = getEmoticon(key);
    mensaje += `${emoticono} ${value} ${key}\n`;
  }

  return mensaje || '📦 Tu inventario está vacío.';
}

function mostrarTienda() {
  return `🛒 Bienvenido a la tienda:\n${global.rpgshop.getItemsList()}`;
}

async function comprarItem(usuario, item) {
  const inventarioUsuario = global.db.data.users[usuario] || (global.db.data.users[usuario] = {});
  
  if (!global.rpgshop.isValidItem(item)) {
    return '⚠️ El item no existe en la tienda.';
  }

  const itemInfo = global.rpgshop.items[item];
  if (!inventarioUsuario.yenes || inventarioUsuario.yenes < itemInfo.price) {
    return '💰 No tienes suficientes yenes para comprar este item.';
  }

  inventarioUsuario.yenes -= itemInfo.price;
  inventarioUsuario[item] = (inventarioUsuario[item] || 0) + 1;

  writeDatabase(global.db);

  return `🎉 Compraste un ${itemInfo.name} por ${itemInfo.price} yenes.`;
}

async function recompensar(usuario) {
  const cantidad = Math.floor(Math.random() * 50) + 1;
  const inventarioUsuario = global.db.data.users[usuario] || (global.db.data.users[usuario] = {});
  
  inventarioUsuario.yenes = (inventarioUsuario.yenes || 0) + cantidad;

  writeDatabase(global.db);

  return `🎊 Has recibido una recompensa de ${getEmoticon('yenes')} ${cantidad} yenes!`;
}

const usuario = 'user@example.com';

if (!global.db.data.users[usuario]) {
  global.db.data.users[usuario] = { yenes: 100 };
  writeDatabase(global.db);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function procesarComando(comando) {
  if (comando === '.inventario') {
    console.log(mostrarInventario(usuario));
  } else if (comando === '.tienda') {
    console.log(mostrarTienda());
  } else if (comando.startsWith('.comprar ')) {
    const item = comando.split(' ')[1];
    const resultado = await comprarItem(usuario, item);
    console.log(resultado);
    console.log(mostrarInventario(usuario));
  } else if (comando === '.recompensa') {
    const resultado = await recompensar(usuario);
    console.log(resultado);
    console.log(mostrarInventario(usuario));
  } else {
    console.log('⚠️ Comando no reconocido. Usa .inventario, .tienda, .comprar <item>, o .recompensa.');
  }
}

console.log('Bienvenido al RPG! Usa .inventario, .tienda, .comprar <item>, o .recompensa para comenzar.');
console.log(mostrarInventario(usuario));
console.log(mostrarTienda());

rl.on('line', (input) => {
  procesarComando(input.trim());
});