const { Client, Collection } = require('discord.js');
const fs = require('fs');
const config = require('./botconfig.json');

// Define o client do bot
const client = new Client();

// Cria a coleção de comandos no client
client.commands = new Collection();
// Cria a coleção de aliases no client
client.aliases = new Collection();
// Armazena as categorias no client
client.categories = fs.readdirSync("./commands/");
// Cria a recent pros cooldowns do sistema de xp
client.recent = new Set();

// Define as coleções criadas
["aliases", "commands"].forEach(x => client[x] = new Collection());
// Puxa as pastas do main
["command", "event"].forEach(x => require(`./main/${x}`) (client));

// Quando o bot ligar, avisar no console
client.on('ready', () => {
    console.log("APP - Ligado.")
});

// Loga o bot
client.login(config.token);