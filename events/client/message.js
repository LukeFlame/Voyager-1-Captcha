// Importa o banco de dados
const db = require('quick.db');
// Coleta as configs do botconfig.json
const config = require('../../botconfig.json');
const custom = require('../../customizate.json');
const Discord = require('discord.js');

// Exporta tudo, recebendo client e message
module.exports = (client, message) => {

    // Se for bot, retorna
    if(message.author.bot) return;

    // Se for na dm, retorna
    if(message.channel.type === 'dm') return;

    // Se estiver no canal de verificação, retorna
    var authChannelID = db.fetch(`info_${message.guild.id}.authChannel`)
    if (message.channel.id == authChannelID) return;

    // Cria o prefixo
    let prefix = config.prefix

    // Se não ter prefixo na mensagem, retorna
    if (!message.content.startsWith(prefix)) return

    // Coleta os argumentos do comando
    const args = message.content.slice(prefix.length).trim().split(/ +/g)

    // Coleta só o comando
    let cmd = args.shift().toLowerCase()

    // Se não ter comando, retorna
    if(cmd.length === 0) return

    // Procura o comando coletado na coleção commands do client
    let command = client.commands.get(cmd)

    // Se não ter na coleção commands, procura na aliases
    if(!command) command = client.commands.get(client.aliases.get(cmd))
    
    // Se ter, roda o comando
    if(command) command.run(client, message, args)

    // Se não encontrar o comando em lugar nenhum, diz que não encontrou o comando.
    if(!command) {
        const command = new Discord.MessageEmbed()
            .setAuthor(`・ERRO`, `https://cdn.discordapp.com/attachments/443448117849882624/783201639406239765/1A_error.png`)
            .setDescription(`<a:No:768609312960020481> | **${message.author.username}**, não consegui encontrar o comando __${prefix}${cmd}__ em meu banco de dados.`)
            .setColor("RED")
            .setFooter(`Copyright © 2020 ${message.guild.name}. All Rights Reserved.`, custom.avatar)

        return message.channel.send(command)
    } 
}