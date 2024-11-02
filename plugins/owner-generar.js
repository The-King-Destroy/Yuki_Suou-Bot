import db from '../lib/database.js';
import fs from 'fs'; // Importa el módulo fs

// Función para generar un código aleatorio
const generateRandomCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase(); // Genera un código aleatorio de 8 caracteres
};

// Función para guardar la base de datos
const saveDatabase = () => {
    fs.writeFileSync('./database.json', JSON.stringify(db.data, null, 2)); // Guarda la base de datos en un archivo JSON
};

let generateHandler = async (m, { conn }) => {
    const today = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD

    // Asegúrate de que la base de datos tenga la estructura adecuada
    if (!db.data) {
        db.data = {
            global: { codes: [], lastGenerated: null }, // Estructura global
            users: {} // Estructura de usuarios
        };
    }

    const globalData = db.data.global;

    try {
        // Verifica si los códigos ya fueron generados hoy
        if (globalData.lastGenerated === today) {
            return m.reply("Los códigos ya han sido generados hoy. Puedes intentarlo de nuevo mañana.");
        }

        // Generar 10 códigos aleatorios
        const newCodes = [];
        for (let i = 0; i < 10; i++) {
            newCodes.push(generateRandomCode());
        }

        // Almacena los códigos y la fecha de generación
        globalData.codes = newCodes;
        globalData.lastGenerated = today;

        // Formatear la respuesta
        const formattedCodes = newCodes.map((code, index) => `🎟️ Código ${index + 1}: ${code} 🎉`).join('\n');
        m.reply(`✨ Códigos generados globalmente:\n${formattedCodes}\n¡Los primeros 10 en canjear ganarán cookies! ⏲️`);
        
        // Guarda la base de datos después de la generación
        saveDatabase();
    } catch (error) {
        console.error("Error al generar códigos:", error);
        m.reply("Hubo un error al generar los códigos. Detalles del error: " + error.message);
    }
}

generateHandler.command = ['generar'];
export default generateHandler;
