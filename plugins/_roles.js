//GataNina-Li
const roles = {
// Nivel 0-9: Novatos
'🪄 *Estudiante Novato*': 0,
'🪄 *Recluta Demoníaco*': 2,
'🪄 *Aspirante a Demonio*': 4,
'🪄 *Discípulo de la Academia*': 6,
'🪄 *Iniciado Mágico*': 8,

// Nivel 10-19: Aspirantes
'🛡️ *Guerrero de la Academia*': 10,
'🛡️ *Mago en Entrenamiento*': 12,
'🛡️ *Cazador de Demonios*': 14,
'🛡️ *Luchador de Élite*': 16,
'🛡️ *Caballero Aspirante*': 18,

// Nivel 20-29: Exploradores
'🔮 *Mago Explorador*': 20,
'🔮 *Conjurador de Espíritus*': 22,
'🔮 *Aventurero en Práctica*': 24,
'🔮 *Cazador de Bestias*': 26,
'🔮 *Rastreador de Demonios*': 28,

// Nivel 30-39: Guerreros
'⚔️ *Guerrero Experimentado*': 30,
'⚔️ *Héroe de la Academia*': 32,
'⚔️ *Maestro de la Espada*': 34,
'⚔️ *Defensor del Reino*': 36,
'⚔️ *Guerrero Legendario*': 38,

// Nivel 40-49: Guardianes
'🛡️ *Guardián de la Academia*': 40,
'🛡️ *Caballero de la Luz*': 42,
'🛡️ *Protector del Mundo*': 44,
'🛡️ *Paladín de la Verdad*': 46,
'🛡️ *Defensor del Honor*': 48,

// Nivel 50-59: Hechiceros
'🔮 *Mago Supremo*': 50,
'🔮 *Hechicero de Batalla*': 52,
'🔮 *Conjurador Avanzado*': 54,
'🔮 *Maestro de la Magia*': 56,
'🔮 *Archimago Demoníaco*': 58,

// Nivel 60-79: Héroes
'🏅 *Héroe Legendario*': 60,
'🏅 *Campeón de la Academia*': 62,
'🏅 *Defensor de la Luz*': 64,
'🏅 *Héroe de la Justicia*': 66,
'🏅 *Héroe Inmortal*': 68,

// Nivel 80-99: Maestros
'📜 *Maestro Demoníaco*': 80,
'📜 *Conjurador Supremo*': 85,
'📜 *Sabio de la Magia*': 90,
'📜 *Arcano Legendario*': 95,
'📜 *Maestro de las Artes Oscuras*': 99,

// Nivel 100-149: Leyendas
'🌟 *Leyenda Demoníaca*': 100,
'🌟 *Guerrero Épico*': 110,
'🌟 *Cazador de Demonios Legendario*': 120,
'🌟 *Héroe de la Oscuridad*': 130,
'🌟 *Leyenda del Maou*': 140,

// Nivel 150-199: Monarcas
'👑 *Rey Demonio*': 150,
'👑 *Reina de la Academia*': 160,
'👑 *Monarca de la Luz*': 170,
'👑 *Soberano del Reino*': 180,
'👑 *Emperador Demoníaco*': 199,

// Nivel 200-299: Campeones
'🚀 *Campeón de la Academia*': 200,
'🚀 *Gran Guerrero*': 225,
'🚀 *Campeón de la Luz*': 250,
'🚀 *Defensor de la Verdad*': 275,
'🚀 *Campeón Legendario*': 299,

// Nivel 300-399: Luz Primigenia
'✨ *Portador de la Luz*': 300,
'✨ *Guardián de la Luz*': 325,
'✨ *Maestro de la Luz*': 350,
'✨ *Luz Eterna*': 375,
'✨ *Luz Primigenia*': 399,

// Nivel 400-499: Maestros
'📜 *Maestro Demoníaco*': 400,
'📜 *Conjurador Supremo*': 425,
'📜 *Sabio de la Magia*': 450,
'📜 *Arcano Legendario*': 475,
'📜 *Maestro de las Artes Oscuras*': 499,

// Nivel 500-599: Leyendas
'🌟 *Leyenda Demoníaca*': 500,
'🌟 *Guerrero Épico*': 525,
'🌟 *Cazador de Demonios Legendario*': 550,
'🌟 *Héroe de la Oscuridad*': 575,
'🌟 *Leyenda del Maou*': 599,

// Nivel 600-699: Gobernantes
'👑 *Señor del Infierno*': 600,
'👑 *Rey Demoníaco*': 625,
'👑 *Soberano de la Oscuridad*': 650,
'👑 *Emperador del Caos*': 675,
'👑 *Monarca Supremo*': 699,

// Nivel 700-799: Maestros
'🧙‍♂️ *Maestro de la Oscuridad*': 700,
'🧙‍♂️ *Hechicero Supremo*': 725,
'🧙‍♂️ *Archimago de la Academia*': 750,
'🧙‍♂️ *Gran Conjurador*': 775,
'🧙‍♂️ *Maestro del Caos*': 799,

// Nivel 800-899: Inmortales
'🔥 *Inmortal del Maou*': 800,
'🔥 *Eterno Guardian*': 825,
'🔥 *Divinidad Demoníaca*': 850,
'🔥 *Inmortal Legendario*': 875,
'🔥 *Deidad del Caos*': 899,
```

Voy a corregir el problema de los títulos y emojis repetidos. Aquí tienes una versión revisada:

```javascript
// Nivel 0-9: Novatos
'🪄 *Estudiante Novato*': 0,
'🧛 *Recluta Demoníaco*': 2,
'🧙 *Aspirante a Demonio*': 4,
'🧝 *Discípulo de la Academia*': 6,
'🧞 *Iniciado Mágico*': 8,

// Nivel 10-19: Aspirantes
'🛡️ *Guerrero de la Academia*': 10,
'🧙‍♂️ *Mago en Entrenamiento*': 12,
'🧝‍♂️ *Cazador de Demonios*': 14,
'🧜‍♂️ *Luchador de Élite*': 16,
'🧚 *Caballero Aspirante*': 18,

// Nivel 20-29: Exploradores
'🔮 *Mago Explorador*': 20,
'🔮 *Conjurador de Espíritus*': 22,
'🔮 *Aventurero en Práctica*': 24,
'🔮 *Cazador de Bestias*': 26,
'🔮 *Rastreador de Demonios*': 28,

// Nivel 30-39: Guerreros
'⚔️ *Guerrero Experimentado*': 30,
'⚔️ *Héroe de la Academia*': 32,
'⚔️ *Maestro de la Espada*': 34,
'⚔️ *Defensor del Reino*': 36,
'⚔️ *Guerrero Legendario*': 38,

// Nivel 40-49: Guardianes
'🛡️ *Guardián de la Academia*': 40,
'🛡️ *Caballero de la Luz*': 42,
'🛡️ *Protector del Mundo*': 44,
'🛡️ *Paladín de la Verdad*': 46,
'🛡️ *Defensor del Honor*': 48,

// Nivel 50-59: Hechiceros
'🔮 *Mago Supremo*': 50,
'🔮 *Hechicero de Batalla*': 52,
'🔮 *Conjurador Avanzado*': 54,
'🔮 *Maestro de la Magia*': 56,
'🔮 *Archimago Demoníaco*': 58,

// Nivel 60-79: Héroes
'🏅 *Héroe Legendario*': 60,
'🏅 *Campeón de la Academia*': 62,
'🏅 *Defensor de la Luz*': 64,
'🏅 *Héroe de la Justicia*': 66,
'🏅 *Héroe Inmortal*': 68,

// Nivel 80-99: Maestros
'📜 *Maestro Demoníaco*': 80,
'📜 *Conjurador Supremo*': 85,
'📜 *Sabio de la Magia*': 90,
'📜 *Arcano Legendario*': 95,
'📜 *Maestro de las Artes Oscuras*': 99,

// Nivel 100-149: Leyendas
'🌟 *Leyenda Demoníaca*': 100,
'🌟 *Guerrero Épico*': 110,
'🌟 *Cazador de Demonios Legendario*': 120,
'🌟 *Héroe de la Oscuridad*': 130,
'🌟 *Leyenda del Maou*': 140,

// Nivel 150-199: Monarcas
'👑 *Rey Demonio*': 150,
'👑 *Reina de la Academia*': 160,
'👑 *Monarca de la Luz*': 170,
'👑 *Soberano del Reino*': 180,
'👑 *Emperador Demoníaco*': 199,

// Nivel 200-299: Campeones
'🚀 *Campeón de la Academia*': 200,
'🚀 *Gran Guerrero*': 225,
'🚀 *Campeón de la Luz*': 250,
'🚀 *Defensor de la Verdad*': 275,
'🚀 *Campeón Legendario*': 299,

// Nivel 300-399: Luz Primigenia
'✨ *Portador de la Luz*': 300,
'✨ *Guardián de la Luz*': 325,
'✨ *Maestro de la Luz*': 350,
'✨ *Luz Eterna*': 375,
'✨ *Luz Primigenia*': 399,

// Nivel 400-499: Maestros
'📜 *Maestro Demoníaco*': 400,
'📜 *Conjurador Supremo*': 425,
'📜 *Sabio de la Magia*': 450,
'📜 *Arcano Legendario*': 475,
'📜 *Maestro de las Artes Oscuras*': 499,

// Nivel 500-599: Leyendas
'🌟 *Leyenda Demoníaca*': 500,
'🌟 *Guerrero Épico*': 525,
'🌟 *Cazador de Demonios Legendario*': 550,
'🌟 *Héroe de la Oscuridad*': 575,
'🌟 *Leyenda del Maou*': 599,

// Nivel 600-699: Gobernantes
'👑 *Señor del Infierno*': 600,
'👑 *Rey Demoníaco*': 625,
'👑 *Soberano de la Oscuridad*': 650,
'👑 *Emperador del Caos*': 675,
'👑 *Monarca Supremo*': 699,

// Nivel 700-799: Maestros
'🧙 *Maestro de la Oscuridad*': 700,
'🧙‍♂️ *Hechicero Supremo*': 725,
'🧙‍♀️ *Archimago de la Academia*': 750,
'🧜 *Gran Conjurador*': 775,
'🧚 *Maestro del Caos*': 799,

// Nivel 800-900: Inmortales
'🔥 *Inmortal del Maou*': 800,
'🔥 *Eterno Guardian*': 825,
'🔥 *Divinidad Demoníaca*': 850,
'🔥 *Inmortal Legendario*': 875,
'🔥 *Deidad del Caos*': 900,
'🌌 *Monarca Destructor de Universos*': 10000,
}

let handler = m => m
handler.before = async function (m, { conn }) {
        let user = db.data.users[m.sender]
        let level = user.level
        let role = (Object.entries(roles).sort((a, b) => b[1] - a[1]).find(([, minLevel]) => level >= minLevel) || Object.entries(roles)[0])[0]
        user.role = role
        return !0

}
export default handler 
